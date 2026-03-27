"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary selection:text-on-primary">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm shadow-zinc-200/50 dark:shadow-none">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-serif italic text-zinc-900 dark:text-zinc-50 tracking-tight">
            The Quiet Advocate
          </div>
          <div className="hidden md:flex items-center gap-12">
            <a
              className="text-zinc-900 dark:text-zinc-50 font-bold border-b-2 border-zinc-900 dark:border-zinc-50 pb-1 font-sans font-medium transition-all duration-300"
              href="#"
            >
              Home
            </a>
            <a
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors font-sans font-medium"
              href="#"
            >
              About
            </a>
            <a
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors font-sans font-medium"
              href="#"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-zinc-900 dark:text-zinc-50 font-sans font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 rounded-full active:scale-95 opacity-90 transition-transform"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-primary text-on-primary font-sans font-medium rounded-full hover:bg-primary-container transition-all duration-300 active:scale-95 opacity-90 transition-transform"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[921px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="A serene monochrome mountain landscape"
              className="w-full h-full object-cover filter grayscale opacity-40 brightness-110"
              data-alt="Cinematic wide-angle view of misty, layered mountain peaks in a monochrome black and white palette, soft atmospheric lighting and ethereal fog"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnMZPfNa-J_dIm-3WSAFqPEfM4HEebDDQu4rqp5qpONTAHeslp8Z2ORf946Hl05fQBDmYNS8KR8-goGTSaewTrvy8X9BIKhv4x_VFdzKdloYn5EZL_XzZR-rHJsPB_nBWHe188useL9glhif30f1pZghOiaxVA28ssnV1WQjZJsTBQxeHjIOVUIAEnvDgUmPyP0ux9t6tzibo_oKNzFHyfYpVccHNJd-NopTLQcDYR6tZDIk5mXpTD0xSfNVntGPquGdzaWVN-82Aw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight text-on-surface mb-8">
              From Overwhelm to Breakthrough
            </h1>
            <p className="text-xl md:text-2xl font-body text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
              A private sanctuary for university students. Experience
              institutional change through anonymous advocacy and intelligent
              support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/student"
                className="group px-10 py-4 bg-primary text-on-primary rounded-full font-body font-bold text-lg hover:shadow-2xl transition-all duration-500 active:scale-95"
              >
                Student Portal
              </Link>
              <Link
                href="/mentor"
                className="px-10 py-4 border-b border-primary text-primary hover:bg-surface-container-low transition-all duration-300 font-body font-bold text-lg active:scale-95"
              >
                Mentor Access
              </Link>
            </div>
          </div>
        </section>

        {/* Brief & High-Level Content Section */}
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-widest font-label font-bold text-outline">
                  The Philosophy
                </span>
                <h2 className="text-5xl font-serif text-on-surface leading-tight">
                  Institutional silence ends with structured dialogue.
                </h2>
              </div>
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
