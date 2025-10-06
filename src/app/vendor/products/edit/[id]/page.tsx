"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { firebaseAuth } from "@/util/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function EditProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      if (!user || !productId) return;
      try {
        const res = await fetch(`/api/parts/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPrice(data.price ? String(data.price) : "");
        setCategory(data.categoryId || "");
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    if (user && productId) fetchProduct();
  }, [user, productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/parts/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, price: parseFloat(price), category }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      toast.success("Product updated successfully.");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <div className="text-center py-10 text-red-600">Please login as a vendor to edit products.</div>;

  return (
    <div className="max-w-lg mx-auto py-8">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (€)</label>
          <input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input value={category} onChange={e => setCategory(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
