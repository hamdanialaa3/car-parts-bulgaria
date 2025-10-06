"use client";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../../util/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  createdAt: string;
}

export default function VendorProductsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      if (!user) return;
      try {
        // استبدل هذا بالربط الفعلي مع API لاحقاً
        const res = await fetch(`/api/parts?vendorId=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.parts || []);
        }
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchProducts();
  }, [user]);

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/parts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        alert("Product deleted successfully.");
      } else {
        alert("Failed to delete product.");
      }
    } catch {
      alert("An error occurred.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">My Products</h2>
      <a href="/vendor/products/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 inline-block">Add New Product</a>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No products found.</div>
      ) : (
        <div className="bg-white rounded shadow p-4 divide-y">
          {products.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()} • €{p.price.toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <a href={`/vendor/products/edit/${p.id}`} className="text-blue-600 hover:underline text-sm">Edit</a>
                <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
