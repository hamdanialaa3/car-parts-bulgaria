"use client";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../../util/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: { firstName: string; lastName: string };
  part: { title: string };
  createdAt: string;
}

export default function VendorReviewsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      if (!user) return;
      try {
        const res = await fetch(`/api/reviews?vendorId=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
        }
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchReviews();
  }, [user]);

  if (!user) return <div className="text-center py-10 text-red-600">Please login as a vendor.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No reviews found.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{r.user.firstName} {r.user.lastName}</div>
                  <div className="text-sm text-gray-500">{r.part.title}</div>
                </div>
                <div className="text-yellow-500">{"★".repeat(r.rating)}</div>
              </div>
              <p className="mt-2">{r.comment}</p>
              <div className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}