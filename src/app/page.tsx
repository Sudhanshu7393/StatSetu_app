'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Building2,
  ShieldCheck,
  CreditCard,
  QrCode,
  Users,
  CheckCircle2,
  Car,
  ShieldAlert,
  Zap,
  Vote,
  ShoppingBag,
  Mic,
  UserPlus,
  PackageCheck,
  Clock,
  MessageCircle,
  FileSpreadsheet,
  ArrowRight,
  Search,
  Truck,
  AlertTriangle,
  FileText,
  X,
  Smartphone,
  Shield,
  Download,
  Check,
  Radio,
  Wrench,
  CalendarDays,
  Bell,
  Phone,
  Paperclip,
  Database,
  Sparkle,
  MapPin,
  Loader2,
  Camera,
  Layers,
  Home,
  User,
  LogOut,
  ChevronRight,
  Flame,
  KeyRound,
  Bike,
  Compass,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { InAppChatModal } from '@/components/chat/InAppChatModal';
import { SocietyStore, HelperStaff, AmenityBooking, HelpdeskTicket, ParkingAlert, GateLog, AGMPoll } from '@/lib/societyStore';

type AppTab = 'HOME' | 'GATE' | 'PAYMENTS' | 'BAZAAR' | 'MY_FLAT';

export default function NoBrokerHoodStaySetuMobileApp() {
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // ── PURE MOBILE APP BOTTOM NAVIGATION STATE ──
  const [activeTab, setActiveTab] = useState<AppTab>('HOME');

  // ── CURRENT LOGGED IN USER STATE ──
  const [currentUser, setCurrentUser] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    flat?: string;
    society?: string;
  } | null>(null);

  // ── MANDATORY AUTHENTICATION GATE ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const userRaw = localStorage.getItem('staysetu-current-user');
    const roleRaw = localStorage.getItem('staysetu-role');
    if (!userRaw && !roleRaw) {
      router.replace('/auth/login');
    } else {
      if (userRaw) {
        try {
          setCurrentUser(JSON.parse(userRaw));
        } catch {
          // ignore
        }
      }
      setIsAuthChecking(false);
    }
  }, [router]);

  // ── DUAL TERMINAL SWITCHER (RESIDENT VS GUARD) ──
  const [activePortalMode, setActivePortalMode] = useState<'RESIDENT' | 'GUARD'>('RESIDENT');

  // ── PERSISTENT STORE STATE ──
  const [isNetworkOnline, setIsNetworkOnline] = useState(true);
  const [guardLogs, setGuardLogs] = useState<GateLog[]>([]);
  const [helpers, setHelpers] = useState<HelperStaff[]>([]);
  const [amenityBookings, setAmenityBookings] = useState<AmenityBooking[]>([]);
  const [helpdeskTickets, setHelpdeskTickets] = useState<HelpdeskTicket[]>([]);
  const [parkingAlerts, setParkingAlerts] = useState<ParkingAlert[]>([]);
  const [forumPoll, setForumPoll] = useState<AGMPoll>({
    id: 'poll-1',
    title: 'AGM 2026: Should we install 15 EV Fast-Charging Stations in Basement Parking B1 & B2?',
    yesVotes: 342,
    noVotes: 48,
    userVoted: null,
  });
  const [meterBalance, setMeterBalance] = useState(1450);
  const [maintenancePaid, setMaintenancePaid] = useState(false);

  // Sync notification toast
  const [syncNotification, setSyncNotification] = useState<string | null>(null);

  // ── 1. WRONG PARKING RESOLVER WITH LIVE CAMERA PHOTO ──
  const [parkingCarNo, setParkingCarNo] = useState('UP14 EX 9988');
  const [parkingSlot, setParkingSlot] = useState('Basement B1 - Slot #42');
  const [parkingPhoto, setParkingPhoto] = useState<string | null>(null);
  const [parkingAlertSent, setParkingAlertSent] = useState(false);
  const [activeParkingAlert, setActiveParkingAlert] = useState<ParkingAlert | null>(null);
  const [parkingSecondsLeft, setParkingSecondsLeft] = useState(600); // 10 minutes = 600s

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setParkingPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ── QUICK PRE-APPROVAL MODALS (NOBROKERHOOD / MYGATE STYLE) ──
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [deliveryPartner, setDeliveryPartner] = useState('Swiggy');
  const [leaveAtGate, setLeaveAtGate] = useState(false);

  const [cabModalOpen, setCabModalOpen] = useState(false);
  const [cabPartner, setCabPartner] = useState('Uber');
  const [cabPlate, setCabPlate] = useState('DL 1Y 4421');

  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [generatedGuestPass, setGeneratedGuestPass] = useState<string | null>(null);

  // ── 2. HELPER RADAR & BACKUP MAID ──
  const [maidModalOpen, setMaidModalOpen] = useState(false);
  const [bookedMaid, setBookedMaid] = useState<string | null>(null);

  // ── 3. RWA FINANCIAL TRANSPARENCY ──
  const [ledgerModalOpen, setLedgerModalOpen] = useState(false);

  // ── 4. DIGITAL MOVE-IN / OUT & SERVICE LIFT ──
  const [movingPassModalOpen, setMovingPassModalOpen] = useState(false);
  const [movingDate, setMovingDate] = useState('05 Sep 2026');
  const [movingSlot, setMovingSlot] = useState('10:00 AM - 12:00 PM');
  const [generatedMovingPass, setGeneratedMovingPass] = useState<string | null>(null);

  // ── 5. CLUBHOUSE & AMENITY BOOKING ──
  const [amenityModalOpen, setAmenityModalOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState('Badminton Court #2');
  const [amenitySlot, setAmenitySlot] = useState('06:00 PM - 07:00 PM');

  // ── 6. HELPDESK & 2-HOUR SLA TICKET ──
  const [helpdeskModalOpen, setHelpdeskModalOpen] = useState(false);
  const [helpdeskCategory, setHelpdeskCategory] = useState('Plumbing & Water Seepage');
  const [helpdeskDescription, setHelpdeskDescription] = useState('');
  const [otpVerifyInput, setOtpVerifyInput] = useState('');

  // ── 7. NOTICE BOARD & CIRCULARS ──
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);

  // Guard Terminal State
  const [guardBoomStatus, setGuardBoomStatus] = useState<'CLOSED' | 'OPEN'>('CLOSED');

  // Simulation States
  const [isRecording, setIsRecording] = useState(false);
  const [voiceApproved, setVoiceApproved] = useState(false);
  const [sosActiveAlert, setSosActiveAlert] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const [selectedSeller, setSelectedSeller] = useState({
    name: 'Solid Sheesham Wood Dining Table',
    price: '₹9,500',
    ownerName: 'Tower B - Flat 402 (Ankit)',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  });

  // Load from persistent store & subscribe to updates
  const reloadFromStore = () => {
    setGuardLogs(SocietyStore.getGateLogs());
    setHelpers(SocietyStore.getHelpers());
    setAmenityBookings(SocietyStore.getAmenityBookings());
    setHelpdeskTickets(SocietyStore.getHelpdeskTickets());
    setParkingAlerts(SocietyStore.getParkingAlerts());
    const poll = SocietyStore.getPoll();
    if (poll) setForumPoll(poll);
  };

  useEffect(() => {
    reloadFromStore();
    window.addEventListener('staysetu-store-update', reloadFromStore);
    return () => window.removeEventListener('staysetu-store-update', reloadFromStore);
  }, []);

  // Handle wrong parking countdown
  useEffect(() => {
    if (!parkingAlertSent || parkingSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setParkingSecondsLeft(prev => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [parkingAlertSent, parkingSecondsLeft]);

  const handleSendParkingAlert = () => {
    const alertData = SocietyStore.createParkingAlert(parkingCarNo, parkingSlot);
    setActiveParkingAlert(alertData);
    setParkingAlertSent(true);
    setParkingSecondsLeft(600);
  };

  const handleVote = (voteType: 'YES' | 'NO') => {
    const updated = SocietyStore.votePoll(voteType);
    setForumPoll({ ...updated });
  };

  const handleVoiceRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setVoiceApproved(true);
      SocietyStore.addGateLog('VISITOR', '🎙️ Voice Gate Pass Approved (Flat A-102: "Allow Swiggy Rider")', 'Voice Verified', isNetworkOnline);
    }, 1800);
  };

  const handleGuardOpenBoom = () => {
    setGuardBoomStatus('OPEN');
    SocietyStore.addGateLog('FASTTAG', 'Manual Gate Clearance (Gate #1 - Main Society Entrance)', isNetworkOnline ? 'Cloud Synced' : 'Saved to Local DB', isNetworkOnline);
    setTimeout(() => setGuardBoomStatus('CLOSED'), 3500);
  };

  const handleBookMaid = (helper: HelperStaff) => {
    SocietyStore.bookBackupMaid(helper.id, currentUser?.flat || 'Tower A - Flat 102');
    setBookedMaid(helper.name);
    setMaidModalOpen(false);
    alert(`✅ Backup assigned: ${helper.name} booked for ${currentUser?.flat || 'Tower A-102'} at 09:00 AM! Gate Security notified.`);
  };

  const handleConfirmAmenity = () => {
    const booking = SocietyStore.bookAmenity(selectedAmenity, amenitySlot, currentUser?.flat || 'Tower A - Flat 102');
    setAmenityModalOpen(false);
    alert(`✅ Confirmed! ${booking.amenityName} reserved for ${booking.slot}. Dynamic Pass Code: ${booking.qrPassCode}`);
  };

  const handleRaiseTicket = () => {
    if (!helpdeskDescription.trim()) {
      alert('Please enter a brief description of the issue');
      return;
    }
    const ticket = SocietyStore.createHelpdeskTicket(helpdeskCategory, helpdeskDescription, currentUser?.flat || 'Tower A - Flat 102');
    setHelpdeskModalOpen(false);
    setHelpdeskDescription('');
    alert(`🎟️ Ticket #${ticket.id} Dispatched! Assigned to ${ticket.assignedTechnician} (Phone: ${ticket.technicianPhone}). OTP to close: ${ticket.otpToClose}`);
  };

  const handlePayMaintenance = () => {
    SocietyStore.payMaintenance('102');
    setMaintenancePaid(true);
    alert('💳 Payment of ₹3,540 Successful via UPI! Instant GST Receipt generated & Sinking Fund updated.');
  };

  const handlePreApproveDelivery = () => {
    SocietyStore.addGateLog(
      'DELIVERY',
      `🛵 Pre-Approved Delivery: ${deliveryPartner} for ${currentUser?.flat || 'Tower A - 102'} ${leaveAtGate ? '(Leave at Gate)' : ''}`,
      'Pre-Approved',
      isNetworkOnline
    );
    setDeliveryModalOpen(false);
    alert(`✅ ${deliveryPartner} delivery pre-approved! Security will grant direct touchless entry.`);
  };

  const handlePreApproveCab = () => {
    SocietyStore.addGateLog(
      'CAB',
      `🚖 Pre-Approved Cab: ${cabPartner} (${cabPlate}) for ${currentUser?.flat || 'Tower A - 102'}`,
      'Pre-Approved',
      isNetworkOnline
    );
    setCabModalOpen(false);
    alert(`✅ ${cabPartner} (${cabPlate}) pre-approved! Boom barrier will open automatically.`);
  };

  const handleCreateGuestPass = () => {
    if (!guestName.trim()) {
      alert('Please enter guest name');
      return;
    }
    const passCode = `GST-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedGuestPass(passCode);
    SocietyStore.addGateLog(
      'VISITOR',
      `🎫 Guest Pass #${passCode}: ${guestName} for ${currentUser?.flat || 'Tower A - 102'}`,
      'Pass Active',
      isNetworkOnline
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('staysetu-current-user');
    localStorage.removeItem('staysetu-role');
    router.push('/auth/login');
  };

  const totalVotes = forumPoll.yesVotes + forumPoll.noVotes;
  const yesPercentage = Math.round((forumPoll.yesVotes / (totalVotes || 1)) * 100);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F6] flex flex-col items-center justify-center space-y-4 font-sans antialiased">
        <div className="w-16 h-16 rounded-3xl bg-[#0F172A] text-[#38BDF8] flex items-center justify-center shadow-[0_12px_35px_rgba(15,23,42,0.25)] border border-slate-700 animate-pulse">
          <Building2 className="w-8 h-8 text-[#38BDF8]" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-xs font-bold text-[#0F172A] uppercase tracking-[0.25em]">
            StaySetu Super-App
          </p>
          <p className="text-[11px] text-[#64748B] flex items-center justify-center gap-1.5 font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
            <span>Loading Secure Flat Dashboard...</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] text-[#0F172A] font-sans antialiased pb-28 select-none">
      
      {/* ── 1. NATIVE MOBILE APP TOP BAR (FROSTED GLASS HEADER) ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Society & Flat Selector */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <Building2 className="w-4 h-4 text-[#2563EB]" />
              <span className="font-serif font-bold text-xs text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors">
                {currentUser?.society || 'Greenwood Grand Township'}
              </span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-[#2563EB]">
                {currentUser?.flat || 'Tower A - Flat 102'}
              </span>
              <span className="text-[9px] font-semibold text-[#64748B] uppercase">
                • {currentUser?.role || 'Resident'}
              </span>
            </div>
          </div>

          {/* Quick Action Badges (SOS + Bell + Terminal Switcher) */}
          <div className="flex items-center gap-2">
            
            {/* 🚨 Emergency SOS Button */}
            <button
              type="button"
              onClick={() => setSosModalOpen(true)}
              className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white px-2.5 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(225,29,72,0.3)] flex items-center gap-1 cursor-pointer transition-transform active:scale-90"
              title="Emergency SOS"
            >
              <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-wider">SOS</span>
            </button>

            {/* 🔔 Circulars & Notice Bell */}
            <button
              type="button"
              onClick={() => setNoticeModalOpen(true)}
              className="relative p-2 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-[#0F172A] cursor-pointer transition-colors border border-slate-200/60"
            >
              <Bell className="w-4 h-4 text-[#475569]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2563EB] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                2
              </span>
            </button>

            {/* Guard Terminal Switcher */}
            <button
              type="button"
              onClick={() => setActivePortalMode(activePortalMode === 'RESIDENT' ? 'GUARD' : 'RESIDENT')}
              className={`p-2 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                activePortalMode === 'GUARD'
                  ? 'bg-[#0F172A] text-[#38BDF8] border-slate-700 shadow-xs'
                  : 'bg-slate-100 text-[#475569] border-slate-200/60'
              }`}
              title="Switch Terminal View"
            >
              <Radio className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* ── EMERGENCY SOS ACTIVE BANNER ── */}
      {sosActiveAlert && (
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white py-3 px-4 shadow-xl sticky top-14 z-50 animate-pulse">
          <div className="max-w-md mx-auto flex items-center justify-between gap-2 text-xs font-black">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              <span>🚨 SOS ACTIVE: Flat A-102 (Gate Guard Terminal Alerted)</span>
            </div>
            <button
              onClick={() => setSosActiveAlert(false)}
              className="bg-white text-rose-700 px-2.5 py-1 rounded-lg text-[10px] uppercase font-black cursor-pointer shadow-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN MOBILE APP CONTENT CONTAINER ── */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">

        {/* ═══════════════════════════════════════════════════════════════
            TAB 1: 🏠 HOME (NOBROKERHOOD / MYGATE QUICK ACTION DASHBOARD)
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'HOME' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* 🌟 Luxury Midnight Gradient Resident Identity Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-5 text-white shadow-[0_15px_35px_rgba(15,23,42,0.18)] border border-slate-700/80">
              
              {/* Subtle ambient light gradient flare */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#2563EB]/25 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/10 text-[9px] font-bold tracking-wider text-[#38BDF8] uppercase">
                    <ShieldCheck className="w-3 h-3 text-[#38BDF8]" />
                    <span>Verified Resident</span>
                  </div>
                  <h2 className="font-serif font-bold text-lg text-white">
                    {currentUser?.name || 'Sudhanshu Pandey'}
                  </h2>
                  <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <span>🏡 {currentUser?.flat || 'Tower A - Flat 102'}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">3 BHK Penthouse</span>
                  </p>
                </div>

                <div className="text-right space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    MAINTENANCE
                  </span>
                  <span className={`inline-block text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs ${
                    maintenancePaid
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {maintenancePaid ? 'Paid ✓' : 'Due: ₹3,540'}
                  </span>
                  <button
                    onClick={() => setActiveTab('PAYMENTS')}
                    className="text-[11px] text-[#38BDF8] hover:text-white font-bold block transition-colors"
                  >
                    Pay Dues →
                  </button>
                </div>
              </div>
            </div>

            {/* ── 8 QUICK ACTION TILES GRID (COLORFUL NOBROKERHOOD STYLE) ── */}
            <div>
              <div className="flex items-center justify-between mb-2.5 px-1">
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  ⚡ Quick Passes &amp; Approvals
                </p>
                <span className="text-[10px] text-[#64748B] font-semibold">1-Tap Actions</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {[
                  {
                    id: 'delivery',
                    label: 'Delivery',
                    icon: '🛵',
                    sub: 'Swiggy/Amazon',
                    onClick: () => setDeliveryModalOpen(true),
                    badge: 'Instant',
                    gradient: 'from-orange-50 to-amber-50 border-orange-200/80 text-orange-950',
                    badgeColor: 'bg-orange-100 text-orange-700',
                  },
                  {
                    id: 'cab',
                    label: 'Allow Cab',
                    icon: '🚖',
                    sub: 'Uber/Ola',
                    onClick: () => setCabModalOpen(true),
                    badge: 'FastTag',
                    gradient: 'from-yellow-50 to-amber-50 border-yellow-200/80 text-amber-950',
                    badgeColor: 'bg-yellow-100 text-amber-800',
                  },
                  {
                    id: 'guest',
                    label: 'Invite Guest',
                    icon: '🎫',
                    sub: 'WhatsApp QR',
                    onClick: () => setGuestModalOpen(true),
                    badge: 'Pass',
                    gradient: 'from-emerald-50 to-teal-50 border-emerald-200/80 text-emerald-950',
                    badgeColor: 'bg-emerald-100 text-emerald-800',
                  },
                  {
                    id: 'maid',
                    label: 'Backup Maid',
                    icon: '🧹',
                    sub: 'Cook & Maid',
                    onClick: () => setMaidModalOpen(true),
                    badge: 'Live',
                    gradient: 'from-purple-50 to-fuchsia-50 border-purple-200/80 text-purple-950',
                    badgeColor: 'bg-purple-100 text-purple-800',
                  },
                  {
                    id: 'parking',
                    label: 'Wrong Parking',
                    icon: '🚗',
                    sub: 'Live Camera Alert',
                    onClick: () => {
                      setActiveTab('GATE');
                      setTimeout(() => {
                        document.getElementById('wrong-parking-card')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    },
                    badge: 'Photo',
                    gradient: 'from-rose-50 to-red-50 border-rose-200/80 text-rose-950',
                    badgeColor: 'bg-rose-100 text-rose-700',
                  },
                  {
                    id: 'helpdesk',
                    label: '2-Hr Helpdesk',
                    icon: '🔧',
                    sub: 'Plumber/Electrician',
                    onClick: () => setHelpdeskModalOpen(true),
                    badge: 'SLA',
                    gradient: 'from-cyan-50 to-sky-50 border-cyan-200/80 text-cyan-950',
                    badgeColor: 'bg-cyan-100 text-cyan-800',
                  },
                  {
                    id: 'amenity',
                    label: 'Clubhouse',
                    icon: '🏸',
                    sub: 'Court & Pool',
                    onClick: () => setAmenityModalOpen(true),
                    badge: 'Free',
                    gradient: 'from-indigo-50 to-blue-50 border-indigo-200/80 text-indigo-950',
                    badgeColor: 'bg-indigo-100 text-indigo-800',
                  },
                  {
                    id: 'moving',
                    label: 'Move-In Pass',
                    icon: '🚚',
                    sub: 'Service Lift',
                    onClick: () => setMovingPassModalOpen(true),
                    badge: 'Truck',
                    gradient: 'from-slate-50 to-gray-50 border-slate-200/80 text-slate-950',
                    badgeColor: 'bg-slate-200 text-slate-800',
                  },
                ].map(action => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={action.onClick}
                    className={`bg-gradient-to-b ${action.gradient} rounded-2xl p-2.5 border shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-between text-center space-y-1 cursor-pointer transition-transform active:scale-95 group relative min-h-[96px] hover:shadow-md`}
                  >
                    <span className="text-2xl pt-1 group-hover:scale-110 transition-transform">{action.icon}</span>
                    <span className="text-[10px] font-bold leading-tight block">
                      {action.label}
                    </span>
                    <span className={`text-[8px] font-black px-1.5 py-0.2 rounded-md ${action.badgeColor}`}>
                      {action.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Helper Biometric Attendance Radar Snippet */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-serif font-bold text-xs text-[#0F172A]">
                    Staff Active on Campus Today
                  </span>
                </div>
                <button
                  onClick={() => setMaidModalOpen(true)}
                  className="text-[10px] font-bold text-[#2563EB] hover:underline"
                >
                  Book Backup →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-0.5">
                  <p className="font-bold text-[#0F172A] text-[11px]">Sunita Devi (Cook)</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">🟢 Inside Tower A</p>
                </div>
                <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-0.5">
                  <p className="font-bold text-[#0F172A] text-[11px]">Ramesh Kumar (Cleaning)</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">🟢 Inside Tower D</p>
                </div>
              </div>
            </div>

            {/* Smart Meter Quick Topup */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase">PREPAID ELECTRICITY METER</span>
                <p className="font-serif font-bold text-sm text-[#0F172A]">Balance: ₹{meterBalance}</p>
                <p className="text-[9px] text-emerald-700 font-semibold">MTR-882190 (Tower A - 102)</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const updated = SocietyStore.rechargeSmartMeter(500);
                  setMeterBalance(updated);
                  alert('⚡ Smart Meter recharged with ₹500 via UPI!');
                }}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.25)] cursor-pointer transition-transform active:scale-95"
              >
                + Recharge ₹500
              </button>
            </div>

            {/* Recent Gate Activity Log Snippet */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#0F172A]">
                  🛡️ Live Gate Entry Feed
                </span>
                <button
                  onClick={() => setActiveTab('GATE')}
                  className="text-[10px] font-bold text-[#2563EB] hover:underline"
                >
                  View All Logs →
                </button>
              </div>

              <div className="space-y-1.5">
                {guardLogs.slice(0, 3).map(log => (
                  <div key={log.id} className="p-2.5 bg-slate-50/80 rounded-xl flex items-center justify-between text-[11px] border border-slate-200/60">
                    <span className="text-[#0F172A] font-semibold truncate max-w-[200px]">{log.detail}</span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 2: 🛡️ GATE & SECURITY (VOICE PASS, ANPR, WRONG PARKING)
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'GATE' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Voice Gate Pass Action */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-blue-50 text-[#2563EB]">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-sm text-[#0F172A]">Voice Gate Pass (Hands-Free)</span>
                </div>
                <span className="text-[9px] font-bold bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full">
                  AI Voice
                </span>
              </div>

              <p className="text-xs text-[#64748B]">
                Speak to approve any Swiggy, Zomato, or visitor waiting at the main gate:
              </p>

              <button
                type="button"
                onClick={handleVoiceRecord}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : voiceApproved
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
                }`}
              >
                <Mic className="w-4 h-4 text-[#38BDF8]" />
                <span>{isRecording ? 'Listening... Speak Now' : voiceApproved ? 'Voice Approved ✓ (Gate Notified)' : '🎙️ Hold to Speak Gate Pass'}</span>
              </button>
            </div>

            {/* 🚗 WRONG PARKING CARD WITH LIVE CAMERA PHOTO */}
            <div id="wrong-parking-card" className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-rose-50 text-rose-600">
                    <Car className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-sm text-[#0F172A]">Wrong Parking Photo Alert</span>
                </div>
                <span className="text-[9px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  Basement B1/B2
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Unauthorized Car Number</label>
                  <input
                    type="text"
                    value={parkingCarNo}
                    onChange={e => setParkingCarNo(e.target.value)}
                    placeholder="e.g. UP14 EX 9988"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Your Blocked Slot</label>
                  <input
                    type="text"
                    value={parkingSlot}
                    onChange={e => setParkingSlot(e.target.value)}
                    placeholder="e.g. Basement B1 - Slot #42"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>

                {/* Live Camera Photo Click Buttons */}
                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Vehicle Photo Proof</label>
                  {parkingPhoto ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-900">
                      <img src={parkingPhoto} alt="Proof" className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-between p-3 text-white">
                        <span className="text-[10px] font-bold bg-emerald-700 px-2 py-1 rounded">Photo Attached ✓</span>
                        <button
                          type="button"
                          onClick={() => setParkingPhoto(null)}
                          className="bg-rose-700 text-white text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <label className="p-3 bg-blue-50/60 hover:bg-blue-50 border-2 border-dashed border-[#2563EB] rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer text-[#2563EB] font-bold text-xs text-center transition-colors">
                        <Camera className="w-4 h-4 shrink-0" />
                        <span>📷 Click Camera</span>
                        <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                      <label className="p-3 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer text-slate-700 font-bold text-xs text-center transition-colors">
                        <Download className="w-4 h-4 shrink-0 text-slate-500" />
                        <span>🖼️ Gallery</span>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSendParkingAlert}
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4 text-[#38BDF8]" />
                  <span>Send Anonymous WhatsApp Alert {parkingPhoto ? '(With Photo)' : ''}</span>
                </button>

                {parkingAlertSent && (
                  <div className="p-3 bg-emerald-50 rounded-2xl text-xs text-emerald-900 space-y-2 border border-emerald-200">
                    <p className="font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Alert Sent to Flat 402! ⏱️ {formatTimer(parkingSecondsLeft)} Mins Left</span>
                    </p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=917393011350&text=${encodeURIComponent(
                        `🚨 *StaySetu Smart Society Notice*\n\nHello *Tower C - Flat 402*,\n\nYour vehicle *${parkingCarNo}* is parked in reserved slot *${parkingSlot}*.\n\n📷 Photo proof attached.\n\nPlease move within 10 mins.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                      <span>Send via WhatsApp →</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* FastTag & Guard Gate Logs */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#0F172A]">
                  🚗 ANPR FastTag Boom Barrier Control
                </span>
                <button
                  onClick={handleGuardOpenBoom}
                  className="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  {guardBoomStatus === 'OPEN' ? 'Boom Open ✓' : 'Test Open →'}
                </button>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {guardLogs.map(log => (
                  <div key={log.id} className="p-2.5 bg-slate-50/80 rounded-xl flex items-center justify-between text-xs border border-slate-200/60">
                    <span className="text-[#0F172A] font-medium truncate max-w-[220px]">{log.detail}</span>
                    <span className="text-[9px] font-bold text-[#64748B] shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 3: 💳 PAYMENTS & DUES (MAINTENANCE, GST BILLS, SINKING FUND)
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'PAYMENTS' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Maintenance Bill Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#64748B] uppercase">RWA MONTHLY DUES</span>
                  <h3 className="font-serif font-bold text-lg text-[#0F172A]">September Maintenance</h3>
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${maintenancePaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {maintenancePaid ? 'PAID ✓' : 'DUE'}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-[#64748B]">Flat Area (1,770 Sq Ft @ ₹2/Sq Ft):</span>
                  <span className="font-bold text-[#0F172A]">₹3,540</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-[#64748B]">Due Date:</span>
                  <span className="font-bold text-rose-700">10 Sep 2026</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#64748B] pt-1.5 border-t border-slate-200">
                  <span>GST (18% Included):</span>
                  <span>Invoice #GST-2026-9921</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayMaintenance}
                disabled={maintenancePaid}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold cursor-pointer shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                  maintenancePaid ? 'bg-emerald-700 text-white' : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>{maintenancePaid ? 'Maintenance Paid via UPI ✓' : 'Pay ₹3,540 via 1-Click UPI'}</span>
              </button>
            </div>

            {/* Sinking Fund & RWA Audited Ledger */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#0F172A]">
                  🏛️ RWA Audited Transparency Statement
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  100% Audited
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-[#64748B] block">SINKING FUND (HDFC)</span>
                  <span className="font-serif font-bold text-sm text-[#0F172A]">₹1.15 Crores</span>
                </div>
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-[#64748B] block">COLLECTION THIS MONTH</span>
                  <span className="font-serif font-bold text-sm text-emerald-700">₹38,42,000</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLedgerModalOpen(true)}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3 rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#38BDF8]" />
                <span>View Full Society Expense Ledger</span>
              </button>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 4: 🛍️ BAZAAR & FORUM (CLASSIFIEDS & AGM VOTING POLLS)
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'BAZAAR' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* AGM Voting Poll */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  🗳️ ACTIVE AGM BALLOT
                </span>
                <span className="text-xs font-bold text-[#64748B]">{totalVotes} Votes</span>
              </div>

              <h4 className="font-serif text-xs font-bold text-[#0F172A] leading-relaxed">
                {forumPoll.title}
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-emerald-700">👍 YES ({forumPoll.yesVotes} - {yesPercentage}%)</span>
                  <span className="text-rose-700">👎 NO ({forumPoll.noVotes} - {100 - yesPercentage}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                  <div className="bg-emerald-600 h-full" style={{ width: `${yesPercentage}%` }} />
                  <div className="bg-rose-600 h-full" style={{ width: `${100 - yesPercentage}%` }} />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleVote('YES')}
                  disabled={forumPoll.userVoted !== null}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${
                    forumPoll.userVoted === 'YES' ? 'bg-emerald-700 text-white' : 'bg-slate-50 text-[#0F172A] border border-slate-200'
                  }`}
                >
                  Vote YES
                </button>
                <button
                  type="button"
                  onClick={() => handleVote('NO')}
                  disabled={forumPoll.userVoted !== null}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${
                    forumPoll.userVoted === 'NO' ? 'bg-rose-700 text-white' : 'bg-slate-50 text-[#0F172A] border border-slate-200'
                  }`}
                >
                  Vote NO
                </button>
              </div>
            </div>

            {/* Resident Marketplace Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="font-serif font-bold text-xs text-[#0F172A]">
                  🛍️ Resident Marketplace (Buy &amp; Sell)
                </span>
                <span className="text-[10px] text-[#64748B]">Zero Brokerage</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    id: 'item-1',
                    title: 'Sheesham Dining Table',
                    price: '₹9,500',
                    seller: 'Flat B-402 (Ankit)',
                    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    id: 'item-2',
                    title: 'Hero Sprint 26T Cycle',
                    price: '₹3,200',
                    seller: 'Flat A-102 (Sudhanshu)',
                    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    id: 'item-3',
                    title: 'PowerMax Treadmill',
                    price: '₹18,500',
                    seller: 'Flat C-301 (Priya)',
                    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=80',
                  },
                  {
                    id: 'item-4',
                    title: 'Solid Oak Study Table',
                    price: '₹4,500',
                    seller: 'Flat D-801 (Rajesh)',
                    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80',
                  },
                ].map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2 flex flex-col justify-between">
                    <img src={item.image} alt={item.title} className="w-full h-24 object-cover rounded-xl" />
                    <div>
                      <h5 className="font-serif font-bold text-xs text-[#0F172A] truncate">{item.title}</h5>
                      <p className="font-bold text-xs text-[#2563EB]">{item.price}</p>
                      <p className="text-[9px] text-[#64748B] truncate">{item.seller}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSeller({
                          name: item.title,
                          price: item.price,
                          ownerName: item.seller,
                          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                        });
                        setChatModalOpen(true);
                      }}
                      className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-[10px] py-2 rounded-xl transition-colors"
                    >
                      Chat Seller
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 5: 👤 MY FLAT & SERVICES (FLAT DETAILS, HELPDESK, LOGOUT)
           ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'MY_FLAT' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Flat Profile Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white font-serif font-bold text-lg flex items-center justify-center shadow-xs">
                  {(currentUser?.name || 'S').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#0F172A]">{currentUser?.name || 'Sudhanshu Pandey'}</h3>
                  <p className="text-xs text-[#64748B]">{currentUser?.email || 'staysetu26@gmail.com'}</p>
                  <p className="text-xs font-bold text-[#2563EB]">🏡 {currentUser?.flat || 'Tower A - Flat 102'}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Registered Vehicle:</span>
                  <span className="font-bold text-[#0F172A]">UP14 EX 9988 (Honda City)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Reserved Slot:</span>
                  <span className="font-bold text-[#0F172A]">Basement B1 - Slot #42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Intercom Extension:</span>
                  <span className="font-bold text-[#2563EB]">#1102</span>
                </div>
              </div>
            </div>

            {/* Active 2-Hour Helpdesk Tickets */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#0F172A]">
                  🔧 2-Hour SLA Helpdesk Tickets
                </span>
                <button onClick={() => setHelpdeskModalOpen(true)} className="text-[10px] text-[#2563EB] font-bold">
                  + New Ticket
                </button>
              </div>

              {helpdeskTickets.length > 0 ? (
                <div className="space-y-2">
                  {helpdeskTickets.map(ticket => (
                    <div key={ticket.id} className="p-3 bg-slate-50/80 rounded-xl text-xs space-y-1 border border-slate-200/60">
                      <div className="flex justify-between font-bold text-[#0F172A]">
                        <span>#{ticket.id}: {ticket.category}</span>
                        <span className={ticket.status === 'RESOLVED' ? 'text-emerald-700' : 'text-[#2563EB]'}>
                          {ticket.status === 'RESOLVED' ? 'RESOLVED ✓' : `OTP: ${ticket.otpToClose}`}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#64748B]">Technician: {ticket.assignedTechnician} ({ticket.technicianPhone})</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#64748B]">No open maintenance tickets.</p>
              )}
            </div>

            {/* Founders & Leadership Info */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <span className="font-serif font-bold text-xs text-[#0F172A] block">
                🏢 StaySetu Leadership &amp; Support
              </span>
              <div className="space-y-2 text-xs text-[#475569]">
                <div className="flex items-center justify-between p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60">
                  <span>Sudhanshu Pandey (Founder &amp; CEO)</span>
                  <span className="text-[10px] font-bold text-[#2563EB]">Verified</span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-rose-50 hover:bg-rose-100/80 text-rose-700 border border-rose-200 font-bold text-xs py-3.5 rounded-2xl cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Sign Out of Flat Account</span>
            </button>

          </div>
        )}

      </main>

      {/* ── 2. NATIVE MOBILE APP FLOATING FROSTED GLASS BOTTOM BAR (FIXED 5 TABS) ── */}
      <nav className="fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_12px_40px_rgba(15,23,42,0.14)] rounded-3xl py-1.5 px-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'HOME', label: 'Home', icon: Home },
            { id: 'GATE', label: 'Gate', icon: Shield },
            { id: 'PAYMENTS', label: 'Pay Dues', icon: CreditCard },
            { id: 'BAZAAR', label: 'Bazaar', icon: ShoppingBag },
            { id: 'MY_FLAT', label: 'My Flat', icon: User },
          ].map(tabItem => {
            const IconComponent = tabItem.icon;
            const isActive = activeTab === tabItem.id;
            return (
              <button
                key={tabItem.id}
                type="button"
                onClick={() => setActiveTab(tabItem.id as AppTab)}
                className={`flex flex-col items-center justify-center py-1 rounded-2xl cursor-pointer transition-all ${
                  isActive ? 'text-[#2563EB] font-bold' : 'text-[#64748B] hover:text-[#0F172A] font-medium'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[#2563EB] text-white shadow-[0_4px_12px_rgba(37,99,235,0.35)]' : ''}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className={`text-[9px] tracking-tight mt-0.5 ${isActive ? 'font-black text-[#2563EB]' : 'font-medium'}`}>
                  {tabItem.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── 3. ALL NATIVE ACTION SHEET MODALS ── */}

      {/* 🚨 Emergency SOS Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-rose-200 w-full max-w-sm p-6 space-y-4 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-900">Trigger Society Emergency SOS?</h3>
            <p className="text-xs text-slate-600">
              This will instantly trigger loud alarms on the Main Gate Security Guard Terminal and send urgent alerts to all RWA committee members.
            </p>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSosActiveAlert(true);
                  setSosModalOpen(false);
                  SocietyStore.addGateLog('EMERGENCY', `🚨 SOS Triggered by Flat ${currentUser?.flat || 'A-102'}`, 'Gate Alerted', isNetworkOnline);
                }}
                className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md cursor-pointer"
              >
                YES, TRIGGER EMERGENCY ALARM
              </button>
              <button
                type="button"
                onClick={() => setSosModalOpen(false)}
                className="w-full bg-slate-100 text-slate-700 font-bold text-xs py-2.5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🛵 Pre-Approve Delivery Modal */}
      {deliveryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">🛵 Pre-Approve Delivery</h3>
              <button onClick={() => setDeliveryModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Delivery Partner</label>
                <select
                  value={deliveryPartner}
                  onChange={e => setDeliveryPartner(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option>Swiggy</option>
                  <option>Zomato</option>
                  <option>Amazon</option>
                  <option>Blinkit</option>
                  <option>Zepto</option>
                  <option>Flipkart</option>
                </select>
              </div>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={leaveAtGate}
                  onChange={e => setLeaveAtGate(e.target.checked)}
                  className="w-4 h-4 text-[#2563EB]"
                />
                <span className="font-semibold text-[11px] text-[#0F172A]">Leave parcel at Gate Security Desk</span>
              </label>

              <button
                type="button"
                onClick={handlePreApproveDelivery}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-xl shadow-md cursor-pointer"
              >
                Pre-Approve Entry Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚖 Pre-Approve Cab Modal */}
      {cabModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">🚖 Pre-Approve Cab</h3>
              <button onClick={() => setCabModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Cab Service</label>
                <select
                  value={cabPartner}
                  onChange={e => setCabPartner(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option>Uber</option>
                  <option>Ola</option>
                  <option>BluSmart</option>
                  <option>Rapido</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Cab Number Plate</label>
                <input
                  type="text"
                  value={cabPlate}
                  onChange={e => setCabPlate(e.target.value)}
                  placeholder="e.g. DL 1Y 4421"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <button
                type="button"
                onClick={handlePreApproveCab}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-xl shadow-md cursor-pointer"
              >
                Approve Cab Boom Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎫 Guest Invite Pass Modal */}
      {guestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">🎫 Invite Guest (WhatsApp QR)</h3>
              <button onClick={() => setGuestModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              {generatedGuestPass ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">PASS ACTIVE</span>
                  <p className="font-serif font-bold text-xl text-[#0F172A]">{generatedGuestPass}</p>
                  <p className="text-[11px] text-[#475569]">Guest: <strong>{guestName}</strong> for {currentUser?.flat || 'Flat A-102'}</p>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `🎫 *StaySetu Smart Society Guest Pass*\n\nHello *${guestName}*,\n\nYou are invited to *${currentUser?.society || 'Greenwood Grand Township'}* (*${currentUser?.flat || 'Tower A - 102'}*).\n\nShow this Pass Code at Security Gate: *${generatedGuestPass}*`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                    <span>Share Pass on WhatsApp →</span>
                  </a>
                </div>
              ) : (
                <>
                  <div>
                    <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Guest Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      placeholder="e.g. Vikas Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Guest Phone (Optional)</label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={e => setGuestPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateGuestPass}
                    className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-xl shadow-md cursor-pointer"
                  >
                    Generate Instant QR Pass
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🧹 Backup Maid Modal */}
      {maidModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">Request Backup Domestic Help</h3>
              <button onClick={() => setMaidModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[11px] text-[#64748B]">Staff currently active inside society campus:</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {helpers.map(helper => (
                <button
                  key={helper.id}
                  onClick={() => handleBookMaid(helper)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs font-bold flex items-center justify-between cursor-pointer hover:border-[#0F172A] transition-colors"
                >
                  <div>
                    <p className="text-[#0F172A]">{helper.name} ({helper.role})</p>
                    <p className="text-[10px] text-emerald-700">🟢 {helper.currentLocation} • {helper.rating} ★</p>
                  </div>
                  <span className="text-[#2563EB] text-[11px]">Book ₹{helper.ratePerDay}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔧 Helpdesk Ticket Modal */}
      {helpdeskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">Raise 2-Hour SLA Ticket</h3>
              <button onClick={() => setHelpdeskModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Issue Category</label>
                <select
                  value={helpdeskCategory}
                  onChange={e => setHelpdeskCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option>Plumbing &amp; Water Seepage</option>
                  <option>Electrical MCB / Power Backup</option>
                  <option>Elevator Jerk / Stuck Alert</option>
                  <option>Carpentry &amp; Door Lock</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={helpdeskDescription}
                  onChange={e => setHelpdeskDescription(e.target.value)}
                  placeholder="Describe your maintenance issue..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              </div>
              <button
                type="button"
                onClick={handleRaiseTicket}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-xl shadow-md cursor-pointer"
              >
                Dispatch Technician (2-Hr SLA)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🏸 Amenity Booking Modal */}
      {amenityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">Book Clubhouse Amenity</h3>
              <button onClick={() => setAmenityModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Amenity</label>
                <select
                  value={selectedAmenity}
                  onChange={e => setSelectedAmenity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option>Badminton Court #1</option>
                  <option>Badminton Court #2</option>
                  <option>Swimming Pool (Lane 1-3)</option>
                  <option>Clubhouse Grand Party Hall</option>
                  <option>Tennis Court</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Time Slot</label>
                <select
                  value={amenitySlot}
                  onChange={e => setAmenitySlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option>06:00 AM - 07:00 AM</option>
                  <option>07:00 AM - 08:00 AM</option>
                  <option>05:00 PM - 06:00 PM</option>
                  <option>06:00 PM - 07:00 PM</option>
                  <option>07:00 PM - 08:00 PM</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleConfirmAmenity}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-xl shadow-md cursor-pointer"
              >
                Confirm Slot Pass (Free)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚚 Move-In Service Lift Modal */}
      {movingPassModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">Shifting Truck &amp; Lift Pass</h3>
              <button onClick={() => setMovingPassModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Shifting Date</label>
                <input
                  type="text"
                  value={movingDate}
                  onChange={e => setMovingDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Dedicated 2-Hr Lift Slot</label>
                <select
                  value={movingSlot}
                  onChange={e => setMovingSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option>10:00 AM - 12:00 PM</option>
                  <option>02:00 PM - 04:00 PM</option>
                  <option>04:00 PM - 06:00 PM</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => {
                  setGeneratedMovingPass('MV-9921');
                  SocietyStore.addGateLog('SHIFTING', `🚚 Shifting Pass #MV-9921 for Flat ${currentUser?.flat || 'A-102'} (Service Lift Reserved)`, 'Pass Generated', isNetworkOnline);
                  setMovingPassModalOpen(false);
                  alert('🚚 Shifting Truck Pass #MV-9921 generated & Service Lift reserved!');
                }}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-xl shadow-md cursor-pointer"
              >
                Generate Shifting Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📢 Circulars & Notices Modal */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h3 className="font-serif font-bold text-base text-[#0F172A]">📢 Society Circulars</h3>
              <button onClick={() => setNoticeModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950">⚠️ DG Power Backup Testing</span>
                <p className="text-[11px] text-amber-900">Wednesday 11:00 AM - 11:30 AM across all high-rise towers.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-[#0F172A]">🏊 Swimming Pool Deep Cleaning</span>
                <p className="text-[11px] text-[#64748B]">Friday 06:00 AM - 12:00 PM. Reopens Saturday.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 💬 In-App Chat Modal */}
      {chatModalOpen && (
        <InAppChatModal
          isOpen={chatModalOpen}
          onClose={() => setChatModalOpen(false)}
          ownerName={selectedSeller.ownerName}
          ownerAvatar={selectedSeller.ownerAvatar}
          propertyName={`${selectedSeller.name} (${selectedSeller.price})`}
        />
      )}

    </div>
  );
}
