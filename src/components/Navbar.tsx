"use client";

import { signOut } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">AI Digest</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.email}</span>
          <button
            onClick={() => signOut(getAuthInstance())}
            className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
