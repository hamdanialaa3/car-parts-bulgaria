"use client";
import React, { useState } from "react";
import { firebaseAuth } from "../../../util/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function VendorAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      } else {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
    } catch (err: unknown) {
      setError((err as Error).message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut(firebaseAuth);
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-bold mb-2">{isLogin ? "Vendor Login" : "Vendor Sign Up"}</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-full">
          {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
        </button>
        <button type="button" onClick={handleGoogle} disabled={loading} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 w-full mt-2">
          Sign in with Google
        </button>
        <div className="text-sm text-center mt-2">
          {isLogin ? (
            <span>Don&apos;t have an account? <button type="button" className="text-blue-600 underline" onClick={() => setIsLogin(false)}>Sign Up</button></span>
          ) : (
            <span>Already have an account? <button type="button" className="text-blue-600 underline" onClick={() => setIsLogin(true)}>Login</button></span>
          )}
        </div>
      </form>
      <div className="text-center mt-4">
        <button onClick={handleLogout} className="text-gray-500 underline text-xs">Logout</button>
      </div>
    </div>
  );
}
