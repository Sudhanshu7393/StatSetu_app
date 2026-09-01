'use client';

// StaySetu Unified Society Data & Persistence Engine
// Manages real-time interconnected state between Resident, Guard, and RWA Admin.

export interface SocietyFlat {
  id: string;
  tower: string;
  flatNo: string;
  residentName: string;
  residentPhone: string;
  intercom: string;
  bhk: string;
  carPlate?: string;
  parkingSlot?: string;
  maintenanceStatus: 'PAID' | 'DUE';
  maintenanceAmount: number;
}

export interface HelperStaff {
  id: string;
  name: string;
  role: string;
  rating: number;
  phone: string;
  currentLocation: string; // e.g. 'Inside Tower A'
  isInsideCampus: boolean;
  ratePerDay: number;
  isBookedToday: boolean;
}

export interface AmenityBooking {
  id: string;
  amenityName: string;
  slot: string;
  bookedByFlat: string;
  qrPassCode: string;
  timestamp: string;
}

export interface HelpdeskTicket {
  id: string;
  category: string;
  description: string;
  raisedByFlat: string;
  assignedTechnician: string;
  technicianPhone: string;
  slaMinutesRemaining: number;
  otpToClose: string;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED';
  timestamp: string;
}

export interface ParkingAlert {
  id: string;
  carPlate: string;
  blockedSlot: string;
  ownerFlat: string;
  status: 'PENDING' | 'RESOLVED' | 'FINABLE';
  countdownMinutes: number;
  timestamp: string;
}

export interface GateLog {
  id: string;
  type: 'FASTTAG' | 'VISITOR' | 'DELIVERY' | 'SHIFTING';
  detail: string;
  status: string;
  timestamp: string;
  synced: boolean;
}

export interface AGMPoll {
  id: string;
  title: string;
  yesVotes: number;
  noVotes: number;
  userVoted: 'YES' | 'NO' | null;
}

// Initial Seed Dataset
const SEED_FLATS: SocietyFlat[] = [
  { id: 'f1', tower: 'Tower C', flatNo: '402', residentName: 'Ankit Sharma', residentPhone: '73930 11350', intercom: '1402', bhk: '3 BHK', carPlate: 'UP14 EX 9988', parkingSlot: 'Basement B1 - Slot #42', maintenanceStatus: 'DUE', maintenanceAmount: 3540 },
  { id: 'f2', tower: 'Tower A', flatNo: '102', residentName: 'Sudhanshu Pandey', residentPhone: '73930 11350', intercom: '1102', bhk: '3 BHK', carPlate: 'DL8C AB 1234', parkingSlot: 'Basement B1 - Slot #12', maintenanceStatus: 'PAID', maintenanceAmount: 3540 },
  { id: 'f3', tower: 'Tower B', flatNo: '204', residentName: 'Neha Kapoor', residentPhone: '73930 11350', intercom: '1204', bhk: '2 BHK', carPlate: 'HR26 DK 5544', parkingSlot: 'Basement B2 - Slot #18', maintenanceStatus: 'PAID', maintenanceAmount: 2850 },
  { id: 'f4', tower: 'Tower D', flatNo: '801', residentName: 'Rajesh Verma', residentPhone: '73930 11350', intercom: '1801', bhk: '4 BHK Penthouse', carPlate: 'UP16 ZQ 7700', parkingSlot: 'Basement B1 - Slot #88', maintenanceStatus: 'DUE', maintenanceAmount: 4800 },
];

const SEED_HELPERS: HelperStaff[] = [
  { id: 'h1', name: 'Sunita Devi', role: 'Cook & Cleaning', rating: 4.9, phone: '+91 98711 88001', currentLocation: 'Inside Tower A', isInsideCampus: true, ratePerDay: 200, isBookedToday: false },
  { id: 'h2', name: 'Ramesh Kumar', role: 'Deep Cleaning & Dusting', rating: 4.8, phone: '+91 98711 88002', currentLocation: 'Inside Tower D', isInsideCampus: true, ratePerDay: 250, isBookedToday: false },
  { id: 'h3', name: 'Anita Sharma', role: 'Child Daycare & Nanny', rating: 5.0, phone: '+91 98711 88003', currentLocation: 'Inside Tower B', isInsideCampus: true, ratePerDay: 300, isBookedToday: false },
  { id: 'h4', name: 'Mohan Lal', role: 'Car Detailing & Wash', rating: 4.7, phone: '+91 98711 88004', currentLocation: 'Basement B1 Car Wash Area', isInsideCampus: true, ratePerDay: 150, isBookedToday: false },
];

const STORAGE_KEY = 'staysetu_society_store_v1';

export class SocietyStore {
  private static getStore() {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }

    const defaultStore = {
      flats: SEED_FLATS,
      helpers: SEED_HELPERS,
      amenityBookings: [] as AmenityBooking[],
      helpdeskTickets: [] as HelpdeskTicket[],
      parkingAlerts: [] as ParkingAlert[],
      gateLogs: [
        { id: '1', type: 'FASTTAG', detail: 'UP14 EX 9988 (Tower C - Flat 402) - FastTag Boom Open', status: 'Auto 0.4s', timestamp: 'Just now', synced: true },
        { id: '2', type: 'DELIVERY', detail: 'Swiggy Rider OTP 8821 - Flat A-102', status: 'Approved', timestamp: '2 mins ago', synced: true },
        { id: '3', type: 'FASTTAG', detail: 'DL8C AB 1234 (Tower A - Flat 102) - FastTag Boom Open', status: 'Auto 0.4s', timestamp: '5 mins ago', synced: true },
      ] as GateLog[],
      poll: {
        id: 'poll-1',
        title: 'AGM 2026: Should we install 15 EV Fast-Charging Stations in Basement Parking B1 & B2?',
        yesVotes: 342,
        noVotes: 48,
        userVoted: null,
      } as AGMPoll,
      sinkingFund: 11540000,
      smartMeterBalance: 1450,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStore));
    } catch {
      // ignore
    }
    return defaultStore;
  }

  private static saveStore(store: any) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      window.dispatchEvent(new Event('staysetu-store-update'));
    } catch {
      // ignore
    }
  }

  // ── 1. PARKING ALERT API ──
  static getParkingAlerts(): ParkingAlert[] {
    return this.getStore()?.parkingAlerts || [];
  }

  static createParkingAlert(carPlate: string, blockedSlot: string): ParkingAlert {
    const store = this.getStore();
    const cleanPlate = carPlate.trim().toUpperCase();
    
    // Auto-identify owner flat from flats db
    const matchedFlat = store.flats.find((f: SocietyFlat) => f.carPlate === cleanPlate);
    const ownerFlat = matchedFlat ? `${matchedFlat.tower} - Flat ${matchedFlat.flatNo}` : 'Unregistered Visitor Vehicle';

    const newAlert: ParkingAlert = {
      id: `PRK-${Date.now()}`,
      carPlate: cleanPlate,
      blockedSlot,
      ownerFlat,
      status: 'PENDING',
      countdownMinutes: 10,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    store.parkingAlerts.unshift(newAlert);
    
    // Also add to Gate Logs for guard awareness
    store.gateLogs.unshift({
      id: `log-${Date.now()}`,
      type: 'FASTTAG',
      detail: `⚠️ WRONG PARKING ALERT: ${cleanPlate} blocking ${blockedSlot} (${ownerFlat})`,
      status: '10m Warning',
      timestamp: 'Just now',
      synced: true,
    });

    this.saveStore(store);
    return newAlert;
  }

  // ── 2. HELPER RADAR & BACKUP MAID API ──
  static getHelpers(): HelperStaff[] {
    return this.getStore()?.helpers || SEED_HELPERS;
  }

  static bookBackupMaid(helperId: string, flatNo: string): HelperStaff | null {
    const store = this.getStore();
    const helperIndex = store.helpers.findIndex((h: HelperStaff) => h.id === helperId);
    if (helperIndex === -1) return null;

    store.helpers[helperIndex].isBookedToday = true;
    
    // Add gate pass log for domestic helper
    store.gateLogs.unshift({
      id: `log-${Date.now()}`,
      type: 'VISITOR',
      detail: `👩‍🍳 Helper Assigned: ${store.helpers[helperIndex].name} dispatched to ${flatNo}`,
      status: 'Active Pass',
      timestamp: 'Just now',
      synced: true,
    });

    this.saveStore(store);
    return store.helpers[helperIndex];
  }

  // ── 3. AMENITY & CLUBHOUSE BOOKING API ──
  static getAmenityBookings(): AmenityBooking[] {
    return this.getStore()?.amenityBookings || [];
  }

  static bookAmenity(amenityName: string, slot: string, bookedByFlat: string): AmenityBooking {
    const store = this.getStore();
    const qrCode = `QR-SS-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;

    const newBooking: AmenityBooking = {
      id: `AMN-${Date.now()}`,
      amenityName,
      slot,
      bookedByFlat,
      qrPassCode: qrCode,
      timestamp: new Date().toLocaleDateString('en-GB'),
    };

    store.amenityBookings.unshift(newBooking);
    this.saveStore(store);
    return newBooking;
  }

  // ── 4. 2-HOUR SLA HELPDESK API ──
  static getHelpdeskTickets(): HelpdeskTicket[] {
    return this.getStore()?.helpdeskTickets || [];
  }

  static createHelpdeskTicket(category: string, description: string, flatNo: string): HelpdeskTicket {
    const store = this.getStore();
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    let assignedTech = 'Rakesh Sharma (Society Plumber)';
    let phone = '+91 98711 22334';
    if (category.toLowerCase().includes('electric')) {
      assignedTech = 'Vikas Verma (Society Electrician)';
      phone = '+91 98711 22335';
    } else if (category.toLowerCase().includes('lift')) {
      assignedTech = 'Otis Lift Response Engineer';
      phone = '+91 98711 22336';
    }

    const newTicket: HelpdeskTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      description,
      raisedByFlat: flatNo,
      assignedTechnician: assignedTech,
      technicianPhone: phone,
      slaMinutesRemaining: 120, // 2-Hour SLA
      otpToClose: otp,
      status: 'ASSIGNED',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    store.helpdeskTickets.unshift(newTicket);
    this.saveStore(store);
    return newTicket;
  }

  static resolveTicketWithOtp(ticketId: string, enteredOtp: string): boolean {
    const store = this.getStore();
    const ticketIndex = store.helpdeskTickets.findIndex((t: HelpdeskTicket) => t.id === ticketId);
    if (ticketIndex === -1) return false;

    if (store.helpdeskTickets[ticketIndex].otpToClose === enteredOtp.trim()) {
      store.helpdeskTickets[ticketIndex].status = 'RESOLVED';
      this.saveStore(store);
      return true;
    }
    return false;
  }

  // ── 5. RWA MAINTENANCE & GST BALANCES ──
  static payMaintenance(flatNo: string): boolean {
    const store = this.getStore();
    const flatIndex = store.flats.findIndex((f: SocietyFlat) => f.flatNo === flatNo || `${f.tower} - Flat ${f.flatNo}` === flatNo);
    if (flatIndex !== -1) {
      store.flats[flatIndex].maintenanceStatus = 'PAID';
    }
    this.saveStore(store);
    return true;
  }

  // ── 6. SMART METER RECHARGE ──
  static rechargeSmartMeter(amount: number): number {
    const store = this.getStore();
    store.smartMeterBalance = (store.smartMeterBalance || 1450) + amount;
    this.saveStore(store);
    return store.smartMeterBalance;
  }

  // ── 7. AGM POLL VOTING ──
  static getPoll(): AGMPoll {
    return this.getStore()?.poll;
  }

  static votePoll(vote: 'YES' | 'NO'): AGMPoll {
    const store = this.getStore();
    if (store.poll.userVoted) return store.poll;

    if (vote === 'YES') {
      store.poll.yesVotes += 1;
    } else {
      store.poll.noVotes += 1;
    }
    store.poll.userVoted = vote;
    this.saveStore(store);
    return store.poll;
  }

  // ── 8. GATE LOGS & OFFLINE ENGINE ──
  static getGateLogs(): GateLog[] {
    return this.getStore()?.gateLogs || [];
  }

  static addGateLog(type: 'FASTTAG' | 'VISITOR' | 'DELIVERY' | 'SHIFTING', detail: string, status: string, isOnline: boolean): GateLog {
    const store = this.getStore();
    const newLog: GateLog = {
      id: `log-${Date.now()}`,
      type,
      detail,
      status: isOnline ? status : 'Saved Locally (Queued)',
      timestamp: 'Just now',
      synced: isOnline,
    };
    store.gateLogs.unshift(newLog);
    this.saveStore(store);
    return newLog;
  }
}
