"use client";

import { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/app/components/TopNav";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <TopNav />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-serif italic font-light leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              Get in touch.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-body">
              Have questions about The Quiet Advocate? We'd love to hear from
              you. Reach out and let's have a conversation.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-zinc-50 dark:bg-zinc-900 py-24 mb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {/* Contact Info */}
              <div className="space-y-12">
                <div>
                  <span className="text-xs uppercase tracking-widest font-label text-zinc-500 dark:text-zinc-500">
                    Contact Information
                  </span>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-zinc-900 dark:text-zinc-50 font-semibold">
                      Email
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      <a
                        href="mailto:hello@quietadvocate.com"
                        className="hover:underline"
                      >
                        hello@quietadvocate.com
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-zinc-900 dark:text-zinc-50 font-semibold">
                      Office
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      The Quiet Advocate
                      <br />
                      University District
                      <br />
                      Digital First, Always Available
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-zinc-900 dark:text-zinc-50 font-semibold">
                      Response Time
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      We typically respond within 24 hours during business
                      hours.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-lg font-serif text-zinc-900 dark:text-zinc-50 font-semibold mb-4">
                    For Students in Crisis
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    If you need immediate support, please reach out to your
                    university's counseling services or emergency hotline.
                  </p>
                  <a
                    href="/student"
                    className="inline-block px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-semibold hover:opacity-90 transition-opacity"
                  >
                    Access Student Portal
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white dark:bg-zinc-900 p-10 rounded-xl border border-zinc-100 dark:border-zinc-800 space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-50"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-50"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-50"
                    >
                      <option value="">Select a subject</option>
                      <option value="feedback">General Feedback</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-50 resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-lg">
                      <p className="text-green-800 dark:text-green-200 font-semibold">
                        ✓ Message sent successfully!
                      </p>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg">
                      <p className="text-red-800 dark:text-red-200 font-semibold">
                        ✗ Error sending message
                      </p>
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        Please try again.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic text-zinc-900 dark:text-zinc-50 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Can't find what you're looking for? Reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "How is my data kept private?",
                a: "All data is encrypted end-to-end using industry-standard protocols. We use zero-knowledge architecture where possible.",
              },
              {
                q: "Can I stay completely anonymous?",
                a: "Yes. You can submit concerns anonymously while our AI mediator processes and presents them to institutional decision-makers.",
              },
              {
                q: "How long does a case take?",
                a: "Average resolution time is 30-60 days, significantly faster than traditional grievance systems.",
              },
              {
                q: "Is this affiliated with my university?",
                a: "The Quiet Advocate is an independent platform. Partnerships with institutions are ongoing.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:shadow-lg dark:hover:shadow-black/30 transition-shadow"
              >
                <h3 className="text-lg font-serif text-zinc-900 dark:text-zinc-50 mb-3">
                  {item.q}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-body">
                  {item.a}
                </p>
              </div>
            ))}
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
