"use client";

import Link from "next/link";
import { TopNav } from "@/app/components/TopNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <TopNav />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[921px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="A serene monochrome mountain landscape"
              className="w-full h-full object-cover filter grayscale opacity-40 brightness-110 dark:brightness-75"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnMZPfNa-J_dIm-3WSAFqPEfM4HEebDDQu4rqp5qpONTAHeslp8Z2ORf946Hl05fQBDmYNS8KR8-goGTSaewTrvy8X9BIKhv4x_VFdzKdloYn5EZL_XzZR-rHJsPB_nBWHe188useL9glhif30f1pZghOiaxVA28ssnV1WQjZJsTBQxeHjIOVUIAEnvDgUmPyP0ux9t6tzibo_oKNzFHyfYpVccHNJd-NopTLQcDYR6tZDIk5mXpTD0xSfNVntGPquGdzaWVN-82Aw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
              From Overwhelm to Breakthrough
            </h1>
            <p className="text-xl md:text-2xl font-body text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              A private sanctuary for university students. Experience
              institutional change through anonymous advocacy and intelligent
              support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/student"
                className="group px-10 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-body font-bold text-lg hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/10 transition-all duration-500 active:scale-95"
              >
                Student Portal
              </Link>
              <Link
                href="/mentor"
                className="px-10 py-4 border-b border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 font-body font-bold text-lg active:scale-95"
              >
                Mentor Access
              </Link>
            </div>
          </div>
        </section>

        {/* Brief & High-Level Content Section */}
        <section className="py-24 px-6 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-widest font-label font-bold text-zinc-500 dark:text-zinc-500">
                  The Philosophy
                </span>
                <h2 className="text-5xl font-serif text-zinc-900 dark:text-zinc-50 leading-tight">
                  Institutional silence ends with structured dialogue.
                </h2>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-body">
                Universities have centuries of bureaucracy. Students have
                voices. We bridge the gap with transparency, anonymity when
                needed, and AI-assisted clarity. No walls. No noise. Just
                resolution.
              </p>
              <Link
                href="/about"
                className="inline-block px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Learn More
              </Link>
            </div>
            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden shadow-xl">
              <img
                alt="University campus with students"
                className="w-full h-full object-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-x4cHOH_pqvlAGrGbOdm2MVzAyR0N-7HUjEzLmxJHJELp73Z-R1ixG0NAEyPLfXHUpYM_DQGwQgB8lx1W8SFzMRTuZzJ5I0waMSJGk3CHWjG8dBnEHaXq_5DfKvg0HZOV2jrvMJ3UNwb-Rr8ywvJVkfcqALFqCJCPCe5PdUxEzHdOvHB_IvQ8tCHQ_qKxqvf1DkVvEuD9vKdFZtd-cKT3Y3Ro"
              />
            </div>
          </div>
        </section>

        {/* Three Pillar Section */}
        <section className="bg-zinc-50 dark:bg-zinc-900 py-24 px-6 mb-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif italic text-zinc-900 dark:text-zinc-50 text-center mb-20">
              Built on three principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: "🔒",
                  title: "Privacy by Design",
                  description:
                    "Your identity is yours. Data is encrypted. You control when and how you're identified.",
                },
                {
                  icon: "🤐",
                  title: "Anonymous Advocacy",
                  description:
                    "Speak freely. Our AI mediator distills truth from identity, so institutions hear you without bias.",
                },
                {
                  icon: "⚡",
                  title: "Fast Resolution",
                  description:
                    "Traditional systems take months. We accelerate justice through intelligent triage and mediation.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-800 p-10 rounded-xl border border-zinc-100 dark:border-zinc-700 hover:shadow-xl dark:hover:shadow-black/30 transition-shadow"
                >
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-serif text-zinc-900 dark:text-zinc-50 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-zinc-900 dark:bg-black text-white px-6 py-24 mb-24">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-serif italic mb-8">
              Ready to be heard?
            </h2>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-12">
              Join thousands of students who are reshaping institutional
              accountability.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/register"
                className="px-10 py-4 bg-white text-zinc-900 rounded-full font-bold hover:scale-105 transition-transform text-lg"
              >
                Get Started Now
              </Link>
              <Link
                href="/about"
                className="px-10 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link
            href="/"
            className="font-serif italic text-lg text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition-opacity"
          >
            The Quiet Advocate
          </Link>
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
              <div className="grid grid-cols-1 gap-12">
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    shield_person
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif italic">
                      Absolute Anonymity
                    </h3>
                    <p className="text-on-surface-variant font-body leading-relaxed">
                      Your identity is protected by multi-layer encryption. We
                      advocate for your issue, not your profile.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    auto_awesome
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif italic">
                      AI-Driven Mediation
                    </h3>
                    <p className="text-on-surface-variant font-body leading-relaxed">
                      Our Quiet Intelligence structures your support need
                      into actionable insights for rapid resolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Grid Illustration */}
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="col-span-2 bg-surface-container-low rounded-xl flex items-end p-8 relative overflow-hidden">
                <img
                  alt="A clean office desk"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-20"
                  data-alt="Minimalist overhead shot of a clean white desk with a single black pen and a glass of water, bright natural lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2CslswxDwKwyuKy7wVEd6YhcjCLMEB5A7PSzK6dpFGyQBa08hijihv1ZWpA9wc3vkjRL_CreJcOTcCrcrY-2Q8eYL-CnLdqTmtOgCeTok_seS68WPJvDyUE-P8yIZlqJCJNxz01Kl2_Fz72cm-TGTUmifwgm1wn39neV0Dot5Q1CLUSOoPnT1XqO8D_DezBMOFnHOjPOkmW6wIJIAmNYfDxy3uPTaBTvSGo8bH9DzlnvVtAFe07lxoa8RDhGHcbYXt-3a-piKxXJ9"
                />
                <div className="relative z-10">
                  <h4 className="text-xl font-serif italic mb-2">
                    Secure Resolution
                  </h4>
                  <div className="h-1 w-12 bg-primary" />
                </div>
              </div>
              <div className="bg-surface-container-highest rounded-xl p-8 flex flex-col justify-center">
                <span className="text-4xl font-serif mb-2">94%</span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
                  Success Rate
                </span>
              </div>
              <div className="bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-center">
                <span className="text-4xl font-serif mb-2">24h</span>
                <span className="text-xs font-label uppercase tracking-widest opacity-70">
                  Avg Response
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 px-6 bg-surface-container-low">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif italic">
              "A bridge between student frustration and institutional
              progress."
            </h2>
            <div className="flex justify-center gap-4">
              <span className="w-10 h-[1px] bg-outline-variant mt-3" />
              <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
                Student Union Association
              </p>
              <span className="w-10 h-[1px] bg-outline-variant mt-3" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif italic text-lg text-zinc-900 dark:text-zinc-50">
              The Quiet Advocate
            </span>
            <p className="font-sans text-xs uppercase tracking-widest Manrope text-zinc-400 dark:text-zinc-500">
              © 2024 The Quiet Advocate. Privacy Assured.
            </p>
          </div>
          <div className="flex gap-8">
            <a
              className="font-sans text-xs uppercase tracking-widest Manrope text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-sans text-xs uppercase tracking-widest Manrope text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-sans text-xs uppercase tracking-widest Manrope text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Institutional Guidelines
            </a>
          </div>
          <div className="flex gap-4">
            <a
              className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">
                lock
              </span>
            </a>
            <a
              className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">
                mail
              </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
