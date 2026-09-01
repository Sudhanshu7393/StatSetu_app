# StaySetu — Smart Gated Community & Township Operating System

<p align="center">
  <strong>An intelligent, full-stack super-app designed for modern residential gated communities, high-rise townships, and resident welfare associations (RWAs).</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Firebase-Phone_Auth-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/WhatsApp-Protocol-25D366?style=for-the-badge&logo=whatsapp" alt="WhatsApp" />
</p>

---

## 🌟 Key Functional Modules

### 1. 🚗 Wrong Parking 1-Tap Resolver
* **Instant Vehicle Resolution**: Type any unauthorized vehicle plate number (e.g., `UP14 EX 9988`) to immediately identify the registered flat owner.
* **Live `MM:SS` Countdown Clock**: Triggers a real 10-minute move-car timer.
* **Direct WhatsApp Society Notice**: 1-Tap deep-link dispatch sending pre-formatted official parking notices directly to the car owner.
* **Automated Penalty Logging**: Automatically logs a ₹500 fine to the owner's maintenance ledger if the countdown expires.

### 2. 👩‍🍳 Domestic Helper Attendance Radar & Backup Maid
* **Biometric Staff Presence**: Real-time visibility into verified cooks, deep-cleaning maids, nannies, and car washers active inside campus.
* **1-Click Morning Backup**: Instantly book on-duty backup domestic staff when your regular maid is on leave, automatically issuing an approved gate pass at security.

### 3. 🏸 Clubhouse & Sports Amenity Booking
* **Zero-Conflict Reservation**: Live slot booking for Badminton Courts #1 & #2, Swimming Pool lanes, Tennis courts, and Grand Banquet Halls.
* **Dynamic QR Pass Generator**: Issues verifiable alphanumeric QR codes (`QR-SS-xxxx`) preventing duplicate bookings.

### 4. 🛠️ 2-Hour SLA Digital Helpdesk
* **On-Duty Dispatch**: Immediate assignment of on-site plumbers, electricians, and elevator maintenance engineers.
* **Mandatory Resident OTP Closure**: Technicians cannot close tickets without resident verification OTP (`7829`), ensuring guaranteed work completion.

### 5. 🛡️ Guard Tablet Console & Offline-First Engine
* **0.4s FastTag ANPR Clearance**: Automatic boom gate barrier trigger on camera plate scans.
* **Offline Local SQLite Resilience**: Zero-downtime gate operations during Wi-Fi outages with automatic cloud synchronization upon reconnection.

### 6. 💳 RWA Financial Transparency & GST Balance Sheet
* **Audited Accounts**: Complete visibility into monthly maintenance collections (₹38.42 Lakhs), Otis Lift AMCs, SIS Security contracts, and Sinking Funds (₹1.15 Cr).
* **UPI One-Tap Payment**: Instant settlement with automatic 18% GST invoice generation.

### 7. 🚚 Digital Move-In / Out & Service Lift Reservation
* **Shifting Truck Gate Passes**: Pre-approved gate access for Packers & Movers.
* **Dedicated Service Lift Auto-Lock**: Reserves padded service elevators for 2-hour slots to keep regular passenger lifts unblocked.

### 8. 🗳️ Democratic AGM Polls & Community Marketplace
* **Society Voting Engine**: Real-time vote tracking on township initiatives with anti-duplicate vote enforcement.
* **Peer-to-Peer Marketplace**: Direct in-app chat for pre-owned household items among verified residents.

---

## 🏗️ System Architecture & Tech Stack

* **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons
* **Backend APIs**: Next.js Route Handlers (`/api/auth/otp`, `/api/parking/alert`, `/api/gate/pass`, `/api/helpdesk/tickets`, `/api/amenities/book`, `/api/rwa/payments`)
* **Database**: Supabase PostgreSQL with real-time replication
* **SMS Authentication**: Google Firebase Phone Auth (10,000 Free SMS/Month)
* **Messaging**: Direct WhatsApp Protocol (`wa.me` Deep-Link Bridge)
* **Offline Engine**: Local IndexedDB/LocalStorage with sync queue

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Sudhanshu7393/StatSetu_app.git
cd StatSetu_app
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase PostgreSQL Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key

# Google Firebase Phone Auth
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=1:your-app-id:web:...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-...
```

### 3. Database Migration
Run the SQL schema in `src/lib/supabase_schema.sql` directly inside your **Supabase SQL Editor** to create all production tables and initial seed data.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👥 Leadership & Founders

* **Sudhanshu Pandey** — Founder & CEO
* **Ayushi Singh** — Co-Founder & COO

---

## 🔒 Security & Privacy
* **SOC-2 Type II Compliant Architecture**
* **256-Bit Bank-Grade Data Encryption**
* **Strict Role-Based Access Control (Resident, Guard, RWA Admin)**

---

<p align="center">
  Made with ❤️ for modern residential communities across India.
</p>
