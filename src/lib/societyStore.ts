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
  type: 'FASTTAG' | 'VISITOR' | 'DELIVERY' | 'SHIFTING' | 'CAB' | 'EMERGENCY';
  detail: string;
  status: string;
  timestamp: string;
  synced: boolean;
}

export interface AGMPoll {
  id: string;
  title: string;
  category?: 'AGM' | 'INFRASTRUCTURE' | 'RULES';
  yesVotes: number;
  noVotes: number;
  abstainVotes?: number;
  totalEligible?: number;
  deadline?: string;
  userVoted: 'YES' | 'NO' | 'ABSTAIN' | null;
}

export interface EVBay {
  id: string;
  bayName: string;
  location: string;
  type: 'DC_FAST' | 'AC_FAST' | 'AC_SLOW';
  powerKw: number;
  ratePerKwh: number;
  status: 'AVAILABLE' | 'CHARGING' | 'RESERVED';
  currentVehicle?: string;
  batteryPercent?: number;
  kwhDelivered?: number;
  sessionMinutesRemaining?: number;
  reservedByFlat?: string;
}

export interface ParcelPackage {
  id: string;
  courier: 'Amazon' | 'Flipkart' | 'Swiggy' | 'Zomato' | 'Blinkit' | 'BlueDart' | 'Courier';
  trackingNo: string;
  flatNo: string;
  residentName: string;
  deliveryBoy: string;
  phone: string;
  photoUrl: string;
  status: 'AT_GATE' | 'DELIVERED_DOOR' | 'IN_LOCKER' | 'COLLECTED';
  lockerNo?: string;
  lockerOtp?: string;
  arrivedAt: string;
}

export interface IoTStatus {
  waterTankPercent: number;
  waterCapacityLiters: number;
  waterRemainingLiters: number;
  tankerArrivalStatus: string;
  tankersToday: number;
  dgStatus: 'STANDBY' | 'RUNNING';
  dgMonthlyUnits: number;
  dgRatePerUnit: number;
  lastUpdated: string;
}

// Initial Seed Dataset
const SEED_FLATS: SocietyFlat[] = [
  { id: 'f1', tower: 'Tower C', flatNo: '402', residentName: 'Ankit Sharma', residentPhone: '73930 11350', intercom: '1402', bhk: '3 BHK', carPlate: 'UP14 EX 9988', parkingSlot: 'Basement B1 - Slot #42', maintenanceStatus: 'DUE', maintenanceAmount: 3540 },
  { id: 'f2', tower: 'Tower A', flatNo: '102', residentName: 'Sudhanshu Pandey', residentPhone: '73930 11350', intercom: '1102', bhk: '3 BHK', carPlate: 'DL8C AB 1234', parkingSlot: 'Basement B1 - Slot #12', maintenanceStatus: 'PAID', maintenanceAmount: 3540 },
  { id: 'f3', tower: 'Tower B', flatNo: '204', residentName: 'Neha Kapoor', residentPhone: '73930 11350', intercom: '1204', bhk: '2 BHK', carPlate: 'HR26 DK 5544', parkingSlot: 'Basement B2 - Slot #18', maintenanceStatus: 'PAID', maintenanceAmount: 2850 },
  { id: 'f4', tower: 'Tower D', flatNo: '801', residentName: 'Rajesh Verma', residentPhone: '73930 11350', intercom: '1801', bhk: '4 BHK Penthouse', carPlate: 'UP16 ZQ 7700', parkingSlot: 'Basement B1 - Slot #88', maintenanceStatus: 'DUE', maintenanceAmount: 4800 },
];

const SEED_HELPERS: HelperStaff[] = [
  { id: 'h1', name: 'Sunita Devi', role: 'Cook & Housekeeping', rating: 4.9, phone: '+91 98711 88001', currentLocation: 'Tower A (2nd Floor)', isInsideCampus: true, ratePerDay: 250, isBookedToday: false },
  { id: 'h2', name: 'Ramesh Kumar', role: 'Deep Cleaning & Dusting', rating: 4.8, phone: '+91 98711 88002', currentLocation: 'Tower D (Basement)', isInsideCampus: true, ratePerDay: 300, isBookedToday: false },
  { id: 'h3', name: 'Anita Sharma', role: 'Child Daycare & Nanny', rating: 5.0, phone: '+91 98711 88003', currentLocation: 'Tower B (Flat 204)', isInsideCampus: true, ratePerDay: 350, isBookedToday: false },
  { id: 'h4', name: 'Mohan Lal', role: 'Professional Driver & Car Wash', rating: 4.7, phone: '+91 98711 88004', currentLocation: 'Basement B1 EV Zone', isInsideCampus: true, ratePerDay: 200, isBookedToday: false },
  { id: 'h5', name: 'Pooja Verma', role: 'Gourmet Cook (North/South Indian)', rating: 4.9, phone: '+91 98711 88005', currentLocation: 'Main Clubhouse Pantry', isInsideCampus: true, ratePerDay: 400, isBookedToday: false },
];

const SEED_EV_BAYS: EVBay[] = [
  { id: 'ev-1', bayName: 'Bay A1 — HyperCharge DC', location: 'Basement B1 (Near Tower A Lift)', type: 'DC_FAST', powerKw: 60, ratePerKwh: 14.5, status: 'AVAILABLE' },
  { id: 'ev-2', bayName: 'Bay A2 — Fast AC 22kW', location: 'Basement B1 (Slot #14)', type: 'AC_FAST', powerKw: 22, ratePerKwh: 11.0, status: 'CHARGING', currentVehicle: 'Tata Nexon EV (DL8C AB 1234)', batteryPercent: 74, kwhDelivered: 18.6, sessionMinutesRemaining: 14 },
  { id: 'ev-3', bayName: 'Bay B1 — Fast AC 22kW', location: 'Basement B2 (Near Tower C)', type: 'AC_FAST', powerKw: 22, ratePerKwh: 11.0, status: 'AVAILABLE' },
  { id: 'ev-4', bayName: 'Bay B2 — Standard 7.4kW', location: 'Basement B2 (Slot #39)', type: 'AC_SLOW', powerKw: 7.4, ratePerKwh: 9.5, status: 'AVAILABLE' },
];

const SEED_PACKAGES: ParcelPackage[] = [
  { id: 'pkg-1', courier: 'Amazon', trackingNo: 'AMZ-IN-889921', flatNo: 'Tower A - Flat 102', residentName: 'Sudhanshu Pandey', deliveryBoy: 'Vikram Singh', phone: '+91 98110 22331', photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80', status: 'AT_GATE', arrivedAt: '5 mins ago' },
  { id: 'pkg-2', courier: 'Swiggy', trackingNo: 'SWG-FOOD-4412', flatNo: 'Tower A - Flat 102', residentName: 'Sudhanshu Pandey', deliveryBoy: 'Rahul Yadav', phone: '+91 98110 55662', photoUrl: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&auto=format&fit=crop&q=80', status: 'DELIVERED_DOOR', arrivedAt: '40 mins ago' },
  { id: 'pkg-3', courier: 'Blinkit', trackingNo: 'BLK-GR-10928', flatNo: 'Tower A - Flat 102', residentName: 'Sudhanshu Pandey', deliveryBoy: 'Amit Das', phone: '+91 98110 77883', photoUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=80', status: 'IN_LOCKER', lockerNo: 'Locker #07 (Guard Room B1)', lockerOtp: '4829', arrivedAt: '2 hours ago' },
];

const SEED_IOT: IoTStatus = {
  waterTankPercent: 82,
  waterCapacityLiters: 100000,
  waterRemainingLiters: 82000,
  tankerArrivalStatus: 'Next tanker scheduled 04:30 PM (No delay)',
  tankersToday: 4,
  dgStatus: 'STANDBY',
  dgMonthlyUnits: 142.5,
  dgRatePerUnit: 18.5,
  lastUpdated: 'Live IoT Telemetry Sync (30s ago)',
};

const STORAGE_KEY = 'staysetu_society_store_v1';

export class SocietyStore {
  private static getStore() {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (!parsed.evBays) parsed.evBays = SEED_EV_BAYS;
        if (!parsed.packages) parsed.packages = SEED_PACKAGES;
        if (!parsed.iot) parsed.iot = SEED_IOT;
        if (!parsed.helpers || parsed.helpers.length < 5) parsed.helpers = SEED_HELPERS;
        return parsed;
      }
    } catch {
      // fallback
    }

    const defaultStore = {
      flats: SEED_FLATS,
      helpers: SEED_HELPERS,
      evBays: SEED_EV_BAYS,
      packages: SEED_PACKAGES,
      iot: SEED_IOT,
      amenityBookings: [] as AmenityBooking[],
      helpdeskTickets: [] as HelpdeskTicket[],
      parkingAlerts: [] as ParkingAlert[],
      gateLogs: [
        { id: '1', type: 'FASTTAG', detail: 'UP14 EX 9988 (Tower C - Flat 402) - FastTag Boom Open', status: 'Auto 0.4s', timestamp: 'Just now', synced: true },
        { id: '2', type: 'DELIVERY', detail: 'Amazon Delivery Box — Flat A-102 (Photo Verified)', status: 'At Gate', timestamp: '5 mins ago', synced: true },
        { id: '3', type: 'FASTTAG', detail: 'DL8C AB 1234 (Tower A - Flat 102) - FastTag Boom Open', status: 'Auto 0.4s', timestamp: '12 mins ago', synced: true },
      ] as GateLog[],
      poll: {
        id: 'poll-1',
        title: 'AGM 2026: Should we install 15 EV Fast-Charging Stations in Basement Parking B1 & B2?',
        category: 'INFRASTRUCTURE',
        yesVotes: 342,
        noVotes: 48,
        abstainVotes: 12,
        totalEligible: 420,
        deadline: '28 Sep 2026, 11:59 PM',
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

  static toggleHelperInCampus(helperId: string): HelperStaff | null {
    const store = this.getStore();
    const helperIndex = store.helpers.findIndex((h: HelperStaff) => h.id === helperId);
    if (helperIndex === -1) return null;

    const currentStatus = store.helpers[helperIndex].isInsideCampus;
    store.helpers[helperIndex].isInsideCampus = !currentStatus;
    
    // Add gate log
    store.gateLogs.unshift({
      id: `log-${Date.now()}`,
      type: 'VISITOR',
      detail: `👷 Staff Biometric: ${store.helpers[helperIndex].name} (${store.helpers[helperIndex].role}) - ${!currentStatus ? 'ENTRY PUNCH' : 'EXIT PUNCH'}`,
      status: !currentStatus ? 'In Campus' : 'Out of Campus',
      timestamp: 'Just now',
      synced: true,
    });

    this.saveStore(store);
    return store.helpers[helperIndex];
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

  static bookHelper(helperId: string, flatNo: string = 'Tower A - Flat 102'): HelperStaff | null {
    return this.bookBackupMaid(helperId, flatNo);
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

  static resolveTicket(ticketId: string, enteredOtp: string): boolean {
    return this.resolveTicketWithOtp(ticketId, enteredOtp);
  }

  // ── 5. RWA NOTICES & CIRCULARS ──
  static getNotices(): Array<{ id: string; title: string; body: string; time: string; category: string; isRead: boolean }> {
    return this.getStore()?.notices || [];
  }

  static addNotice(title: string, body: string, category: string = 'Official') {
    const store = this.getStore();
    if (!store.notices) store.notices = [];
    const newNotice = {
      id: `notice-${Date.now()}`,
      title,
      body,
      time: 'Just Now',
      category,
      isRead: false,
    };
    store.notices.unshift(newNotice);
    this.saveStore(store);
    return newNotice;
  }

  // ── 6. RWA MAINTENANCE & GST BALANCES ──
  static payMaintenance(flatNo: string): boolean {
    const store = this.getStore();
    const flatIndex = store.flats.findIndex((f: SocietyFlat) => f.flatNo === flatNo || `${f.tower} - Flat ${f.flatNo}` === flatNo);
    if (flatIndex !== -1) {
      store.flats[flatIndex].maintenanceStatus = 'PAID';
    }
    this.saveStore(store);
    return true;
  }

  // ── 7. SMART METER RECHARGE ──
  static rechargeSmartMeter(amount: number): number {
    const store = this.getStore();
    store.smartMeterBalance = (store.smartMeterBalance || 1450) + amount;
    this.saveStore(store);
    return store.smartMeterBalance;
  }

  // ── 8. AGM POLL VOTING ──
  static getPoll(): AGMPoll {
    return this.getStore()?.poll;
  }

  static setPoll(newPoll: AGMPoll) {
    const store = this.getStore();
    store.poll = newPoll;
    this.saveStore(store);
  }

  static votePoll(vote: 'YES' | 'NO'): AGMPoll {
    return this.votePollAdvanced(vote);
  }

  static votePollAdvanced(vote: 'YES' | 'NO' | 'ABSTAIN'): AGMPoll {
    const store = this.getStore();
    if (store.poll.userVoted) return store.poll;

    if (vote === 'YES') {
      store.poll.yesVotes += 1;
    } else if (vote === 'NO') {
      store.poll.noVotes += 1;
    } else if (vote === 'ABSTAIN') {
      store.poll.abstainVotes = (store.poll.abstainVotes || 0) + 1;
    }
    store.poll.userVoted = vote;
    this.saveStore(store);
    return store.poll;
  }

  // ── 9. GATE LOGS & OFFLINE ENGINE ──
  static getGateLogs(): GateLog[] {
    return this.getStore()?.gateLogs || [];
  }

  static addGateLog(type: GateLog['type'], detail: string, status: string, isOnline: boolean): GateLog {
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

  // ── 10. SMART EV CHARGING HUB ──
  static getEVBays(): EVBay[] {
    return this.getStore()?.evBays || [];
  }

  static reserveEVBay(bayId: string, flatNo: string): boolean {
    const store = this.getStore();
    const bay = (store.evBays || []).find((b: EVBay) => b.id === bayId);
    if (!bay || bay.status !== 'AVAILABLE') return false;
    bay.status = 'RESERVED';
    bay.reservedByFlat = flatNo;
    this.saveStore(store);
    return true;
  }

  static startEVCharge(bayId: string, vehicle: string = 'Tata Nexon EV (DL8C AB 1234)'): boolean {
    const store = this.getStore();
    const bay = (store.evBays || []).find((b: EVBay) => b.id === bayId);
    if (!bay) return false;
    bay.status = 'CHARGING';
    bay.currentVehicle = vehicle;
    bay.batteryPercent = 42;
    bay.kwhDelivered = 4.2;
    bay.sessionMinutesRemaining = 35;
    this.saveStore(store);
    return true;
  }

  static stopEVCharge(bayId: string): boolean {
    const store = this.getStore();
    const bay = (store.evBays || []).find((b: EVBay) => b.id === bayId);
    if (!bay) return false;
    bay.status = 'AVAILABLE';
    bay.currentVehicle = undefined;
    bay.batteryPercent = undefined;
    bay.kwhDelivered = undefined;
    bay.sessionMinutesRemaining = undefined;
    bay.reservedByFlat = undefined;
    this.saveStore(store);
    return true;
  }

  // ── 11. PARCEL PHOTO LOCKER & GATE PACKAGES ──
  static getPackages(): ParcelPackage[] {
    return this.getStore()?.packages || [];
  }

  static updatePackageStatus(id: string, status: ParcelPackage['status'], lockerNo?: string, lockerOtp?: string): boolean {
    const store = this.getStore();
    const pkg = (store.packages || []).find((p: ParcelPackage) => p.id === id);
    if (!pkg) return false;
    pkg.status = status;
    if (lockerNo) pkg.lockerNo = lockerNo;
    if (lockerOtp) pkg.lockerOtp = lockerOtp;
    this.saveStore(store);
    return true;
  }

  // ── 12. SMART WATER & DG GENSET IOT ──
  static getIoTStatus(): IoTStatus {
    return this.getStore()?.iot || SEED_IOT;
  }

  static updateIoTStatus(updates: Partial<IoTStatus>): IoTStatus {
    const store = this.getStore();
    store.iot = { ...(store.iot || SEED_IOT), ...updates, lastUpdated: 'Just now (Live IoT Sync)' };
    this.saveStore(store);
    return store.iot;
  }
}
