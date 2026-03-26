import Link from "next/link";
import { TopNav } from "./components/TopNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <TopNav />
      <main className="mx-auto max-w-6xl space-y-16 px-6 py-20">
        <section className="rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="mb-4 text-5xl italic md:text-7xl">
            From Overwhelm to Breakthrough
          </h1>
          <p className="max-w-3xl text-zinc-600">
            A private sanctuary for university students with anonymous
            mental-health support intake and retrieval-augmented chatbot
            guidance.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/student"
              className="rounded-full bg-zinc-900 px-6 py-3 text-white"
            >
              Student Portal
            </Link>
            <Link
              href="/mentor"
              className="rounded-full border border-zinc-300 px-6 py-3"
            >
              Mentor Access
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Support Access</p>
            <p className="text-4xl italic">24/7</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Response Target</p>
            <p className="text-4xl italic">24h</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">Identity Mode</p>
            <p className="text-4xl italic">Pseudo</p>
          </div>
        </section>
      </main>
    </div>
  );
}
