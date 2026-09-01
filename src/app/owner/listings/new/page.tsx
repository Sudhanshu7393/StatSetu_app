'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  CheckCircle2,
  Upload,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  FileText,
  DollarSign,
  Utensils
} from 'lucide-react';
import { COLLEGES_DATA } from '@/lib/mock-data';

export default function NewListingWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('PG');
  const [genderPref, setGenderPref] = useState('BOYS');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [selectedCollegeId, setSelectedCollegeId] = useState(COLLEGES_DATA[0].id);
  const [description, setDescription] = useState('');

  // Step 2 State
  const [singleRent, setSingleRent] = useState(12000);
  const [doubleRent, setDoubleRent] = useState(8500);
  const [securityDeposit, setSecurityDeposit] = useState(8500);
  const [brokerageFee, setBrokerageFee] = useState(2500);
  const [foodIncluded, setFoodIncluded] = useState(true);
  const [foodPref, setFoodPref] = useState('VEGETARIAN');

  // Step 3 State
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [idProofUploaded, setIdProofUploaded] = useState(true);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Wizard Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">List Your Student Property</h1>
            <span className="text-xs text-brand-600 font-bold bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
              Step {currentStep} of 3
            </span>
          </div>

          {/* Progress Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className={`h-2 rounded-full transition-all ${currentStep >= 1 ? 'bg-brand-600' : 'bg-slate-200'}`} />
            <div className={`h-2 rounded-full transition-all ${currentStep >= 2 ? 'bg-brand-600' : 'bg-slate-200'}`} />
            <div className={`h-2 rounded-full transition-all ${currentStep >= 3 ? 'bg-brand-600' : 'bg-slate-200'}`} />
          </div>

          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span className={currentStep === 1 ? 'text-brand-700' : ''}>1. Property Info</span>
            <span className={currentStep === 2 ? 'text-brand-700' : ''}>2. Rooms & Costs</span>
            <span className={currentStep === 3 ? 'text-brand-700' : ''}>3. Verify & Submit</span>
          </div>
        </div>

        {/* STEP CONTENT */}
        {!submitted ? (
          <form onSubmit={handleSubmitListing} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-5">
            {/* STEP 1: PROPERTY DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="font-bold text-slate-900 text-base">Step 1 — Property Basic Details</h2>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Property Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunrise Student Luxury PG"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-800"
                    >
                      <option value="PG">PG (Paying Guest)</option>
                      <option value="HOSTEL">Hostel</option>
                      <option value="FLAT">Student Flat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender Preference</label>
                    <select
                      value={genderPref}
                      onChange={(e) => setGenderPref(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-800"
                    >
                      <option value="BOYS">Boys Only</option>
                      <option value="GIRLS">Girls Only</option>
                      <option value="COED">Co-Ed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nearest College</label>
                  <select
                    value={selectedCollegeId}
                    onChange={(e) => setSelectedCollegeId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-800"
                  >
                    {COLLEGES_DATA.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name} ({col.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot 42, Crossings Road"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Locality</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lal Kuan / Kamla Nagar"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe amenities, Wi-Fi speed, warden presence, and campus walking distance..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: ROOMS & FACILITIES */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="font-bold text-slate-900 text-base">Step 2 — Rooms, Pricing & Brokerage</h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Single Room Rent (₹/mo)</label>
                    <input
                      type="number"
                      value={singleRent}
                      onChange={(e) => setSingleRent(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Double Room Rent (₹/mo)</label>
                    <input
                      type="number"
                      value={doubleRent}
                      onChange={(e) => setDoubleRent(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Security Deposit (₹)</label>
                    <input
                      type="number"
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brokerage / Token Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={brokerageFee}
                      onChange={(e) => setBrokerageFee(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Must be declared transparently to students.</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={foodIncluded}
                      onChange={(e) => setFoodIncluded(e.target.checked)}
                      className="rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span>Food / Mess Included in Rent</span>
                  </label>

                  {foodIncluded && (
                    <div className="flex gap-3 text-xs">
                      <label className="flex items-center gap-1 font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="food"
                          checked={foodPref === 'VEGETARIAN'}
                          onChange={() => setFoodPref('VEGETARIAN')}
                        />
                        Pure Veg
                      </label>
                      <label className="flex items-center gap-1 font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="food"
                          checked={foodPref === 'BOTH'}
                          onChange={() => setFoodPref('BOTH')}
                        />
                        Veg & Non-Veg
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: PHOTOS & VERIFICATION */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="font-bold text-slate-900 text-base">Step 3 — Photos & Verification Documents</h2>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center space-y-2">
                  <Upload className="w-8 h-8 text-brand-600 mx-auto" />
                  <p className="font-bold text-slate-900 text-xs">Upload Property Photos (Bedrooms, Bathrooms, Mess)</p>
                  <p className="text-[11px] text-slate-500">Selected 4 high quality images ready for submission</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Government ID & Property Proof
                    </span>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Attached
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    StaySetu Admins review documents prior to issuing Verified badges.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 ml-auto shadow-xs"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold ml-auto shadow-xs"
                >
                  Submit Property for Review
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-card">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-black text-slate-900">Property Submitted for Admin Review!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your property details and verification documents have been received by the StaySetu admin team. Review takes under 24 hours.
            </p>
            <button
              onClick={() => router.push('/owner')}
              className="bg-brand-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs"
            >
              Go to Owner Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
