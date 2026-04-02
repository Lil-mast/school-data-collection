"use client";

import Link from "next/link";
import { TopNav } from "@/app/components/TopNav";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <TopNav />

      <main className="pt-32 pb-24">
        {/* Hero Section: Intentional Asymmetry */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <h1 className="text-6xl md:text-8xl font-serif italic font-light leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
                Restoring peace <br />
                through{" "}
                <span className="font-normal">visual silence.</span>
              </h1>
            </div>
            <div className="md:col-span-4 pb-4">
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-body">
                The Quiet Advocate is a sanctuary for the unspoken. We provide a
                space where student voices find clarity without the noise of
                administrative friction.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission: Editorial Layout */}
        <section className="bg-zinc-50 dark:bg-zinc-900 py-24 mb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-8">
                <span className="text-xs uppercase tracking-widest font-label text-zinc-500 dark:text-zinc-500">
                  Our Mission
                </span>
                <h2 className="text-4xl md:text-5xl font-serif leading-snug text-zinc-900 dark:text-zinc-50">
                  Bridging the gap between conflict and resolution.
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 font-body leading-relaxed">
                  Traditional grievance systems are often opaque, intimidating,
                  and slow. Our mission is to democratize institutional justice
                  by providing an AI-driven mediation layer that ensures every
                  student is heard, protected, and respected.
                </p>
              </div>
              <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 overflow-hidden rounded-sm group">
                <img
                  alt="Institutional Sanctuary"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAUzpJ9o015UN6O9vTCvnsAEkQLGiWOASGTzGLe-PmJZ8BSC4M8by2oZVpEjq-J2aUOIpVtElsF9LX9ye1oHZrSLg7vqjAkg1EXKApVOJGOhaN9m_5dZHwXKBTSbhUA7V2UaetApFMWBN2JZxvdiTbFnWbnMALj7lGnmmo2cmV5eWzPQkT1x8ig8SAh4jljrNcR4jd9fL4RSV9B0XIF4U6lQ699Y3yy-RsuKwLACRg0SCVlha9U9mDVEYDwqN4QXId8etL0-P10slp"
                />
                <div className="absolute inset-0 bg-zinc-900/5 dark:bg-white/5"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works: Bento Grid / Tonal Layering */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="text-4xl font-serif italic text-zinc-900 dark:text-zinc-50">
              The Architecture of Trust
            </h2>
            <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-grow mx-8 hidden md:block opacity-20"></div>
            <span className="font-label text-xs uppercase tracking-widest text-zinc-500">
              Process & Privacy
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Privacy Card */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-xl flex flex-col justify-between min-h-[320px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20 border border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="material-symbols-outlined text-4xl mb-6 inline-block text-zinc-900 dark:text-zinc-50">
                  fingerprint
                </span>
                <h3 className="text-2xl font-serif mb-4 text-zinc-900 dark:text-zinc-50">
                  Privacy
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 font-body">
                Your data is encrypted end-to-end. We use zero-knowledge
                protocols to ensure that your identity remains your own until
                you choose otherwise.
              </p>
            </div>

            {/* Anonymity Card */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-xl flex flex-col justify-between min-h-[320px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20 border border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="material-symbols-outlined text-4xl mb-6 inline-block text-zinc-900 dark:text-zinc-50">
                  visibility_off
                </span>
                <h3 className="text-2xl font-serif mb-4 text-zinc-900 dark:text-zinc-50">
                  Anonymity
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 font-body">
                Communicate through our AI mediator. It strips identifying
                metadata while preserving the emotional truth of your
                experience.
              </p>
            </div>

            {/* Resolution Card */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-xl flex flex-col justify-between min-h-[320px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20 border border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="material-symbols-outlined text-4xl mb-6 inline-block text-zinc-900 dark:text-zinc-50">
                  balance
                </span>
                <h3 className="text-2xl font-serif mb-4 text-zinc-900 dark:text-zinc-50">
                  Resolution
                </h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 font-body">
                AI-driven analysis categorizes grievances objectively,
                accelerating institutional response times by up to 70%.
              </p>
            </div>
          </div>
        </section>

        {/* The Vision: Full Width Cinematic */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden bg-zinc-900 dark:bg-black text-white px-12 py-24 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
              <div className="md:col-span-7">
                <h2 className="text-5xl md:text-7xl font-serif italic mb-8">
                  The Vision.
                </h2>
                <p className="text-xl md:text-2xl font-body font-light leading-relaxed opacity-80">
                  We envision a future where power imbalances are neutralized by
                  transparency. A world where the "Quiet Advocate" isn't a tool,
                  but a standard for human-centric administration.
                </p>
              </div>
              <div className="md:col-span-5 flex flex-col justify-end space-y-6">
                <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                  <p className="font-label text-xs uppercase tracking-tighter opacity-60 mb-2">
                    Next Milestone
                  </p>
                  <p className="text-lg">Global Institutional Integration — Q4 2024</p>
                </div>
                <Link
                  href="/register"
                  className="w-full py-4 bg-white text-zinc-900 rounded-full font-bold hover:scale-105 transition-transform text-center"
                >
                  Join the Waitlist
                </Link>
              </div>
            </div>
            {/* Abstract Background Texture */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, #ffffff 0%, transparent 70%)",
              }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-serif italic text-lg text-zinc-900 dark:text-zinc-50">
            The Quiet Advocate
          </div>
          <div className="font-sans text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            © 2024 THE QUIET ADVOCATE. PRIVACY ASSURED.
          </div>
        </div>
        <div className="flex gap-8">
          <a
            className="font-sans text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-sans text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-sans text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            href="#"
          >
            Institutional Guidelines
          </a>
        </div>
      </footer>
    </div>
  );
}
