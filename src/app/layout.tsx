import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F172A",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stat-setu-app.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StaySetu — Smart Gated Community & Society Super-App",
    template: "%s | StaySetu",
  },
  description:
    "The intelligent operating system for smart gated communities and residential townships. Hands-free voice gate passes, live domestic helper biometric radar, ANPR FastTag gate entry, 2-hour SLA helpdesk, and auditable RWA GST ledgers.",
  keywords: [
    "StaySetu",
    "smart society app",
    "gated community management",
    "wrong parking resolver",
    "voice gate pass",
    "maid attendance radar",
    "society maintenance payment",
    "clubhouse amenity booking",
    "2-hour SLA helpdesk",
    "ANPR fasttag gate entry",
    "RWA GST ledger audit",
  ],
  authors: [
    { name: "Sudhanshu Pandey", url: "https://staysetu.com" },
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
    title: "StaySetu — Smart Gated Community & Society Super-App",
    description:
      "Voice Gate Passes, Live Maid Attendance Radar, Wrong Parking Resolver, 2-Hour SLA Helpdesk, and Auditable RWA Financial Ledgers.",
    url: siteUrl,
    siteName: "StaySetu",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/society-hero.jpg",
        width: 1200,
        height: 630,
        alt: "StaySetu — Smart Gated Society Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StaySetu — Smart Gated Community & Society Super-App",
    description:
      "Voice Gate Passes, Live Maid Attendance Radar, Wrong Parking Resolver, 2-Hour SLA Helpdesk, and Auditable RWA Financial Ledgers.",
    images: ["/images/society-hero.jpg"],
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
    ],
    sameAs: [],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StaySetu",
    operatingSystem: "Web, iOS, Android",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description:
      "Operating system for smart gated communities, residential townships, wrong parking resolution, helper radar, and RWA governance.",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#EEF2F6] text-slate-900 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
