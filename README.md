# StaySetu — Smart Gated Community & Society Super-App

<p align="center">
  <strong>The intelligent, all-in-one operating system for modern residential gated communities, high-rise townships, and Resident Welfare Associations (RWAs).</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Razorpay-UPI_Gateway-0C2340?style=for-the-badge&logo=razorpay" alt="Razorpay" />
  <img src="https://img.shields.io/badge/Google_Play-TWA_Ready-34A853?style=for-the-badge&logo=google-play" alt="Google Play" />
</p>

---

## 🏛️ Codebase Architecture & Directory Structure

This project follows the official **Next.js 15 App Router** architecture with strict TypeScript types and modular separation of concerns:

```
StaySetu/
├── src/
│   ├── app/                               # Next.js 15 App Router Routes
│   │   ├── page.tsx                       # Main Mobile Super-App Dashboard (Resident, Guard, RWA)
│   │   ├── layout.tsx                     # Root Layout, Metadata, Fonts & PWA Service Worker
│   │   ├── globals.css                    # Tailwind Directives & Custom UI Components
│   │   ├── manifest.ts                    # Google PWA / Play Store Manifest Metadata
│   │   ├── privacy/page.tsx               # Google Play Compliant Privacy Policy
│   │   ├── auth/login/page.tsx            # Resident, Guard & RWA Multi-Role Authentication
│   │   ├── auth/signup/page.tsx           # Flat & Society Onboarding Registration
│   │   └── api/                           # Backend Serverless REST Endpoints
│   │       ├── payments/create-order/     # Razorpay / UPI Order Creation API
│   │       ├── payments/verify/           # Cryptographic Payment Signature Verification & GST
│   │       ├── gate/pass/                 # Visitor, Cab & Delivery QR Pass API
│   │       ├── helpdesk/tickets/          # 2-Hour SLA Helpdesk Dispatch & OTP Verification
│   │       ├── parking/alert/             # Wrong Parking Camera & WhatsApp Dispatch API
│   │       └── amenities/book/            # Clubhouse Slot Booking & Conflict Resolution
│   │
│   ├── components/                        # Reusable, Self-Contained UI Components
│   │   ├── brand/StaySetuLogo.tsx         # Single Source of Truth for Official Brand Logo
│   │   ├── payments/PaymentCheckoutModal.tsx # Razorpay & Multi-UPI Checkout Modal (GPay, PhonePe, Paytm, Cards)
│   │   ├── chat/InAppChatModal.tsx        # Resident Peer-to-Peer Marketplace Chat
│   │   └── layout/                        # Navbar, Footer & Mobile Bottom Navigation
│   │
│   └── lib/                               # Core Business Logic & State Management
│       └── societyStore.ts                # Centralized Store (Notices, Helpers, Parking, Ledger, Passes)
│
├── prisma/
│   └── schema.prisma                      # Database Schema Models (PostgreSQL / SQLite)
│
├── playstore/                             # Google Play Store Publishing Bundle & Guide
│   ├── PLAYSTORE_LAUNCH_GUIDE.md          # Step-by-Step Play Store Submission Guide
│   └── twa-manifest.json                  # Trusted Web Activity Configuration
│
├── public/                                # Static Public Assets & PWA Engine
│   ├── icons/                             # 512x512, 192x192, Maskable & Apple Touch Icons
│   ├── screenshots/                       # High-Res Mobile (1080x1920) & Desktop (1920x1080) Screens
│   ├── images/                            # Township Landscape & Founder Photography
│   ├── sw.js                              # PWA Offline Caching Service Worker
│   └── .well-known/assetlinks.json        # Google Digital Asset Links for Native Full-Screen
│
└── package.json                           # Dependencies & Scripts
```

---

## 🌟 Core Features & Modules

1. **🚗 Wrong Parking 1-Tap Camera Resolver**:
   - Snap photo proof of unauthorized cars blocking private slots.
   - 10-Minute live grace timer + automatic WhatsApp alert to vehicle owner.

2. **👩‍🍳 Domestic Staff Biometric Radar & Backup Maid**:
   - Real-time inside/outside campus presence of cooks, maids, and drivers.
   - 1-Click morning backup maid assignment issued directly at the security gate.

3. **💳 Payment Gateway (Razorpay & Direct UPI)**:
   - 1-Click UPI (Google Pay, PhonePe, Paytm, CRED), Cards, and NetBanking.
   - Automatic 18% GST calculation (CGST 9% + SGST 9%) and instant downloadable PDF/HTML tax receipts.
   - Prepaid Smart Electricity Meter UPI fast recharge.

4. **🛡️ Security Guard Terminal & ANPR Gate Clearance**:
   - Fast pass verification (DEL-8841, GST-9281) with 1-click boom barrier clearance.
   - Package Vault desk handover & Domestic staff punch IN/OUT.

5. **🏛️ RWA Financial Ledger & Democratic AGM Polls**:
   - Real-time audited sinking fund statement (₹1.15 Cr) and monthly dues tracking.
   - Electronic AGM ballot voting with anti-duplicate vote prevention.

6. **🔧 2-Hour SLA Maintenance Helpdesk**:
   - On-duty technician dispatch with mandatory Resident OTP (`7829`) closing mechanism.

---

## 🚀 How to Run & Develop

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Razorpay Payment Gateway (Optional for live payments; smart sandbox active by default)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build Verification
```bash
npm run build
```

---

## 📱 Google Play Store & PWA
- **Package ID:** `app.vercel.stat_setu_app.twa` / `com.staysetu.app`
- **PWA Score:** 100% Green on PWABuilder (0 Errors, 0 Warnings).
- **Offline Mode:** Powered by `public/sw.js`.
- **Packaging Guide:** Detailed instructions in [`playstore/PLAYSTORE_LAUNCH_GUIDE.md`](playstore/PLAYSTORE_LAUNCH_GUIDE.md).

---

## 👥 Leadership
* **Sudhanshu Pandey** — Founder & CEO (`founder@staysetu.com`)

---

<p align="center">
  Made with ❤️ for smart gated communities across India.
</p>
