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
  Printer,
  CheckCheck,
  ArrowUp,
  Plus,
  MoreHorizontal,
} from 'lucide-react';
import { InAppChatModal } from '@/components/chat/InAppChatModal';
import { SocietyStore, HelperStaff, AmenityBooking, HelpdeskTicket, ParkingAlert, GateLog, AGMPoll } from '@/lib/societyStore';

type AppTab = 'HOME' | 'GATE' | 'PAYMENTS' | 'BAZAAR' | 'MY_FLAT';

interface ActivePass {
  id: string;
  type: 'DELIVERY' | 'CAB' | 'GUEST';
  title: string;
  detail: string;
  code: string;
  time: string;
}

interface SocietyNotice {
  id: string;
  title: string;
  body: string;
  time: string;
  category: 'MAINTENANCE' | 'COMMUNITY' | 'SECURITY';
  isRead: boolean;
}

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

  // ── 🏢 SOCIETY CAMPUS SELECTOR STATE ──
  const [societyPickerOpen, setSocietyPickerOpen] = useState(false);

  // ── 🔔 DYNAMIC NOTIFICATIONS & READ STATUS STATE ──
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [notices, setNotices] = useState<SocietyNotice[]>([
    {
      id: 'notif-1',
      title: '⚠️ DG Power Backup 30-Min Load Testing',
      body: 'Scheduled load testing on Wednesday from 11:00 AM to 11:30 AM across all high-rise towers. Elevators will operate on secondary UPS.',
      time: 'Today, 09:30 AM',
      category: 'MAINTENANCE',
      isRead: false,
    },
    {
      id: 'notif-2',
      title: '🏊 Swimming Pool Ozone Deep Cleaning',
      body: 'Semi-annual filtration & ozone deep cleaning on Friday 06:00 AM - 12:00 PM. Reopens Saturday morning.',
      time: 'Yesterday, 04:15 PM',
      category: 'COMMUNITY',
      isRead: false,
    },
    {
      id: 'notif-3',
      title: '🚗 Basement B1 Speed Limit Notice (10 km/h)',
      body: 'Security marshals will monitor speeding vehicles in ramps and basement driveways. Please drive safely.',
      time: '02 Sep 2026',
      category: 'SECURITY',
      isRead: true,
    },
  ]);

  const unreadNoticeCount = notices.filter(n => !n.isRead).length;

  const handleMarkAllNoticesAsRead = () => {
    setNotices(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // ── 🎫 ACTIVE PRE-APPROVED PASSES ON HOME ──
  const [activePasses, setActivePasses] = useState<ActivePass[]>([
    {
      id: 'pass-del-1',
      type: 'DELIVERY',
      title: 'Zomato Food Delivery',
      detail: 'Rider: Aman Kumar • Leave at Gate Desk',
      code: 'DEL-8841',
      time: 'Valid next 45 mins',
    },
  ]);

  // ── ACTIVE ROLE PERSONA (RESIDENT | GUARD | RWA) ──
  const [userRole, setUserRole] = useState<'RESIDENT' | 'GUARD' | 'RWA'>('RESIDENT');

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
          const parsed = JSON.parse(userRaw);
          setCurrentUser(parsed);
          if (parsed.role) {
            const normalizedRole = parsed.role.toUpperCase();
            if (normalizedRole === 'GUARD' || normalizedRole === 'RWA' || normalizedRole === 'RESIDENT') {
              setUserRole(normalizedRole as 'RESIDENT' | 'GUARD' | 'RWA');
            }
          }
        } catch {
          // ignore
        }
      }
      if (roleRaw) {
        const normalized = roleRaw.toUpperCase();
        if (normalized === 'GUARD' || normalized === 'RWA' || normalized === 'RESIDENT') {
          setUserRole(normalized as 'RESIDENT' | 'GUARD' | 'RWA');
        }
      }
      setIsAuthChecking(false);
    }
  }, [router]);

  const handleRoleChange = (newRole: 'RESIDENT' | 'GUARD' | 'RWA') => {
    setUserRole(newRole);
    localStorage.setItem('staysetu-role', newRole);
    if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      setCurrentUser(updated);
      localStorage.setItem('staysetu-current-user', JSON.stringify(updated));
    }
    window.dispatchEvent(new Event('storage'));
  };

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

  // ── 3. RWA FINANCIAL TRANSPARENCY & GST INVOICE ──
  const [ledgerModalOpen, setLedgerModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

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

  // Guard Terminal State
  const [guardBoomStatus, setGuardBoomStatus] = useState<'CLOSED' | 'OPEN'>('CLOSED');
  const [guardSearchQuery, setGuardSearchQuery] = useState('');
  const [guardVerificationResult, setGuardVerificationResult] = useState<{
    found: boolean;
    title: string;
    detail: string;
    code: string;
    flat: string;
    type: string;
  } | null>(null);
  const [guardPackages, setGuardPackages] = useState([
    { id: 'pkg-1', flat: 'Tower A - Flat 102', courier: 'Amazon Box #24', time: '10:30 AM', status: 'WAITING_PICKUP' },
    { id: 'pkg-2', flat: 'Tower B - Flat 304', courier: 'Zomato Meal Desk', time: '11:15 AM', status: 'WAITING_PICKUP' },
    { id: 'pkg-3', flat: 'Tower C - Flat 501', courier: 'BlueDart Document', time: 'Yesterday', status: 'COLLECTED' },
  ]);

  // ── RWA ADMIN DESK STATES ──
  const [rwaNoticeTitle, setRwaNoticeTitle] = useState('');
  const [rwaNoticeBody, setRwaNoticeBody] = useState('');
  const [rwaNoticeCategory, setRwaNoticeCategory] = useState<'MAINTENANCE' | 'SECURITY' | 'COMMUNITY'>('MAINTENANCE');
  const [rwaNoticeBroadcasted, setRwaNoticeBroadcasted] = useState(false);
  const [rwaNewPollTitle, setRwaNewPollTitle] = useState('');
  const [rwaPollCreated, setRwaPollCreated] = useState(false);

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

  // ── 🎁 ANIMATED SPOTLIGHT & RESIDENT PERKS CAROUSEL ──
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const SPOTLIGHT_SLIDES = [
    {
      id: 'voice-pass',
      tag: 'AI INNOVATION',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      title: '🎙️ Hands-Free AI Voice Gate Pass',
      subtitle: 'Bolkar 3 seconds me delivery & cab entry pass generate karein bina type kiye.',
      ctaText: 'Try Voice Pass 🎙️',
      gradient: 'from-[#0B192C] via-[#1E3E62] to-[#000000]',
      badge: '3-Sec Pass',
      accentColor: '#38BDF8',
      action: () => {
        setActiveTab('GATE');
        setTimeout(() => {
          document.getElementById('voice-pass-card')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'wrong-parking',
      tag: 'SMART AI RADAR',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
      title: '📸 Wrong Parking Photo Scanner',
      subtitle: 'Slot me khadi anjaan gaadi ki photo kheencho — AI car owner ko 10 min me alert bhejega.',
      ctaText: 'Scan Car Plate 📸',
      gradient: 'from-[#1A0B2E] via-[#311465] to-[#0F051D]',
      badge: '10-Min SLA',
      accentColor: '#F43F5E',
      action: () => {
        setActiveTab('GATE');
        setTimeout(() => {
          document.getElementById('wrong-parking-card')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'maid-radar',
      tag: 'STAFF SECURITY',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      title: '🛡️ Domestic Staff Biometric Radar',
      subtitle: 'Check karein aapki maid ya cook kab society gate par enter hui real-time timestamp ke sath.',
      ctaText: 'Check Helper Radar 👥',
      gradient: 'from-[#0A2647] via-[#144272] to-[#051923]',
      badge: 'Live Gate Status',
      accentColor: '#C084FC',
      action: () => {
        setActiveTab('GATE');
      },
    },
    {
      id: 'maintenance-cashback',
      tag: 'TOWNSHIP FINANCE',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      title: '⚡ Zero Late-Fee Maintenance Pay',
      subtitle: 'UPI/Cards se society maintenance pay karein aur 1-click GST tax invoice download karein.',
      ctaText: 'Pay Dues & Get Receipt 🧾',
      gradient: 'from-[#062C30] via-[#055E68] to-[#011F26]',
      badge: 'Instant GST Receipt',
      accentColor: '#34D399',
      action: () => {
        setActiveTab('PAYMENTS');
      },
    },
    {
      id: 'urban-company-perk',
      tag: 'EXCLUSIVE RESIDENT PERK',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      title: '🎁 Urban Company AC & Deep Cleaning',
      subtitle: 'StaySetu residents ke liye flat 25% Off + free lobby visit using coupon code.',
      ctaText: copiedCoupon ? 'Coupon Copied! ✓' : 'Copy Code: STAYSETU25 📋',
      gradient: 'from-[#2C1810] via-[#5C2E16] to-[#1A0D08]',
      badge: 'Flat 25% OFF',
      accentColor: '#FBBF24',
      action: () => {
        navigator.clipboard?.writeText('STAYSETU25');
        setCopiedCoupon(true);
        setTimeout(() => setCopiedCoupon(false), 2500);
      },
    },
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpotlightIndex(prev => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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
    SocietyStore.addGateLog('FASTTAG', '🟢 Manual Boom Barrier Raised (Gate #1 - Main Society Entrance)', isNetworkOnline ? 'Cloud Synced' : 'Saved to Local DB', isNetworkOnline);
    setTimeout(() => setGuardBoomStatus('CLOSED'), 3500);
  };

  const handleGuardVerifyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = guardSearchQuery.trim().toUpperCase();
    if (!clean) return;

    // Check active passes
    const foundPass = activePasses.find(p => p.code.toUpperCase() === clean || p.title.toUpperCase().includes(clean));
    if (foundPass) {
      setGuardVerificationResult({
        found: true,
        title: foundPass.title,
        detail: foundPass.detail,
        code: foundPass.code,
        flat: currentUser?.flat || 'Tower A - Flat 102',
        type: foundPass.type,
      });
      return;
    }

    if (clean.includes('DEL') || clean.includes('ZOMATO') || clean.includes('SWIGGY') || clean.includes('AMAZON') || clean.includes('8841')) {
      setGuardVerificationResult({
        found: true,
        title: 'Zomato Food Delivery (Rider Aman Kumar)',
        detail: 'Pre-Approved by Resident • Leave at Gate Desk or Lobby',
        code: clean || 'DEL-8841',
        flat: 'Tower A - Flat 102',
        type: 'DELIVERY',
      });
      return;
    }

    if (clean.includes('GST') || clean.includes('GUEST') || clean.includes('QR')) {
      setGuardVerificationResult({
        found: true,
        title: 'Resident Guest (WhatsApp QR Pass)',
        detail: 'Invited to Tower A - Flat 102 (Sudhanshu Pandey)',
        code: clean || 'GST-9281',
        flat: 'Tower A - Flat 102',
        type: 'GUEST',
      });
      return;
    }

    setGuardVerificationResult({
      found: false,
      title: 'Pass Code Not Found / Expired',
      detail: 'No active pre-approval found for this code. Please call resident via Intercom extension.',
      code: clean,
      flat: 'Unknown Flat',
      type: 'INVALID',
    });
  };

  const handleGuardAllowEntry = () => {
    if (!guardVerificationResult) return;
    SocietyStore.addGateLog(
      (guardVerificationResult.type as 'VISITOR' | 'DELIVERY' | 'CAB') || 'VISITOR',
      `🟢 Gate Clearance: ${guardVerificationResult.title} for ${guardVerificationResult.flat} (Pass: #${guardVerificationResult.code})`,
      'Cleared by Guard Chief Vikram',
      isNetworkOnline
    );
    setGuardBoomStatus('OPEN');
    setTimeout(() => setGuardBoomStatus('CLOSED'), 3500);
    setGuardVerificationResult(null);
    setGuardSearchQuery('');
  };

  const handleGuardToggleStaff = (staffId: string) => {
    SocietyStore.toggleHelperInCampus(staffId);
  };

  const handleBroadcastRwaNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rwaNoticeTitle.trim() || !rwaNoticeBody.trim()) return;

    const newNotice: SocietyNotice = {
      id: `notice-${Date.now()}`,
      title: rwaNoticeTitle.trim(),
      body: rwaNoticeBody.trim(),
      time: 'Just Now',
      category: rwaNoticeCategory,
      isRead: false,
    };

    setNotices(prev => [newNotice, ...prev]);
    SocietyStore.addNotice(newNotice.title, newNotice.body, newNotice.category);
    setRwaNoticeTitle('');
    setRwaNoticeBody('');
    setRwaNoticeBroadcasted(true);
    setTimeout(() => setRwaNoticeBroadcasted(false), 3000);
  };

  const handleCreateRwaPoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rwaNewPollTitle.trim()) return;

    const newPoll: AGMPoll = {
      id: `poll-${Date.now()}`,
      title: rwaNewPollTitle.trim(),
      yesVotes: 1,
      noVotes: 0,
      userVoted: null,
    };

    setForumPoll(newPoll);
    SocietyStore.setPoll(newPoll);
    setRwaNewPollTitle('');
    setRwaPollCreated(true);
    setTimeout(() => setRwaPollCreated(false), 3000);
  };

  const handleCloseTicketWithOtp = (ticketId: string, inputOtp: string) => {
    const success = SocietyStore.resolveTicket(ticketId, inputOtp);
    if (success) {
      alert(`✅ Helpdesk Ticket #${ticketId} closed successfully with OTP verification!`);
    } else {
      alert(`❌ Invalid OTP entered for ticket #${ticketId}. Please request correct OTP from resident.`);
    }
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
    setInvoiceModalOpen(true);
  };

  const handlePreApproveDelivery = () => {
    const passCode = `DEL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPass: ActivePass = {
      id: `pass-${Date.now()}`,
      type: 'DELIVERY',
      title: `${deliveryPartner} Delivery`,
      detail: leaveAtGate ? 'Leave at Gate Security Desk' : 'Direct Doorstep Clearance',
      code: passCode,
      time: 'Valid next 60 mins',
    };
    setActivePasses(prev => [newPass, ...prev]);
    SocietyStore.addGateLog(
      'DELIVERY',
      `🛵 Pre-Approved Delivery: ${deliveryPartner} (#${passCode}) for ${currentUser?.flat || 'Tower A - 102'}`,
      'Pre-Approved',
      isNetworkOnline
    );
    setDeliveryModalOpen(false);
  };

  const handlePreApproveCab = () => {
    const passCode = `CAB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPass: ActivePass = {
      id: `pass-${Date.now()}`,
      type: 'CAB',
      title: `${cabPartner} Cab (${cabPlate})`,
      detail: '0.4s FastTag Boom Entry Pre-Approved',
      code: passCode,
      time: 'Valid next 30 mins',
    };
    setActivePasses(prev => [newPass, ...prev]);
    SocietyStore.addGateLog(
      'CAB',
      `🚖 Pre-Approved Cab: ${cabPartner} (${cabPlate}) for ${currentUser?.flat || 'Tower A - 102'}`,
      'Pre-Approved',
      isNetworkOnline
    );
    setCabModalOpen(false);
  };

  const handleCreateGuestPass = () => {
    if (!guestName.trim()) {
      alert('Please enter guest name');
      return;
    }
    const passCode = `GST-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedGuestPass(passCode);
    const newPass: ActivePass = {
      id: `pass-${Date.now()}`,
      type: 'GUEST',
      title: `Guest: ${guestName}`,
      detail: `Invited to ${currentUser?.flat || 'Flat A-102'}`,
      code: passCode,
      time: 'Valid Today',
    };
    setActivePasses(prev => [newPass, ...prev]);
    SocietyStore.addGateLog(
      'VISITOR',
      `🎫 Guest Pass #${passCode}: ${guestName} for ${currentUser?.flat || 'Tower A - 102'}`,
      'Pass Active',
      isNetworkOnline
    );
  };

  const handleCancelPass = (passId: string) => {
    setActivePasses(prev => prev.filter(p => p.id !== passId));
  };

  const handleSwitchSociety = (societyName: string, flatName: string) => {
    const updatedUser = {
      ...(currentUser || {}),
      society: societyName,
      flat: flatName,
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('staysetu-current-user', JSON.stringify(updatedUser));
    setSocietyPickerOpen(false);
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
          
          {/* 🌿 StaySetu Brand Logo & Society Pill (Matching Reference Header) */}
          <div
            onClick={() => setSocietyPickerOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_12px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform">
              🌿
            </div>
            <div className="space-y-0.2">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-sm text-[#0F172A] tracking-tight">
                  StaySetu
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  {currentUser?.flat || 'A-102'}
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] font-semibold flex items-center gap-1 truncate max-w-[170px]">
                <Building2 className="w-3 h-3 text-[#2563EB] shrink-0" />
                <span className="truncate">{currentUser?.society?.split(',')[0] || 'Greenwood Grand'}</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400 shrink-0" />
              </p>
            </div>
          </div>

          {/* Quick Action Badges (SOS + Notice Bell + Profile Avatar) */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* 🚨 Emergency SOS Button */}
            <button
              type="button"
              onClick={() => setSosModalOpen(true)}
              className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white px-2.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(225,29,72,0.25)] flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
              title="Emergency SOS Alarm"
            >
              <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-wider">SOS</span>
            </button>

            {/* 🔔 Dynamic Notice Bell with Unread Badge */}
            <button
              type="button"
              onClick={() => {
                setNoticeModalOpen(true);
                handleMarkAllNoticesAsRead();
              }}
              className="relative p-2 bg-slate-100 hover:bg-slate-200/80 rounded-full text-[#0F172A] cursor-pointer transition-colors border border-slate-200/60"
              title="Society Circulars"
            >
              <Bell className="w-4 h-4 text-[#475569]" />
              {unreadNoticeCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2563EB] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {unreadNoticeCount}
                </span>
              )}
            </button>

            {/* 👤 Resident Profile Avatar */}
            <button
              type="button"
              onClick={() => setActiveTab('MY_FLAT')}
              className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer transition-transform active:scale-95 border border-slate-700"
              title="My Flat & Profile"
            >
              {(currentUser?.name || 'S').charAt(0).toUpperCase()}
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

      {/* ── 👥 MULTI-ROLE PERSONA SWITCHER (LIVE DEMO & ROLE SELECTOR) ── */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 sticky top-[57px] z-30 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-wider shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mode:</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 flex-1 max-w-[290px]">
            {[
              { role: 'RESIDENT' as const, label: '🏡 Resident' },
              { role: 'GUARD' as const,    label: '🛡️ Guard Desk' },
              { role: 'RWA' as const,      label: '🏛️ RWA Admin' },
            ].map(r => (
              <button
                key={r.role}
                type="button"
                onClick={() => handleRoleChange(r.role)}
                className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center leading-none ${
                  userRole === r.role
                    ? 'bg-[#2563EB] text-white shadow-xs font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN MOBILE APP CONTENT CONTAINER ── */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">

        {/* ═══════════════════════════════════════════════════════════════
            MODE 1: 🏡 RESIDENT SUPER-APP DASHBOARD
           ═══════════════════════════════════════════════════════════════ */}
        {userRole === 'RESIDENT' && (
          <>
            {/* ═══════════════════════════════════════════════════════════════
                TAB 1: 🏠 HOME (NOBROKERHOOD / MYGATE QUICK ACTION DASHBOARD)
                ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'HOME' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* ── 🏙️ TOWNSHIP PANORAMA ILLUSTRATION & FLOATING SEARCH BAR ── */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200/80 bg-white">
              {/* Township Vector Horizon Canvas */}
              <div className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-500 flex items-center justify-center">
                {/* Vector Horizon Background Art */}
                <svg className="absolute inset-0 w-full h-full object-cover opacity-30" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 160L40 120L80 140L140 100L180 120L240 80L300 130L360 90L400 120V160H0Z" fill="white" />
                  <rect x="45" y="60" width="25" height="100" rx="3" fill="white" opacity="0.5" />
                  <rect x="85" y="40" width="35" height="120" rx="4" fill="white" opacity="0.6" />
                  <rect x="135" y="70" width="30" height="90" rx="3" fill="white" opacity="0.4" />
                  <rect x="180" y="30" width="45" height="130" rx="4" fill="white" opacity="0.7" />
                  <rect x="240" y="55" width="35" height="105" rx="3" fill="white" opacity="0.5" />
                  <rect x="290" y="35" width="40" height="125" rx="4" fill="white" opacity="0.6" />
                  <rect x="345" y="65" width="30" height="95" rx="3" fill="white" opacity="0.4" />
                  <circle cx="60" cy="30" r="14" fill="#FEF08A" opacity="0.9" />
                </svg>

                {/* Society Name & Resident Pill on Hero */}
                <div className="relative z-10 text-center px-4 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span>{currentUser?.society || 'Greenwood Grand Township'}</span>
                  </div>
                  <h2 className="font-heading font-black text-xl text-white drop-shadow-md tracking-tight">
                    Welcome home, {currentUser?.name?.split(' ')[0] || 'Sudhanshu'}! 👋
                  </h2>
                  <p className="text-[11px] text-emerald-100 font-semibold drop-shadow-xs">
                    🏡 {currentUser?.flat || 'Tower A - Flat 102'} • Verified Resident
                  </p>
                </div>
              </div>

              {/* Floating Pill Search Bar */}
              <div className="p-3 bg-white border-t border-slate-100">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Find services, passes, domestic helpers, & flats..."
                    className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-semibold text-[#0F172A] placeholder:text-slate-400 rounded-full pl-9 pr-4 py-2.5 border border-slate-200/80 shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ── 💳 MINT-LIME SMART WALLET & QUICK ACTIONS CARD (EXACT REFERENCE STYLE) ── */}
            <div className="bg-gradient-to-r from-[#DCFCE7] via-[#F0FDF4] to-[#BBF7D0] rounded-3xl p-4.5 border border-emerald-300/80 shadow-[0_8px_25px_rgba(16,185,129,0.1)]">
              <div className="flex items-center justify-between">
                
                {/* Brand & Live Balance */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <span className="font-heading font-black text-sm tracking-tight flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      staysetu <span className="font-light text-[10px] text-emerald-700 uppercase font-mono">pay</span>
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-emerald-700 text-lg font-bold">₹</span>
                    <span className="font-heading font-black text-3xl text-[#0F172A] tracking-tight">
                      {meterBalance.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-900 font-bold flex items-center gap-1">
                    <span>⚡ Prepaid Electricity</span>
                    <span>•</span>
                    <span className={maintenancePaid ? 'text-emerald-700 font-black' : 'text-amber-800 font-black'}>
                      {maintenancePaid ? 'Dues Cleared ✓' : 'Maint Due: ₹3,540'}
                    </span>
                  </p>
                </div>

                {/* 3 Circular Action Buttons (Pay, Top Up, SOS) */}
                <div className="flex items-center gap-3">
                  {/* Pay Maintenance */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('PAYMENTS')}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-emerald-200/90 flex items-center justify-center text-[#0F172A] group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <ArrowUp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0F172A]">Pay</span>
                  </button>

                  {/* Top Up Meter */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = SocietyStore.rechargeSmartMeter(500);
                      setMeterBalance(updated);
                      alert('⚡ Smart Meter recharged with ₹500 via UPI!');
                    }}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-emerald-200/90 flex items-center justify-center text-[#0F172A] group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0F172A]">Top Up</span>
                  </button>

                  {/* Quick SOS / Intercom */}
                  <button
                    type="button"
                    onClick={() => setSosModalOpen(true)}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-emerald-200/90 flex items-center justify-center text-[#0F172A] group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                      <ShieldAlert className="w-4 h-4 text-rose-600 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0F172A]">SOS</span>
                  </button>
                </div>

              </div>
            </div>

            {/* ── 📱 8 SUPER-APP SERVICE TILES (WHITE ROUNDED CARDS WITH 3D-STYLE GRAPHICS) ── */}
            <div>
              <div className="flex items-center justify-between mb-2.5 px-1">
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  ⚡ Quick Passes &amp; Community Services
                </p>
                <span className="text-[10px] text-[#64748B] font-semibold">1-Tap Approvals</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {[
                  {
                    id: 'delivery',
                    label: 'Delivery',
                    sub: 'Swiggy/Zomato',
                    icon: PackageCheck,
                    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white',
                    cardBg: 'hover:border-orange-200',
                    onClick: () => setDeliveryModalOpen(true),
                  },
                  {
                    id: 'cab',
                    label: 'Allow Cab',
                    sub: 'Uber/Ola',
                    icon: Car,
                    iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600 text-white',
                    cardBg: 'hover:border-blue-200',
                    onClick: () => setCabModalOpen(true),
                  },
                  {
                    id: 'guest',
                    label: 'Invite Guest',
                    sub: 'WhatsApp Pass',
                    icon: QrCode,
                    iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white',
                    cardBg: 'hover:border-emerald-200',
                    onClick: () => setGuestModalOpen(true),
                  },
                  {
                    id: 'maid',
                    label: 'Helper Radar',
                    sub: 'Maid/Cook',
                    icon: Users,
                    iconBg: 'bg-gradient-to-br from-purple-400 to-indigo-600 text-white',
                    cardBg: 'hover:border-purple-200',
                    onClick: () => setMaidModalOpen(true),
                  },
                  {
                    id: 'parking',
                    label: 'Wrong Park',
                    sub: 'Camera Snap',
                    icon: Camera,
                    iconBg: 'bg-gradient-to-br from-rose-400 to-red-600 text-white',
                    cardBg: 'hover:border-rose-200',
                    onClick: () => {
                      setActiveTab('GATE');
                      setTimeout(() => {
                        document.getElementById('wrong-parking-card')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    },
                  },
                  {
                    id: 'meter',
                    label: 'Smart Meter',
                    sub: 'Recharge UPI',
                    icon: Zap,
                    iconBg: 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white',
                    cardBg: 'hover:border-amber-200',
                    onClick: () => {
                      const updated = SocietyStore.rechargeSmartMeter(500);
                      setMeterBalance(updated);
                      alert('⚡ Smart Meter recharged with ₹500 via UPI!');
                    },
                  },
                  {
                    id: 'club',
                    label: 'Clubhouse',
                    sub: 'Court & Pool',
                    icon: CalendarDays,
                    iconBg: 'bg-gradient-to-br from-teal-400 to-cyan-600 text-white',
                    cardBg: 'hover:border-teal-200',
                    onClick: () => setAmenityModalOpen(true),
                  },
                  {
                    id: 'help',
                    label: '2-Hr SLA',
                    sub: 'Helpdesk',
                    icon: Wrench,
                    iconBg: 'bg-gradient-to-br from-slate-600 to-slate-800 text-white',
                    cardBg: 'hover:border-slate-300',
                    onClick: () => setHelpdeskModalOpen(true),
                  },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.onClick}
                      className={`bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer group min-h-[96px] ${item.cardBg}`}
                    >
                      <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 drop-shadow-xs" />
                      </div>
                      <div className="space-y-0.5 leading-tight">
                        <span className="font-heading font-extrabold text-[11px] text-[#0F172A] block truncate">
                          {item.label}
                        </span>
                        <span className="text-[9px] font-semibold text-[#64748B] block truncate">
                          {item.sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 🎁 STAYSETU PLUS PERKS BANNER (MATCHING REFERENCE MOCKUP) ── */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-amber-50 border border-emerald-200/90 p-4 shadow-[0_8px_25px_rgba(16,185,129,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                    Enjoy the benefits of StaySetu Plus
                  </span>
                  <h4 className="font-heading font-extrabold text-xs text-[#0F172A] leading-snug">
                    Get 25% off in home deep cleaning &amp; AC service
                  </h4>
                  <p className="text-[10px] text-[#64748B]">
                    Urban Company Code: <span className="font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200">STAYSETU25</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('🎉 Urban Company 25% Voucher STAYSETU25 copied to clipboard!')}
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-[10px] font-bold px-3 py-2 rounded-xl shadow-sm shrink-0 cursor-pointer transition-transform active:scale-95"
                >
                  Claim →
                </button>
              </div>
            </div>

            {/* ── ✨ ANIMATED STAYSETU SPOTLIGHT & RESIDENT PERKS SHOWCASE ── */}
            <div className="relative overflow-hidden rounded-3xl p-5 text-white shadow-[0_12px_35px_rgba(15,23,42,0.16)] border border-slate-700/60 transition-all duration-700 ease-in-out">
              {/* Background gradient from active slide */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${SPOTLIGHT_SLIDES[activeSpotlightIndex].gradient} transition-all duration-700`}
              />
              
              {/* Animated Background Glow Pulse */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

              <div className="relative z-10 space-y-3">
                {/* Header row: Tag + Badge + Dots */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-xs ${SPOTLIGHT_SLIDES[activeSpotlightIndex].tagColor}`}>
                      {SPOTLIGHT_SLIDES[activeSpotlightIndex].tag}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-white">
                      {SPOTLIGHT_SLIDES[activeSpotlightIndex].badge}
                    </span>
                  </div>

                  {/* Interactive Slide Dots */}
                  <div className="flex items-center gap-1.5">
                    {SPOTLIGHT_SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSpotlightIndex(idx)}
                        className={`transition-all rounded-full cursor-pointer ${
                          activeSpotlightIndex === idx
                            ? 'w-5 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                        title={s.title}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-base text-white tracking-tight">
                    {SPOTLIGHT_SLIDES[activeSpotlightIndex].title}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {SPOTLIGHT_SLIDES[activeSpotlightIndex].subtitle}
                  </p>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={SPOTLIGHT_SLIDES[activeSpotlightIndex].action}
                    className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{SPOTLIGHT_SLIDES[activeSpotlightIndex].ctaText}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                  </button>

                  <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                    <span>StaySetu Live Feature</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── ACTIVE PRE-APPROVED PASSES WIDGET ── */}
            {activePasses.length > 0 && (
              <div className="bg-white rounded-3xl p-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F172A] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active Gate Passes ({activePasses.length})</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#2563EB]">Live at Guard Terminal</span>
                </div>

                <div className="space-y-2">
                  {activePasses.map(pass => (
                    <div
                      key={pass.id}
                      className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#0F172A]">{pass.title}</span>
                          <span className="font-mono text-[9px] font-bold bg-white px-1.5 py-0.5 rounded text-emerald-800 border border-emerald-200">
                            #{pass.code}
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-900">{pass.detail}</p>
                        <p className="text-[9px] text-[#64748B]">{pass.time}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCancelPass(pass.id)}
                        className="text-[10px] font-bold text-rose-700 bg-white hover:bg-rose-50 px-2.5 py-1.5 rounded-xl border border-rose-200 shadow-2xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Helper Biometric Attendance Radar Snippet */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#0F172A]">
                    Domestic Staff Active on Campus
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
                <p className="font-bold text-sm text-[#0F172A]">Balance: ₹{meterBalance}</p>
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
                  <span className="font-bold text-sm text-[#0F172A]">Voice Gate Pass (Hands-Free)</span>
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
                  <span className="font-bold text-sm text-[#0F172A]">Wrong Parking Photo Alert</span>
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

            {/* Resident Registered Vehicles & FastTag Status */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0F172A]">
                  🚗 My Registered Vehicles &amp; FastTag
                </span>
                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  Auto-ANPR Active
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200/70 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">DL8C AB 1234</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Car (Sedan)</span>
                    </div>
                    <p className="text-[10px] text-[#64748B]">Allotted Slot: Basement B1 - Slot #12</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-xl">
                    FastTag Linked ✓
                  </span>
                </div>

                <div className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200/70 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">UP16 BZ 5519</span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">Two-Wheeler (EV)</span>
                    </div>
                    <p className="text-[10px] text-[#64748B]">Slot: EV Bay #04</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-xl">
                    RFID Active ✓
                  </span>
                </div>
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
                  <h3 className="font-bold text-lg text-[#0F172A]">September Maintenance</h3>
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

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePayMaintenance}
                  disabled={maintenancePaid}
                  className={`flex-1 py-3.5 rounded-2xl text-xs font-bold cursor-pointer shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                    maintenancePaid ? 'bg-emerald-700 text-white' : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{maintenancePaid ? 'Maintenance Paid via UPI ✓' : 'Pay ₹3,540 via 1-Click UPI'}</span>
                </button>

                {maintenancePaid && (
                  <button
                    type="button"
                    onClick={() => setInvoiceModalOpen(true)}
                    className="p-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-200"
                    title="Download GST Invoice"
                  >
                    <Download className="w-4 h-4" />
                    <span>Receipt</span>
                  </button>
                )}
              </div>
            </div>

            {/* Sinking Fund & RWA Audited Ledger */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0F172A]">
                  🏛️ RWA Audited Transparency Statement
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  100% Audited
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-[#64748B] block">SINKING FUND (HDFC)</span>
                  <span className="font-bold text-sm text-[#0F172A]">₹1.15 Crores</span>
                </div>
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-[#64748B] block">COLLECTION THIS MONTH</span>
                  <span className="font-bold text-sm text-emerald-700">₹38,42,000</span>
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

              <h4 className="font-bold text-xs text-[#0F172A] leading-relaxed">
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
                <span className="font-bold text-xs text-[#0F172A]">
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
                      <h5 className="font-bold text-xs text-[#0F172A] truncate">{item.title}</h5>
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
                <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white font-bold text-lg flex items-center justify-center shadow-xs">
                  {(currentUser?.name || 'S').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0F172A]">{currentUser?.name || 'Sudhanshu Pandey'}</h3>
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
                <span className="font-bold text-xs text-[#0F172A]">
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

            {/* Leadership Info */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <span className="font-bold text-xs text-[#0F172A] block">
                🏢 StaySetu Leadership &amp; Support
              </span>
              <div className="space-y-2 text-xs text-[#475569]">
                <div className="flex items-center justify-between p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60">
                  <span>Sudhanshu Pandey (Founder &amp; CEO)</span>
                  <span className="text-[10px] font-bold text-[#2563EB]">Verified</span>
                </div>
              </div>
            </div>

            {/* Guard Terminal Mode Switcher */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-[#0F172A]">🛡️ Security Guard Terminal Mode</p>
                <p className="text-[10px] text-[#64748B]">For Gate security personnel &amp; guards</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUserRole('GUARD');
                  localStorage.setItem('staysetu-role', 'GUARD');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-slate-100 hover:bg-slate-200 text-[#0F172A]"
              >
                Switch to Guard
              </button>
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

        </>
      )}

        {/* ═══════════════════════════════════════════════════════════════
            MODE 2: 🛡️ SECURITY GUARD & BOOM BARRIER TERMINAL
           ═══════════════════════════════════════════════════════════════ */}
        {userRole === 'GUARD' && (
          <div className="space-y-4 animate-in fade-in duration-200">

            {/* 🛡️ Guard Chief Terminal Header Card */}
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-5 text-white shadow-[0_15px_35px_rgba(15,23,42,0.18)] border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    🛡️
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Gate #1 Main Entrance</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-base text-white">Chief Officer Vikram Singh</h2>
                    <p className="text-[10px] text-slate-300">Shift: Morning 07:00 AM - 03:00 PM • ANPR Camera #01 Active</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold border border-white/10"
                  title="Guard Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Gate Stats Bar */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/80 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Vehicles In</span>
                  <span className="font-heading font-extrabold text-sm text-white">184 Today</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Staff Inside</span>
                  <span className="font-heading font-extrabold text-sm text-emerald-400">
                    {helpers.filter(h => h.isInsideCampus).length} / {helpers.length}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Packages</span>
                  <span className="font-heading font-extrabold text-sm text-amber-400">
                    {guardPackages.filter(p => p.status === 'WAITING_PICKUP').length} at Desk
                  </span>
                </div>
              </div>
            </div>

            {/* 🛑 1. ANPR BOOM BARRIER LIVE CONTROLLER */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-blue-50 text-[#2563EB]">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">ANPR FastTag Boom Barrier</h3>
                    <p className="text-[10px] text-[#64748B]">Auto-scans RFID / FastTag in 0.4s</p>
                  </div>
                </div>

                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                  guardBoomStatus === 'OPEN' ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-rose-100 text-rose-800'
                }`}>
                  {guardBoomStatus === 'OPEN' ? '🟢 BARRIER RAISED' : '🔴 BARRIER LOCKED'}
                </span>
              </div>

              {/* Big Action Button for Guard */}
              <button
                type="button"
                onClick={handleGuardOpenBoom}
                className={`w-full py-4 rounded-2xl font-heading font-extrabold text-sm shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  guardBoomStatus === 'OPEN'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
                }`}
              >
                {guardBoomStatus === 'OPEN' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Barrier is Open (Auto-closing in 3s...)</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-[#38BDF8]" />
                    <span>Raise Boom Barrier (Manual Clearance)</span>
                  </>
                )}
              </button>
            </div>

            {/* 🔍 2. VISITOR / DELIVERY PASS CODE VERIFIER */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">Visitor &amp; Delivery Pass Lookup</h3>
                    <p className="text-[10px] text-[#64748B]">Search pass code (e.g. DEL-8841, GST-9281)</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleGuardVerifyLookup} className="flex gap-2">
                <input
                  type="text"
                  value={guardSearchQuery}
                  onChange={e => setGuardSearchQuery(e.target.value)}
                  placeholder="Enter 4 or 8-digit Pass Code..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A] uppercase placeholder:normal-case focus:outline-none focus:border-[#0F172A]"
                />
                <button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-transform active:scale-95 shrink-0"
                >
                  Verify
                </button>
              </form>

              {/* Verification Result Card */}
              {guardVerificationResult && (
                <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150 ${
                  guardVerificationResult.found
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      guardVerificationResult.found ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                    }`}>
                      {guardVerificationResult.found ? '✓ PASS VALID' : '✕ INVALID / EXPIRED'}
                    </span>
                    <span className="font-mono font-bold text-[11px]">#{guardVerificationResult.code}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">{guardVerificationResult.title}</h4>
                    <p className="text-[11px] text-[#475569] mt-0.5">{guardVerificationResult.detail}</p>
                    <p className="text-[11px] font-bold text-[#2563EB] mt-1">🏡 Destination: {guardVerificationResult.flat}</p>
                  </div>

                  {guardVerificationResult.found && (
                    <button
                      type="button"
                      onClick={handleGuardAllowEntry}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Allow Gate Entry &amp; Raise Barrier</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 👥 3. DOMESTIC STAFF BIOMETRIC GATE PUNCH */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">Staff Biometric Attendance</h3>
                    <p className="text-[10px] text-[#64748B]">Maid, Cook &amp; Driver Entry/Exit Punch</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {helpers.map(helper => (
                  <div
                    key={helper.id}
                    className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${helper.isInsideCampus ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        <span className="font-bold text-[#0F172A]">{helper.name}</span>
                        <span className="text-[10px] text-[#64748B]">({helper.role})</span>
                      </div>
                      <p className="text-[10px] text-[#64748B]">
                        {helper.isInsideCampus ? `🟢 Inside: ${helper.currentLocation}` : '⚪ Outside Campus'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleGuardToggleStaff(helper.id)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-transform active:scale-95 cursor-pointer ${
                        helper.isInsideCampus
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {helper.isInsideCampus ? 'Punch OUT' : 'Punch IN'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 📦 4. GATE PACKAGE VAULT DESK */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-amber-50 text-amber-700">
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">Package Desk Vault</h3>
                    <p className="text-[10px] text-[#64748B]">Parcels held at Main Security Desk</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {guardPackages.map(pkg => (
                  <div
                    key={pkg.id}
                    className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0F172A]">{pkg.courier}</span>
                        <span className="text-[10px] font-semibold text-[#2563EB]">{pkg.flat}</span>
                      </div>
                      <p className="text-[9px] text-[#64748B]">Arrived: {pkg.time}</p>
                    </div>

                    {pkg.status === 'WAITING_PICKUP' ? (
                      <button
                        type="button"
                        onClick={() => {
                          setGuardPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, status: 'COLLECTED' } : p));
                          alert(`📦 Handover confirmed for ${pkg.courier} to ${pkg.flat}`);
                        }}
                        className="px-2.5 py-1 bg-[#0F172A] text-white rounded-xl text-[10px] font-bold cursor-pointer"
                      >
                        Handover
                      </button>
                    ) : (
                      <span className="text-[10px] text-emerald-700 font-bold">Collected ✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 🚨 5. WRONG PARKING CLAMP ALERT */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-rose-50 text-rose-700">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">Wrong Parking Marshals</h3>
                    <p className="text-[10px] text-[#64748B]">Wheel clamp &amp; fine enforcement</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-rose-50/80 rounded-2xl border border-rose-200/60 text-xs space-y-2">
                <div className="flex justify-between font-bold text-rose-950">
                  <span>🚗 UP14 EX 9988</span>
                  <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded">Basement B1 - Slot #42</span>
                </div>
                <p className="text-[11px] text-[#475569]">Reported by Flat A-102. Timer running (10-min grace period).</p>
                <button
                  type="button"
                  onClick={() => alert('🚨 Security Marshal dispatched with Wheel-Clamp to Basement B1 Slot #42!')}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Dispatch Marshal with Wheel Clamp
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            MODE 3: 🏛️ RWA GOVERNANCE & TOWNSHIP ADMIN DESK
           ═══════════════════════════════════════════════════════════════ */}
        {userRole === 'RWA' && (
          <div className="space-y-4 animate-in fade-in duration-200">

            {/* 🏛️ RWA President & Governance Header */}
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-5 text-white shadow-[0_15px_35px_rgba(15,23,42,0.18)] border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-900 font-bold flex items-center justify-center text-sm shadow-xs">
                    🏛️
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">RWA Executive Committee</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-base text-white">Greenwood Grand RWA Desk</h2>
                    <p className="text-[10px] text-slate-300">Society Reg No: RWA-HR-2024/9912 • President Desk</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold border border-white/10"
                  title="RWA Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* RWA Financial Ledger Summary */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/80 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-left">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Sinking Fund Reserve</span>
                  <span className="font-heading font-extrabold text-base text-white">₹1.15 Crores</span>
                  <span className="text-[9px] text-emerald-400 font-semibold block">Audited HDFC Escrow</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-left">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">September Collection</span>
                  <span className="font-heading font-extrabold text-base text-emerald-400">₹38,42,000</span>
                  <span className="text-[9px] text-slate-300 font-semibold block">90.4% Paid (452 Flats)</span>
                </div>
              </div>
            </div>

            {/* 📢 1. BROADCAST OFFICIAL SOCIETY CIRCULAR */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-blue-50 text-[#2563EB]">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">Broadcast Society Notice</h3>
                    <p className="text-[10px] text-[#64748B]">Sends instant alert to all flat owners</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleBroadcastRwaNotice} className="space-y-2.5 text-xs">
                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Notice Headline</label>
                  <input
                    type="text"
                    value={rwaNoticeTitle}
                    onChange={e => setRwaNoticeTitle(e.target.value)}
                    placeholder="e.g. ⚠️ Water Tank Cleaning Schedule on Saturday"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Circular Message</label>
                  <textarea
                    rows={2}
                    value={rwaNoticeBody}
                    onChange={e => setRwaNoticeBody(e.target.value)}
                    placeholder="Full notice message for residents..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-[#0F172A]"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {(['MAINTENANCE', 'SECURITY', 'COMMUNITY'] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setRwaNoticeCategory(cat)}
                      className={`py-1.5 rounded-xl text-[10px] font-bold border transition-colors ${
                        rwaNoticeCategory === cat ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-4 h-4" />
                  <span>{rwaNoticeBroadcasted ? 'Broadcasted to 500 Flats! ✓' : 'Dispatch Circular to All Flats'}</span>
                </button>
              </form>
            </div>

            {/* 🗳️ 2. RESIDENT AGM VOTING REFERENDUMS */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                    <Vote className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">AGM Resident Referendums</h3>
                    <p className="text-[10px] text-[#64748B]">Digital ballot &amp; quorum verification</p>
                  </div>
                </div>
              </div>

              {/* Active Ballot Result Card */}
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60 text-xs space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-[#2563EB]">🗳️ Active Ballot</span>
                  <span className="text-[#64748B]">{totalVotes} Resident Votes</span>
                </div>
                <h4 className="font-bold text-xs text-[#0F172A]">{forumPoll.title}</h4>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                  <div style={{ width: `${yesPercentage}%` }} className="bg-emerald-500 h-full" />
                  <div style={{ width: `${100 - yesPercentage}%` }} className="bg-rose-500 h-full" />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-emerald-700">👍 YES: {forumPoll.yesVotes} ({yesPercentage}%)</span>
                  <span className="text-rose-700">👎 NO: {forumPoll.noVotes} ({100 - yesPercentage}%)</span>
                </div>
              </div>

              {/* Create New Referendum Form */}
              <form onSubmit={handleCreateRwaPoll} className="space-y-2 text-xs pt-1 border-t border-slate-100">
                <label className="font-bold text-[#64748B] text-[10px] uppercase block">Create New AGM Resolution</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={rwaNewPollTitle}
                    onChange={e => setRwaNewPollTitle(e.target.value)}
                    placeholder="e.g. AGM 2026: Clubhouse Squash Court Addition"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Launch
                  </button>
                </div>
              </form>
            </div>

            {/* 🔧 3. 2-HOUR SLA HELPDESK RESOLUTION DESK */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-cyan-50 text-cyan-700">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">Helpdesk SLA Ticket Dispatch</h3>
                    <p className="text-[10px] text-[#64748B]">Assign plumbers &amp; electricians with OTP</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {helpdeskTickets.map(ticket => (
                  <div key={ticket.id} className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-[#0F172A]">#{ticket.id}: {ticket.category}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        ticket.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-cyan-100 text-cyan-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#475569]">{ticket.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                      <span>Technician: {ticket.assignedTechnician}</span>
                      <span className="font-bold text-[#2563EB]">OTP Required: {ticket.otpToClose}</span>
                    </div>
                    {ticket.status !== 'RESOLVED' && (
                      <button
                        type="button"
                        onClick={() => handleCloseTicketWithOtp(ticket.id, ticket.otpToClose)}
                        className="w-full py-2 bg-[#0F172A] text-white rounded-xl font-bold text-xs cursor-pointer"
                      >
                        Verify Resident OTP &amp; Mark Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 💰 4. MAINTENANCE DEFAULTERS & WHATSAPP REMINDER */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#0F172A]">Maintenance Due Reminders</h3>
                    <p className="text-[10px] text-[#64748B]">1-Tap WhatsApp due notice dispatch</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { flat: 'Tower B - Flat 302', name: 'Rakesh Verma', amount: '₹3,540', status: 'DUE' },
                  { flat: 'Tower C - Flat 404', name: 'Pooja Hegde', amount: '₹3,540', status: 'DUE' },
                  { flat: 'Tower A - Flat 102', name: 'Sudhanshu Pandey', amount: '₹3,540', status: maintenancePaid ? 'PAID' : 'DUE' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0F172A]">{item.flat} ({item.name})</p>
                      <p className="text-[10px] text-[#64748B]">September Due: {item.amount}</p>
                    </div>

                    {item.status === 'PAID' ? (
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        PAID ✓
                      </span>
                    ) : (
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `📢 Greenwood Grand RWA Notice: Dear ${item.name}, your September society maintenance of ${item.amount} is due. Please pay via StaySetu Super-App: https://stat-setu-app.vercel.app/`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>WhatsApp Due</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ── 2. NATIVE MOBILE APP FLOATING BOTTOM DOCK (SHOWN IN RESIDENT MODE) ── */}
      {userRole === 'RESIDENT' && (
        <nav className="fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.12)] rounded-full py-2 px-3">
          <div className="grid grid-cols-5 gap-1">
            {[
              { id: 'HOME', label: 'Home', icon: Home },
              { id: 'GATE', label: 'Gate', icon: Shield },
              { id: 'PAYMENTS', label: 'Dues', icon: CreditCard },
              { id: 'BAZAAR', label: 'Market', icon: ShoppingBag },
              { id: 'MY_FLAT', label: 'Profile', icon: User },
            ].map(tabItem => {
              const IconComponent = tabItem.icon;
              const isActive = activeTab === tabItem.id;
              return (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => setActiveTab(tabItem.id as AppTab)}
                  className={`flex flex-col items-center justify-center py-0.5 cursor-pointer transition-all ${
                    isActive ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-[#0F172A] text-white shadow-xs scale-105' : ''}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className={`text-[9px] tracking-tight mt-0.5 ${isActive ? 'font-black text-[#0F172A]' : 'font-medium text-[#64748B]'}`}>
                    {tabItem.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* ── 3. ALL NATIVE ACTION SHEET MODALS ── */}

      {/* 🏢 Interactive Society Picker Modal */}
      {societyPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 w-full max-w-md p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Select Society Campus</h3>
                <p className="text-[11px] text-[#64748B]">Switch between your registered residential units</p>
              </div>
              <button onClick={() => setSocietyPickerOpen(false)} className="text-[#64748B] hover:text-[#0F172A] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                {
                  name: 'Greenwood Grand Township, Gurugram',
                  flat: 'Tower A - Flat 102',
                  tag: 'Primary Residence (Active)',
                },
                {
                  name: 'DLF The Crest, Sector 54 Gurugram',
                  flat: 'Tower 3 - Flat 504',
                  tag: 'Secondary Apartment',
                },
                {
                  name: 'Godrej Woods, Sector 43 Noida',
                  flat: 'Tower Evergreen - Flat 802',
                  tag: 'Family Flat',
                },
              ].map((soc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSwitchSociety(soc.name, soc.flat)}
                  className={`w-full p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    currentUser?.society === soc.name
                      ? 'bg-blue-50/70 border-[#2563EB] shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">{soc.name}</span>
                    {currentUser?.society === soc.name && (
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-[#2563EB] mt-0.5">{soc.flat}</p>
                  <span className="text-[9px] font-bold text-[#64748B]">{soc.tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 📢 Dynamic Circulars & Notices Modal (With Mark as Read) */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 w-full max-w-md p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#0F172A] flex items-center gap-2">
                  <span>📢 Society Circulars</span>
                  {unreadNoticeCount > 0 && (
                    <span className="text-[10px] bg-[#2563EB] text-white font-bold px-2 py-0.5 rounded-full">
                      {unreadNoticeCount} New
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-[#64748B]">Official verified RWA notices</p>
              </div>
              <button onClick={() => setNoticeModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleMarkAllNoticesAsRead}
                className="text-[10px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All as Read</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {notices.map(notice => (
                <div
                  key={notice.id}
                  className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                    notice.isRead
                      ? 'bg-slate-50/70 border-slate-200/80 text-slate-700'
                      : 'bg-blue-50/40 border-blue-200 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">{notice.title}</span>
                    <span className="text-[9px] font-bold text-[#64748B]">{notice.time}</span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">{notice.body}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[9px]">
                    <span className="font-bold text-[#2563EB] uppercase">{notice.category}</span>
                    <span className="font-semibold text-emerald-700">Verified by Secretary ✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🧾 GST Tax Invoice Download View Modal */}
      {invoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-sm p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">PAYMENT SUCCESSFUL</span>
                <h3 className="font-bold text-base text-[#0F172A] mt-1">Official GST Tax Receipt</h3>
              </div>
              <button onClick={() => setInvoiceModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Invoice Number:</span>
                <span className="font-mono font-bold text-[#0F172A]">#GST-2026-9921</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Billed To:</span>
                <span className="font-bold text-[#0F172A]">Sudhanshu Pandey ({currentUser?.flat || 'A-102'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Society GSTIN:</span>
                <span className="font-mono font-bold text-[#0F172A]">07AAACS1234F1Z8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Maintenance (1,770 sqft):</span>
                <span className="font-bold text-[#0F172A]">₹3,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">CGST (9%) + SGST (9%):</span>
                <span className="font-bold text-[#0F172A]">₹540.00</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1.5 border-t border-slate-200 text-[#0F172A]">
                <span>Total Paid:</span>
                <span className="text-emerald-700">₹3,540.00 (UPI)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert('📥 PDF Invoice #GST-2026-9921 downloaded successfully!');
                setInvoiceModalOpen(false);
              }}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#38BDF8]" />
              <span>Download Official PDF Invoice</span>
            </button>
          </div>
        </div>
      )}

      {/* 🚨 Emergency SOS Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-rose-200 w-full max-w-sm p-6 space-y-4 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Trigger Society Emergency SOS?</h3>
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
              <h3 className="font-bold text-base text-[#0F172A]">🛵 Pre-Approve Delivery</h3>
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
              <h3 className="font-bold text-base text-[#0F172A]">🚖 Pre-Approve Cab</h3>
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
              <h3 className="font-bold text-base text-[#0F172A]">🎫 Invite Guest (WhatsApp QR)</h3>
              <button onClick={() => setGuestModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              {generatedGuestPass ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">PASS ACTIVE</span>
                  <p className="font-bold text-xl text-[#0F172A]">{generatedGuestPass}</p>
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
              <h3 className="font-bold text-base text-[#0F172A]">Request Backup Domestic Help</h3>
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
              <h3 className="font-bold text-base text-[#0F172A]">Raise 2-Hour SLA Ticket</h3>
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
              <h3 className="font-bold text-base text-[#0F172A]">Book Clubhouse Amenity</h3>
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
              <h3 className="font-bold text-base text-[#0F172A]">Shifting Truck &amp; Lift Pass</h3>
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
