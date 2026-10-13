import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Lock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DemoStepperProps {
  compact?: boolean;
}

export const DemoStepper: React.FC<DemoStepperProps> = ({ compact = false }) => {
  const {
    language,
    activeDemoStep,
    setDemoStep,
    navigateTo,
    resetAllDemoData
  } = useApp();

  const STEPS = [
    {
      step: 1,
      tagBn: 'ধাপ ১: সাধারণ অবস্থা',
      tagEn: 'Step 1: Normal',
      titleBn: '১.০০ একর পার্সেল · সকল দলিল সামঞ্জস্যপূর্ণ',
      titleEn: '1.00-Acre Parcel · Baseline Consistent',
      descBn: 'মালিক মোছাঃ রহিমা বেগম, খতিয়ান ১০৪২, দাগ ৩৩১৮। দলিল, মিউটেশন ও খাজনা শতভাগ সংগতিপূর্ণ (স্ট্যাটাস: Normal, সবুজ)।',
      descEn: 'Owner Mst. Rahima Begum, Khatian 1042, Dag 3318. Deed, e-Mutation & Tax receipts 100% consistent (Status: Normal).',
      targetRoute: '/my-land',
      actionLabelBn: 'আমার জমি ড্যাশবোর্ড দেখুন',
      actionLabelEn: 'View in My Land Dashboard',
      icon: CheckCircle2,
      accentColor: 'emerald'
    },
    {
      step: 2,
      tagBn: 'ধাপ ২: অমিল ও দ্বন্দ্ব',
      tagEn: 'Step 2: Conflict Engine',
      titleBn: 'অতিরিক্ত হস্তান্তর ফ্ল্যাগ (০.৫০ বনাম ০.৩০ একর)',
      titleEn: 'Potential Over-Transfer Flagged',
      descBn: 'যৌথ খতিয়ানে প্রাপ্য ০.৩০ একর, কিন্তু নতুন দলিলে ০.৫০ একর হস্তান্তর প্রস্তাবিত। AI "Why?" প্যানেলে ০.২০ একর ঘাটতির প্রমাণ প্রদর্শিত।',
      descEn: 'Seller holds 0.30 acre, but deed requests 0.50 acre conveyance. The Explainable "Why?" panel proves exact 0.20-acre difference.',
      targetRoute: '/verify',
      actionLabelBn: 'যাচাই ও "Why?" প্যানেল দেখুন',
      actionLabelEn: 'View in Verify & "Why?" Panel',
      icon: AlertTriangle,
      accentColor: 'amber'
    },
    {
      step: 3,
      tagBn: 'ধাপ ৩: ট্যাম্পারিং শনাক্ত',
      tagEn: 'Step 3: Tampering Simulation',
      titleBn: 'রেকর্ড অখণ্ডতা ব্যর্থতা (হ্যাশ চেইন ত্রুটি)',
      titleEn: 'Record Integrity Failure (Broken Hash)',
      descBn: 'মক ডেটাবেজে ব্যাকডেটেড রেকর্ড পরিবর্তন করা হয়েছে কিন্তু SHA-256 হ্যাশ আপডেট করা হয়নি। অডিট চেইনে সাথে সাথে লাল সতর্কবার্তা প্রদর্শিত।',
      descEn: 'Historical event payload changed in database without updating hash. Tamper-evident SHA-256 chain flags exact broken block.',
      targetRoute: '/audit',
      actionLabelBn: 'ক্রিপ্টো অডিট শিল্ডে যাচাই করুন',
      actionLabelEn: 'Verify in Audit Shield',
      icon: Lock,
      accentColor: 'rose'
    },
    {
      step: 4,
      tagBn: 'ধাপ ৪: নাগরিক সুরক্ষা',
      tagEn: 'Step 4: Proactive Protection',
      titleBn: 'অজানা ইভেন্ট অ্যালার্ট → কর্মকর্তা ক্রিটিক্যাল কিউ',
      titleEn: 'Unrecognized Event Alert → Officer Queue',
      descBn: 'মোছাঃ রহিমা বেগমের জমিতে অজ্ঞাত হস্তান্তরের চেষ্টা ধরা পড়ায় সতর্কবার্তা। নাগরিক "I Don\'t Recognize This" দিলে তা সরাসরি অফিসারের ক্রিটিক্যাল কিউতে চলে যায়।',
      descEn: 'Real-time alert fired to owner. Selecting "I Don\'t Recognize This" creates a cryptographic incident sent directly to Officer Critical queue.',
      targetRoute: '/protection',
      actionLabelBn: 'শিল্ড ও কর্মকর্তা কিউ দেখুন',
      actionLabelEn: 'View in SHIELD & Officer Queue',
      icon: ShieldAlert,
      accentColor: 'indigo'
    }
  ];

  const currentStepData = STEPS.find((s) => s.step === activeDemoStep) || STEPS[0];

  return (
    <div
      id="flagship-demo-stepper"
      className={`rounded-3xl border border-[#00A86B]/40 bg-[#071F17] text-white shadow-2xl overflow-hidden transition-all ${
        compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8 max-w-7xl mx-auto'
      }`}
    >
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#00A86B]/30">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-[#F2C94C] text-xs font-bold border border-[#00A86B]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'bn'
                ? 'ফ্ল্যাগশিপ লাইভ ডেমো সিনারিও (৪-ধাপ)'
                : 'Flagship Guided Demo Stepper (4 Steps)'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {language === 'bn'
              ? 'ল্যান্ডগার্ডের পূর্ণাঙ্গ কর্মপদ্ধতি লাইভ পরীক্ষা করুন'
              : 'Test LANDGUARD End-to-End Across All Modules'}
          </h2>
          <p className="text-xs text-gray-300">
            {language === 'bn'
              ? 'নিচের ৪টি ধাপে ক্লিক করলে পুরো ওয়েবসাইটের লাইভ স্টেট পরিবর্তিত হবে।'
              : 'Click through each step below to dynamically change the live state across all pages.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => resetAllDemoData()}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-[#061A14] hover:bg-white/10 border border-[#00A86B]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to default baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'রিসেট' : 'Reset All'}</span>
          </button>
        </div>
      </div>

      {/* 4 Step Pills / Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 my-5">
        {STEPS.map((step) => {
          const isActive = step.step === activeDemoStep;
          const Icon = step.icon;

          return (
            <button
              key={step.step}
              onClick={() => setDemoStep(step.step)}
              className={`p-3 sm:p-4 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-[#0E3529] border-[#F2C94C] shadow-lg ring-1 ring-[#F2C94C]/40'
                  : 'bg-[#061A14] border-[#00A86B]/30 hover:border-[#00A86B]/70 hover:bg-[#0A261D]'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#F2C94C]/10 rounded-bl-full pointer-events-none" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-[#F2C94C] text-[#06140F]'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {language === 'bn' ? `ধাপ ${step.step}` : `Step ${step.step}`}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#F2C94C]' : 'text-gray-400'
                  }`}
                />
              </div>
              <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {language === 'bn' ? step.tagBn : step.tagEn}
              </div>
              <div className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                {language === 'bn' ? step.titleBn : step.titleEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#061A14] border border-[#00A86B]/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#F2C94C]">
              {language === 'bn' ? currentStepData.tagBn : currentStepData.tagEn}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {language === 'bn' ? currentStepData.titleBn : currentStepData.titleEn}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigateTo(currentStepData.targetRoute);
              }}
              className="px-4 py-2 rounded-xl text-xs font-black text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 transition-all flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-[1.02]"
            >
              <span>
                {language === 'bn'
                  ? currentStepData.actionLabelBn
                  : currentStepData.actionLabelEn}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-4xl">
          {language === 'bn' ? currentStepData.descBn : currentStepData.descEn}
        </p>

        {/* Step-specific metadata bar */}
        <div className="pt-3 border-t border-[#00A86B]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {language === 'bn'
                ? 'সিন্থেটিক পার্সেল: মোছাঃ রহিমা বেগম · দাগ ৩৩১৮, খতিয়ান ১০৪২ (কালীগঞ্জ, গাজীপুর)'
                : 'Synthetic Demo Parcel: Mst. Rahima Begum · Dag 3318, Khatian 1042 (Kaliganj, Gazipur)'}
            </span>
          </div>

          {/* Stepper Navigation Next / Prev */}
          <div className="flex items-center gap-2">
            <button
              disabled={activeDemoStep <= 1}
              onClick={() => setDemoStep(activeDemoStep - 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{language === 'bn' ? 'পূর্ববর্তী' : 'Previous'}</span>
            </button>
            <button
              disabled={activeDemoStep >= 4}
              onClick={() => setDemoStep(activeDemoStep + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00A86B] hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{language === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
