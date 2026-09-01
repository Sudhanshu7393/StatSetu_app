import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SavedStaysProvider } from "@/context/SavedStaysContext";
import { CompareProvider } from "@/context/CompareContext";
import { FloatingCompareDock } from "@/components/compare/FloatingCompareDock";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1E1B4B",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staysetu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StaySetu — India's #1 Smart Gated Society Super-App",
    template: "%s | StaySetu",
  },
  description:
    "India's #1 Super-App for Smart Gated Society Management, Hands-Free Voice Gate Passes, Live Domestic Staff Biometric Radar, ANPR FastTag Gate Entry, EV Charging Hub, Prepaid Smart Meter Recharges, and RWA GST Ledgers.",
  keywords: [
    "StaySetu",
    "smart society app",
    "gated community management India",
    "voice gate pass",
    "maid attendance radar",
    "society maintenance payment",
    "prepaid smart meter recharge",
    "ANPR fasttag gate entry",
    "EV charging slot reservation society",
    "RWA GST ledger audit",
  ],
  authors: [
    { name: "Sudhanshu Pandey", url: "https://staysetu.com" },
    { name: "Ayushi Singh", url: "https://staysetu.com" },
  ],
  creator: "StaySetu Technologies",
  publisher: "StaySetu",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StaySetu — India's #1 Smart Gated Society Super-App",
    description:
      "Voice Gate Passes, Live Maid Attendance Radar, ANPR FastTag Entry, EV Charging Hub, and RWA Financial Ledgers.",
    url: siteUrl,
    siteName: "StaySetu",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "StaySetu — Smart Gated Societies & Rent Dream Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StaySetu — Smart Gated Societies & Rent Dream Homes",
    description:
      "India's #1 Super-App for Smart Gated Communities & Verified Rental Housing.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data (JSON-LD) for Google Rich Snippets
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StaySetu",
    url: siteUrl,
    logo: `${siteUrl}/images/founders/sudhanshu-pandey.jpg`,
    founders: [
      {
        "@type": "Person",
        name: "Sudhanshu Pandey",
        jobTitle: "Founder & CEO",
      },
      {
        "@type": "Person",
        name: "Ayushi Singh",
        jobTitle: "Co-Founder & COO",
      },
    ],
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StaySetu",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <SavedStaysProvider>
          <CompareProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileBottomNav />
            <FloatingCompareDock />
          </CompareProvider>
        </SavedStaysProvider>
      </body>
    </html>
  );
}
