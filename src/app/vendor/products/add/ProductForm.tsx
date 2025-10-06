"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { firebaseAuth, firebaseStorage } from "../../../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
}

export default function ProductForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setUserId(user?.uid || null);
    });
    return () => unsub();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userId || !e.target.files) return;
    const file = e.target.files[0];
    const storageRef = ref(firebaseStorage, `products/${userId}/${Date.now()}_${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImages([...images, url]);
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Failed to upload image.");
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!userId) {
      toast.error("Please login first.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ ...data, images }),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        reset();
      } else {
        toast.error("Failed to add product.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl font-bold">Add New Product</h1>

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price (€)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required", min: 0 })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select {...register("category", { required: "Category is required" })} className="w-full border rounded px-3 py-2">
            <option value="">Select Category</option>
            <option value="engine">Engine</option>
            <option value="brakes">Brakes</option>
            <option value="electrical">Electrical</option>
            <option value="body">Body</option>
            <option value="suspension">Suspension</option>
            <option value="transmission">Transmission</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Images</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border rounded px-3 py-2" />
          {images.length > 0 && (
            <div className="mt-2 flex gap-2">
              {images.map((img, i) => <img key={i} src={img} alt="" className="w-16 h-16 object-cover" />)} {/* eslint-disable-line @next/next/no-img-element */}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </>
  );
}