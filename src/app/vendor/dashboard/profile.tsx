"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { firebaseAuth, firebaseStorage } from "../../../util/firebase";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function VendorProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      setDisplayName(u?.displayName || "");
      setPhotoURL(u?.photoURL || null);
    });
    return () => unsub();
  }, []);

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (!user) return;
    try {
      await updateProfile(user, { displayName });
      setMessage("Profile updated successfully.");
    } catch {
      setError("Failed to update profile.");
    }
  }

  async function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    if (!user || !e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setError(null);
    setMessage(null);
    try {
      const file = e.target.files[0];
      const storageRef = ref(firebaseStorage, `vendors/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: url });
      setPhotoURL(url);
      setMessage("Photo updated successfully.");
    } catch {
      setError("Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  }

  if (!user) return <div className="text-center py-10 text-red-600">Please login as a vendor to view your profile.</div>;

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Vendor Profile</h2>
      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleProfileUpdate} className="bg-white p-6 rounded shadow space-y-4">
        <div className="flex items-center gap-4 mb-4">
          {photoURL ? (
            <Image src={photoURL} alt="Vendor" width={80} height={80} className="w-20 h-20 rounded-full object-cover border" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-blue-700">
              {displayName?.charAt(0) || user.email?.charAt(0) || "V"}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Change Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploading} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Display Name</label>
          <input value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input value={user.email || ""} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Profile</button>
      </form>
    </div>
  );
}
