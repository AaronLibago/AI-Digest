"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}
