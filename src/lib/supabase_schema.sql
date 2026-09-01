-- StaySetu Smart Gated Community Database Schema (Supabase PostgreSQL)
-- Run this script in the Supabase SQL Editor to create all production tables

-- 1. FLATS & RESIDENTS DIRECTORY
CREATE TABLE IF NOT EXISTS flats (
  id TEXT PRIMARY KEY,
  tower TEXT NOT NULL,
  flat_no TEXT NOT NULL,
  resident_name TEXT NOT NULL,
  resident_phone TEXT NOT NULL,
  intercom TEXT NOT NULL,
  bhk TEXT NOT NULL,
  car_plate TEXT,
  parking_slot TEXT,
  maintenance_status TEXT DEFAULT 'DUE',
  maintenance_amount NUMERIC DEFAULT 3540,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SECURITY GATE & FASTTAG LOGS
CREATE TABLE IF NOT EXISTS gate_logs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'FASTTAG', 'VISITOR', 'DELIVERY', 'SHIFTING'
  detail TEXT NOT NULL,
  status TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  synced BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. WRONG PARKING ALERTS
CREATE TABLE IF NOT EXISTS parking_alerts (
  id TEXT PRIMARY KEY,
  car_plate TEXT NOT NULL,
  blocked_slot TEXT NOT NULL,
  owner_flat TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  countdown_minutes INT DEFAULT 10,
  timestamp TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 2-HOUR SLA HELPDESK TICKETS
CREATE TABLE IF NOT EXISTS helpdesk_tickets (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  raised_by_flat TEXT NOT NULL,
  assigned_technician TEXT NOT NULL,
  technician_phone TEXT NOT NULL,
  sla_minutes_remaining INT DEFAULT 120,
  otp_to_close TEXT NOT NULL,
  status TEXT DEFAULT 'ASSIGNED',
  timestamp TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CLUBHOUSE & AMENITY BOOKINGS
CREATE TABLE IF NOT EXISTS amenity_bookings (
  id TEXT PRIMARY KEY,
  amenity_name TEXT NOT NULL,
  slot TEXT NOT NULL,
  booked_by_flat TEXT NOT NULL,
  qr_pass_code TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. DOMESTIC HELPER RADAR & STAFF
CREATE TABLE IF NOT EXISTS helper_staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  rating NUMERIC DEFAULT 4.9,
  phone TEXT NOT NULL,
  current_location TEXT NOT NULL,
  is_inside_campus BOOLEAN DEFAULT true,
  rate_per_day NUMERIC DEFAULT 200,
  is_booked_today BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSERT INITIAL SEED DATA
INSERT INTO flats (id, tower, flat_no, resident_name, resident_phone, intercom, bhk, car_plate, parking_slot, maintenance_status, maintenance_amount)
VALUES 
  ('f1', 'Tower C', '402', 'Ankit Sharma', '9871100222', '1402', '3 BHK', 'UP14 EX 9988', 'Basement B1 - Slot #42', 'DUE', 3540),
  ('f2', 'Tower A', '102', 'Sudhanshu Pandey', '9871100111', '1102', '3 BHK', 'DL8C AB 1234', 'Basement B1 - Slot #12', 'PAID', 3540),
  ('f3', 'Tower B', '204', 'Neha Kapoor', '9871100333', '1204', '2 BHK', 'HR26 DK 5544', 'Basement B2 - Slot #18', 'PAID', 2850),
  ('f4', 'Tower D', '801', 'Rajesh Verma', '9871100444', '1801', '4 BHK Penthouse', 'UP16 ZQ 7700', 'Basement B1 - Slot #88', 'DUE', 4800)
ON CONFLICT (id) DO NOTHING;

INSERT INTO helper_staff (id, name, role, rating, phone, current_location, is_inside_campus, rate_per_day, is_booked_today)
VALUES
  ('h1', 'Sunita Devi', 'Cook & Cleaning', 4.9, '+91 98711 88001', 'Inside Tower A', true, 200, false),
  ('h2', 'Ramesh Kumar', 'Deep Cleaning & Dusting', 4.8, '+91 98711 88002', 'Inside Tower D', true, 250, false),
  ('h3', 'Anita Sharma', 'Child Daycare & Nanny', 5.0, '+91 98711 88003', 'Inside Tower B', true, 300, false),
  ('h4', 'Mohan Lal', 'Car Detailing & Wash', 4.7, '+91 98711 88004', 'Basement B1 Car Wash Area', true, 150, false)
ON CONFLICT (id) DO NOTHING;
