import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Eye,
  GitBranch,
  Shield,
  Layers,
  ArrowRight,
  X,
  Lock,
  UserCheck,
  Info,
  CheckCircle2,
  FileSpreadsheet,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Parcel } from '../types';

export const MyLandPage: React.FC = () => {
  const {
    language,
    t,
    navigateTo,
    parcels,
    selectedParcelId,
    setSelectedParcelId,
    alerts
  } = useApp();

  // Search by code or keyword (e.g. "1042", "101", "204", "Kaliganj")
  const [searchQuery, setSearchQuery] = useState('1042');
  const [detailParcel, setDetailParcel] = useState<Parcel | null>(null);

  // Quick Demo Access Codes matching synthetic demo scenarios
  const quickDemoCodes = [
    { code: '1042', name: '১০৪২ (কালীগঞ্জ · রহিমা বেগম · ১.০০ একর)', status: 'সামঞ্জস্যপূর্ণ (Normal)', parcelId: 'LG-P-001' },
    { code: '204', name: '২০৪ (গুলশান · ক্ষেত্রফল অমিল)', status: 'Review Required', parcelId: 'LG-P-002' },
    { code: '308', name: '৩০৮ (মিরপুর · অতিরিক্ত হস্তান্তর)', status: 'Critical Mismatch', parcelId: 'LG-P-003' },
    { code: '410', name: '৪১০ (উত্তরা · তথ্য অসম্পূর্ণ)', status: 'Missing Data', parcelId: 'LG-P-004' },
    { code: '505', name: '৫০৫ (মতিঝিল · রিভিউ প্রয়োজন)', status: 'Review', parcelId: 'LG-P-005' },
    { code: '602', name: '৬০২ (চট্টগ্রাম · ক্রিপ্টো অডিট)', status: 'Audit Ready', parcelId: 'LG-P-006' }
  ];

  // Filtered parcels based on search query
  const queryClean = searchQuery.trim().toLowerCase();
  const matchedParcels = parcels.filter((p) => {
    if (!queryClean) return true;
    return (
      p.id.toLowerCase().includes(queryClean) ||
      p.dagNumber.toLowerCase().includes(queryClean) ||
      p.khatianNumber.toLowerCase().includes(queryClean) ||
      p.mouzaEn.toLowerCase().includes(queryClean) ||
      p.recordedOwnerEn.toLowerCase().includes(queryClean) ||
      p.recordedOwnerBn.includes(queryClean)
    );
  });

  const activeDisplayParcel = matchedParcels[0] || parcels[0];

  const handleSelectCode = (code: string) => {
    setSearchQuery(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-left bg-[#061A14] text-white">
      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-[#00A86B]/30">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>{language === 'bn' ? 'স্মার্ট নাগরিক ভূমি রেকর্ড সেবা' : 'Smart Citizen Land Records Portal'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'bn' ? 'আমার জমি — সংরক্ষিত রেকর্ড অনুসন্ধান' : 'My Land — Secure Records Portal'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
          {language === 'bn'
            ? 'সরকারি ভূমি ডেটাবেসের মতো নাগরিক গোপনীয়তা বজায় রেখে ট্র্যাকিং কোড, খতিয়ান বা দাগ নম্বর দিয়ে আপনার সম্পত্তির সংরক্ষিত বিবরণী অনুসন্ধান করুন।'
            : 'Access your protected property records, evaluate document consistency, and inspect ownership history using your tracking identifier.'}
        </p>
      </div>

      {/* Citizen Privacy & Data Protection Notice (Explains why real government sites protect citizen data) */}
      <div className="p-5 rounded-2xl bg-[#0A261D] border border-[#00A86B]/40 text-xs text-gray-200 space-y-2 shadow-lg">
        <div className="flex items-center gap-2 font-bold text-sm text-[#F2C94C]">
          <Lock className="w-4 h-4 text-[#F2C94C]" />
          <span>নাগরিক তথ্য সুরক্ষা ও গোপনীয়তা নীতি (land.gov.bd Standard)</span>
        </div>
        <p className="leading-relaxed text-gray-300">
          বাংলাদেশ সরকারের অফিসিয়াল ভূমি সেবা পোর্টালে (land.gov.bd) নাগরিকদের ব্যক্তিগত জমির তথ্য উন্মুক্তভাবে প্রদর্শন করা হয় না। একজন নাগরিক কেবল তার <strong>জাতীয় পরিচয়পত্র (NID)</strong> এবং <strong>মোবাইল ওটিপি</strong> ভেরিফিকেশনের মাধ্যমেই নিজ ভূমির খতিয়ান ও দাগ দেখতে পারেন।
        </p>
        <p className="text-[11px] text-emerald-300 italic">
          এই প্রোটোটাইপ প্রদর্শন ব্যবস্থায় সিস্টেম পরীক্ষা করার জন্য নিচে যেকোনো ডেমো কোড (যেমন: ১০১, ২০৪, ৩০৮ ইত্যাদি) লিখে অনুসন্ধান করুন।
        </p>
      </div>

      {/* Search Input & Quick Demo Access Code Chips */}
      <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-emerald-300 block">
            {language === 'bn'
              ? 'অনুসন্ধান কোড, খতিয়ান বা দাগ নম্বর লিখুন:'
              : 'Enter Search Code, Dag or Khatian Number:'}
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="যেমন: 101, 204, 308, 505 বা ধানমন্ডি..."
                className="w-full bg-[#061A14] border border-[#00A86B]/40 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold text-white focus:outline-hidden focus:ring-2 focus:ring-[#F2C94C]"
              />
            </div>
            <button
              onClick={() => {}}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              {language === 'bn' ? 'রেকর্ড অনুসন্ধান করুন' : 'Search Record'}
            </button>
          </div>
        </div>

        {/* 1-Click Quick Demo Search Tags */}
        <div className="space-y-2 pt-2 border-t border-[#00A86B]/20">
          <span className="text-[11px] font-bold text-gray-300 block">
            {language === 'bn' ? 'দ্রুত ডেমো কোড দিয়ে পরীক্ষা করুন:' : 'Quick Demo Access Codes:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {quickDemoCodes.map((item) => (
              <button
                key={item.code}
                onClick={() => handleSelectCode(item.code)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  searchQuery.includes(item.code)
                    ? 'bg-[#F2C94C] text-[#06140F] border-[#F2C94C] shadow-sm font-bold'
                    : 'bg-[#061A14] hover:bg-[#0E3529] text-gray-200 border-[#00A86B]/30'
                }`}
              >
                <span>{item.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                    searchQuery.includes(item.code)
                      ? 'bg-[#06140F] text-[#F2C94C] font-bold'
                      : 'bg-[#0A261D] text-emerald-300'
                  }`}
                >
                  {item.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Citizen Record Result Card */}
      {activeDisplayParcel && (
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Synthetic Demo Data Pill */}
          <div className="flex items-center justify-between gap-2 text-[11px] pb-2 border-b border-[#00A86B]/20">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F2C94C]/15 text-[#F2C94C] font-bold border border-[#F2C94C]/30">
              <Sparkles className="w-3 h-3" />
              <span>Synthetic demo data · সিন্থেটিক ডেমো ডেটা</span>
            </span>
            <span className="text-gray-400">
              {language === 'bn' ? 'মডেল পার্সেল: কালীগঞ্জ, গাজীপুর' : 'Model Parcel: Kaliganj, Gazipur'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#00A86B]/30">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#F2C94C] bg-[#061A14] border border-[#00A86B]/40 px-2.5 py-0.5 rounded">
                  {activeDisplayParcel.id}
                </span>
                {/* Land Transaction ID Spec 2 */}
                <span className="font-mono text-xs font-bold text-emerald-300 bg-[#00A86B]/20 border border-[#00A86B]/40 px-2.5 py-0.5 rounded">
                  {activeDisplayParcel.landTransactionId || 'LT-BD-2026-00182'}
                </span>
                <span className="text-[10px] text-gray-400">
                  (Internal project ID, not a new legal government ID)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {language === 'bn' ? activeDisplayParcel.recordedOwnerBn : activeDisplayParcel.recordedOwnerEn}
              </h2>
              <div className="flex items-center gap-3 text-xs text-emerald-300 mt-0.5">
                <span>NID: <strong>১৯৮২****৪৪১২</strong> (যাচাইকৃত)</span>
                <span>·</span>
                <span>মোবাইল: <strong>০১৭১****৫৫২১</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-black shadow-sm ${
                  activeDisplayParcel.integrityStatus === 'CONSISTENT'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                    : activeDisplayParcel.integrityStatus === 'CRITICAL_MISMATCH'
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                    : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                }`}
              >
                {activeDisplayParcel.integrityStatus === 'CONSISTENT'
                  ? 'Normal (সামঞ্জস্যপূর্ণ)'
                  : activeDisplayParcel.integrityStatus === 'CRITICAL_MISMATCH'
                  ? 'Critical (গুরুতর অসঙ্গতি)'
                  : 'Review Required (পর্যালোচনা আবশ্যক)'}
              </span>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#061A14] rounded-2xl text-xs border border-[#00A86B]/30">
            <div>
              <span className="text-[11px] text-gray-400 block">মৌজা ও জেলা:</span>
              <span className="font-bold text-white">{activeDisplayParcel.mouzaEn}, {activeDisplayParcel.districtEn}</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">দাগ ও খতিয়ান:</span>
              <span className="font-bold text-[#F2C94C] font-mono">দাগ #{activeDisplayParcel.dagNumber} · খতিয়ান #{activeDisplayParcel.khatianNumber}</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">জমির পরিমাণ:</span>
              <span className="font-bold text-emerald-400 font-mono">{activeDisplayParcel.recordedAreaAcres} একর</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">জমির শ্রেণি:</span>
              <span className="font-bold text-white">{activeDisplayParcel.landClassBn}</span>
            </div>
          </div>

          {/* Mutation & Tax Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-[#082219] rounded-2xl text-xs border border-[#00A86B]/30">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 block">ই-নামজারি (Mutation Status):</span>
                <span className="font-bold text-emerald-300">অনুমোদিত (খতিয়ান ১০৪২/এম)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-[#F2C94C] shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 block">ভূমি উন্নয়ন কর (Tax Status):</span>
                <span className="font-bold text-[#F2C94C]">১৪৩২ সন পর্যন্ত পরিশোধিত (বকেয়া নেই)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 block">মালিকানা ইতিহাস সারসংক্ষেপ:</span>
                <span className="font-bold text-teal-300">এসএ/আরএস → ওয়ারিশান → দলিল ২০২২</span>
              </div>
            </div>
          </div>

          {/* Associated Documents */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
              {language === 'bn' ? 'সংযুক্ত নথিপত্রসমূহ' : 'Associated Official Documents'}
            </h3>
            <div className="space-y-2">
              {activeDisplayParcel.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 bg-[#061A14] border border-[#00A86B]/30 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">
                      {language === 'bn' ? doc.titleBn : doc.titleEn}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      নম্বর: {doc.docNumber} · অফিস: {doc.subRegistryOffice}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#F2C94C] block">
                      {doc.recordedAreaAcres} একর
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {doc.qrVerifiedDemo ? 'কিউআর যাচাইকৃত' : 'যাচাই বাকি'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Triggers */}
          <div className="pt-4 border-t border-[#00A86B]/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedParcelId(activeDisplayParcel.id);
                  navigateTo('/verify');
                }}
                className="px-4 py-2 text-xs font-bold text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                রেকর্ড যাচাই করুন
              </button>
              <button
                onClick={() => {
                  setSelectedParcelId(activeDisplayParcel.id);
                  navigateTo('/ownership-history');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#061A14] hover:bg-[#0E3529] border border-[#00A86B]/40 rounded-xl cursor-pointer"
              >
                মালিকানা ইতিহাস
              </button>
              <button
                onClick={() => {
                  setSelectedParcelId(activeDisplayParcel.id);
                  navigateTo('/reports');
                }}
                className="px-4 py-2 text-xs font-bold text-emerald-300 bg-[#061A14] hover:bg-[#0E3529] border border-[#00A86B]/40 rounded-xl cursor-pointer"
              >
                অখণ্ডতা রিপোর্ট
              </button>
              <button
                onClick={() => {
                  setSelectedParcelId(activeDisplayParcel.id);
                  navigateTo('/protection');
                }}
                className="px-4 py-2 text-xs font-bold text-teal-300 bg-[#061A14] hover:bg-[#0E3529] border border-teal-500/40 rounded-xl cursor-pointer"
              >
                ল্যান্ডগার্ড শিল্ড
              </button>
            </div>

            <span className="text-[11px] text-gray-400">
              সর্বশেষ আপডেট: {activeDisplayParcel.lastUpdated}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
