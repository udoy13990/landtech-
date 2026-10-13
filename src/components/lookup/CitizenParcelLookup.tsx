import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText,
  ShieldAlert,
  ArrowRight,
  Eye,
  KeyRound,
  Shield,
  Layers,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { runDeterministicVerification } from '../../lib/verificationEngine';
import { Parcel } from '../../types';

export const CitizenParcelLookup: React.FC = () => {
  const { language, parcels, selectedParcelId, setSelectedParcelId, navigateTo, showToast } = useApp();
  const [inputCode, setInputCode] = useState<string>('101');
  const [unlockedParcel, setUnlockedParcel] = useState<Parcel | null>(parcels[0]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Quick Demo Code Shortcuts for Evaluators / Users
  const DEMO_SHORTCUTS = [
    { code: '101', label: '১০১: রফিকুল ইসলাম', mouza: 'ধানমন্ডি', scenario: 'সামঞ্জস্যপূর্ণ রেকর্ড (Scenario A)', parcelId: 'LG-P-001' },
    { code: '102', label: '১০২: আনোয়ারা খাতুন', mouza: 'গুলশান', scenario: 'ক্ষেত্রফলের অমিল (Scenario B)', parcelId: 'LG-P-002' },
    { code: '103', label: '১০৩: কামাল হোসেন', mouza: 'মিরপুর', scenario: 'অতিরিক্ত হস্তান্তর (Scenario C)', parcelId: 'LG-P-003' },
    { code: '104', label: '১০৪: শাহনাজ পারভীন', mouza: 'উত্তরা', scenario: 'তথ্য অসম্পূর্ণ (Scenario D)', parcelId: 'LG-P-004' },
    { code: '505', label: '৫০৫: তরিকুল আলম', mouza: 'মতিঝিল', scenario: 'সন্দেহজনক আবেদন অ্যালার্ট (Scenario E)', parcelId: 'LG-P-005' },
    { code: '602', label: '৬০২: নুরুল হুদা', mouza: 'চট্টগ্রাম', scenario: 'ক্রিপ্টো ট্যাম্পারিং (Scenario F)', parcelId: 'LG-P-006' }
  ];

  const handleLookup = (codeToLookup?: string) => {
    const rawCode = (codeToLookup || inputCode).trim().toLowerCase();
    if (!rawCode) {
      showToast('অনুগ্রহ করে খতিয়ান নম্বর বা পার্সেল কোড লিখুন', 'warning');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      // Find matching parcel
      const found = parcels.find(
        (p) =>
          p.id.toLowerCase().includes(rawCode) ||
          p.dagNumber.toLowerCase().includes(rawCode) ||
          p.khatianNumber.toLowerCase().includes(rawCode) ||
          (rawCode === '101' && p.id === 'LG-P-001') ||
          (rawCode === '102' && p.id === 'LG-P-002') ||
          (rawCode === '103' && p.id === 'LG-P-003') ||
          (rawCode === '104' && p.id === 'LG-P-004') ||
          (rawCode === '505' && p.id === 'LG-P-005') ||
          (rawCode === '602' && p.id === 'LG-P-006')
      );

      if (found) {
        setUnlockedParcel(found);
        setSelectedParcelId(found.id);
        showToast(`পার্সেল রেকর্ড ${found.id} সফলভাবে আনলক করা হয়েছে।`, 'success');
      } else {
        setUnlockedParcel(null);
        showToast('প্রদত্ত কোড বা খতিয়ান নম্বরে কোনো সংরক্ষিত রেকর্ড পাওয়া যায়নি।', 'error');
      }
      setIsSearching(false);
    }, 400);
  };

  const currentResult = unlockedParcel ? runDeterministicVerification(unlockedParcel) : null;

  return (
    <div className="bg-white border border-[#DCE6DF] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-left">
      {/* Privacy Notice Header (Addressing user's exact point about government privacy) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DCE6DF]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#006A4E]/10 text-[#006A4E] text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সুরক্ষিত নাগরিক প্রবেশদ্বার' : 'Secure Citizen Verification Gate'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#17231E]">
            {language === 'bn' ? 'নাগরিক ভূমি রেকর্ড অনুসন্ধান ও যাচাই' : 'Citizen Land Record Lookup'}
          </h2>
          <p className="text-xs sm:text-sm text-[#68766F] max-w-2xl leading-relaxed">
            {language === 'bn'
              ? 'সরকারি গোপনীয়তা নীতি অনুযায়ী অন্যের ব্যক্তিগত জমির তথ্য উন্মুক্ত নয়। আপনার খতিয়ান, দাগ বা কোড (যেমন: ১০১, ১০২) দিয়ে আপনার রেকর্ডটি অনুসন্ধান করুন।'
              : 'Per national privacy standards, citizen land records are strictly protected. Enter your Khatian number, Dag, or Access Code (e.g. 101, 102) to unlock your records.'}
          </p>
        </div>

        {/* Quick Demo Shortcuts Info */}
        <div className="flex items-center gap-1.5 text-xs text-[#006A4E] bg-[#F5F8F6] p-2.5 rounded-xl border border-[#DCE6DF]/70">
          <KeyRound className="w-4 h-4 shrink-0 text-[#006A4E]" />
          <span>নমুনা কোড: <strong>১০১, ১০২, ১০৩, ৫০৫</strong></span>
        </div>
      </div>

      {/* Code Search Input Bar */}
      <div className="space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup();
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#68766F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="খতিয়ান নং / দাগ নং / ডেমো কোড লিখুন (যেমন: 101, 102, 505)..."
              className="w-full bg-[#F5F8F6] border border-[#DCE6DF] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-[#17231E] focus:outline-hidden focus:ring-2 focus:ring-[#006A4E]"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-3 bg-[#006A4E] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>অনুসন্ধান চলছে...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>রেকর্ড অনুসন্ধান করুন</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Click Demo Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] font-bold text-[#68766F]">
            দ্রুত যাচাইয়ের জন্য ক্লিক করুন:
          </span>
          {DEMO_SHORTCUTS.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setInputCode(item.code);
                handleLookup(item.code);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                unlockedParcel?.id === item.parcelId
                  ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-2xs'
                  : 'bg-white hover:bg-[#F5F8F6] text-[#17231E] border-[#DCE6DF]'
              }`}
            >
              {item.label} ({item.mouza})
            </button>
          ))}
        </div>
      </div>

      {/* UNLOCKED PARCEL DETAILS (Private Citizen Record Card) */}
      {unlockedParcel && currentResult ? (
        <div className="mt-6 pt-6 border-t border-[#DCE6DF] space-y-6 animate-in fade-in duration-200">
          {/* Header of Record */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F5F8F6] rounded-2xl border border-[#DCE6DF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs">
                {unlockedParcel.id.replace('LG-P-', '#')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#17231E]">
                    {unlockedParcel.recordedOwnerBn}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {unlockedParcel.demoLabel}
                  </span>
                </div>
                <div className="text-xs text-[#68766F] mt-0.5">
                  {unlockedParcel.mouzaEn}, {unlockedParcel.upazilaEn}, {unlockedParcel.districtEn}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentResult.overallStatus === 'CONSISTENT'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {currentResult.overallStatus === 'CONSISTENT' ? 'সামঞ্জস্যপূর্ণ' : 'পর্যালোচনা আবশ্যক'}
              </span>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-[#DCE6DF] text-xs">
            <div>
              <span className="text-[11px] text-[#68766F] block">দাগ নম্বর:</span>
              <span className="font-mono font-bold text-[#17231E]">#{unlockedParcel.dagNumber}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">খতিয়ান নম্বর:</span>
              <span className="font-mono font-bold text-[#17231E]">#{unlockedParcel.khatianNumber}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">সংরক্ষিত পরিমাণ:</span>
              <span className="font-mono font-bold text-[#006A4E]">{unlockedParcel.recordedAreaAcres} একর</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">জমির শ্রেণি:</span>
              <span className="font-bold text-[#17231E]">{unlockedParcel.landClassBn}</span>
            </div>
          </div>

          {/* Verification Findings Callout */}
          <div
            className={`p-4 rounded-2xl border text-xs space-y-2 ${
              currentResult.overallStatus === 'CONSISTENT'
                ? 'bg-[#16835D]/5 border-[#16835D]/30'
                : 'bg-amber-50 border-amber-300'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {currentResult.overallStatus === 'CONSISTENT' ? (
                <CheckCircle2 className="w-5 h-5 text-[#16835D]" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              )}
              <span>যাচাইকরণ বিশ্লেষণ: {currentResult.overallStatus}</span>
            </div>
            <p className="text-[#17231E] leading-relaxed">
              {currentResult.summaryBn}
            </p>

            {/* Findings breakdown */}
            <div className="space-y-1.5 pt-1">
              {currentResult.findings.map((f, idx) => (
                <div key={idx} className="bg-white/90 p-2.5 rounded-lg border border-black/5 text-[11px]">
                  <div className="flex justify-between font-bold text-[#17231E]">
                    <span>{f.titleBn}</span>
                    <span className="text-amber-800">{f.severity}</span>
                  </div>
                  <div className="text-[#68766F] mt-0.5">{f.descriptionBn}</div>
                  {f.evidence.difference && (
                    <div className="text-rose-700 font-bold mt-0.5">
                      অমিল / ঘাটতি: {f.evidence.difference}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Row for Unlocked Record */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigateTo('/verify')}
                className="px-4 py-2 text-xs font-bold text-white bg-[#006A4E] hover:bg-[#064E3B] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>পূর্ণাঙ্গ ভেরিফিকেশন ওয়ার্কস্পেস</span>
              </button>

              <button
                onClick={() => navigateTo('/ownership-history')}
                className="px-4 py-2 text-xs font-semibold text-[#17231E] bg-[#F5F8F6] hover:bg-[#EAEFEA] border border-[#DCE6DF] rounded-xl transition-colors"
              >
                মালিকানা ধারাবাহিকতা টাইমলাইন
              </button>

              <button
                onClick={() => navigateTo('/reports')}
                className="px-4 py-2 text-xs font-semibold text-[#006A4E] bg-white hover:bg-[#F5F8F6] border border-[#006A4E]/30 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>অখণ্ডতা রিপোর্ট প্রিন্ট</span>
              </button>
            </div>

            <button
              onClick={() => {
                setUnlockedParcel(null);
                setInputCode('');
              }}
              className="text-xs text-[#68766F] hover:text-[#C62828] font-medium"
            >
              রেকর্ডটি লক করুন ✕
            </button>
          </div>
        </div>
      ) : (
        /* Empty State / Prompt */
        <div className="p-8 bg-[#F5F8F6] rounded-2xl border border-[#DCE6DF] text-center space-y-2">
          <Lock className="w-8 h-8 text-[#68766F] mx-auto opacity-70" />
          <h4 className="text-sm font-bold text-[#17231E]">
            ব্যক্তিগত তথ্য দেখতে খতিয়ান বা পার্সেল কোড লিখুন
          </h4>
          <p className="text-xs text-[#68766F] max-w-md mx-auto">
            উপরে যেকোনো নমুনা কোড (যেমন: ১০১, ১০২, ১০৩ বা ৫০৫) ক্লিক করে তাৎক্ষণিক সংশ্লিষ্ট জমির সকল রেকর্ড ও যাচাইকরণ অবস্থা আনলক করুন।
          </p>
        </div>
      )}
    </div>
  );
};
