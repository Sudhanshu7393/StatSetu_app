'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  UserPlus,
} from 'lucide-react';
import { OtpVerificationModal } from '@/components/auth/OtpVerificationModal';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

type SocietyRole = 'resident' | 'guard' | 'rwa';

export default function SocietyLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'phone' | 'email'>('phone');
  const [role, setRole] = useState<SocietyRole>('resident');
  const [phone, setPhone] = useState('73930 11350');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [notRegisteredError, setNotRegisteredError] = useState<string | null>(null);

  const handleSuccessLogin = () => {
    localStorage.setItem('staysetu-role', role.toUpperCase());
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotRegisteredError(null);

    if (tab === 'phone') {
      const cleanPhone = phone.trim().replace(/\D/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9');
        return;
      }

      // Check registered users list
      const saved = localStorage.getItem('staysetu_registered_users');
      const registeredList = saved ? JSON.parse(saved) : [
        { phone: '7393011350', name: 'Sudhanshu Pandey', role: 'RESIDENT', flat: 'Tower A - Flat 102' },
        { phone: '9871100222', name: 'Ankit Sharma', role: 'RESIDENT', flat: 'Tower C - Flat 402' },
      ];

      const user = registeredList.find((u: { phone: string }) => u.phone === cleanPhone);

      if (!user) {
        setNotRegisteredError(
          `Mobile number +91 ${cleanPhone} is not registered yet. Please create your account first to access StaySetu.`
        );
        return;
      }

      // If registered, proceed to OTP verification
      setOtpModalOpen(true);
    } else {
      handleSuccessLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex items-center justify-center px-4 py-12 font-sans antialiased relative bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px]">
      <div className="w-full max-w-md space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center group">
            <StaySetuLogo variant="dark" size="lg" />
          </Link>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] pt-2">
            Sign in to Your Society
          </h1>
          <p className="text-xs text-[#64748B]">
            Access Voice Gate Passes, Helper Radar, and RWA Dues.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.05)] border border-[#E2E8F0] space-y-5">
          
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
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9]'
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

          {/* Not Registered Error Banner */}
          {notRegisteredError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="font-semibold leading-relaxed">{notRegisteredError}</p>
              </div>
              <Link
                href="/auth/signup"
                className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register Account on StaySetu Now →</span>
              </Link>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">
                Registered Mobile Number
              </label>
              <div className="flex items-center gap-2">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs font-bold text-[#0F172A] shrink-0">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                    setNotRegisteredError(null);
                  }}
                  required
                  placeholder="73930 11350"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Get Verification OTP via SMS</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="text-center pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B]">
            Not registered yet?{' '}
            <Link href="/auth/signup" className="font-bold text-[#2563EB] hover:underline">
              Create New Resident Account →
            </Link>
          </div>

        </div>

        {/* OTP Modal */}
        <OtpVerificationModal
          phoneNumber={phone.replace(/\D/g, '') || '7393011350'}
          userRole={role.toUpperCase()}
          isOpen={otpModalOpen}
          onClose={() => setOtpModalOpen(false)}
          onSuccess={handleSuccessLogin}
        />

      </div>
    </div>
  );
}
