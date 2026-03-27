import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Quiet Advocate",
  description: "University student mental-health support platform with triage and RAG support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light"
    >
      <body className="min-h-full flex flex-col text-on-surface selection:bg-primary selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
