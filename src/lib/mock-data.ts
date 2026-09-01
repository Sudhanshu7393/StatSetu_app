// ─────────────────────────────────────────────────────────────────────────────
// StaySetu — Mock Data
// Realistic sample data for development. No fake statistics.
// ─────────────────────────────────────────────────────────────────────────────

export interface College {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  popularLocalities: string[];
}

export interface RoomOption {
  id: string;
  sharingType: "SINGLE" | "DOUBLE" | "TRIPLE" | "FOUR_PLUS";
  monthlyRent: number;
  securityDeposit: number;
  brokerage: number;
  availableBeds: number;
  availableFrom: string;
}

export interface FoodPlan {
  availabilityType: "INCLUDED" | "EXTRA_COST" | "NOT_AVAILABLE";
  foodPreference: "VEGETARIAN" | "NON_VEGETARIAN" | "BOTH";
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  monthlyExtraCost: number;
  rating?: number;
  weeklyMenu?: {
    [day: string]: { breakfast: string; lunch: string; dinner: string };
  };
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  type: "PG" | "HOSTEL" | "FLAT";
  genderPreference: "BOYS" | "GIRLS" | "COED";
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  verificationStatus: "VERIFIED" | "PENDING" | "UNVERIFIED";
  status: "ACTIVE" | "PAUSED" | "FULL";
  availableFrom: string;
  featured?: boolean;
  description: string;

  colleges: {
    collegeId: string;
    collegeName: string;
    distanceMeters: number;
    estimatedWalkingMinutes: number;
    estimatedDrivingMinutes: number;
  }[];

  images: string[];
  rooms: RoomOption[];
  foodPlan: FoodPlan;
  amenities: string[];
  houseRules: { ruleType: string; value: string }[];

  owner: {
    id: string;
    name: string;
    avatar: string;
    identityVerified: boolean;
    propertyVerified: boolean;
    responseTime: string;
    role: "OWNER" | "BROKER";
    listedCount?: number;
  };

  reviews: {
    id: string;
    studentName: string;
    collegeName: string;
    overallRating: number;
    foodRating: number;
    cleanlinessRating: number;
    locationRating: number;
    managementRating: number;
    valueRating: number;
    comment: string;
    verifiedStay: boolean;
    date: string;
  }[];

  rating: number;
  reviewCount: number;
  minRent: number;
  maxRent: number;
  minDeposit: number;
  minBrokerage: number;
}

export interface Roommate {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: "Male" | "Female";
  collegeId: string;
  collegeName: string;
  course: string;
  year: string;
  budgetMin: number;
  budgetMax: number;
  preferredArea: string;
  moveInDate: string;
  smoking: "No" | "Yes" | "Occasionally";
  drinking: "No" | "Yes" | "Occasionally";
  sleepSchedule: "Night Owl" | "Early Riser" | "Flexible";
  cleanliness: "Very Organised" | "Average" | "Relaxed";
  studyStyle: "Quiet" | "Normal" | "Social";
  foodPreference: "Vegetarian" | "Non-vegetarian" | "Eggetarian" | "No preference";
  guestPreference: "Never" | "Occasional" | "Frequent";
  sharingPreference: "Single" | "Double" | "Triple";
  acPreference: "Required" | "Optional" | "Not Needed";
  bio: string;
}

export interface DomesticHelper {
  id: string;
  name: string;
  avatar: string;
  gender: "Male" | "Female";
  serviceArea: string;
  verificationStatus: "VERIFIED" | "PENDING";
  backgroundCheckStatus: boolean;
  rating: number;
  reviewCount: number;
  services: { name: string; priceRange: string }[];
  availability: string;
  experienceYears: number;
}

// ─── COLLEGES ────────────────────────────────────────────────────────────────

export const COLLEGES_DATA: College[] = [
  {
    id: "col-1",
    name: "ABES Engineering College",
    slug: "abes-engineering-college",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    latitude: 28.6366,
    longitude: 77.4611,
    popularLocalities: ["Crossings Republik", "Lal Kuan", "Vijay Nagar"],
  },
  {
    id: "col-2",
    name: "Delhi University — North Campus",
    slug: "du-north-campus",
    city: "New Delhi",
    state: "Delhi",
    latitude: 28.6892,
    longitude: 77.2104,
    popularLocalities: ["Kamla Nagar", "Hudson Lane", "Vijay Nagar"],
  },
  {
    id: "col-3",
    name: "Christ University, Bengaluru",
    slug: "christ-university-bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    latitude: 12.9344,
    longitude: 77.606,
    popularLocalities: ["Hosur Road", "Koramangala 1st Block", "SG Palya"],
  },
  {
    id: "col-4",
    name: "IIT Delhi",
    slug: "iit-delhi",
    city: "New Delhi",
    state: "Delhi",
    latitude: 28.5459,
    longitude: 77.1929,
    popularLocalities: ["Hauz Khas", "Munirka", "Safdarjung Enclave"],
  },
  {
    id: "col-5",
    name: "VIT Vellore",
    slug: "vit-vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    latitude: 12.9692,
    longitude: 79.1559,
    popularLocalities: ["Katpadi", "VIT Campus Road", "Sripuram"],
  },
  {
    id: "col-6",
    name: "SRM Institute, Chennai",
    slug: "srm-institute-chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    latitude: 12.8231,
    longitude: 80.0444,
    popularLocalities: ["Kattankulathur", "Guduvanchery", "Tambaram"],
  },
  {
    id: "col-7",
    name: "Pune University (SPPU)",
    slug: "pune-university-sppu",
    city: "Pune",
    state: "Maharashtra",
    latitude: 18.5563,
    longitude: 73.8143,
    popularLocalities: ["Aundh", "Karve Nagar", "Shivajinagar"],
  },
  {
    id: "col-8",
    name: "Manipal University",
    slug: "manipal-university",
    city: "Manipal",
    state: "Karnataka",
    latitude: 13.3527,
    longitude: 74.7874,
    popularLocalities: ["Manipal Town", "Udupi", "MIT Road"],
  },
  {
    id: "col-9",
    name: "Banaras Hindu University (BHU)",
    slug: "banaras-hindu-university",
    city: "Varanasi",
    state: "Uttar Pradesh",
    latitude: 25.2677,
    longitude: 82.9913,
    popularLocalities: ["Lanka", "Assi Ghat", "BHU Gate"],
  },
  {
    id: "col-10",
    name: "Amity University, Noida",
    slug: "amity-university-noida",
    city: "Noida",
    state: "Uttar Pradesh",
    latitude: 28.5448,
    longitude: 77.333,
    popularLocalities: ["Sector 125", "Sector 44", "Sector 62"],
  },
];

// ─── PROPERTIES ──────────────────────────────────────────────────────────────

export const PROPERTIES_DATA: Property[] = [
  // ── Ghaziabad / ABES ──
  {
    id: "prop-1",
    name: "Sunrise Student PG",
    slug: "sunrise-student-pg-ghaziabad",
    type: "PG",
    genderPreference: "BOYS",
    address: "Plot 42, Crossings Republik Road, Near ABES Gate 2",
    locality: "Lal Kuan",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201009",
    latitude: 28.6372,
    longitude: 77.4625,
    verificationStatus: "VERIFIED",
    status: "ACTIVE",
    availableFrom: "Available Now",
    featured: true,
    description:
      "Boys PG opposite ABES Engineering College Gate 2. Walking distance from campus. Offers 3 vegetarian meals daily, daily housekeeping, RO drinking water, geysers and 24/7 power backup.",
    colleges: [
      {
        collegeId: "col-1",
        collegeName: "ABES Engineering College",
        distanceMeters: 450,
        estimatedWalkingMinutes: 6,
        estimatedDrivingMinutes: 2,
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    ],
    rooms: [
      { id: "r-101", sharingType: "SINGLE", monthlyRent: 12500, securityDeposit: 10000, brokerage: 3000, availableBeds: 2, availableFrom: "Available Now" },
      { id: "r-102", sharingType: "DOUBLE", monthlyRent: 8500,  securityDeposit: 8500,  brokerage: 2500, availableBeds: 4, availableFrom: "Available Now" },
      { id: "r-103", sharingType: "TRIPLE", monthlyRent: 7000,  securityDeposit: 7000,  brokerage: 2000, availableBeds: 3, availableFrom: "1 Aug 2026" },
    ],
    foodPlan: {
      availabilityType: "INCLUDED",
      foodPreference: "VEGETARIAN",
      breakfast: true, lunch: true, dinner: true,
      monthlyExtraCost: 0,
      rating: 4.6,
      weeklyMenu: {
        Monday:    { breakfast: "Aloo Paratha & Curd",    lunch: "Rajma Chawal, Roti, Salad",  dinner: "Mix Veg, Dal Tadka" },
        Tuesday:   { breakfast: "Poha & Tea",             lunch: "Kadi Pakoda, Rice, Chapati", dinner: "Paneer Butter Masala" },
        Wednesday: { breakfast: "Idli Sambar",            lunch: "Chole Puri, Boondi Raita",   dinner: "Aloo Gobi, Yellow Dal" },
        Thursday:  { breakfast: "Gobhi Paratha",          lunch: "Dal Fry, Jeera Rice",        dinner: "Kadhai Paneer" },
        Friday:    { breakfast: "Sandwich & Tea",         lunch: "Dal Makhani, Rice",          dinner: "Matar Paneer" },
        Saturday:  { breakfast: "Uttapam & Chutney",      lunch: "Aloo Baingan, Dal",          dinner: "Special Veg Thali" },
        Sunday:    { breakfast: "Chole Bhature",          lunch: "Veg Biryani, Raita",         dinner: "Shahi Paneer" },
      },
    },
    amenities: ["High-Speed Wi-Fi", "Air Conditioning", "3 Meals Daily", "Daily Housekeeping", "RO Water Purifier", "Power Backup 24x7", "Study Table & Chair", "Attached Bathroom", "Geyser", "Laundry Service"],
    houseRules: [
      { ruleType: "Entry Curfew", value: "10:30 PM" },
      { ruleType: "Visitors", value: "Parents allowed in common lounge" },
      { ruleType: "Smoking / Alcohol", value: "Prohibited" },
      { ruleType: "Notice Period", value: "30 days" },
    ],
    owner: { id: "own-1", name: "Rajesh Sharma", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", identityVerified: true, propertyVerified: true, responseTime: "Under 15 mins", role: "OWNER", listedCount: 2 },
    reviews: [
      { id: "rev-1", studentName: "Aman Verma", collegeName: "ABES CSE", overallRating: 4.8, foodRating: 4.7, cleanlinessRating: 4.9, locationRating: 5.0, managementRating: 4.6, valueRating: 4.7, comment: "Walking distance from Gate 2. Clean food, reliable Wi-Fi, owner responds quickly.", verifiedStay: true, date: "12 Jun 2026" },
      { id: "rev-2", studentName: "Rohan Gupta", collegeName: "ABES ECE", overallRating: 4.5, foodRating: 4.4, cleanlinessRating: 4.6, locationRating: 5.0, managementRating: 4.3, valueRating: 4.5, comment: "Good food and location. Power backup is solid — no interruption during exams.", verifiedStay: true, date: "3 May 2026" },
    ],
    rating: 4.6, reviewCount: 32, minRent: 7000, maxRent: 12500, minDeposit: 7000, minBrokerage: 2000,
  },

  {
    id: "prop-2",
    name: "GreenNest Girls PG",
    slug: "greennest-girls-pg-ghaziabad",
    type: "PG",
    genderPreference: "GIRLS",
    address: "B-14, Crossings Boulevard, Near Lal Kuan Metro",
    locality: "Crossings Republik",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201009",
    latitude: 28.6385,
    longitude: 77.464,
    verificationStatus: "VERIFIED",
    status: "ACTIVE",
    availableFrom: "Available Now",
    featured: true,
    description:
      "Girls PG with female warden, biometric entry, CCTV surveillance, 3 vegetarian meals, study desks and laundry facilities.",
    colleges: [
      { collegeId: "col-1", collegeName: "ABES Engineering College", distanceMeters: 800, estimatedWalkingMinutes: 10, estimatedDrivingMinutes: 4 },
    ],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    ],
    rooms: [
      { id: "r-201", sharingType: "DOUBLE", monthlyRent: 9000, securityDeposit: 9000, brokerage: 3000, availableBeds: 3, availableFrom: "Available Now" },
      { id: "r-202", sharingType: "TRIPLE", monthlyRent: 7500, securityDeposit: 7500, brokerage: 2000, availableBeds: 2, availableFrom: "Available Now" },
    ],
    foodPlan: { availabilityType: "INCLUDED", foodPreference: "VEGETARIAN", breakfast: true, lunch: true, dinner: true, monthlyExtraCost: 0, rating: 4.8 },
    amenities: ["High-Speed Wi-Fi", "Air Conditioning", "Female Security Warden", "3 Meals Daily", "Biometric Entry", "CCTV Surveillance", "Laundry Service", "RO Drinking Water", "Geyser"],
    houseRules: [
      { ruleType: "Entry Curfew", value: "9:30 PM" },
      { ruleType: "Visitors", value: "Female visitors only in common area" },
      { ruleType: "Notice Period", value: "1 month" },
    ],
    owner: { id: "own-2", name: "Sunita Agarwal", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", identityVerified: true, propertyVerified: true, responseTime: "Under 10 mins", role: "OWNER", listedCount: 1 },
    reviews: [
      { id: "rev-3", studentName: "Priya Sharma", collegeName: "ABES IT", overallRating: 4.9, foodRating: 4.9, cleanlinessRating: 5.0, locationRating: 4.8, managementRating: 5.0, valueRating: 4.8, comment: "Safe, clean and homely. Warden is very supportive. Food is delicious.", verifiedStay: true, date: "4 Jul 2026" },
    ],
    rating: 4.8, reviewCount: 24, minRent: 7500, maxRent: 9000, minDeposit: 7500, minBrokerage: 2000,
  },

  {
    id: "prop-3",
    name: "Campus View Student Hostel",
    slug: "campus-view-student-hostel-ghaziabad",
    type: "HOSTEL",
    genderPreference: "COED",
    address: "NH-9, Near ABES Main Gate, Vijay Nagar",
    locality: "Vijay Nagar",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201009",
    latitude: 28.6355,
    longitude: 77.4598,
    verificationStatus: "PENDING",
    status: "ACTIVE",
    availableFrom: "Available Now",
    featured: false,
    description:
      "Affordable co-ed student hostel with separate floors for boys and girls. Common mess with both veg and non-veg options.",
    colleges: [
      { collegeId: "col-1", collegeName: "ABES Engineering College", distanceMeters: 300, estimatedWalkingMinutes: 4, estimatedDrivingMinutes: 2 },
    ],
    images: [
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1200&q=80",
    ],
    rooms: [
      { id: "r-301", sharingType: "DOUBLE", monthlyRent: 7000, securityDeposit: 7000, brokerage: 1500, availableBeds: 6, availableFrom: "Available Now" },
      { id: "r-302", sharingType: "TRIPLE", monthlyRent: 5500, securityDeposit: 5500, brokerage: 1000, availableBeds: 9, availableFrom: "Available Now" },
    ],
    foodPlan: { availabilityType: "EXTRA_COST", foodPreference: "BOTH", breakfast: true, lunch: true, dinner: true, monthlyExtraCost: 2500, rating: 3.9 },
    amenities: ["Wi-Fi", "Power Backup", "RO Water Purifier", "Study Room", "CCTV Surveillance"],
    houseRules: [
      { ruleType: "Entry Curfew", value: "11:00 PM" },
      { ruleType: "Notice Period", value: "15 days" },
    ],
    owner: { id: "own-3", name: "Deepak Pandey", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", identityVerified: true, propertyVerified: false, responseTime: "Within 1 hour", role: "OWNER", listedCount: 3 },
    reviews: [],
    rating: 3.9, reviewCount: 8, minRent: 5500, maxRent: 7000, minDeposit: 5500, minBrokerage: 1000,
  },

  {
    id: "prop-5",
    name: "Crossings Student Heights 2BHK Flat",
    slug: "crossings-student-heights-2bhk-flat-ghaziabad",
    type: "FLAT",
    genderPreference: "COED",
    address: "Tower C-502, Crossings Republik, Near ABES Gate 1",
    locality: "Crossings Republik",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201009",
    latitude: 28.6378,
    longitude: 77.4632,
    verificationStatus: "VERIFIED",
    status: "ACTIVE",
    availableFrom: "Available Now",
    featured: true,
    description: "Fully furnished 2BHK student flat for group of 3-4 students. Includes Modular Kitchen, Fridge, Washing Machine, Sofa, 2 ACs, high-speed Wi-Fi, and 24/7 power backup. Ideal for ABES students sharing a complete flat.",
    colleges: [
      { collegeId: "col-1", collegeName: "ABES Engineering College", distanceMeters: 600, estimatedWalkingMinutes: 8, estimatedDrivingMinutes: 3 },
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    ],
    rooms: [
      { id: "r-501", sharingType: "DOUBLE", monthlyRent: 8500, securityDeposit: 8500, brokerage: 0, availableBeds: 2, availableFrom: "Available Now" },
      { id: "r-502", sharingType: "SINGLE", monthlyRent: 13000, securityDeposit: 13000, brokerage: 0, availableBeds: 1, availableFrom: "Available Now" },
    ],
    foodPlan: { availabilityType: "NOT_AVAILABLE", foodPreference: "BOTH", breakfast: false, lunch: false, dinner: false, monthlyExtraCost: 0, rating: 4.5 },
    amenities: ["Modular Kitchen", "Refrigerator", "Automatic Washing Machine", "24x7 Power Backup", "High-Speed Wi-Fi", "Air Conditioning", "Lift Access", "Gated Security"],
    houseRules: [
      { ruleType: "Guests Allowed", value: "Friends & parents allowed" },
      { ruleType: "Cooking", value: "Full kitchen access" },
      { ruleType: "Notice Period", value: "30 days" },
    ],
    owner: { id: "own-1", name: "Rajesh Sharma", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", identityVerified: true, propertyVerified: true, responseTime: "Under 15 mins", role: "OWNER", listedCount: 3 },
    reviews: [
      { id: "rev-5", studentName: "Vikas Sharma", collegeName: "ABES CSE", overallRating: 4.9, foodRating: 4.5, cleanlinessRating: 5.0, locationRating: 4.9, managementRating: 4.8, valueRating: 4.9, comment: "Awesome 2BHK flat! Very peaceful for studying with friends.", verifiedStay: true, date: "15 Jun 2026" }
    ],
    rating: 4.8, reviewCount: 15, minRent: 8500, maxRent: 13000, minDeposit: 8500, minBrokerage: 0,
  },

  // ── Delhi / DU North Campus ──
  {
    id: "prop-4",
    name: "Hudson Lane Boys PG",
    slug: "hudson-lane-boys-pg-delhi",
    type: "PG",
    genderPreference: "BOYS",
    address: "12A, Hudson Lane, Near DU North Campus Gate",
    locality: "Hudson Lane",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110007",
    latitude: 28.6905,
    longitude: 77.2115,
    verificationStatus: "VERIFIED",
    status: "ACTIVE",
    availableFrom: "Available Now",
    featured: true,
    description:
      "Well-maintained boys PG on Hudson Lane, 5 minutes from DU North Campus. Fully furnished rooms with food options.",
    colleges: [
      { collegeId: "col-2", collegeName: "Delhi University — North Campus", distanceMeters: 500, estimatedWalkingMinutes: 7, estimatedDrivingMinutes: 3 },
    ],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    ],
    rooms: [
      { id: "r-401", sharingType: "SINGLE", monthlyRent: 15000, securityDeposit: 15000, brokerage: 5000, availableBeds: 1, availableFrom: "Available Now" },
      { id: "r-402", sharingType: "DOUBLE", monthlyRent: 10500, securityDeposit: 10500, brokerage: 4000, availableBeds: 3, availableFrom: "Available Now" },
    ],
    foodPlan: { availabilityType: "INCLUDED", foodPreference: "VEGETARIAN", breakfast: true, lunch: false, dinner: true, monthlyExtraCost: 0, rating: 4.3 },
    amenities: ["High-Speed Wi-Fi", "Air Conditioning", "Power Backup", "RO Water Purifier", "Study Table", "Laundry Service", "Attached Bathroom"],
    houseRules: [
      { ruleType: "Entry Curfew", value: "11:00 PM" },
      { ruleType: "Smoking / Alcohol", value: "Not allowed on premises" },
      { ruleType: "Notice Period", value: "30 days" },
    ],
    owner: { id: "own-4", name: "Manish Kapoor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", identityVerified: true, propertyVerified: true, responseTime: "Under 30 mins", role: "BROKER", listedCount: 8 },
    reviews: [
      { id: "rev-4", studentName: "Siddharth Jain", collegeName: "SRCC DU", overallRating: 4.5, foodRating: 4.2, cleanlinessRating: 4.7, locationRating: 5.0, managementRating: 4.3, valueRating: 4.2, comment: "Great location on Hudson Lane, easy access to North Campus. Owner communicates well.", verifiedStay: true, date: "18 May 2026" },
    ],
    rating: 4.5, reviewCount: 19, minRent: 10500, maxRent: 15000, minDeposit: 10500, minBrokerage: 4000,
  },

  // ── Bengaluru / Christ University ──
  {
    id: "prop-6",
    name: "Koramangala Student Flat",
    slug: "koramangala-student-flat-bengaluru",
    type: "FLAT",
    genderPreference: "COED",
    address: "3rd Block, Koramangala, Near Christ University",
    locality: "Koramangala 1st Block",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560034",
    latitude: 12.9358,
    longitude: 77.6082,
    verificationStatus: "VERIFIED",
    status: "ACTIVE",
    availableFrom: "Available Now",
    featured: true,
    description:
      "2BHK fully furnished student flat for sharing. Close to Christ University. 4 students can share comfortably. Food not included — surrounded by good restaurants.",
    colleges: [
      { collegeId: "col-3", collegeName: "Christ University, Bengaluru", distanceMeters: 600, estimatedWalkingMinutes: 8, estimatedDrivingMinutes: 3 },
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    ],
    rooms: [
      { id: "r-501", sharingType: "DOUBLE", monthlyRent: 12000, securityDeposit: 24000, brokerage: 12000, availableBeds: 2, availableFrom: "Available Now" },
      { id: "r-502", sharingType: "TRIPLE", monthlyRent: 9000, securityDeposit: 18000, brokerage: 9000, availableBeds: 3, availableFrom: "15 Aug 2026" },
    ],
    foodPlan: { availabilityType: "NOT_AVAILABLE", foodPreference: "BOTH", breakfast: false, lunch: false, dinner: false, monthlyExtraCost: 0 },
    amenities: ["High-Speed Wi-Fi", "Air Conditioning", "Modular Kitchen", "Power Backup", "Parking", "Washing Machine"],
    houseRules: [
      { ruleType: "Visitors", value: "Guests allowed until 9 PM" },
      { ruleType: "Pets", value: "Not allowed" },
      { ruleType: "Notice Period", value: "2 months" },
      { ruleType: "Electricity", value: "Shared equally between residents" },
    ],
    owner: { id: "own-5", name: "Anitha Reddy", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80", identityVerified: true, propertyVerified: true, responseTime: "Under 1 hour", role: "OWNER", listedCount: 1 },
    reviews: [
      { id: "rev-5", studentName: "Vikram Nair", collegeName: "Christ University", overallRating: 4.4, foodRating: 0, cleanlinessRating: 4.5, locationRating: 4.8, managementRating: 4.3, valueRating: 4.0, comment: "Spacious flat, great location. The 2-month notice period is something to plan for.", verifiedStay: true, date: "21 Jun 2026" },
    ],
    rating: 4.4, reviewCount: 12, minRent: 9000, maxRent: 12000, minDeposit: 18000, minBrokerage: 9000,
  },
];

// ─── ROOMMATES ────────────────────────────────────────────────────────────────

export const MOCK_ROOMMATES: Roommate[] = [
  {
    id: "rm-1",
    name: "Kabir Mehta",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    age: 20, gender: "Male",
    collegeId: "col-1", collegeName: "ABES Engineering College",
    course: "B.Tech CSE", year: "3rd Year",
    budgetMin: 7000, budgetMax: 10000,
    preferredArea: "Crossings Republik / Lal Kuan",
    moveInDate: "1 Aug 2026",
    smoking: "No", drinking: "No",
    sleepSchedule: "Night Owl", cleanliness: "Very Organised",
    studyStyle: "Quiet", foodPreference: "Vegetarian",
    guestPreference: "Occasional", sharingPreference: "Double",
    acPreference: "Required",
    bio: "CSE third-year looking for a disciplined roommate near campus. I study late nights but keep things quiet.",
  },
  {
    id: "rm-2",
    name: "Arjun Singh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    age: 19, gender: "Male",
    collegeId: "col-2", collegeName: "Delhi University — North Campus",
    course: "B.Com (Hons)", year: "1st Year",
    budgetMin: 8000, budgetMax: 13000,
    preferredArea: "Kamla Nagar / Hudson Lane",
    moveInDate: "15 Jul 2026",
    smoking: "No", drinking: "Occasionally",
    sleepSchedule: "Early Riser", cleanliness: "Average",
    studyStyle: "Normal", foodPreference: "Eggetarian",
    guestPreference: "Occasional", sharingPreference: "Double",
    acPreference: "Optional",
    bio: "First-year at SRCC. Looking for friendly and responsible roommate in North Campus area.",
  },
  {
    id: "rm-3",
    name: "Neha Kapoor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    age: 21, gender: "Female",
    collegeId: "col-1", collegeName: "ABES Engineering College",
    course: "B.Tech IT", year: "4th Year",
    budgetMin: 7500, budgetMax: 11000,
    preferredArea: "Crossings Republik",
    moveInDate: "1 Aug 2026",
    smoking: "No", drinking: "No",
    sleepSchedule: "Flexible", cleanliness: "Very Organised",
    studyStyle: "Quiet", foodPreference: "Vegetarian",
    guestPreference: "Never", sharingPreference: "Double",
    acPreference: "Required",
    bio: "Final year IT student. Prefer a clean, quiet environment. Looking for a female roommate only.",
  },
  {
    id: "rm-4",
    name: "Divya Krishnan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    age: 20, gender: "Female",
    collegeId: "col-3", collegeName: "Christ University, Bengaluru",
    course: "BBA", year: "2nd Year",
    budgetMin: 9000, budgetMax: 14000,
    preferredArea: "Koramangala / Hosur Road",
    moveInDate: "1 Aug 2026",
    smoking: "No", drinking: "Occasionally",
    sleepSchedule: "Night Owl", cleanliness: "Average",
    studyStyle: "Social", foodPreference: "Non-vegetarian",
    guestPreference: "Occasional", sharingPreference: "Double",
    acPreference: "Required",
    bio: "BBA student at Christ. Social but respectful of boundaries. Looking for easygoing female roommate.",
  },
];

// ─── DOMESTIC HELPERS ─────────────────────────────────────────────────────────

export const MOCK_HELPERS: DomesticHelper[] = [
  {
    id: "help-1",
    name: "Sunita Devi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    gender: "Female",
    serviceArea: "Crossings Republik & Lal Kuan (Near ABES)",
    verificationStatus: "VERIFIED",
    backgroundCheckStatus: true,
    rating: 4.8, reviewCount: 19,
    services: [
      { name: "Cooking (North Indian Veg)", priceRange: "₹2,000 – ₹3,500/month" },
      { name: "House Cleaning & Mopping", priceRange: "₹1,200 – ₹2,000/month" },
      { name: "Utensil Washing", priceRange: "₹800 – ₹1,500/month" },
    ],
    availability: "Morning (7 AM – 11 AM) & Evening (5 PM – 8 PM)",
    experienceYears: 6,
  },
  {
    id: "help-2",
    name: "Ravi Kumar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    gender: "Male",
    serviceArea: "Hudson Lane & Kamla Nagar (Near DU North Campus)",
    verificationStatus: "VERIFIED",
    backgroundCheckStatus: true,
    rating: 4.6, reviewCount: 31,
    services: [
      { name: "Cooking (North Indian, Both Veg & Non-Veg)", priceRange: "₹2,500 – ₹4,000/month" },
      { name: "Full Domestic Help", priceRange: "₹3,500 – ₹5,500/month" },
      { name: "Laundry (Wash & Fold)", priceRange: "₹1,000 – ₹2,000/month" },
    ],
    availability: "Morning (8 AM – 12 PM)",
    experienceYears: 9,
  },
  {
    id: "help-3",
    name: "Lakshmi Amma",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=200&q=80",
    gender: "Female",
    serviceArea: "Koramangala & Hosur Road (Near Christ University)",
    verificationStatus: "VERIFIED",
    backgroundCheckStatus: false,
    rating: 4.5, reviewCount: 14,
    services: [
      { name: "House Cleaning & Sweeping", priceRange: "₹1,500 – ₹2,500/month" },
      { name: "Utensil Washing", priceRange: "₹1,000 – ₹1,800/month" },
    ],
    availability: "Morning (6 AM – 10 AM)",
    experienceYears: 4,
  },
];
