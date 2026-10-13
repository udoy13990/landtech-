import React, { useState } from 'react';
import {
  GitBranch,
  Calendar,
  FileText,
  User,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Compass,
  Check,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OwnershipEvent } from '../types';

export const OwnershipHistoryPage: React.FC = () => {
  const {
    language,
    t,
    navigateTo,
    parcels,
    selectedParcelId,
    setSelectedParcelId,
    ownershipEvents
  } = useApp();

  const [activeParcelId, setActiveParcelId] = useState<string>(selectedParcelId);
  const [selectedNode, setSelectedNode] = useState<OwnershipEvent | null>(null);

  const activeParcel = parcels.find((p) => p.id === activeParcelId) || parcels[0];
  const parcelEvents = ownershipEvents.filter((e) => e.parcelId === activeParcelId);

  // Case Navigator Stages
  const NAVIGATOR_STAGES = [
    {
      id: 1,
      status: 'COMPLETED',
      titleBn: 'প্রাথমিক সিএস/এসএ জরিপ রেকর্ড ও মালিকানা ভিত্তি',
      titleEn: '1. Initial Settlement & Survey Baseline',
      whatThisMeansBn: 'রাষ্ট্রীয়ভাবে প্রকাশিত চূড়ান্ত রেকর্ডে মূল মালিকের নামে খতিয়ান প্রস্তুত ও গেজেট প্রকাশিত হয়েছিল।',
      whatThisMeansEn: 'Predecessor title was gazetted and recorded in the official survey khatian press.',
      whatNextBn: 'পরবর্তী ওয়ারিশান বা হস্তান্তর দলিল প্রস্তুত রাখা।',
      whatNextEn: 'Maintain genealogical records and tax receipts for subsequent transfers.'
    },
    {
      id: 2,
      status: 'COMPLETED',
      titleBn: 'ওয়ারিশান বণ্টন ও বণ্টননামা নিবন্ধন',
      titleEn: '2. Inheritance Warishan Distribution',
      whatThisMeansBn: 'মূল মালিকের মৃত্যুর পর বৈধ ওয়ারিশদের মাঝে ফারায়িজ নীতি অনুযায়ী অংশ বণ্টিত ও রেজিস্ট্রি হয়েছে।',
      whatThisMeansEn: 'Heirs legally partitioned undivided land according to statutory inheritance ratios.',
      whatNextBn: 'পৃথক নামজারি ও জমাখারিজ আবেদনের মাধ্যমে নিজ নামে খতিয়ান প্রস্তুত করা।',
      whatNextEn: 'Apply for e-Mutation to separate individual holding from joint ancestral record.'
    },
    {
      id: 3,
      status: activeParcel.integrityStatus === 'CRITICAL_MISMATCH' ? 'FLAGGED' : 'COMPLETED',
      titleBn: 'সাফ-কবলা হস্তান্তর ও সাব-রেজিস্ট্রি সম্পাদন',
      titleEn: '3. Registered Deed Conveyance',
      whatThisMeansBn: activeParcel.integrityStatus === 'CRITICAL_MISMATCH'
        ? 'সতর্কতা: প্রস্তাবিত দলিলে প্রাপ্য পরিমাণের চেয়ে বেশি জমি (০.৫০ বনাম ০.৩০ একর) হস্তান্তরের চেষ্টা ধরা পড়েছে।'
        : '১.০০ একর জমির সম্পূর্ণ পণমূল্য পরিশোধ ও বায়োমেট্রিক নিবন্ধনের মাধ্যমে সাফ-কবলা সম্পন্ন হয়েছে।',
      whatThisMeansEn: activeParcel.integrityStatus === 'CRITICAL_MISMATCH'
        ? 'Conflict Detected: The attempted deed requests more acreage than available in the khatian.'
        : 'Deed registered with cleared consideration and biometric party verification.',
      whatNextBn: activeParcel.integrityStatus === 'CRITICAL_MISMATCH'
        ? 'করণীয়: অংশীদারদের সহ-স্বত্বাধিকার সম্মতিপত্র অথবা ভুল সংশোধনী দলিল দাখিল করতে হবে।'
        : 'এসিল্যান্ড অফিসে ই-নামজারি ও ডিসিআর ফি প্রদানের জন্য অনলাইনে জমা দেওয়া।',
      whatNextEn: activeParcel.integrityStatus === 'CRITICAL_MISMATCH'
        ? 'Action Required: Submit revised deed matching actual unencumbered fractional share.'
        : 'Proceed to AC Land online mutation submission and pay DCR government fees.'
    },
    {
      id: 4,
      status: activeParcel.integrityStatus === 'CRITICAL_MISMATCH' ? 'PENDING' : 'COMPLETED',
      titleBn: 'সহকারী কমিশনার (ভূমি) কর্তৃক ই-নামজারি ও ডিসিআর',
      titleEn: '4. e-Mutation Approval & DCR Issuance',
      whatThisMeansBn: 'পূর্বের খতিয়ান হতে নাম কর্তনপূর্বক ক্রেতার অনুকূলে নতুন খতিয়ান (১০৪২/এম) সৃজন।',
      whatThisMeansEn: 'Official correction of land register and issuance of fresh title khatian.',
      whatNextBn: 'অনলাইনে ডিজিটাল দাখিলা সংগ্রহ ও বার্ষিক ভূমি উন্নয়ন কর পরিশোধ নিশ্চিত রাখা।',
      whatNextEn: 'Maintain annual land development tax payments to avoid public arrears.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10 text-left bg-[#061A14] text-white">
      {/* Top Banner with Synthetic Data Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#00A86B]/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2C94C]/15 text-[#F2C94C] font-bold border border-[#F2C94C]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Synthetic demo data · সিন্থেটিক ডেমো ডেটা</span>
          </span>
          <span className="text-gray-400">
            Internal Case ID: <strong className="text-emerald-300 font-mono">LT-BD-2026-00182</strong>
          </span>
        </div>
        <div className="text-[11px] text-gray-400">
          Not a legal clearance. Human review required on critical outputs.
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#00A86B]/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-[#F2C94C]" />
            <span>{language === 'bn' ? 'মালিকানা ধারাবাহিকতা ও বংশানুক্রমিক গ্রাফ' : 'Ownership History & Visual Chain'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'bn' ? 'ভিজ্যুয়াল ওনারশিপ হিস্ট্রি গ্রাফ ও কেস নেভিগেটর' : 'Visual Ownership History Graph & Case Navigator'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            {language === 'bn'
              ? 'মালিকানা হস্তান্তরের কালানুক্রমিক নোড-এজ গ্রাফ। কোনো অতিরিক্ত বা ত্রুটিপূর্ণ হস্তান্তর থাকলে তা লাল রঙে চিহ্নিত থাকে।'
              : 'Interactive chronological node-edge graph of owner-to-owner transfers highlighting conflicting or broken links.'}
          </p>
        </div>

        {/* Parcel Selector */}
        <div className="shrink-0">
          <select
            value={activeParcelId}
            onChange={(e) => {
              setActiveParcelId(e.target.value);
              setSelectedParcelId(e.target.value);
              setSelectedNode(null);
            }}
            className="bg-[#0A261D] border border-[#00A86B]/40 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
          >
            {parcels.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0A261D] text-white">
                {p.id}: {p.demoLabel} ({p.mouzaEn})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Parcel Context Bar */}
      <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-[11px] text-gray-400 block">Registered Owner:</span>
          <span className="font-bold text-white">
            {language === 'bn' ? activeParcel.recordedOwnerBn : activeParcel.recordedOwnerEn}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-gray-400 block">Mouza & District:</span>
          <span className="font-bold text-white">
            {activeParcel.mouzaEn}, {activeParcel.districtEn}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-gray-400 block">Registered Area:</span>
          <span className="font-bold text-[#F2C94C] font-mono">{activeParcel.recordedAreaAcres} একর</span>
        </div>
        <div>
          <span className="text-[11px] text-gray-400 block">Chain Continuity:</span>
          <span
            className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
              activeParcel.integrityStatus === 'CONSISTENT'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-rose-950 text-rose-300 border border-rose-500/40'
            }`}
          >
            {activeParcel.integrityStatus === 'CONSISTENT' ? 'Continuous (অক্ষুণ্ণ)' : 'Discrepancy (অমিল)'}
          </span>
        </div>
      </div>

      {/* SECTION 1: VISUAL OWNERSHIP HISTORY GRAPH (Interactive Nodes & Edges) */}
      <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#F2C94C]" />
            <h2 className="text-base font-black text-white">
              {language === 'bn' ? '১. ভিজ্যুয়াল হস্তান্তর চেইন গ্রাফ (Nodes & Edges)' : '1. Interactive Ownership Graph'}
            </h2>
          </div>
          <span className="text-xs text-emerald-300">
            {parcelEvents.length} events · Click any node for details
          </span>
        </div>

        {/* Visual Graph Chain Display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative py-2">
          {parcelEvents.map((evt, idx) => {
            const isConflicting = evt.status === 'FLAGGED' || activeParcel.integrityStatus === 'CRITICAL_MISMATCH';
            const isSelected = selectedNode?.id === evt.id;

            return (
              <div key={evt.id} className="relative">
                {/* Connecting arrow edge between nodes */}
                {idx < parcelEvents.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-emerald-400/60">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                <div
                  onClick={() => setSelectedNode(evt)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#0E3529] border-[#F2C94C] ring-2 ring-[#F2C94C]/40 shadow-xl'
                      : isConflicting && idx === parcelEvents.length - 1
                      ? 'bg-rose-950/30 border-rose-500/60 hover:border-rose-400'
                      : 'bg-[#061A14] border-[#00A86B]/30 hover:border-[#00A86B]/70'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1 border-b border-[#00A86B]/20">
                    <span className="text-[10px] font-mono font-bold text-[#F2C94C]">
                      {evt.year}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.2 rounded ${
                        isConflicting && idx === parcelEvents.length - 1
                          ? 'bg-rose-900 text-rose-300'
                          : 'bg-emerald-900 text-emerald-300'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white line-clamp-1">
                    {language === 'bn' ? evt.titleBn : evt.titleEn}
                  </div>

                  <div className="text-[11px] text-gray-300">
                    <span className="text-gray-400 block text-[10px]">Transferee (মালিক):</span>
                    <span className="font-semibold text-emerald-300">{evt.toPartyBn || evt.toPartyEn}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-[#00A86B]/15">
                    <span className="font-mono font-bold text-[#F2C94C]">{evt.areaAcres.toFixed(2)} একর</span>
                    <span className="truncate max-w-[100px]">{evt.documentRef}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Detailed Drawer */}
        {selectedNode && (
          <div className="p-4 rounded-2xl bg-[#061A14] border border-[#F2C94C]/40 space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F2C94C]">
                নোড বিস্তারিত: {selectedNode.titleBn || selectedNode.titleEn} ({selectedNode.year})
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-gray-400 hover:text-white"
              >
                ✕ বন্ধ
              </button>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {selectedNode.notesBn || selectedNode.notesEn}
            </p>
            <div className="text-[11px] text-emerald-300 font-mono">
              রেফারেন্স: {selectedNode.documentRef} · পরিমাণ: {selectedNode.areaAcres} একর
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: EXPLAINABLE CASE NAVIGATOR (Completed, Pending & Upcoming Stages) */}
      <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-black text-white">
              {language === 'bn' ? '২. ব্যাখ্যাযোগ্য কেস নেভিগেটর (Explainable Case Navigator)' : '2. Explainable Case Navigator'}
            </h2>
          </div>
          <span className="text-xs text-gray-400">
            Plain-language explanations of administrative progress
          </span>
        </div>

        <div className="space-y-4">
          {NAVIGATOR_STAGES.map((stage) => {
            const isDone = stage.status === 'COMPLETED';
            const isFlagged = stage.status === 'FLAGGED';

            return (
              <div
                key={stage.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all text-xs space-y-2.5 ${
                  isFlagged
                    ? 'bg-rose-950/20 border-rose-500/50'
                    : isDone
                    ? 'bg-[#061A14] border-[#00A86B]/30'
                    : 'bg-[#061A14]/60 border-gray-700 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        isFlagged
                          ? 'bg-rose-600 text-white'
                          : isDone
                          ? 'bg-[#00A86B] text-white'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {isFlagged ? '!' : stage.id}
                    </div>
                    <span className="font-bold text-sm text-white">
                      {language === 'bn' ? stage.titleBn : stage.titleEn}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      isFlagged
                        ? 'bg-rose-900 text-rose-300'
                        : isDone
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>

                {/* Plain-Language 2 Columns: "What this means" & "What to do next" */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#00A86B]/15">
                  <div className="p-3 bg-[#0A261D] rounded-xl border border-[#00A86B]/20 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      এর অর্থ কী (What this means):
                    </span>
                    <p className="text-gray-200 leading-relaxed text-[11px]">
                      {language === 'bn' ? stage.whatThisMeansBn : stage.whatThisMeansEn}
                    </p>
                  </div>

                  <div className="p-3 bg-[#0A261D] rounded-xl border border-[#00A86B]/20 space-y-1">
                    <span className="text-[10px] font-bold text-[#F2C94C] uppercase tracking-wider block">
                      আপনার করণীয় কী (What you should do next):
                    </span>
                    <p className="text-gray-200 leading-relaxed text-[11px]">
                      {language === 'bn' ? stage.whatNextBn : stage.whatNextEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
