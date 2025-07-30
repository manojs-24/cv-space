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
  title: "CV-Space | Free Online CV & Resume Analyzer",
  description:
    "Clip-S is a free, secure, end-to-end encrypted online clipboard. Share and sync your data across devices instantly without signup.",
  keywords: [
    "online clipboard",
    "free clipboard",
    "secure clipboard",
    "encrypted clipboard",
    "share text online",
    "internet clipboard",
  ],
  openGraph: {
    title: "Clip-S | Free Online Clipboard",
    description:
      "Transfer text across devices instantly using Clip-S — no login needed.",
    url: "https://clip-s.vercel.app",
    siteName: "Clip-S",
    images: [
      {
        url: "https://clip-s.vercel.app/assets/clip-s.png",
        width: 1200,
        height: 630,
        alt: "Clip-S Preview",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "cbjarPwQwmJzfCVzjLVGtMwNIvTr7yJnAZdK1qQQTUg",
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
