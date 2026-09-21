'use client';

import React, { useState, useEffect } from 'react';
import {
  Vote,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Check,
  Sparkles,
} from 'lucide-react';
import { SocietyStore, AGMPoll } from '@/lib/societyStore';

interface SocietyPollsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flatNo?: string;
}

export function SocietyPollsModal({
  isOpen,
  onClose,
  flatNo = 'Tower A - Flat 102',
}: SocietyPollsModalProps) {
  const [poll, setPoll] = useState<AGMPoll | null>(null);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadPoll();
    }
  }, [isOpen]);

  const loadPoll = () => {
    const data = SocietyStore.getPoll();
    setPoll(data);
  };

  if (!isOpen || !poll) return null;

  const totalVotes = poll.yesVotes + poll.noVotes + (poll.abstainVotes || 0);
  const eligibleTotal = poll.totalEligible || 420;
  const yesPercent = totalVotes > 0 ? Math.round((poll.yesVotes / totalVotes) * 100) : 0;
  const noPercent = totalVotes > 0 ? Math.round((poll.noVotes / totalVotes) * 100) : 0;
  const abstainPercent = totalVotes > 0 ? Math.round(((poll.abstainVotes || 0) / totalVotes) * 100) : 0;
  const quorumPercent = Math.round((totalVotes / eligibleTotal) * 100);

  const handleVote = (voteType: 'YES' | 'NO' | 'ABSTAIN') => {
    if (poll.userVoted) return;
    setIsVoting(true);
    setTimeout(() => {
      const updated = SocietyStore.votePollAdvanced(voteType);
      setPoll(updated);
      setIsVoting(false);
      setToastMessage(`Your vote "${voteType}" has been cryptographically recorded for ${flatNo}!`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-blue-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-indigo-300 shadow-inner">
              <Vote className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">Society E-Voting & AGM</h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-400/20 text-indigo-200 border border-indigo-300/30 text-[10px] font-bold uppercase tracking-wider">
                  Audit-Proof
                </span>
              </div>
              <p className="text-xs text-indigo-100/80">Democratic Decisions & Resolution Ballots</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-emerald-800 shadow-sm animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">

          {/* Active Poll Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase tracking-wider">
                {poll.category || 'AGM 2026 RESOLUTION'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Closes in 4 days
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {poll.title}
            </h3>

            {/* Quorum Progress Bar */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Quorum: <strong className="text-white">{totalVotes}</strong> / {eligibleTotal} Flats Voted</span>
                <span className="font-bold text-indigo-400">{quorumPercent}% Participation</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${quorumPercent}%` }}
                />
              </div>
            </div>

            {/* Vote Percentage Breakdown Bars */}
            <div className="space-y-2 pt-2">
              {/* YES BAR */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    YES — In Favor ({poll.yesVotes} votes)
                  </span>
                  <span className="font-black text-emerald-400">{yesPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${yesPercent}%` }}
                  />
                </div>
              </div>

              {/* NO BAR */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    NO — Against ({poll.noVotes} votes)
                  </span>
                  <span className="font-black text-rose-400">{noPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${noPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Voting Action Buttons */}
            {poll.userVoted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">Your Flat Voted: </span>
                    <span className="font-black text-emerald-400 uppercase">{poll.userVoted}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Ballot Sealed ✓</span>
              </div>
            ) : (
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  disabled={isVoting}
                  onClick={() => handleVote('YES')}
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Vote In Favor (YES)</span>
                </button>
                <button
                  disabled={isVoting}
                  onClick={() => handleVote('NO')}
                  className="py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-900/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  <span>Vote Against (NO)</span>
                </button>
              </div>
            )}
          </div>

          {/* Past AGM Resolutions Archive */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Previous Passed Resolutions
            </h4>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800">CCTV Coverage Upgrade for All Lifts</span>
                <p className="text-[11px] text-slate-400">Passed by 89% majority on 15 Aug 2026</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                Approved ✓
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800">Pet Guidelines & Designated Dog Park</span>
                <p className="text-[11px] text-slate-400">Passed by 76% majority on 01 Jul 2026</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                Approved ✓
              </span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Dock */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>1 Flat = 1 Verified Vote (RWA Bye-Laws Compliant)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
