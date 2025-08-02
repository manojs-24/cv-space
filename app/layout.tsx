import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CV-Space | Free AI-Powered CV & Resume Analyzer",
  description:
    "CV-Space is a free, secure AI-based resume analyzer that gives you professional summaries, suggestions, and ATS scores — all in seconds.",
  keywords: [
    "resume analyzer",
    "CV analysis",
    "AI resume checker",
    "ATS resume checker",
    "resume summary generator",
    "online resume analyzer",
    "free CV analysis",
    "AI resume tool",
  ],
  openGraph: {
    title: "CV-Space | Free AI Resume Analyzer",
    description:
      "Upload your CV or resume and instantly get a professional summary, improvement tips, and ATS score — powered by AI.",
    url: "https://cv-space.vercel.app",
    siteName: "CV-Space",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "cbjarPwQwmJzfCVzjLVGtMwNIvTr7yJnAZdK1qQQTUg", // replace with your own Google Search Console code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="cbjarPwQwmJzfCVzjLVGtMwNIvTr7yJnAZdK1qQQTUg"
          />
          <title>Clip-S | Free Online Clipboard - Secure & Encrypted</title>
        </Head>
        <body className={`${poppins.className} antialiased `}>
          <main className="min-h-screen w-full">{children}</main>

          <NextTopLoader color="#7f22fe" showSpinner={false} />

          <Toaster
            richColors
            visibleToasts={3}
            position="top-center"
            style={{ top: "80px" }}
          />
          <Analytics />
        </body>
      </html>
  );
}
