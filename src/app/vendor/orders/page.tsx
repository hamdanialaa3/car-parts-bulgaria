"use client";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../../util/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface Order {
  id: string;
  customerName: string;
  total: number;
  currency: string;
  status: string;
  createdAt: string;
}

export default function VendorOrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      if (!user) return;
      try {
        // استبدل هذا بالربط الفعلي مع API لاحقاً
        const res = await fetch(`/api/orders?vendorId=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <div className="text-center py-10 text-red-600">Please login as a vendor to view your orders.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No orders found.</div>
      ) : (
        <div className="bg-white rounded shadow p-4 divide-y">
          {orders.map((o) => (
            <div key={o.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold">Order #{o.id}</div>
                <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString()} • {o.customerName}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-700">€{o.total.toFixed(2)}</div>
                <div className="text-xs text-gray-600">{o.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
