import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Speech Practice Buddy",
  description: "Playful speech practice for young kids — parent-guided Phase 1 slice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
