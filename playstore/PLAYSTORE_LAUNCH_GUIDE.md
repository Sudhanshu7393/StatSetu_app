# 🚀 StaySetu — Google Play Store Launch Guide

Official guide to package and publish **StaySetu** (`com.staysetu.app`) to the **Google Play Store**.

---

## 📦 What Has Been Prepared & Configured:
1. ✅ **High-Res Android Icons**:
   - `public/icons/icon-512x512.png` (Google Play 512x512 High-Res icon)
   - `public/icons/icon-192x192.png` (Homescreen launcher icon)
   - `public/icons/icon-maskable.png` (Adaptive maskable icon for Android 13+)
   - `public/icons/apple-touch-icon.png` (iOS Homescreen icon)
2. ✅ **PWA Manifest (`src/app/manifest.ts`)**:
   - `display: standalone`, `orientation: portrait`, `theme_color: #0F172A`, `id: com.staysetu.app`.
3. ✅ **Live Privacy Policy (`/privacy`)**:
   - URL: `https://stat-setu-app.vercel.app/privacy`
   - Covers Camera, Voice, Geofence permissions and Data Safety.
4. ✅ **Digital Asset Links (`public/.well-known/assetlinks.json`)**:
   - For seamless full-screen app execution without browser URL bars.

---

## 🛠️ Step 1: Generate the Android App Bundle (`.aab`)

### Method A (Instant Online via PWABuilder - Recommended & Easiest):
1. Open [https://www.pwabuilder.com](https://www.pwabuilder.com) in your browser.
2. Enter your live URL: `https://stat-setu-app.vercel.app` and click **Start**.
3. It will verify your PWA score (100% Green).
4. Click **Package for Stores** → Select **Android (Google Play)**.
5. Enter:
   - **Package ID:** `com.staysetu.app`
   - **App Name:** `StaySetu`
   - **Version:** `1.0.0`
6. Click **Generate Android App Bundle (`.aab`)** and download your signed `.zip` package.

---

### Method B (Via Bubblewrap CLI on Command Line):
```bash
npx @bubblewrap/cli build
```

---

## 📱 Step 2: Upload to Google Play Console

1. Login to [Google Play Console](https://play.google.com/console).
2. Click **Create App**:
   - **App Name:** `StaySetu — Smart Gated Society Super-App`
   - **Default Language:** `English (India)`
   - **App or Game:** `App`
   - **Free or Paid:** `Free`
3. Fill in **Store Listing**:
   - **Short Description:** Smart gated community app for gate passes, parking, helper attendance & society dues.
   - **Full Description:** The complete operating system for modern residential societies. Features include 1-tap delivery & cab passes, wrong parking photo alert, helper biometric radar, smart meter recharge, and 2-hour SLA maintenance helpdesk.
   - **App Icon:** Upload `public/icons/icon-512x512.png`
   - **Feature Graphic:** 1024x500 banner (`/images/society-hero.jpg`)
   - **Privacy Policy URL:** `https://stat-setu-app.vercel.app/privacy`
4. Under **Production Track** → Click **Create New Release** → Drag & drop the downloaded `app-release-bundle.aab`.
5. Click **Review & Rollout to Production**.

Google review typically completes within **24 to 48 hours**, after which StaySetu will be live on Google Play Store!
