"use client";

import { useState, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";

type Mode = "login" | "signup" | "forgot";

export default function LoginForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(getAuthInstance(), email, password);
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(getAuthInstance(), email, password);
      } else {
        await sendPasswordResetEmail(getAuthInstance(), email);
        setMessage("Password reset email sent. Check your inbox.");
      }
    } catch {
      const messages: Record<Mode, string> = {
        login: "Invalid email or password",
        signup: "Could not create account. The email may already be in use.",
        forgot: "Could not send reset email. Please check the email address.",
      };
      setError(messages[mode]);
    } finally {
      setLoading(false);
    }
  };

  const title: Record<Mode, string> = {
    login: "AI Digest Login",
    signup: "Create Account",
    forgot: "Reset Password",
  };

  const buttonLabel: Record<Mode, [string, string]> = {
    login: ["Signing in...", "Sign In"],
    signup: ["Creating account...", "Create Account"],
    forgot: ["Sending...", "Send Reset Email"],
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
      <h2 className="text-xl font-bold text-center mb-6">{title[mode]}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {mode !== "forgot" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {loading ? buttonLabel[mode][0] : buttonLabel[mode][1]}
        </button>
      </form>
      <div className="mt-4 text-center text-sm space-y-1">
        {mode === "login" && (
          <>
            <p>
              <button
                type="button"
                onClick={() => switchMode("forgot")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </p>
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Create one
              </button>
            </p>
          </>
        )}
        {mode === "signup" && (
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>
        )}
        {mode === "forgot" && (
          <p>
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Back to sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
