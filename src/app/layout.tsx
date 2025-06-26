import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secure HTML Embed Generator",
  description:
    "Generate production-ready secure embeds for Next.js CMS with complete XSS protection",
  keywords:
    "HTML embed, secure iframe, XSS protection, Next.js, CMS, responsive iframe",
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
