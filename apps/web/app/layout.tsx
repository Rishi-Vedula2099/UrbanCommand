import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: "UrbanCommand AI — Smart City Operations Center",
  description:
    "AI-powered city infrastructure command center for real-time fleet tracking, incident management, and predictive analytics.",
  keywords: [
    "smart city",
    "fleet tracking",
    "incident management",
    "AI",
    "urban command",
  ],
  openGraph: {
    title: "UrbanCommand AI",
    description: "Smart City Operations Center",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden bg-city-bg text-slate-200 antialiased">
        {/* Grid background overlay */}
        <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
        {/* Ambient gradient blobs */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-city-cyan/5 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-city-indigo/5 rounded-full blur-3xl pointer-events-none z-0" />
        {/* Layout */}
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 relative z-10">
          <TopBar />
          <main className="flex-1 overflow-auto p-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
