"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ displayName, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      router.push(data.user?.role === "mentor" ? "/mentor" : "/student");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto max-w-md px-6 py-16">
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl italic">Register</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Create your account for university wellbeing support.
          </p>
          <form className="mt-6 space-y-3" onSubmit={submit}>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="University email"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 8 chars)"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3"
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
            </select>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              disabled={loading}
              className="w-full rounded-full bg-zinc-900 px-6 py-3 text-white disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-sm text-zinc-500">
            Already registered?{" "}
            <Link href="/login" className="font-medium text-zinc-900">
              Login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

