"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TopNav } from "../components/TopNav";
import { apiFetch } from "../lib/api";

type SupportRequest = {
  id: string;
  topic: string;
  summary: string;
  priority: "hot" | "warm" | "cool";
};

export default function MentorPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<SupportRequest[]>([]);

  const loadRequests = useCallback(async () => {
    const meRes = await apiFetch("/api/auth/me");
    if (!meRes.ok) {
      router.push("/login");
      return;
    }
    const me = await meRes.json();
    if (me.user?.role !== "mentor") {
      router.push("/student");
      return;
    }
    const res = await apiFetch("/api/support-requests");
    const data = await res.json();
    setRequests(data.grievances || []);
  }, [router]);

  useEffect(() => {
    // Run async load after the effect body completes to avoid sync setState-in-effect lint issues.
    const t = setTimeout(() => {
      void loadRequests();
    }, 0);
    return () => clearTimeout(t);
  }, [loadRequests]);

  const counts = useMemo(
    () => ({
      hot: requests.filter((r) => r.priority === "hot").length,
      warm: requests.filter((r) => r.priority === "warm").length,
      cool: requests.filter((r) => r.priority === "cool").length,
    }),
    [requests],
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <TopNav />
      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
            <p className="text-sm text-zinc-500">Active Support Requests</p>
            <p className="text-5xl italic">{requests.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Hot</p>
            <p className="text-5xl italic">{counts.hot}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Warm/Cool</p>
            <p className="text-5xl italic">{counts.warm + counts.cool}</p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl italic">Incoming Wellbeing Monitor</h2>
          <div className="mt-4 space-y-3">
            {requests.map((item) => (
              <div key={item.id} className="rounded-xl border border-zinc-200 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-semibold">{item.topic}</p>
                  <span className="rounded-full bg-zinc-900 px-2 py-1 text-xs uppercase text-white">
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-zinc-600">{item.summary}</p>
              </div>
            ))}
            {!requests.length && (
              <p className="text-sm text-zinc-500">No incoming support cases yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

