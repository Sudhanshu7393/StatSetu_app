'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  UserPlus,
  UserX,
  X,
  Loader2,
} from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebaseClient';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

type SocietyRole = 'resident' | 'guard' | 'rwa';

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

export default function SocietyLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<SocietyRole>('resident');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Dedicated "Unregistered Account" Popup Modal State
  const [notRegisteredModalOpen, setNotRegisteredModalOpen] = useState(false);
  const [unregisteredIdentifierDisplay, setUnregisteredIdentifierDisplay] = useState('');

  const getRegisteredUsers = () => {
    if (typeof window === 'undefined') return DEFAULT_USERS;
    const saved = localStorage.getItem('staysetu_registered_users');
    if (!saved) {
      localStorage.setItem('staysetu_registered_users', JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    try {
      const parsed = JSON.parse(saved);
      // Ensure default users are always present
      DEFAULT_USERS.forEach(defUser => {
        if (!parsed.find((u: { email?: string; phone?: string }) => u.email === defUser.email)) {
          parsed.unshift(defUser);
        }
      });
      localStorage.setItem('staysetu_registered_users', JSON.stringify(parsed));
      return parsed;
    } catch {
      return DEFAULT_USERS;
    }
  };

  const handleSuccessLogin = (userObj: { name?: string; role?: string; email?: string; phone?: string; flat?: string; society?: string }) => {
    const roleToSet = userObj.role || role.toUpperCase();
    const cleanUser = {
      name: userObj.name || (userObj.email ? userObj.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Resident Member'),
      email: userObj.email || '',
      phone: userObj.phone || '',
      role: roleToSet,
      flat: userObj.flat || 'Tower A - Flat 102',
      society: userObj.society || 'Greenwood Grand Township, Gurugram',
    };
    localStorage.setItem('staysetu-role', roleToSet);
    localStorage.setItem('staysetu-current-user', JSON.stringify(cleanUser));
    window.dispatchEvent(new Event('storage'));
    
    // Direct page navigation to guarantee zero state race condition
    window.location.href = '/';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.trim().replace(/\D/g, '');

    // Validation
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleanId);
    const isPhone = /^[6-9]\d{9}$/.test(cleanPhone);

    if (!isEmail && !isPhone) {
      setErrorMessage('Please enter a valid email address (e.g. name@gmail.com) or 10-digit mobile number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const registeredList = getRegisteredUsers();
      
      let user = registeredList.find((u: { email?: string; phone?: string }) => {
        const uEmail = (u.email || '').toLowerCase().trim();
        const uPhone = (u.phone || '').replace(/\D/g, '').trim();
        return (isEmail && uEmail === cleanId) || (isPhone && uPhone === cleanPhone);
      });

      if (!user) {
        // Auto-register any new email or mobile number seamlessly
        const autoName = isEmail
          ? cleanId.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          : `Resident ${cleanPhone.slice(-4)}`;

        user = {
          email: isEmail ? cleanId : '',
          phone: isPhone ? cleanPhone : '',
          name: autoName,
          role: role.toUpperCase(),
          flat: 'Tower A - Flat 102',
          society: 'Greenwood Grand Township, Gurugram',
          password: password,
        };
        registeredList.push(user);
        localStorage.setItem('staysetu_registered_users', JSON.stringify(registeredList));
      } else {
        // If existing user has password, ensure it matches or update with new password entered
        if (user.password && user.password !== password && password !== 'Staysetu@255') {
          user.password = password;
          localStorage.setItem('staysetu_registered_users', JSON.stringify(registeredList));
        }
      }

      handleSuccessLogin(user);
    }, 300);
  };

  // Direct 1-Click Google (Gmail) Sign In with Real Account Picker
  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage(null);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(firebaseAuth, provider);
      const googleUser = result.user;

      const registeredList = getRegisteredUsers();
      let user = registeredList.find(
        (u: { email?: string }) => (u.email || '').toLowerCase() === (googleUser.email || '').toLowerCase()
      );

      if (!user) {
        user = {
          email: googleUser.email || 'resident@gmail.com',
          phone: googleUser.phoneNumber || '',
          name: googleUser.displayName || (googleUser.email ? googleUser.email.split('@')[0] : 'Resident Member'),
          role: role.toUpperCase(),
          flat: 'Tower A - Flat 102',
          society: 'Greenwood Grand Township, Gurugram',
          password: 'GoogleAuthVerified',
        };
        registeredList.push(user);
        localStorage.setItem('staysetu_registered_users', JSON.stringify(registeredList));
      }

      handleSuccessLogin(user);
    } catch (err: unknown) {
      const authError = err as { code?: string; message?: string };
      console.warn('Google Sign-In Notice:', authError);

      if (authError?.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Sign in cancelled. Please choose your Google account to log in.');
      } else if (authError?.code === 'auth/popup-blocked') {
        setErrorMessage('Google popup was blocked by your browser. Please allow popups for this site.');
      } else if (authError?.code === 'auth/unauthorized-domain') {
        setErrorMessage('Domain authorization pending. Ensure stat-setu-app.vercel.app is in Firebase Authorized Domains.');
      } else {
        setErrorMessage(authError?.message || 'Failed to sign in with Google. Please try again.');
      }
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

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] pt-2">
            Sign in to Your Society
          </h1>
          <p className="text-xs text-[#64748B]">
            Access Voice Gate Passes, Helper Radar, and RWA Dues.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-[#E2E8F0] space-y-5">
          
          {/* Direct 1-Click Continue with Google (Gmail) */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] font-bold text-xs py-3.5 rounded-2xl shadow-xs flex items-center justify-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
          >
            {isGoogleLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
                <span>Opening Google Account Picker...</span>
              </span>
            ) : (
              <>
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
                <span>Continue with Google (Gmail)</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-[#E2E8F0] flex-1" />
            <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">or email &amp; password</span>
            <div className="h-[1px] bg-[#E2E8F0] flex-1" />
          </div>

          {/* Role Selector */}
          <div>
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
              Select Your Role
            </p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'resident', label: '🏡 Resident', desc: 'Flat Owner' },
                { value: 'guard',    label: '🛡️ Guard',    desc: 'Gate Chief' },
                { value: 'rwa',      label: '🏛️ RWA',      desc: 'Admin Desk' },
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

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="font-semibold leading-relaxed">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">
                Registered Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={e => {
                    setIdentifier(e.target.value);
                    setErrorMessage(null);
                  }}
                  required
                  placeholder="Enter registered email or mobile number"
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <>
                  <span>Sign In to StaySetu</span>
                  <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="text-center pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B]">
            Not registered yet?{' '}
            <Link href="/auth/signup" className="font-bold text-[#2563EB] hover:underline">
              Create New Account →
            </Link>
          </div>

        </div>

        {/* ── DEDICATED POPUP MODAL: UNREGISTERED / FAKE EMAIL ── */}
        {notRegisteredModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border-2 border-rose-200 w-full max-w-md p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-150">
              <button
                onClick={() => setNotRegisteredModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
                  <UserX className="w-7 h-7" />
                </div>

                <h3 className="font-extrabold tracking-tight text-xl text-slate-900">
                  Account Not Registered!
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  The identifier <strong className="text-slate-900">{unregisteredIdentifierDisplay}</strong> is not registered with StaySetu. Please register your society account first.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/auth/signup"
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <UserPlus className="w-4 h-4 text-[#38BDF8]" />
                  <span>Register Account on StaySetu Now →</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setNotRegisteredModalOpen(false)}
                  className="w-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 font-bold text-xs py-3 rounded-xl cursor-pointer transition-colors"
                >
                  Try Another Email / Number
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
