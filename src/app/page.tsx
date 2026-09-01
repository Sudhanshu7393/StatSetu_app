'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Cpu,
  Mic,
  UserPlus,
  PackageCheck,
  Clock,
  PhoneCall,
  DollarSign,
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
  Printer,
  Sparkles,
  Check,
  Radio,
  Wrench,
  CalendarDays,
  BellRing,
  Phone,
  Paperclip,
  Flame,
  Award,
  Wifi,
  WifiOff,
  RefreshCw,
  Database,
  Sparkle,
  MapPin,
} from 'lucide-react';
import { InAppChatModal } from '@/components/chat/InAppChatModal';
import { SocietyStore, HelperStaff, AmenityBooking, HelpdeskTicket, ParkingAlert, GateLog, AGMPoll } from '@/lib/societyStore';

export default function CompleteEcosystemStaySetuPortal() {
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

  // ── 1. SPOTLIGHT: WRONG PARKING RESOLVER (OPTION 2) ──
  const [parkingCarNo, setParkingCarNo] = useState('UP14 EX 9988');
  const [parkingSlot, setParkingSlot] = useState('Basement B1 - Slot #42');
  const [parkingAlertSent, setParkingAlertSent] = useState(false);
  const [activeParkingAlert, setActiveParkingAlert] = useState<ParkingAlert | null>(null);
  const [parkingSecondsLeft, setParkingSecondsLeft] = useState(600); // 10 minutes = 600s

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ── 2. HELPER RADAR & BACKUP MAID (OPTION 1) ──
  const [maidModalOpen, setMaidModalOpen] = useState(false);
  const [bookedMaid, setBookedMaid] = useState<string | null>(null);

  // ── 3. RWA FINANCIAL TRANSPARENCY (OPTION 6) ──
  const [ledgerModalOpen, setLedgerModalOpen] = useState(false);

  // ── 4. DIGITAL MOVE-IN / OUT & SERVICE LIFT (OPTION 7) ──
  const [movingPassModalOpen, setMovingPassModalOpen] = useState(false);
  const [movingDate, setMovingDate] = useState('05 Sep 2026');
  const [movingSlot, setMovingSlot] = useState('10:00 AM - 12:00 PM');
  const [generatedMovingPass, setGeneratedMovingPass] = useState<string | null>(null);

  // ── NEW STANDARD 1: CLUBHOUSE & AMENITY BOOKING ──
  const [amenityModalOpen, setAmenityModalOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState('Badminton Court #2');
  const [amenitySlot, setAmenitySlot] = useState('06:00 PM - 07:00 PM');

  // ── NEW STANDARD 2: HELPDESK & 2-HOUR SLA TICKET ──
  const [helpdeskModalOpen, setHelpdeskModalOpen] = useState(false);
  const [helpdeskCategory, setHelpdeskCategory] = useState('Plumbing & Water Seepage');
  const [helpdeskDescription, setHelpdeskDescription] = useState('');
  const [otpVerifyInput, setOtpVerifyInput] = useState('');

  // ── NEW STANDARD 3: NOTICE BOARD & VENDOR DIRECTORY ──
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);

  // ── FLAT DIRECTORY & LIVE INTERCOM MODAL ──
  const [flatDirectoryModalOpen, setFlatDirectoryModalOpen] = useState(false);
  const [selectedFlatDetail, setSelectedFlatDetail] = useState<{
    tower: string;
    flatNo: string;
    residentName: string;
    intercom: string;
    bhk: string;
    carPlate: string;
    parkingSlot: string;
  } | null>(null);
  const [isIntercomCalling, setIsIntercomCalling] = useState(false);
  const [intercomConnected, setIntercomConnected] = useState(false);

  // Guard Terminal State
  const [guardBoomStatus, setGuardBoomStatus] = useState<'CLOSED' | 'OPEN'>('CLOSED');

  // Simulation States
  const [isRecording, setIsRecording] = useState(false);
  const [voiceApproved, setVoiceApproved] = useState(false);
  const [sosActiveAlert, setSosActiveAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const [selectedSeller, setSelectedSeller] = useState({
    name: 'Solid Sheesham Wood Dining Table (4-Seater)',
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

  // Handle wrong parking countdown (10 minutes = 600 seconds)
  useEffect(() => {
    if (!parkingAlertSent || parkingSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setParkingSecondsLeft(prev => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [parkingAlertSent, parkingSecondsLeft]);

  const handleToggleNetwork = () => {
    const nextState = !isNetworkOnline;
    setIsNetworkOnline(nextState);

    if (nextState) {
      setSyncNotification('⚡ Reconnected! All offline local gate entries synced to cloud.');
      setTimeout(() => setSyncNotification(null), 4000);
    } else {
      setSyncNotification('⚠️ Wi-Fi Disconnected. Offline Local SQLite DB active — All gate passes saved locally.');
      setTimeout(() => setSyncNotification(null), 4000);
    }
  };

  const handleSendParkingAlert = () => {
    const alertData = SocietyStore.createParkingAlert(parkingCarNo, parkingSlot);
    setActiveParkingAlert(alertData);
    setParkingAlertSent(true);
    setParkingSecondsLeft(600); // 10 minutes real countdown
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

  const handleGuardScanANPR = () => {
    SocietyStore.addGateLog('FASTTAG', 'UP14 EX 9988 (Tower C - Flat 402) - FastTag Boom Open', isNetworkOnline ? 'Auto 0.4s' : 'Local SQLite 0.01s', isNetworkOnline);
    alert(`📷 ANPR Camera scanned UP14 EX 9988! Saved ${isNetworkOnline ? 'to Cloud' : '100% Offline to Local DB'}. Barrier Cleared!`);
  };

  const handleBookMaid = (helper: HelperStaff) => {
    SocietyStore.bookBackupMaid(helper.id, 'Tower A - Flat 102');
    setBookedMaid(helper.name);
    setMaidModalOpen(false);
    alert(`✅ Backup assigned: ${helper.name} booked for Tower A-102 at 09:00 AM! Gate Security and domestic staff notified.`);
  };

  const handleConfirmAmenity = () => {
    const booking = SocietyStore.bookAmenity(selectedAmenity, amenitySlot, 'Tower A - Flat 102');
    setAmenityModalOpen(false);
    alert(`✅ Confirmed! ${booking.amenityName} reserved for ${booking.slot}. Dynamic Pass Code: ${booking.qrPassCode}`);
  };

  const handleRaiseTicket = () => {
    const ticket = SocietyStore.createHelpdeskTicket(helpdeskCategory, helpdeskDescription || 'Standard issue reported', 'Tower A - Flat 102');
    setHelpdeskModalOpen(false);
    setHelpdeskDescription('');
    alert(`✅ Helpdesk Ticket #${ticket.id} raised! Assigned: ${ticket.assignedTechnician}. Share OTP [ ${ticket.otpToClose} ] only after work is verified.`);
  };

  const handleVerifyOtpTicket = (ticketId: string) => {
    const success = SocietyStore.resolveTicketWithOtp(ticketId, otpVerifyInput);
    if (success) {
      alert(`🎉 Ticket #${ticketId} marked as RESOLVED! Thank you for verifying with Resident OTP.`);
      setOtpVerifyInput('');
    } else {
      alert('❌ Invalid OTP. Please enter the correct 4-digit Resident verification OTP.');
    }
  };

  const handlePayMaintenance = () => {
    SocietyStore.payMaintenance('102');
    setMaintenancePaid(true);
    alert('💳 Payment of ₹3,540 Successful via UPI! Instant GST Receipt generated & Sinking Fund updated.');
  };

  const totalVotes = forumPoll.yesVotes + forumPoll.noVotes;
  const yesPercentage = Math.round((forumPoll.yesVotes / (totalVotes || 1)) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#1E293B] selection:text-white relative bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] pb-28 lg:pb-12">

      {/* ── EMERGENCY SOS ALERT BANNER ── */}
      {sosActiveAlert && (
        <div className="bg-rose-700 text-white py-3 px-4 shadow-2xl sticky top-16 sm:top-20 z-50 animate-pulse">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-black">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <ShieldAlert className="w-5 h-5 text-amber-300 animate-bounce shrink-0" />
              <span>🚨 EMERGENCY SOS TRIGGERED! Live GPS (Tower C - Floor 4) dispatched to Main Gate Guard Post.</span>
            </div>
            <button
              onClick={() => setSosActiveAlert(false)}
              className="bg-white text-rose-800 px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-50 cursor-pointer shrink-0"
            >
              Dismiss Siren Protocol
            </button>
          </div>
        </div>
      )}

      {/* ── DUAL TERMINAL MODE SWITCHER BANNER (RESPONSIVE) ── */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-[0_4px_25px_rgba(15,23,42,0.06)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border border-[#E2E8F0]">
          
          <div className="flex items-center justify-between sm:justify-start gap-2 pl-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold text-[#0F172A]">StaySetu 360° Living</span>
            </div>
            <span className="text-[9px] sm:text-[10px] bg-[#E2E8F0] text-[#475569] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#2563EB]" /> Live Cloud Sync
            </span>
          </div>

          <div className="flex items-center justify-center gap-1 bg-[#F1F5F9] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActivePortalMode('RESIDENT')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activePortalMode === 'RESIDENT'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Resident App</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePortalMode('GUARD')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activePortalMode === 'GUARD'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>🛡️ Guard Console</span>
            </button>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setNoticeModalOpen(true)}
              className="flex-1 sm:flex-none justify-center bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
            >
              <BellRing className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Notices</span>
            </button>

            <button
              type="button"
              onClick={() => setSosActiveAlert(true)}
              className="flex-1 sm:flex-none justify-center bg-rose-100 hover:bg-rose-200 text-rose-800 text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>SOS</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── IF GUARD TABLET CONSOLE ACTIVE ── */}
      {activePortalMode === 'GUARD' ? (
        <section className="px-3.5 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          <div className="bg-[#0F172A] text-white rounded-3xl sm:rounded-[36px] p-5 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.25)] space-y-6 border border-[#334155]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1E293B] text-white flex items-center justify-center font-bold shadow-md border border-[#334155] shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-serif font-bold text-white">
                    Gate Security Terminal (सुरक्षा कंसोल)
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#94A3B8]">Gate #1 (Main Entrance) • Guard Chief: Vikram Singh</p>
                </div>
              </div>

              {/* Network Status & Offline Simulator Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleToggleNetwork}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold cursor-pointer transition-all ${
                    isNetworkOnline
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-amber-950 text-amber-300 border border-amber-600 animate-pulse'
                  }`}
                >
                  {isNetworkOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isNetworkOnline ? '🟢 Online' : '🟠 Offline Mode'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuardOpenBoom}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] sm:text-xs px-4 sm:px-5 py-2 rounded-xl cursor-pointer shadow-md transition-transform active:scale-95"
                >
                  {guardBoomStatus === 'OPEN' ? 'बूम खुला है ✓' : 'बूम खोलें / Boom →'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Action Buttons */}
              <div className="lg:col-span-4 space-y-2.5 sm:space-y-3 text-xs">
                <button
                  onClick={handleGuardScanANPR}
                  className="w-full p-3.5 sm:p-4 bg-[#1E293B] hover:bg-[#334155] rounded-2xl border border-[#334155] text-left flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-xs sm:text-sm">📸 ANPR प्लेट स्कैन / Scan Plate</p>
                    <p className="text-[#94A3B8] text-[10px] sm:text-[11px]">0.4s FastTag Entry • Offline Ready</p>
                  </div>
                  <Car className="w-5 h-5 text-[#38BDF8]" />
                </button>

                <button
                  onClick={() => {
                    SocietyStore.addGateLog('DELIVERY', 'Delivery Rider OTP 7821 Verified for Flat A-102', 'Approved', isNetworkOnline);
                    alert('Delivery Guest OTP Verified for Tower A - Flat 102! Directing rider to Lift A.');
                  }}
                  className="w-full p-3.5 sm:p-4 bg-[#1E293B] hover:bg-[#334155] rounded-2xl border border-[#334155] text-left flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-xs sm:text-sm">🎙️ वॉइस पास व OTP / Verify OTP</p>
                    <p className="text-[#94A3B8] text-[10px] sm:text-[11px]">Swiggy, Zomato &amp; Amazon Couriers</p>
                  </div>
                  <Mic className="w-5 h-5 text-[#38BDF8]" />
                </button>

                <button
                  onClick={() => {
                    SocietyStore.addGateLog('SHIFTING', '🚚 Shifting Truck Pass #MV-9921 Verified (Tower B Service Lift)', 'Lift Unlocked', isNetworkOnline);
                    alert('🚚 Shifting Truck Pass #MV-9921 verified! Tower B - Service Lift auto-unlocked for 2 hours.');
                  }}
                  className="w-full p-3.5 sm:p-4 bg-[#1E293B] hover:bg-[#334155] rounded-2xl border border-[#334155] text-left flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-xs sm:text-sm">🚚 शिफ्टिंग ट्रक पास / Shifting Truck</p>
                    <p className="text-[#94A3B8] text-[10px] sm:text-[11px]">Unlocks Dedicated Service Lift</p>
                  </div>
                  <Truck className="w-5 h-5 text-[#38BDF8]" />
                </button>
              </div>

              {/* Right Live Stream Logs */}
              <div className="lg:col-span-8 bg-[#020617] rounded-2xl p-4 sm:p-5 border border-[#334155] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#38BDF8]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                      GATE ENTRY LOGS ({isNetworkOnline ? 'CLOUD' : 'OFFLINE LOCAL'})
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Zero-Downtime
                  </span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {guardLogs.map(log => (
                    <div key={log.id} className="p-2.5 sm:p-3 bg-[#0F172A] rounded-xl flex items-center justify-between text-xs border border-[#1E293B]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-[9px] sm:text-[10px] font-bold bg-[#1E293B] text-[#94A3B8] px-1.5 sm:px-2 py-0.5 rounded">
                          {log.timestamp}
                        </span>
                        <span className="text-white font-medium text-[11px] sm:text-xs">{log.detail}</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded border text-emerald-300 bg-emerald-950/80 border-emerald-700 shrink-0">
                        {log.synced ? 'Synced ✓' : 'Queued'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>
      ) : null}

      {/* ── 1. ULTRA-LUXURY REAL ESTATE HERO BANNER ── */}
      <section className="px-3.5 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative rounded-3xl sm:rounded-[36px] p-5 sm:p-10 lg:p-16 shadow-[0_16px_50px_rgba(15,23,42,0.08)] flex flex-col justify-between border border-[#E2E8F0] min-h-[460px] sm:min-h-[560px]">
            {/* Background Image Layer */}
            <div
              className="absolute inset-0 rounded-3xl sm:rounded-[36px] overflow-hidden pointer-events-none z-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(248, 250, 252, 0.98) 0%, rgba(248, 250, 252, 0.94) 55%, rgba(248, 250, 252, 0.35) 100%), url('/images/society-hero.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
              }}
            />

            <div className="max-w-2xl space-y-4 sm:space-y-6 relative z-30">
              <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#E2E8F0] shadow-xs">
                <Sparkle className="w-3 h-3 text-[#2563EB]" />
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#0F172A]">
                  SMART GATED SOCIETY OPERATING SYSTEM
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0F172A] leading-[1.15] tracking-tight">
                Your Entire Society <br />
                <span className="italic font-normal text-[#2563EB]">In A Single</span> <br />
                Super-App
              </h1>

              <p className="text-xs sm:text-base text-[#475569] font-normal leading-relaxed max-w-xl">
                Wrong Parking, Domestic Staff, Amenities &amp; RWA Accounts — Solved with persistent state engine, Voice Gate Passes, and 1-Click Auditable GST Ledgers.
              </p>

              {/* Direct Quick Search Bar with Instant Results Overlay */}
              <div className="relative max-w-lg z-50">
                <div className="bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl shadow-[0_4px_25px_rgba(15,23,42,0.08)] flex items-center gap-2 border border-[#E2E8F0]">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#64748B] ml-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search Flat (e.g. Tower C-402), Helper, Car..."
                    className="w-full bg-transparent text-xs font-semibold text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none py-1"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (!searchQuery.trim()) {
                        setSearchQuery('Tower C');
                      }
                    }}
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-transform active:scale-95 cursor-pointer shrink-0"
                  >
                    Search
                  </button>
                </div>

                {/* Live Floating Instant Search Dropdown */}
                {searchQuery.trim().length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-[0_24px_60px_rgba(15,23,42,0.25)] border-2 border-[#94A3B8] p-3 space-y-2 max-h-72 overflow-y-auto z-[100] animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      <span>Instant Society Search Results</span>
                      <span className="text-[#2563EB] font-bold">Matching Results</span>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        { title: 'Tower C - Flat 402', sub: 'Resident: Ankit Sharma • Intercom #1402 • 3 BHK', type: 'FLAT', tag: 'Flat', action: 'INTERCOM' },
                        { title: 'Tower A - Flat 102', sub: 'Resident: Sudhanshu Pandey • Intercom #1102 • 3 BHK', type: 'FLAT', tag: 'Flat', action: 'INTERCOM' },
                        { title: 'Tower B - Flat 204', sub: 'Resident: Neha Kapoor • Intercom #1204 • 2 BHK', type: 'FLAT', tag: 'Flat', action: 'INTERCOM' },
                        { title: 'Tower D - Flat 801', sub: 'Resident: Rajesh Verma • Intercom #1801 • 4 BHK', type: 'FLAT', tag: 'Flat', action: 'INTERCOM' },
                        { title: 'Sunita Devi (Cook & Maid)', sub: '🟢 Live: Inside Tower A • Rating: 4.9 ★ • ₹200/Day', type: 'HELPER', tag: 'Helper', action: 'BOOK_MAID' },
                        { title: 'Ramesh Kumar (Deep Cleaning)', sub: '🟢 Live: Inside Tower D • Rating: 4.8 ★ • ₹250/Day', type: 'HELPER', tag: 'Helper', action: 'BOOK_MAID' },
                        { title: 'UP14 EX 9988 (Honda City)', sub: 'Assigned: Basement B1 - Slot #42 (Tower C)', type: 'VEHICLE', tag: 'Parking', action: 'RESOLVE_PARKING' },
                        { title: 'UP14 DK 8811 (Shifting Truck)', sub: 'Move-In Gate Pass #MV-9921 • Dedicated Service Lift', type: 'VEHICLE', tag: 'Shifting', action: 'MOVE_PASS' },
                        { title: 'Badminton Court #1 & #2', sub: 'Slots open today: 05:00 PM - 08:00 PM • Free', type: 'AMENITY', tag: 'Amenity', action: 'BOOK_AMENITY' },
                        { title: 'Swimming Pool (Lane 1-3)', sub: 'Morning: 06:00 AM - 08:00 AM • Open', type: 'AMENITY', tag: 'Amenity', action: 'BOOK_AMENITY' },
                        { title: 'Clubhouse Grand Party Hall', sub: 'Capacity: 120 Guests • Ac Banquet', type: 'AMENITY', tag: 'Amenity', action: 'BOOK_AMENITY' },
                        { title: 'Rakesh Sharma (Society Plumber)', sub: '🟢 Active in Tower C & D • 2-Hour SLA', type: 'HELPDESK', tag: 'Plumber', action: 'RAISE_TICKET' },
                        { title: 'Vikas Verma (Society Electrician)', sub: '🟢 Active at Substation • 2-Hour SLA', type: 'HELPDESK', tag: 'Electrician', action: 'RAISE_TICKET' },
                        { title: 'Otis Lift Maintenance & Jerk Issue', sub: 'Annual AMC Active for 14 Lifts • Instant Ticket', type: 'HELPDESK', tag: 'Lift', action: 'RAISE_TICKET' },
                        { title: 'DG Power Backup Testing Circular', sub: 'Wednesday 11:00 AM - 11:30 AM • Towers A-G', type: 'NOTICE', tag: 'Notice', action: 'VIEW_NOTICES' },
                      ]
                        .filter(item => 
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tag.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              if (item.action === 'INTERCOM') {
                                const flatsDirectory = [
                                  { tower: 'Tower C', flatNo: '402', residentName: 'Ankit Sharma', intercom: '1402', bhk: '3 BHK', carPlate: 'UP14 EX 9988', parkingSlot: 'Basement B1 - Slot #42' },
                                  { tower: 'Tower A', flatNo: '102', residentName: 'Sudhanshu Pandey', intercom: '1102', bhk: '3 BHK', carPlate: 'DL8C AB 1234', parkingSlot: 'Basement B1 - Slot #12' },
                                  { tower: 'Tower B', flatNo: '204', residentName: 'Neha Kapoor', intercom: '1204', bhk: '2 BHK', carPlate: 'HR26 DK 5544', parkingSlot: 'Basement B2 - Slot #18' },
                                  { tower: 'Tower D', flatNo: '801', residentName: 'Rajesh Verma', intercom: '1801', bhk: '4 BHK Penthouse', carPlate: 'UP16 ZQ 7700', parkingSlot: 'Basement B1 - Slot #88' },
                                ];
                                const matched = flatsDirectory.find(f => item.title.includes(f.tower) && item.title.includes(f.flatNo)) || {
                                  tower: item.title.split(' - ')[0] || 'Tower C',
                                  flatNo: item.title.split('Flat ')[1] || '402',
                                  residentName: 'Verified Resident',
                                  intercom: '1402',
                                  bhk: '3 BHK',
                                  carPlate: 'UP14 EX 9988',
                                  parkingSlot: 'Basement B1 - Slot #42'
                                };
                                setSelectedFlatDetail(matched);
                                setIsIntercomCalling(false);
                                setIntercomConnected(false);
                                setFlatDirectoryModalOpen(true);
                              } else if (item.action === 'BOOK_MAID') {
                                setMaidModalOpen(true);
                              } else if (item.action === 'RESOLVE_PARKING') {
                                setParkingCarNo('UP14 EX 9988');
                                document.getElementById('wrong-parking-spotlight')?.scrollIntoView({ behavior: 'smooth' });
                              } else if (item.action === 'BOOK_AMENITY') {
                                setAmenityModalOpen(true);
                              } else if (item.action === 'RAISE_TICKET') {
                                setHelpdeskModalOpen(true);
                              } else if (item.action === 'VIEW_NOTICES') {
                                setNoticeModalOpen(true);
                              } else if (item.action === 'MOVE_PASS') {
                                setMovingPassModalOpen(true);
                              }
                              setSearchQuery('');
                            }}
                            className="p-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors border border-[#E2E8F0]"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#0F172A]">{item.title}</span>
                                <span className="text-[9px] font-bold bg-[#E2E8F0] text-[#475569] px-2 py-0.5 rounded">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#64748B]">{item.sub}</p>
                            </div>

                            <span className="text-[#2563EB] font-bold text-xs shrink-0 ml-2">
                              Open →
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Real-time Status Floating Bar (Mobile Grid) */}
            <div className="mt-8 bg-[#0F172A]/95 backdrop-blur-md rounded-2xl p-3 sm:p-5 text-white grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 shadow-2xl border border-[#1E293B] relative z-10">
              
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0 border border-[#334155]">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-[11px] sm:text-xs font-bold text-white">Wrong Parking</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#94A3B8]">B1/B2 auto-ping</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0 border border-[#334155]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-[11px] sm:text-xs font-bold text-white">Helper Backup</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#94A3B8]">1-Click cook</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0 border border-[#334155]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-[11px] sm:text-xs font-bold text-white">RWA Ledger</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#94A3B8]">1-Click balance</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E293B] flex items-center justify-center text-[#38BDF8] shrink-0 border border-[#334155]">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-[11px] sm:text-xs font-bold text-white">Amenities</h4>
                  <p className="text-[9px] sm:text-[10px] text-[#94A3B8]">Court &amp; Pool slots</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 2. SPOTLIGHT: WRONG PARKING NUMBER PLATE RESOLVER (OPTION 2) ── */}
      <section id="wrong-parking-spotlight" className="px-3.5 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-10 shadow-[0_10px_35px_rgba(15,23,42,0.05)] space-y-5 border border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#F1F5F9] text-[#0F172A] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                  🚗 FEATURE SPOTLIGHT • OPTION 2
                </span>
                <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#0F172A] mt-1.5">
                  Wrong Parking &amp; Reserved Slot Protection
                </h2>
              </div>
              <p className="text-xs text-[#475569] max-w-sm">
                Someone parked in your reserved basement slot? Send an instant anonymous alert to the car owner with zero neighbor arguments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              
              {/* Left Form */}
              <div className="lg:col-span-6 space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#475569] text-[11px] block mb-1">
                    Enter Unauthorized Car Plate Number:
                  </label>
                  <input
                    type="text"
                    value={parkingCarNo}
                    onChange={e => setParkingCarNo(e.target.value)}
                    placeholder="e.g. UP14 EX 9988, DL8C AB 1234"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/10"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#475569] text-[11px] block mb-1">
                    Your Blocked Parking Slot:
                  </label>
                  <input
                    type="text"
                    value={parkingSlot}
                    onChange={e => setParkingSlot(e.target.value)}
                    placeholder="e.g. Basement B1 - Slot #42 (Tower C)"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/10"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendParkingAlert}
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-[#38BDF8]" />
                  <span>Send Anonymous Move-Car Alert</span>
                </button>
              </div>

              {/* Right Live Simulation Output */}
              <div className="lg:col-span-6 bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl space-y-3 border border-[#E2E8F0]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                  LIVE SYSTEM RESPONSE SIMULATOR
                </span>

                {parkingAlertSent ? (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-900 text-xs space-y-1.5 shadow-xs border border-emerald-200">
                      <p className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Anonymous Alert Sent to Owner of {parkingCarNo}!</span>
                      </p>
                      <p className="text-[11px] text-emerald-800">
                        Owner Flat identified as <strong>{activeParkingAlert?.ownerFlat || 'Tower C - Flat 402'}</strong>. WhatsApp notice &amp; high-priority push notification delivered.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl text-xs space-y-1.5 shadow-xs border border-[#E2E8F0]">
                      <div className="flex justify-between items-center font-bold text-[#0F172A]">
                        <span>Move-Car Countdown:</span>
                        <span className="text-[#2563EB] font-mono text-xs font-black bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                          ⏱️ {formatTimer(parkingSecondsLeft)} Mins Left
                        </span>
                      </div>
                      <p className="text-[10px] text-[#64748B]">
                        Guard Chief Terminal on standby. If not moved within 10 mins, parking fine of ₹500 will be billed to {activeParkingAlert?.ownerFlat || 'Tower C - Flat 402'} maintenance ledger.
                      </p>

                      {/* Direct WhatsApp Live Action Button */}
                      <div className="pt-1.5">
                        <a
                          href={`https://api.whatsapp.com/send?phone=917393011350&text=${encodeURIComponent(
                            `🚨 *StaySetu Smart Society Notice*\n\nHello *${activeParkingAlert?.ownerFlat || 'Tower C - Flat 402'}*,\n\nYour vehicle *${parkingCarNo}* is currently reported parked in reserved slot: *${parkingSlot}*.\n\n⏱️ Please move your vehicle within *10 minutes* to avoid an automatic ₹500 society penalty billed to your maintenance ledger.\n\n_Ref Ticket: ${activeParkingAlert?.id || 'PRK-8821'}_`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                          <span>Send Live WhatsApp Notice to Car Owner →</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 text-center space-y-2 text-xs text-[#64748B]">
                    <Car className="w-8 h-8 text-[#64748B] mx-auto" />
                    <p className="font-semibold text-[#0F172A]">Ready to Resolve Parking Blockages</p>
                    <p className="text-[11px]">Type car number on the left and tap Send Alert to see instant resolution.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 3. STANDARD MUST-HAVES (AMENITY BOOKING & 2-HOUR HELPDESK) ── */}
      <section className="px-3.5 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-5">
          
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#2563EB] block">
              STANDARD SOCIETY ESSENTIALS
            </span>
            <h2 className="text-xl sm:text-3xl font-serif text-[#0F172A] mt-1">
              Clubhouse Amenities &amp; Time-Tracked Helpdesk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Standard 1: Amenity & Clubhouse Booking */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-4 flex flex-col justify-between border border-[#E2E8F0]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold">
                    <CalendarDays className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {amenityBookings.length > 0 ? `${amenityBookings.length} Active Pass` : 'Instant Slot Reserve'}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A]">Clubhouse &amp; Sports Amenity Booking</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Book Badminton Court, Swimming Pool, Tennis, or Grand Party Hall slots with instant QR passes and conflict prevention.
                  </p>
                </div>

                {amenityBookings.length > 0 ? (
                  <div className="space-y-2">
                    {amenityBookings.slice(0, 2).map(booking => (
                      <div key={booking.id} className="p-3 bg-emerald-50 rounded-xl text-xs space-y-1 border border-emerald-200">
                        <div className="flex justify-between font-bold text-emerald-900">
                          <span>{booking.amenityName}</span>
                          <span className="text-[#2563EB]">{booking.slot}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-emerald-800">
                          <span>Booked for: {booking.bookedByFlat}</span>
                          <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded text-emerald-950">{booking.qrPassCode}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-[#F8FAFC] rounded-xl text-xs space-y-1 border border-[#E2E8F0]">
                    <div className="flex justify-between font-semibold">
                      <span>Badminton Court #2:</span>
                      <span className="text-emerald-700 font-bold">Available Today</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#64748B]">
                      <span>Swimming Pool:</span>
                      <span className="font-bold text-[#0F172A]">06:00 AM - 08:00 AM</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setAmenityModalOpen(true)}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs py-3 rounded-xl cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <CalendarDays className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Book Amenity Slot (Free)</span>
              </button>
            </div>

            {/* Standard 2: 1-Click Helpdesk & SLA Tracker */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-4 flex flex-col justify-between border border-[#E2E8F0]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold">
                    <Wrench className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                    2-Hour SLA Timer
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A]">Digital Helpdesk &amp; SLA Ticket Tracker</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Raise plumbing, electrical, or lift tickets with 2-hour SLA. Assigned technician closes ticket only with your Resident OTP.
                  </p>
                </div>

                {helpdeskTickets.length > 0 ? (
                  <div className="space-y-2">
                    {helpdeskTickets.slice(0, 1).map(ticket => (
                      <div key={ticket.id} className="p-3 bg-amber-50 rounded-xl text-xs space-y-1.5 border border-amber-200">
                        <div className="flex justify-between font-bold text-amber-950">
                          <span>Ticket #{ticket.id}: {ticket.category}</span>
                          <span className={ticket.status === 'RESOLVED' ? 'text-emerald-700' : 'text-[#2563EB]'}>
                            {ticket.status === 'RESOLVED' ? 'RESOLVED ✓' : `OTP: ${ticket.otpToClose}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-900">
                          Assigned: {ticket.assignedTechnician} ({ticket.technicianPhone})
                        </p>
                        {ticket.status !== 'RESOLVED' && (
                          <div className="pt-1 flex gap-2">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="OTP to Close"
                              value={otpVerifyInput}
                              onChange={e => setOtpVerifyInput(e.target.value)}
                              className="bg-white border border-amber-300 rounded-lg px-2 py-1 text-xs font-bold w-28"
                            />
                            <button
                              onClick={() => handleVerifyOtpTicket(ticket.id)}
                              className="bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg cursor-pointer"
                            >
                              Verify &amp; Close
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-[#F8FAFC] rounded-xl text-xs space-y-1 border border-[#E2E8F0]">
                    <div className="flex justify-between font-semibold">
                      <span>Plumber On-Duty:</span>
                      <span className="text-emerald-700 font-bold">🟢 Active (Tower C &amp; D)</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#64748B]">
                      <span>Electrician:</span>
                      <span className="text-emerald-700 font-bold">🟢 Active (Substation)</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setHelpdeskModalOpen(true)}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs py-3 rounded-xl cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Raise Helpdesk Ticket (2-Hr SLA)</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. THREE CORE GROUND REALITY PROBLEMS (OPTIONS 1, 6, 7) ── */}
      <section id="society-modules" className="px-3.5 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-5">
          
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#2563EB] block">
              PRACTICAL SOCIETY SUITE
            </span>
            <h2 className="text-xl sm:text-3xl font-serif text-[#0F172A] mt-1">
              Real Solutions for Daily Community Living
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* OPTION 1: Verified Society Helper & Backup Maid */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:shadow-md transition-all space-y-4 flex flex-col justify-between border border-[#E2E8F0]">
              <div className="space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">OPTION 1</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A]">Helper Radar &amp; Backup Maid</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Maid suddenly on leave? Check live biometric presence of verified cooks &amp; maids inside campus with 1-click morning backup.
                  </p>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl text-xs space-y-1 border border-[#E2E8F0]">
                  <div className="flex justify-between font-semibold">
                    <span>Sunita Devi (Cook):</span>
                    <span className="text-emerald-700 font-bold">{bookedMaid === 'Sunita Devi' ? 'Assigned ✓' : '🟢 Inside Tower A'}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Ramesh Kumar (Cleaning):</span>
                    <span className="text-emerald-700 font-bold">{bookedMaid === 'Ramesh Kumar' ? 'Assigned ✓' : '🟢 Inside Tower D'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMaidModalOpen(true)}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs py-3 rounded-xl cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{bookedMaid ? `Assigned: ${bookedMaid} ✓` : 'Book Backup Maid (₹200/Day)'}</span>
              </button>
            </div>

            {/* OPTION 6: RWA Financial Transparency & GST Balance Sheet */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:shadow-md transition-all space-y-4 flex flex-col justify-between border border-[#E2E8F0]">
              <div className="space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">OPTION 6</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A]">1-Click RWA GST Balance Sheet</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Complete transparency on monthly maintenance: Otis Lift AMC (14 Lifts), Guard Salaries (18 Staff), and Sinking Fund.
                  </p>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl text-xs space-y-1.5 border border-[#E2E8F0]">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">August Maintenance (A-102):</span>
                    <span className="font-bold text-[#0F172A]">₹3,540</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#64748B]">
                    <span>Sinking Fund (HDFC):</span>
                    <span className="font-bold text-emerald-700">₹1.15 Crores</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePayMaintenance}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold cursor-pointer ${
                    maintenancePaid ? 'bg-emerald-700 text-white' : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                  }`}
                >
                  {maintenancePaid ? 'Paid via UPI ✓' : 'Pay ₹3,540'}
                </button>
                <button
                  type="button"
                  onClick={() => setLedgerModalOpen(true)}
                  className="px-3.5 bg-[#F1F5F9] text-[#0F172A] rounded-xl text-xs font-bold hover:bg-[#E2E8F0] cursor-pointer flex items-center gap-1"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-[11px]">Ledger</span>
                </button>
              </div>
            </div>

            {/* OPTION 7: Digital Move-In / Out & Service Lift Booking */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:shadow-md transition-all space-y-4 flex flex-col justify-between border border-[#E2E8F0]">
              <div className="space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">OPTION 7</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A]">Move-In Pass &amp; Service Lift</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Pre-approved shifting truck gate pass + dedicated 2-hour service lift reservation so regular passenger lifts remain unblocked.
                  </p>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl text-xs space-y-1 border border-[#E2E8F0]">
                  <div className="flex justify-between font-semibold">
                    <span>Shifting Slot:</span>
                    <span className="font-bold text-[#0F172A]">{movingSlot}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#64748B]">
                    <span>Service Lift:</span>
                    <span className="text-emerald-700 font-bold">{generatedMovingPass ? 'Pass Generated ✓' : 'Padded & Reserved'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMovingPassModalOpen(true)}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs py-3 rounded-xl cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{generatedMovingPass ? 'View Pass #MV-9921' : 'Book Shifting Slot'}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ── 5. RWA FINANCIAL DESK & RESIDENT COMMUNITY FORUM ── */}
      <section id="rwa-dues" className="px-3.5 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Voice Pass & FastTag Gate Test */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-4 sm:space-y-5 border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  GATE ACCESS CONTROLS
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F172A] mt-0.5">
                  Voice Gate Pass &amp; ANPR FastTag
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#F8FAFC] rounded-2xl space-y-2 border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#2563EB]">🎙️ VOICE PASS</span>
                <p className="text-[10px] sm:text-[11px] text-[#64748B]">Hands-free resident approval</p>
                <button
                  type="button"
                  onClick={handleVoiceRecord}
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-2 rounded-xl text-[10px] cursor-pointer"
                >
                  {isRecording ? 'Recording...' : voiceApproved ? 'Voice Sent ✓' : 'Speak Pass →'}
                </button>
              </div>

              <div className="p-3.5 bg-[#F8FAFC] rounded-2xl space-y-2 border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#2563EB]">🚗 FASTTAG BOOM</span>
                <p className="text-[10px] sm:text-[11px] text-[#64748B]">0.5s auto license clearance</p>
                <button
                  type="button"
                  onClick={handleGuardOpenBoom}
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-2 rounded-xl text-[10px] cursor-pointer"
                >
                  {guardBoomStatus === 'OPEN' ? 'Boom Open ✓' : 'Test Gate →'}
                </button>
              </div>
            </div>

            {/* Smart Meter Topup */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl flex items-center justify-between text-xs border border-[#E2E8F0]">
              <div>
                <span className="text-[#64748B] font-semibold text-[10px]">SMART METER (MTR-882190)</span>
                <p className="font-bold text-[#0F172A] text-sm">Balance: ₹{meterBalance}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const updated = SocietyStore.rechargeSmartMeter(500);
                  setMeterBalance(updated);
                  alert('⚡ Smart Meter MTR-882190 recharged with ₹500 via UPI!');
                }}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer"
              >
                + Topup ₹500
              </button>
            </div>
          </div>

          {/* Right Column: Resident AGM Poll & Notice Board */}
          <div id="community" className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] space-y-4 sm:space-y-5 border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  RESIDENT COMMUNITY FORUM
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F172A] mt-0.5">
                  Live AGM Voting Poll &amp; Notices
                </h3>
              </div>
              <span className="text-xs font-bold text-[#64748B]">{totalVotes} Votes</span>
            </div>

            {/* AGM Poll */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl space-y-2.5 border border-[#E2E8F0]">
              <h4 className="font-serif text-xs sm:text-sm font-bold text-[#0F172A]">
                {forumPoll.title}
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] sm:text-[11px] font-bold">
                  <span className="text-emerald-700">👍 YES ({forumPoll.yesVotes} Votes - {yesPercentage}%)</span>
                  <span className="text-rose-700">👎 NO ({forumPoll.noVotes} Votes - {100 - yesPercentage}%)</span>
                </div>
                <div className="w-full bg-[#E2E8F0] rounded-full h-2 overflow-hidden flex">
                  <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${yesPercentage}%` }} />
                  <div className="bg-rose-600 h-full transition-all duration-500" style={{ width: `${100 - yesPercentage}%` }} />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleVote('YES')}
                  disabled={forumPoll.userVoted !== null}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    forumPoll.userVoted === 'YES' ? 'bg-emerald-700 text-white' : 'bg-white text-[#0F172A] shadow-xs border border-[#E2E8F0]'
                  }`}
                >
                  Vote YES
                </button>
                <button
                  type="button"
                  onClick={() => handleVote('NO')}
                  disabled={forumPoll.userVoted !== null}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    forumPoll.userVoted === 'NO' ? 'bg-rose-700 text-white' : 'bg-white text-[#0F172A] shadow-xs border border-[#E2E8F0]'
                  }`}
                >
                  Vote NO
                </button>
              </div>
            </div>

            {/* Buy & Sell Link */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl flex items-center justify-between text-xs border border-[#E2E8F0]">
              <div>
                <span className="text-[#64748B] font-semibold text-[10px]">RESIDENT MARKETPLACE</span>
                <p className="font-bold text-[#0F172A] text-xs sm:text-sm">Solid Wood Dining Table (₹9,500)</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSeller({
                    name: 'Solid Sheesham Wood Dining Table',
                    price: '₹9,500',
                    ownerName: 'Tower B - Flat 402 (Ankit)',
                    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                  });
                  setChatModalOpen(true);
                }}
                className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer"
              >
                Chat Seller
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. LEADERSHIP & FOUNDERS ── */}
      <section id="leadership" className="px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#2563EB] block">
            STAYSETU LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#0F172A]">
            Meet Our Founders
          </h2>
          <p className="text-xs text-[#64748B] max-w-lg mx-auto">
            Pioneering smart gated community technology &amp; automated township management across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Founder - Sudhanshu Pandey */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col sm:flex-row items-center gap-5 group hover:shadow-md transition-all border border-[#E2E8F0]">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md shrink-0">
              <Image
                src="/images/founders/sudhanshu-pandey.jpg"
                alt="Sudhanshu Pandey - Founder"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white px-3 py-0.5 rounded-full">
                FOUNDER &amp; CEO
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A]">Sudhanshu Pandey</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Driving StaySetu&apos;s vision for next-generation smart gated societies, AI security terminals, and automated township living.
              </p>
            </div>
          </div>

          {/* Co-Founder - Ayushi Singh */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex flex-col sm:flex-row items-center gap-5 group hover:shadow-md transition-all border border-[#E2E8F0]">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md shrink-0">
              <Image
                src="/images/founders/ayushi-singh.jpg"
                alt="Ayushi Singh - Co-Founder"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#0F172A] text-white px-3 py-0.5 rounded-full">
                  CO-FOUNDER &amp; COO
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A]">Ayushi Singh</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Co-Founder steering product innovation, resident operations, helper attendance radars, and StaySetu&apos;s smart society ecosystem.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. FLOATING CURVED ISLAND CTA ── */}
      <section className="px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto rounded-3xl sm:rounded-[36px] bg-[#0F172A] p-6 sm:p-14 text-center text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)] space-y-4 sm:space-y-6 relative overflow-hidden border border-[#334155]">
          
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 relative z-10">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#38BDF8]">
              JOIN THE MOVEMENT
            </span>
            <h2 className="text-2xl sm:text-5xl font-serif text-white leading-tight">
              Ready to upgrade your Gated Society?
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Join 50+ gated townships using StaySetu for wrong parking alerts, live helper radar, amenity booking, and 100% auditable RWA accounting.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/auth/signup"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Get Started for Your Society</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── ALL MODALS (MOBILE NATIVE BOTTOM ACTION SHEET / DIALOG) ── */}

      {/* 1. Amenity Booking Modal */}
      {amenityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#F8FAFC] rounded-3xl border-2 border-[#0F172A] w-full max-w-md p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-serif font-bold text-[#0F172A] text-base">Book Society Amenity</h3>
              <button onClick={() => setAmenityModalOpen(false)} className="p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Select Amenity</label>
                <select
                  value={selectedAmenity}
                  onChange={e => setSelectedAmenity(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                >
                  <option value="Badminton Court #1">🏸 Badminton Court #1</option>
                  <option value="Badminton Court #2">🏸 Badminton Court #2</option>
                  <option value="Swimming Pool (Lane 1-3)">🏊 Swimming Pool (Lane 1-3)</option>
                  <option value="Clubhouse Grand Party Hall">🎉 Clubhouse Grand Party Hall (120 Guests)</option>
                  <option value="Tennis Court (Synthetic Turf)">🎾 Tennis Court</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Time Slot (Today)</label>
                <select
                  value={amenitySlot}
                  onChange={e => setAmenitySlot(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                >
                  <option value="06:00 AM - 07:00 AM">06:00 AM - 07:00 AM</option>
                  <option value="07:00 AM - 08:00 AM">07:00 AM - 08:00 AM</option>
                  <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                  <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                  <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleConfirmAmenity}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3 rounded-xl shadow-md cursor-pointer mt-2"
              >
                Confirm Slot Reservation (Free)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Helpdesk Ticket Modal */}
      {helpdeskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#F8FAFC] rounded-3xl border-2 border-[#2563EB] w-full max-w-md p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-serif font-bold text-[#0F172A] text-base">Raise Helpdesk Ticket</h3>
              <button onClick={() => setHelpdeskModalOpen(false)} className="p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Issue Category</label>
                <select
                  value={helpdeskCategory}
                  onChange={e => setHelpdeskCategory(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                >
                  <option value="Plumbing & Water Seepage">🚰 Plumbing &amp; Water Seepage</option>
                  <option value="Elevator Jerk / Stuck Alert">🛗 Elevator Jerk / Maintenance</option>
                  <option value="Electrical MCB / Short Circuit">⚡ Electrical MCB / Power Backup</option>
                  <option value="Carpentry & Door Lock">🪚 Carpentry &amp; Door Lock</option>
                  <option value="Common Area Cleaning & Waste">🧹 Common Area Cleaning</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Describe Issue</label>
                <textarea
                  rows={2}
                  value={helpdeskDescription}
                  onChange={e => setHelpdeskDescription(e.target.value)}
                  placeholder="e.g. Master bathroom tap leaking continuously..."
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl p-3 text-xs text-[#0F172A]"
                />
              </div>

              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                ⏱️ <strong>Guaranteed 2-Hour SLA:</strong> On-site technician will arrive within 2 hours. Do not share OTP until work is verified.
              </div>

              <button
                type="button"
                onClick={handleRaiseTicket}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3 rounded-xl shadow-md cursor-pointer mt-1"
              >
                Submit Ticket &amp; Dispatch Technician
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Notice Board & Vendor Directory Modal */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  OFFICIAL COMMUNITY BOARD
                </span>
                <h3 className="font-serif font-bold text-[#0F172A] text-base sm:text-lg">
                  Society Notices &amp; Vendor Directory
                </h3>
              </div>
              <button onClick={() => setNoticeModalOpen(false)} className="p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Notices */}
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-xs font-bold text-[#0F172A] block">📢 Active Society Circulars:</span>
              
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-amber-950">
                  <span>⚠️ DG Backup Testing on Wednesday (11:00 AM - 11:30 AM)</span>
                  <span className="text-[10px] text-amber-700">Urgent</span>
                </div>
                <p className="text-[11px] text-amber-900">
                  Annual DG synchronization across all high-rise towers. Elevators will operate on secondary supply.
                </p>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-xs space-y-1">
                <div className="flex justify-between font-bold text-[#0F172A]">
                  <span>🏊 Swimming Pool Deep Cleaning on Friday</span>
                  <span className="text-[10px] text-[#64748B]">General</span>
                </div>
                <p className="text-[11px] text-[#475569]">
                  Chlorine balancing &amp; tile sanitization. Pool will reopen on Saturday 06:00 AM.
                </p>
              </div>
            </div>

            {/* Verified Vendor Directory */}
            <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#0F172A] block">📞 Verified Society Vendors:</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0F172A]">Daily Fresh Milk (Gate 1)</p>
                    <p className="text-[10px] text-emerald-700">Amul &amp; Mother Dairy</p>
                  </div>
                  <a href="tel:+917393011350" className="bg-[#0F172A] hover:bg-[#1E293B] text-white p-2 rounded-lg text-xs flex items-center gap-1 font-bold">
                    <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Call</span>
                  </a>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0F172A]">Basement Car Wash (B1/B2)</p>
                    <p className="text-[10px] text-emerald-700">Daily Morning Wash</p>
                  </div>
                  <a href="tel:+917393011350" className="bg-[#0F172A] hover:bg-[#1E293B] text-white p-2 rounded-lg text-xs flex items-center gap-1 font-bold">
                    <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Backup Maid Request Modal */}
      {maidModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#F8FAFC] rounded-3xl border-2 border-[#0F172A] w-full max-w-md p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-serif font-bold text-[#0F172A] text-base">Request Backup Maid / Cook</h3>
              <button onClick={() => setMaidModalOpen(false)} className="p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#475569]">Verified domestic staff currently active inside society campus:</p>
            <div className="space-y-2">
              {helpers.map(helper => (
                <button
                  key={helper.id}
                  onClick={() => handleBookMaid(helper)}
                  className="w-full p-3 bg-white rounded-2xl border border-[#E2E8F0] text-left text-xs font-bold flex items-center justify-between cursor-pointer hover:border-[#0F172A] transition-all"
                >
                  <div>
                    <p className="text-[#0F172A]">{helper.name} ({helper.role})</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">🟢 {helper.currentLocation} • Rating: {helper.rating} ★</p>
                  </div>
                  <span className="text-[#2563EB] font-bold">Book ₹{helper.ratePerDay}/Day</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. RWA GST Balance Sheet & Audited Ledger Modal */}
      {ledgerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  OFFICIAL AUDITED STATEMENT
                </span>
                <h3 className="font-serif font-bold text-[#0F172A] text-base sm:text-lg">
                  RWA Maintenance &amp; GST Balance Sheet
                </h3>
              </div>
              <button onClick={() => setLedgerModalOpen(false)} className="p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <span className="text-[9px] sm:text-[10px] text-emerald-800 font-bold block">COLLECTION</span>
                  <span className="font-serif text-xs sm:text-base font-bold text-emerald-900">₹38,42,000</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-amber-50 rounded-2xl border border-amber-200">
                  <span className="text-[9px] sm:text-[10px] text-amber-800 font-bold block">EXPENSES</span>
                  <span className="font-serif text-xs sm:text-base font-bold text-amber-900">₹24,18,000</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-blue-50 rounded-2xl border border-blue-200">
                  <span className="text-[9px] sm:text-[10px] text-blue-800 font-bold block">SINKING FUND</span>
                  <span className="font-serif text-xs sm:text-base font-bold text-blue-900">₹1.15 Cr</span>
                </div>
              </div>

              <div className="border border-[#E2E8F0] rounded-2xl overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[320px]">
                  <thead className="bg-[#F8FAFC] font-bold text-[#0F172A] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="p-2.5 sm:p-3">Expense Head</th>
                      <th className="p-2.5 sm:p-3">Vendor</th>
                      <th className="p-2.5 sm:p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                    <tr>
                      <td className="p-2.5 sm:p-3 font-semibold text-[#0F172A]">Lift AMC (14 Lifts)</td>
                      <td className="p-2.5 sm:p-3">Otis Elevators</td>
                      <td className="p-2.5 sm:p-3 text-right font-bold">₹1,40,000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 sm:p-3 font-semibold text-[#0F172A]">Security (18 Staff)</td>
                      <td className="p-2.5 sm:p-3">SIS Security</td>
                      <td className="p-2.5 sm:p-3 text-right font-bold">₹2,70,000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 sm:p-3 font-semibold text-[#0F172A]">DG Power Backup</td>
                      <td className="p-2.5 sm:p-3">Indian Oil</td>
                      <td className="p-2.5 sm:p-3 text-right font-bold">₹1,85,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('📥 Downloading Verified GST Audited Balance Sheet (PDF)...')}
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#38BDF8]" />
                  <span>Download Verified Audit PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Move-In Shifting Pass Modal */}
      {movingPassModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#F8FAFC] rounded-3xl border-2 border-[#0F172A] w-full max-w-md p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-serif font-bold text-[#0F172A] text-base">Book Shifting &amp; Service Lift</h3>
              <button onClick={() => setMovingPassModalOpen(false)} className="p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Select Tower</label>
                <select className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]">
                  <option>Tower A</option>
                  <option>Tower B</option>
                  <option selected>Tower C</option>
                  <option>Tower D</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Shifting Date</label>
                <input
                  type="date"
                  value={movingDate}
                  onChange={e => setMovingDate(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Service Lift Slot</label>
                <select
                  value={movingSlot}
                  onChange={e => setMovingSlot(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM (Slot 1)</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Slot 2)</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Slot 3)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Truck Number</label>
                <input
                  type="text"
                  defaultValue="UP14 DK 8811"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setGeneratedMovingPass('MV-9921');
                  SocietyStore.addGateLog('SHIFTING', '🚚 Shifting Truck Pass #MV-9921 Generated (Padded Lift Reserved)', 'Active Pass', isNetworkOnline);
                  alert(`✅ Move-In Gate Pass #MV-9921 generated! Dedicated Padded Service Lift booked for ${movingSlot}. Gate #1 Security notified.`);
                  setMovingPassModalOpen(false);
                }}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3 rounded-xl shadow-md cursor-pointer mt-2"
              >
                Generate Shifting Pass &amp; Reserve Lift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. In-App Chat Modal */}
      <InAppChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        ownerName={selectedSeller.ownerName}
        ownerAvatar={selectedSeller.ownerAvatar}
        propertyName={selectedSeller.name}
      />

      {/* 8. Society Flat Directory & Intercom Calling Modal */}
      {flatDirectoryModalOpen && selectedFlatDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
          <div className="bg-[#F8FAFC] rounded-3xl border-2 border-[#0F172A] w-full max-w-md p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  SOCIETY RESIDENT DIRECTORY
                </span>
                <h3 className="font-serif font-bold text-[#0F172A] text-base sm:text-lg">
                  {selectedFlatDetail.tower} - Flat {selectedFlatDetail.flatNo}
                </h3>
              </div>
              <button
                onClick={() => {
                  setFlatDirectoryModalOpen(false);
                  setIsIntercomCalling(false);
                  setIntercomConnected(false);
                }}
                className="p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flat & Owner Info Card */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Primary Resident:</span>
                <span className="font-bold text-[#0F172A]">{selectedFlatDetail.residentName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Flat Configuration:</span>
                <span className="font-semibold text-[#0F172A]">{selectedFlatDetail.bhk}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Intercom Extension:</span>
                <span className="font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">#{selectedFlatDetail.intercom}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Assigned Parking:</span>
                <span className="font-semibold text-[#0F172A] text-[11px]">{selectedFlatDetail.parkingSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Registered Vehicle:</span>
                <span className="font-mono font-bold text-slate-800">{selectedFlatDetail.carPlate}</span>
              </div>
            </div>

            {/* Intercom Calling Simulation Box */}
            {isIntercomCalling ? (
              <div className="p-4 bg-[#0F172A] text-white rounded-2xl text-center space-y-3 shadow-md animate-in fade-in">
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${intercomConnected ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
                  <span className="text-xs font-bold font-mono">
                    {intercomConnected ? '🟢 Call Connected (HD Voice)' : '📞 Ringing Flat Intercom # ' + selectedFlatDetail.intercom + '...'}
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">
                  {intercomConnected
                    ? 'Encrypted Society VoIP Intercom Active'
                    : 'Calling ' + selectedFlatDetail.residentName + ' (' + selectedFlatDetail.tower + ' - ' + selectedFlatDetail.flatNo + ')'}
                </p>
                <div className="flex justify-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      setIsIntercomCalling(false);
                      setIntercomConnected(false);
                    }}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-6 py-2 rounded-xl cursor-pointer"
                  >
                    End Intercom Call ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsIntercomCalling(true);
                    setIntercomConnected(false);
                    setTimeout(() => {
                      setIntercomConnected(true);
                    }, 2200);
                  }}
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#38BDF8]" />
                  <span>Call Society Intercom (#{selectedFlatDetail.intercom})</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=917393011350&text=${encodeURIComponent(
                      `👋 *Hi ${selectedFlatDetail.residentName} (${selectedFlatDetail.tower} - Flat ${selectedFlatDetail.flatNo})*,\nConnecting with you regarding our StaySetu Smart Society.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl text-xs font-bold text-[#128C7E] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setFlatDirectoryModalOpen(false);
                      setParkingCarNo(selectedFlatDetail.carPlate);
                      setParkingSlot(selectedFlatDetail.parkingSlot);
                      document.getElementById('wrong-parking-spotlight')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2.5 bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Car className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Parking Alert</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
