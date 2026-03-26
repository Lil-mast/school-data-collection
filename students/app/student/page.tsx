"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TopNav } from "../components/TopNav";
import { apiFetch } from "../lib/api";

type SupportRequest = {
  id: string;
  topic: string;
  summary: string;
  priority: "hot" | "warm" | "cool";
};

export default function StudentPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<SupportRequest[]>([]);

  const loadRequests = useCallback(async () => {
    const me = await apiFetch("/api/auth/me");
    if (!me.ok) {
      router.push("/login");
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

  async function submitRequest(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/api/support-requests", {
        method: "POST",
        body: JSON.stringify({ topic, message }),
      });
      setTopic("");
      setMessage("");
      await loadRequests();
    } finally {
      setLoading(false);
    }
  }

  async function askRag(e: FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await apiFetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "No response available.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <TopNav />
      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-4xl italic">Share how you are feeling.</h2>
            <form className="mt-6 space-y-3" onSubmit={submitRequest}>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic (e.g. anxiety during exam season)"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your mental-health concern or support need..."
                className="h-32 w-full rounded-xl border border-zinc-200 px-4 py-3"
              />
              <button
                disabled={loading}
                className="rounded-full bg-zinc-900 px-6 py-3 text-white disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Support Request"}
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl italic">RAG Support Chatbot</h3>
            <form className="mt-4 flex gap-3" onSubmit={askRag}>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask for wellbeing guidance or support steps..."
                className="flex-1 rounded-xl border border-zinc-200 px-4 py-3"
              />
              <button
                disabled={loading}
                className="rounded-xl bg-zinc-900 px-5 py-3 text-white"
              >
                Ask
              </button>
            </form>
            {answer && (
              <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-zinc-100 p-4 text-sm">
                {answer}
              </pre>
            )}
          </div>
        </section>

        <aside className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-2xl italic">Past Support Cases</h3>
          <div className="mt-4 space-y-3">
            {requests.slice(0, 8).map((item) => (
              <div key={item.id} className="rounded-xl border border-zinc-200 p-4">
                <p className="text-xs uppercase text-zinc-500">{item.priority}</p>
                <p className="font-semibold">{item.topic}</p>
                <p className="text-sm text-zinc-600">{item.summary}</p>
              </div>
            ))}
            {!requests.length && (
              <p className="text-sm text-zinc-500">No support requests yet.</p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

