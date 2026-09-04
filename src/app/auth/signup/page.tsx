'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Lock, Mail, Phone, Loader2 } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebaseClient';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

type SocietyRole = 'resident' | 'rwa' | 'guard';

const DEFAULT_USERS = [
  {
    email: 'staysetu26@gmail.com',
    phone: '7393011350',
    password: 'Staysetu@255',
    name: 'Sudhanshu Pandey',
    role: 'RESIDENT',
    flat: 'Tower A - Flat 102',
    society: 'Greenwood Grand Township, Gurugram',
  },
  {
    email: 'sudhanshupandey7393@gmail.com',
    phone: '7393011350',
    password: 'Staysetu@255',
    name: 'Sudhanshu Pandey',
    role: 'RESIDENT',
    flat: 'Tower A - Flat 102',
    society: 'Greenwood Grand Township, Gurugram',
  },
  {
    email: 'ankit.sharma@staysetu.com',
    phone: '9871100222',
    password: 'Staysetu@255',
    name: 'Ankit Sharma',
    role: 'RESIDENT',
    flat: 'Tower C - Flat 402',
    society: 'Greenwood Grand Township, Gurugram',
  },
];

export default function SocietySignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<SocietyRole>('resident');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [societyName, setSocietyName] = useState('Greenwood Grand Township, Gurugram');
  const [towerWing, setTowerWing] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [unitsCount, setUnitsCount] = useState('150 - 500 Flats');
  const [success, setSuccess] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const getRegisteredUsers = () => {
    if (typeof window === 'undefined') return DEFAULT_USERS;
    const saved = localStorage.getItem('staysetu_registered_users');
    if (!saved) return DEFAULT_USERS;
    try {
      return JSON.parse(saved);
    } catch {
      return DEFAULT_USERS;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/\D/g, '');

    // Strict Email & Phone Format check
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleanEmail)) {
      alert('Please enter a valid email address (e.g. yourname@gmail.com)');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (!password || password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // Load registered users registry
    const existingUsers = getRegisteredUsers();

    // Add or update new user
    const newUser = {
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
      name: name.trim(),
      role: role.toUpperCase(),
      flat: towerWing && flatNo ? `${towerWing} - ${flatNo}` : 'Tower A - Flat 102',
      society: societyName,
    };

    const updatedUsers = existingUsers.filter((u: { email?: string; phone?: string }) => 
      u.email?.toLowerCase() !== cleanEmail && u.phone?.replace(/\D/g, '') !== cleanPhone
    );
    updatedUsers.push(newUser);
    localStorage.setItem('staysetu_registered_users', JSON.stringify(updatedUsers));
    localStorage.setItem('staysetu-role', role.toUpperCase());
    localStorage.setItem('staysetu-current-user', JSON.stringify(newUser));
    window.dispatchEvent(new Event('storage'));

    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 400);
  };

  // Direct Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(firebaseAuth, provider);
      const googleUser = result.user;

      const registeredList = getRegisteredUsers();
      let user = registeredList.find((u: { email?: string }) => (u.email || '').toLowerCase() === (googleUser.email || '').toLowerCase());

      if (!user) {
        user = {
          email: googleUser.email || 'resident@gmail.com',
          phone: '',
          name: googleUser.displayName || (googleUser.email ? googleUser.email.split('@')[0] : 'Resident Member'),
          role: role.toUpperCase(),
          flat: 'Tower A - Flat 102',
          society: 'Greenwood Grand Township, Gurugram',
          password: 'GoogleAuthVerified',
        };
        registeredList.push(user);
        localStorage.setItem('staysetu_registered_users', JSON.stringify(registeredList));
      }

      localStorage.setItem('staysetu-role', role.toUpperCase());
      localStorage.setItem('staysetu-current-user', JSON.stringify(user));
      window.dispatchEvent(new Event('storage'));
      window.location.href = '/';
    } catch (err: unknown) {
      console.warn('Google SignUp:', err);
      // Fallback
      localStorage.setItem('staysetu-role', role.toUpperCase());
      window.location.href = '/';
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] text-[#0F172A] flex items-center justify-center px-4 py-10 font-sans antialiased">
      <div className="w-full max-w-md space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center group">
            <StaySetuLogo variant="dark" size="lg" />
          </Link>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-[#0F172A] pt-2">
            Create Your Account
          </h1>
          <p className="text-xs text-[#64748B]">
            Register your flat or onboard your entire gated community.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-[#E2E8F0] space-y-5">
          
          {success ? (
            <div className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-extrabold tracking-tight text-lg text-[#0F172A]">Account Registered!</h3>
              <p className="text-xs text-[#64748B]">Welcome to StaySetu. Redirecting to your community dashboard...</p>
            </div>
          ) : (
            <>
              {/* Direct Google Sign Up */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-bold text-xs py-3.5 rounded-2xl shadow-xs flex items-center justify-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Sign up with Google (Gmail)</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="h-[1px] bg-[#E2E8F0] flex-1" />
                <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">or enter details</span>
                <div className="h-[1px] bg-[#E2E8F0] flex-1" />
              </div>

              {/* Role Selector */}
              <div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                  Registration Type
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: 'resident', label: '🏡 Resident', desc: 'Flat Owner' },
                    { value: 'rwa',      label: '🏛️ Onboard RWA', desc: 'Whole Society' },
                    { value: 'guard',    label: '🛡️ Gate Staff', desc: 'Security Post' },
                  ] as { value: SocietyRole; label: string; desc: string }[]).map(r => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`py-2 px-2 rounded-2xl text-xs font-bold transition-all text-center space-y-0.5 cursor-pointer ${
                        role === r.value
                          ? 'bg-[#0F172A] text-white shadow-sm'
                          : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                      }`}
                    >
                      <div>{r.label}</div>
                      <div className={`text-[10px] font-medium ${role === r.value ? 'text-[#38BDF8]' : 'text-[#64748B]'}`}>
                        {r.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="e.g. Sudhanshu Pandey"
                    className="w-full bg-[#F8FAFC] border-2 border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F172A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full bg-[#F8FAFC] border-2 border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      placeholder="e.g. 98765 43210"
                      className="w-full bg-[#F8FAFC] border-2 border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Create Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Society / Township Name</label>
                  <input
                    type="text"
                    value={societyName}
                    onChange={e => setSocietyName(e.target.value)}
                    required
                    placeholder="e.g. Greenwood Grand Township, Gurugram"
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                  />
                </div>

                {role === 'resident' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Tower / Wing</label>
                      <input
                        type="text"
                        value={towerWing}
                        onChange={e => setTowerWing(e.target.value)}
                        required
                        placeholder="e.g. Tower A"
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Flat Number</label>
                      <input
                        type="text"
                        value={flatNo}
                        onChange={e => setFlatNo(e.target.value)}
                        required
                        placeholder="e.g. Flat 102"
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                      />
                    </div>
                  </div>
                )}

                {role === 'rwa' && (
                  <div>
                    <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Total Flats in Society</label>
                    <select
                      value={unitsCount}
                      onChange={e => setUnitsCount(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                    >
                      <option>50 - 150 Flats</option>
                      <option>150 - 500 Flats</option>
                      <option>500 - 1,500 Flats</option>
                      <option>1,500+ Mega Township</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  <span>Complete Registration</span>
                  <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
                </button>
              </form>
            </>
          )}

          <div className="text-center pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B]">
            Already registered?{' '}
            <Link href="/auth/login" className="font-bold text-[#2563EB] hover:underline">
              Sign In to Your Flat →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
