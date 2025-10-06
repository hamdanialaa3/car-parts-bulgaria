"use client";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../../util/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: { firstName: string; lastName: string };
  createdAt: string;
  isRead: boolean;
}

export default function VendorMessagesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      if (!user) return;
      try {
        const res = await fetch(`/api/messages?receiverId=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
        }
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchMessages();
  }, [user]);

  if (!user) return <div className="text-center py-10 text-red-600">Please login as a vendor.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">My Messages</h2>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No messages found.</div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`bg-white rounded shadow p-4 ${!m.isRead ? 'border-l-4 border-blue-500' : ''}`}>
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{m.sender.firstName} {m.sender.lastName}</div>
                  <div className="text-sm text-gray-500">{m.subject}</div>
                </div>
                <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</div>
              </div>
              <p className="mt-2">{m.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}