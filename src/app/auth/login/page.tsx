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
} from 'lucide-react';
import { OtpVerificationModal } from '@/components/auth/OtpVerificationModal';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

type SocietyRole = 'resident' | 'guard' | 'rwa';

export default function SocietyLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'phone' | 'email'>('phone');
  const [role, setRole] = useState<SocietyRole>('resident');
  const [phone, setPhone] = useState('98711 00222');
  const [society, setSociety] = useState('Greenwood Grand Township, Gurugram');
  const [flatNo, setFlatNo] = useState('A-102');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const handleSuccessLogin = () => {
    localStorage.setItem('staysetu-role', role.toUpperCase());
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'phone') {
      const cleanPhone = phone.trim().replace(/\D/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9');
        return;
      }
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

          {/* Society Details (For Resident & Guard) */}
          {role === 'resident' && (
            <div className="grid grid-cols-12 gap-2 text-xs">
              <div className="col-span-8 space-y-1">
                <label className="text-[10px] font-bold text-[#64748B] uppercase">Society</label>
                <select
                  value={society}
                  onChange={e => setSociety(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                >
                  <option>Greenwood Grand Township, Gurugram</option>
                  <option>Palm Olympic High-Rise, Noida Extension</option>
                  <option>Eldeco Utopia Township, Greater Noida</option>
                </select>
              </div>

              <div className="col-span-4 space-y-1">
                <label className="text-[10px] font-bold text-[#64748B] uppercase">Flat No.</label>
                <input
                  type="text"
                  value={flatNo}
                  onChange={e => setFlatNo(e.target.value)}
                  placeholder="A-102"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                />
              </div>
            </div>
          )}

          {/* Login Method Tabs */}
          <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
            {(['phone', 'email'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                  tab === t
                    ? 'bg-white text-[#0F172A] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {t === 'phone' ? '📱 Mobile OTP / WhatsApp' : '📧 Email & Password'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'phone' ? (
              <div className="space-y-1 text-xs">
                <label className="font-bold text-[#64748B] text-[10px] uppercase block">
                  10-Digit Registered Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748B]">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    placeholder="98711 00222"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
                <p className="text-[11px] text-[#64748B] pt-0.5">
                  Instant 6-digit OTP pass will be sent via SMS / WhatsApp.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="resident@staysetu.com"
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-3 pr-10 py-2.5 text-xs font-bold text-[#0F172A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{tab === 'phone' ? 'Send Mobile OTP Pass' : 'Sign In to Society'}</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </form>

          <p className="text-center text-xs text-[#64748B]">
            New to StaySetu?{' '}
            <Link href="/auth/signup" className="text-[#2563EB] font-bold hover:underline">
              Onboard Your Society / Register Flat
            </Link>
          </p>

        </div>

        {/* OTP Verification Modal */}
        <OtpVerificationModal
          phoneNumber={phone || '9871100222'}
          userRole={role.toUpperCase()}
          isOpen={otpModalOpen}
          onClose={() => setOtpModalOpen(false)}
          onSuccess={handleSuccessLogin}
        />

        <p className="text-center text-xs text-[#64748B]">
          SOC-2 Type II Certified &amp; 256-Bit Bank-Grade Encrypted.
        </p>

      </div>
    </div>
  );
}
