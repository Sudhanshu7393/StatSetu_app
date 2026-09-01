'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
} from 'lucide-react';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

type SocietyRole = 'resident' | 'rwa' | 'guard';

export default function SocietySignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<SocietyRole>('resident');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [societyName, setSocietyName] = useState('Greenwood Grand Township, Gurugram');
  const [towerWing, setTowerWing] = useState('Tower A');
  const [flatNo, setFlatNo] = useState('');
  const [unitsCount, setUnitsCount] = useState('250 Flats');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('staysetu-role', role.toUpperCase());
    window.dispatchEvent(new Event('storage'));
    alert(`✅ Registration Successful for ${name} as ${role.toUpperCase()}! Welcome to StaySetu.`);
    router.push('/');
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
            Create Your Account
          </h1>
          <p className="text-xs text-[#64748B]">
            Register your flat or onboard your entire gated community.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.05)] border border-[#E2E8F0] space-y-5">
          
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

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="e.g. Sudhanshu Pandey"
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A]"
              />
            </div>

            <div>
              <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Mobile Number (WhatsApp Enabled)</label>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                placeholder="98711 00222"
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A]"
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
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A]"
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
                    placeholder="Tower A"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#64748B] text-[10px] uppercase block mb-1">Flat Number</label>
                  <input
                    type="text"
                    value={flatNo}
                    onChange={e => setFlatNo(e.target.value)}
                    required
                    placeholder="Flat 102"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
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
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0F172A]"
                >
                  <option>100 - 250 Flats</option>
                  <option>250 - 500 Flats</option>
                  <option>500 - 1500 Flats (Mega Township)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{role === 'rwa' ? 'Request Society Onboarding Demo' : 'Create Resident Account'}</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </form>

          <p className="text-center text-xs text-[#64748B]">
            Already registered?{' '}
            <Link href="/auth/login" className="text-[#2563EB] font-bold hover:underline">
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}
