"use client";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../../util/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const dynamic = 'force-dynamic';

interface VendorProfile {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  // يمكن إضافة المزيد من الحقول لاحقاً
}

export default function VendorDashboard() {
  const t = useTranslations("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ sales: 0, products: 0, orders: 0, reviews: 0 });

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser(u);
      if (u) {
        setProfile({
          displayName: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
        });
        // Fetch stats
        fetch('/api/vendors/stats', {
          headers: { 'x-user-id': u.uid },
        })
          .then(res => res.json())
          .then(setStats)
          .catch(() => {});
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user) return <div className="text-center py-10 text-red-600">Please login as a vendor to access the dashboard.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        {profile?.photoURL ? (
          <Image src={profile.photoURL} alt="Vendor" width={80} height={80} className="w-20 h-20 rounded-full object-cover border" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-blue-700">
            {profile?.displayName?.charAt(0) || profile?.email?.charAt(0) || "V"}
          </div>
        )}
        <div>
          <div className="text-xl font-bold">{profile?.displayName || "Vendor"}</div>
          <div className="text-gray-600">{profile?.email}</div>
        </div>
      </div>
      {/* إحصائيات البائع */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">€{stats.sales.toFixed(2)}</div>
          <div className="text-xs text-gray-500 mt-1">{t("sales")}</div>
        </div>
        <div className="bg-green-50 rounded p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{stats.products}</div>
          <div className="text-xs text-gray-500 mt-1">{t("products")}</div>
        </div>
        <div className="bg-orange-50 rounded p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">{stats.orders}</div>
          <div className="text-xs text-gray-500 mt-1">{t("orders")}</div>
        </div>
        <div className="bg-purple-50 rounded p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{stats.reviews}</div>
          <div className="text-xs text-gray-500 mt-1">{t("reviews")}</div>
        </div>
      </div>
      {/* يمكن إضافة إدارة المنتجات والطلبات هنا */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-bold mb-4">{t("welcome")}</h2>
        <p className="text-gray-700 mb-2">Here you can manage your products, orders, and profile settings.</p>
        {/* روابط لإدارة المنتجات والطلبات */}
        <div className="flex gap-4 mt-4">
          <a href="/vendor/products/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{t("addProduct")}</a>
          <a href="/vendor/products" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">{t("manageProducts")}</a>
          <a href="/vendor/orders" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Orders</a>
          <a href="/vendor/reviews" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Reviews</a>
          <a href="/vendor/messages" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Messages</a>
        </div>
      </div>
    </div>
  );
}
