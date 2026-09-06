import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Camera, Mic, MapPin, Database, Mail } from 'lucide-react';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

export const metadata = {
  title: 'Privacy Policy — StaySetu Smart Society App',
  description: 'Official privacy policy and data security practices for StaySetu smart gated community platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to StaySetu</span>
          </Link>
          <StaySetuLogo size="sm" showText={true} />
        </div>

        {/* Title Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Google Play Data Safety &amp; Compliance Verified</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Effective Date: September 2026 • Last Updated: 06 September 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              1. Overview &amp; Commitment
            </h2>
            <p>
              StaySetu Technologies (&quot;StaySetu&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the StaySetu Smart Gated Community Operating System. We are committed to protecting the privacy, security, and confidentiality of our residents, security guards, domestic staff, and RWA management committee members.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              2. Information We Collect &amp; Device Permissions
            </h2>
            <p>
              To provide gated society security and resident services, StaySetu may request the following device permissions:
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-rose-600" />
                  Camera &amp; Photos:
                </span>
                <p className="text-xs text-slate-600">
                  Used exclusively when a resident takes a photo proof of an unauthorized vehicle parked in their reserved parking slot, or when security guards scan QR passes. Photos are encrypted and never shared with third parties.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-sky-600" />
                  Microphone / Voice:
                </span>
                <p className="text-xs text-slate-600">
                  Used strictly when a resident activates the &quot;Hands-Free Voice Gate Pass&quot; feature to speak approval commands for delivery riders or cabs waiting at the gate desk.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Campus Geofence:
                </span>
                <p className="text-xs text-slate-600">
                  Used for verified society check-in and domestic helper attendance logs inside the gated campus perimeter.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              3. Data Security &amp; Encryption
            </h2>
            <p>
              All communication between your device and StaySetu servers is protected using 256-bit TLS encryption. Gate pass QR codes are dynamically generated and expire automatically after clearance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              4. Zero Data Selling
            </h2>
            <p>
              We do not sell, rent, or trade your personal information, phone number, vehicle registration data, or visitor history to advertising brokers or marketing agencies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              5. Contact &amp; Data Deletion Requests
            </h2>
            <p>
              Residents can request permanent deletion of their society flat records by writing to our Data Protection Officer:
            </p>
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1 text-xs font-mono">
              <p className="font-bold text-emerald-400">StaySetu Technologies</p>
              <p>Attn: Sudhanshu Pandey (Founder &amp; CEO)</p>
              <p className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Email: founder@staysetu.com / staysetu26@gmail.com</span>
              </p>
              <p>Gurugram, Haryana, India</p>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400 py-4">
          © 2026 StaySetu Technologies. All rights reserved.
        </div>

      </div>
    </div>
  );
}
