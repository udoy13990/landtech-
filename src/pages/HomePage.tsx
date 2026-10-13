import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileCheck,
  GitBranch,
  ShieldAlert,
  FileText,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
  Database,
  Lock,
  ChevronRight,
  Shield,
  PhoneCall,
  Calculator,
  Scale,
  Sparkles,
  MapPin,
  Compass,
  Cpu,
  Fingerprint,
  QrCode,
  Search,
  Eye,
  AlertCircle,
  FileSearch,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { BangladeshD3Map } from '../components/map/BangladeshD3Map';
import { DemoStepper } from '../components/demo/DemoStepper';
import { OfficialLandGovServices } from '../components/services/OfficialLandGovServices';

// Free high-quality Unsplash image URLs of Bangladesh agriculture & land scenery
export const BANGLADESH_HERO_BG_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1588615419957-566a7b7a13d7?q=80&w=1600&auto=format&fit=crop', // Lush green paddy field
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop', // Farmland morning sunrise
  'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1600&auto=format&fit=crop', // Green terraces and countryside
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop', // River delta aerial landscape
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop', // Agricultural surveyor & farmland
  'https://images.unsplash.com/photo-1516214104703-d870798883c5?q=80&w=1600&auto=format&fit=crop'  // Scenic river & fertile delta
];

// Animated Count-Up Hook
function useCountUp(target: number, duration: number = 1800): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

export const HomePage: React.FC = () => {
  const {
    language,
    navigateTo,
    setSelectedParcelId,
    setIsCalculatorOpen
  } = useApp();

  // Ken-Burns slideshow state
  const [bgIndex, setBgIndex] = useState(0);
  const [failedImgs, setFailedImgs] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BANGLADESH_HERO_BG_IMAGES.length);
    }, 8000); // 8s per image
    return () => clearInterval(timer);
  }, []);

  // 4 Animated counters
  const divisionCount = useCountUp(8, 1200);
  const districtCount = useCountUp(64, 1500);
  const featuresCount = useCountUp(14, 1800);
  const modulesCount = useCountUp(9, 1200);

  // 14 Features: Old Problem vs LANDGUARD Upgrade
  const UPGRADE_CARDS = [
    {
      id: 1,
      titleBn: 'একীভূত ল্যান্ড ড্যাশবোর্ড',
      titleEn: 'Unified Land Dashboard',
      oldBn: 'খতিয়ান, নামজারি ও খাজনার রেকর্ড বিভিন্ন পোর্টাল ও অফিসে ছড়িয়ে-ছিটিয়ে থাকা।',
      oldEn: 'Records scattered across separate registers and offices with no unified view.',
      newBn: 'একক ভিউতে মালিক, খতিয়ান, দাগ, মিউটেশন, কর ও প্রোঅ্যাকটিভ সুরক্ষা স্ট্যাটাস।',
      newEn: 'Single unified citizen view linking owner, khatian, dag, tax & protection status.',
      icon: Layers
    },
    {
      id: 2,
      titleBn: 'ল্যান্ড ট্রানজ্যাকশন আইডি (LT-BD)',
      titleEn: 'Land Transaction ID',
      oldBn: 'ফাইল ট্র্যাকিং বিচ্ছিন্ন; রেজিস্ট্রি ও এসিল্যান্ড অফিসের মধ্যে সমন্বিত কেস আইডি নেই।',
      oldEn: 'Disconnected files with no lifecycle tracking across Sub-Registry and AC Land.',
      newBn: 'অভ্যন্তরীণ কেস আইডি (যেমন LT-BD-2026-00182) যা সকল দলিল ও ইভেন্টকে সংযুক্ত করে।',
      newEn: 'Deterministic case ID (e.g. LT-BD-2026-00182) linking all lifecycle records.',
      icon: Fingerprint
    },
    {
      id: 3,
      titleBn: 'AI প্রি-সাবমিশন ডেটা এক্সট্রাকশন',
      titleEn: 'AI Pre-Submission Extraction',
      oldBn: 'ম্যানুয়াল টাইপিং ও তথ্য এন্ট্রিতে ভুল, খতিয়ান নম্বর বা নামের বানান বিকৃতি।',
      oldEn: 'Manual transcription errors, typos, and overlooked predecessor dates.',
      newBn: 'স্ক্যানিং অ্যানিমেশন সহ স্বয়ংক্রিয় ফিল্ড রিডিং ও যাচাইযোগ্য এডিটেবল টেবিল।',
      newEn: 'Automated extraction scanning effect displaying structured editable table.',
      icon: Cpu
    },
    {
      id: 4,
      titleBn: 'ক্রস-রেকর্ড কনসিস্টেন্সি ইঞ্জিন',
      titleEn: 'Cross-Record Consistency Engine',
      oldBn: 'সাধারণ কিউআর কোড শুধু সনদ জারির সত্যতা দেখে, ভেতরে জমির পরিমাণ যাচাই করে না।',
      oldEn: 'Basic QR verification only verifies certificate issuance, not internal consistency.',
      newBn: 'দলিল বনাম সর্বশেষ খতিয়ানের ক্ষেত্রফল অমিল (০.৮০ বনাম ০.৬০ একর) তাৎক্ষণিক ফ্ল্যাগ।',
      newEn: 'Deep rule checks for area mismatch (0.80 vs 0.60 acre) even when QR passes.',
      icon: FileSearch
    },
    {
      id: 5,
      titleBn: 'ব্যাখ্যাযোগ্য AI "Why?" প্যানেল',
      titleEn: 'Explainable AI "Why?" Engine',
      oldBn: 'দপ্তর থেকে অস্পষ্ট বা অজ্ঞাত কারণে আবেদন বাতিল বা দীর্ঘসূত্রিতা।',
      oldEn: 'Cryptic bureaucratic delays or rejections with no transparent reasons.',
      newBn: 'প্রমাণ ছাড়া কোনো সতর্কবার্তা নয়; প্রতিটি সতর্কবার্তায় সংখ্যা ও দলিলের সুস্পষ্ট হিসাব।',
      newEn: 'No red warning without evidence: exact fields, numbers & differences broken down.',
      icon: HelpCircle
    },
    {
      id: 6,
      titleBn: 'ল্যান্ড ইন্টিগ্রিটি অডিট রিপোর্ট',
      titleEn: 'Land Integrity Report',
      oldBn: 'নাগরিকের কাছে জমির সামগ্রিক আইনি ও ডিজিটাল সুস্থতার কোনো সমন্বিত প্রতিবেদন নেই।',
      oldEn: 'No single verifiable health summary of a land parcel for citizen peace of mind.',
      newBn: 'দলিল, মালিকানা ধারাবাহিকতা ও কনফ্লিক্ট স্ট্যাটাস সহ প্রিন্টযোগ্য/পিডিএফ রিপোর্ট।',
      newEn: 'Comprehensive printable report covering document, owner & conflict continuity.',
      icon: FileText
    },
    {
      id: 7,
      titleBn: 'ভিজ্যুয়াল ওনারশিপ হিস্ট্রি গ্রাফ',
      titleEn: 'Visual Ownership History Graph',
      oldBn: 'সিএস, এসএ, আরএস ও বিএস রেকর্ডের স্তূপে পূর্বপুরুষের মালিকানা চেইন খুঁজে পাওয়া জটিল।',
      oldEn: 'Chain of title buried across century-old registers and difficult to trace.',
      newBn: 'অ্যানিমেটেড টাইমলাইন ও নোড-এজ গ্রাফ; অতিরিক্ত হস্তান্তরের ভাঙা লিংক লাল রঙে চিহ্নিত।',
      newEn: 'Chronological owner graph highlighting broken or conflicting links in red.',
      icon: GitBranch
    },
    {
      id: 8,
      titleBn: 'ব্যাখ্যাযোগ্য কেস নেভিগেটর',
      titleEn: 'Explainable Case Navigator',
      oldBn: 'প্রশাসনিক ধাপ ও করণীয় সম্পর্কে সাধারণ নাগরিকের স্পষ্ট ধারণা না থাকা।',
      oldEn: 'Confusing bureaucratic jargon leaving citizens uncertain about next steps.',
      newBn: 'সম্পন্ন, চলমান ও আসন্ন ধাপের সহজ ব্যাখ্যা ("এর অর্থ কী" এবং "আপনার করণীয় কী")।',
      newEn: 'Plain-language stages explaining "What this means" & "What to do next".',
      icon: Compass
    },
    {
      id: 9,
      titleBn: 'অফিসার এক্সেপশন ড্যাশবোর্ড',
      titleEn: 'Officer Exception Dashboard',
      oldBn: 'কর্মকর্তাদের উপর স্তূপীকৃত ফাইল এবং ঝুঁকিভিত্তিক অগ্রাধিকারের অভাব।',
      oldEn: 'Overwhelmed officers with flat unprioritized queues and manual bottlenecks.',
      newBn: 'ঝুঁকি-অগ্রাধিকারভিত্তিক কিউ (Normal / Review / Critical) ও এক ক্লিকে এসকেলেশন।',
      newEn: 'Risk-prioritized triage queue (Normal / Review / Critical) with one-click actions.',
      icon: ShieldCheck
    },
    {
      id: 10,
      titleBn: 'ল্যান্ডগার্ড শিল্ড (প্রোঅ্যাকটিভ নজরদারি)',
      titleEn: 'LANDGUARD SHIELD (Proactive Alert)',
      oldBn: 'জমিতে কোনো জালিয়াতি বা অননুমোদিত দলিল দাখিল হলে মালিক জানতে পারেন বছর পর।',
      oldEn: 'Landowners discover fraudulent attempts months or years after occurrence.',
      newBn: 'বেসলাইন ট্র্যাকিং; জমিতে কোনো ঘটনা ঘটলেই তাৎক্ষণিক সতর্কবার্তা (বেল ও এসএমএস)।',
      newEn: 'Real-time alert triggered immediately when an ownership event is attempted.',
      icon: ShieldAlert
    },
    {
      id: 11,
      titleBn: '"I Don\'t Recognize This" ইনসিডেন্ট ফাইলিং',
      titleEn: '"I Don\'t Recognize This" Incident',
      oldBn: 'জাল দলিল ঠেকাতে তাৎক্ষণিক মামলা বা দীর্ঘ আইনি দৌড়াদৌড়ির প্রয়োজন।',
      oldEn: 'Cumbersome court petitions required before an unauthorized filing is paused.',
      newBn: '১-ক্লিকে নাগরিক অভিযোগ ও ক্রিপ্টোগ্রাফিক এভিডেন্স সরাসরি অফিসারের ক্রিটিক্যাল কিউতে প্রেরণ।',
      newEn: '1-click citizen repudiation creating structured evidence sent to Officer Critical queue.',
      icon: AlertCircle
    },
    {
      id: 12,
      titleBn: 'ক্রিপ্টোগ্রাফিক অডিট শিল্ড',
      titleEn: 'Cryptographic Audit Shield',
      oldBn: 'ম্যানুয়াল ভলিউম বই বা কেন্দ্রীয় ডেটাবেজে ব্যাকডেটেড পরিবর্তন শনাক্ত করা কঠিন।',
      oldEn: 'Centralized registers vulnerable to backdated edits without audit trails.',
      newBn: 'Web Crypto SHA-256 চেইনযুক্ত অপরিবর্তনযোগ্য ইভেন্ট লগ; যেকোনো ট্যাম্পারিংয়ে লাল অ্যালার্ট।',
      newEn: 'SHA-256 hash-chained event log flagging exact broken block upon tampering.',
      icon: Lock
    },
    {
      id: 13,
      titleBn: 'কিউআর + অখণ্ডতা দ্বিস্তরীয় যাচাই',
      titleEn: 'QR + Integrity Verification Layer',
      oldBn: 'শুধুমাত্র কিউআর কোড স্ক্যান করে আশ্বস্ত হওয়া (যা ভেতরের পরিমাণের অমিল ধরতে পারে না)।',
      oldEn: 'Blindly trusting QR codes without verifying multi-document mathematical alignment.',
      newBn: 'সরকারি কিউআরকে প্রাথমিক ইনপুট ধরে তার চারপাশে ধারাবাহিকতা ও অডিট যাচাই।',
      newEn: 'Treats government QR as an input layer, adding consistency and audit checks around it.',
      icon: QrCode
    },
    {
      id: 14,
      titleBn: 'গ্রাউন্ডেড ল্যান্ড সার্ভিস কপাইলট',
      titleEn: 'Grounded Land Service Copilot',
      oldBn: 'দালালদের ভুল তথ্য বা জেনেরিক এআই-এর কাল্পনিক (Hallucinated) পরামর্শ।',
      oldEn: 'Misleading broker rumors or generic AI chatbots generating inaccurate legal advice.',
      newBn: 'শুধুমাত্র সরকারি আইন ও অফিসিয়াল দলিলের উদ্ধৃতি থেকে কঠোরভাবে গ্রাউন্ডেড প্রশ্নোত্তর।',
      newEn: 'Strictly answers from built-in official document snippets with cited sources only.',
      icon: BookOpen
    }
  ];

  const scrollToDemo = () => {
    const el = document.getElementById('flagship-demo-stepper');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#061A14] text-white">
      {/* ========================================================================= */}
      {/* SECTION 1: FULL-SCREEN HERO WITH KEN-BURNS BACKGROUND & REAL BANGLADESH MAP */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] bg-[#061A14] text-white pt-8 sm:pt-12 pb-14 sm:pb-20 overflow-hidden border-b border-[#00A86B]/30 select-none flex flex-col justify-between">
        {/* A) KEN-BURNS CINEMATIC CROSSFADING BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {BANGLADESH_HERO_BG_IMAGES.map((url, idx) => {
            const isCurrent = idx === bgIndex;
            if (failedImgs[idx]) return null;

            return (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{
                  opacity: isCurrent ? 1 : 0,
                  scale: isCurrent ? 1.14 : 1.04
                }}
                transition={{
                  opacity: { duration: 1.5, ease: 'easeInOut' },
                  scale: { duration: 8, ease: 'linear' }
                }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
              />
            );
          })}

          {/* Fallback gradient if images are loading */}
          <div className="absolute inset-0 bg-[#061A14]/40" />

          {/* Balanced cinematic green-tinted overlay allowing the background photos to be clearly seen */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#061A14]/60 via-[#061A14]/45 to-[#061A14]/85" />

          {/* Faint animated land-parcel grid overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(#00A86B 1px, transparent 1px), radial-gradient(#00A86B 1px, #061A14 1px)`,
              backgroundSize: '36px 36px',
              backgroundPosition: '0 0, 18px 18px'
            }}
          />

          {/* Subtle floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/40 blur-[1px]"
              animate={{
                y: [0, -90, 0],
                opacity: [0.1, 0.7, 0.1]
              }}
              transition={{
                duration: 5 + i * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.7
              }}
              style={{
                left: `${10 + i * 11}%`,
                top: `${40 + (i % 4) * 15}%`
              }}
            />
          ))}
        </div>

        {/* HERO CONTENT: Left Side Headline & Right Side Authentic Map */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* B) LEFT SIDE: Headline, Subheading, 2 Buttons */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A86B]/20 border border-[#00A86B]/40 text-xs font-bold text-emerald-300 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-[#F2C94C]" />
                <span>
                  {language === 'bn'
                    ? 'AI-চালিত ভূমি অখণ্ডতা ও লেনদেন যাচাইকরণ স্তর'
                    : 'AI-Powered Land Integrity & Transaction Verification'}
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3.5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.14] text-white">
                  LANDGUARD –{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-[#F2C94C]">
                    AI-Powered Land Integrity & Transaction Verification
                  </span>{' '}
                  for Bangladesh
                </h1>
                <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed max-w-xl">
                  {language === 'bn'
                    ? 'জমির মালিকানা যাত্রাকে বোধগম্য, যাচাইযোগ্য এবং সক্রিয়ভাবে সুরক্ষিত করার জাতীয় প্ল্যাটফর্ম।'
                    : 'Making the ownership journey understandable, verifiable and proactively protected.'}
                </p>
              </div>

              {/* 2 Main Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={scrollToDemo}
                  className="px-6 py-3.5 text-sm font-black text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-xl transition-all hover:scale-[1.03] flex items-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#06140F]" />
                  <span>{language === 'bn' ? 'লাইভ ডেমো পরীক্ষা করুন' : 'Try Live Demo'}</span>
                </button>

                <button
                  onClick={scrollToHowItWorks}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all flex items-center gap-2 cursor-pointer hover:border-emerald-400"
                >
                  <span>{language === 'bn' ? 'কার্যপদ্ধতি জানুন' : 'How it works'}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>

              {/* Synthetic Data Disclaimer Banner */}
              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300/90 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {language === 'bn'
                    ? 'সিন্থেটিক ডেমো ডেটা: মোছাঃ রহিমা বেগম (মক) · কালীগঞ্জ, গাজীপুর (দাগ ৩৩১৮, খতিয়ান ১০৪২)'
                    : 'Synthetic demo data: Mst. Rahima Begum (mock) · Kaliganj, Gazipur (Dag 3318, Khatian 1042)'}
                </span>
              </div>
            </div>

            {/* C) RIGHT SIDE: Accurate Animated Map of Bangladesh */}
            <div className="lg:col-span-6 flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
              <BangladeshD3Map />
            </div>
          </div>
        </div>

        {/* D) BOTTOM OF HERO: 4 ANIMATED COUNTERS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 pt-10 sm:pt-14 border-t border-[#00A86B]/30">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
            {/* Counter 1: 8 Divisions */}
            <div className="p-4 rounded-2xl bg-[#0A261D]/80 border border-[#00A86B]/30 backdrop-blur-md flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#00A86B]/20 flex items-center justify-center shrink-0 border border-[#00A86B]/40">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">
                  {divisionCount}
                </div>
                <div className="text-xs font-bold text-gray-200">
                  {language === 'bn' ? 'প্রশাসনিক বিভাগ' : 'Divisions Mapped'}
                </div>
              </div>
            </div>

            {/* Counter 2: 64 Districts */}
            <div className="p-4 rounded-2xl bg-[#0A261D]/80 border border-[#00A86B]/30 backdrop-blur-md flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#F2C94C]/20 flex items-center justify-center shrink-0 border border-[#F2C94C]/40">
                <MapPin className="w-5 h-5 text-[#F2C94C]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">
                  {districtCount}
                </div>
                <div className="text-xs font-bold text-gray-200">
                  {language === 'bn' ? 'সারাদেশে জেলা' : 'Administrative Districts'}
                </div>
              </div>
            </div>

            {/* Counter 3: 14 Integrity Features */}
            <div className="p-4 rounded-2xl bg-[#0A261D]/80 border border-[#00A86B]/30 backdrop-blur-md flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-500/40">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">
                  {featuresCount}
                </div>
                <div className="text-xs font-bold text-gray-200">
                  {language === 'bn' ? 'অখণ্ডতা ও সুরক্ষা ফিচার' : 'Integrity Features'}
                </div>
              </div>
            </div>

            {/* Counter 4: 9 MVP Modules */}
            <div className="p-4 rounded-2xl bg-[#0A261D]/80 border border-[#00A86B]/30 backdrop-blur-md flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/40">
                <Database className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono-numbers">
                  {modulesCount}
                </div>
                <div className="text-xs font-bold text-gray-200">
                  {language === 'bn' ? 'কার্যকরী এমভিপি মডিউল' : 'MVP Modules'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: OFFICIAL LAND.GOV.BD SERVICES DIRECTORY (ALL 12 WITH LSG) */}
      {/* ========================================================================= */}
      <OfficialLandGovServices />

      {/* ========================================================================= */}
      {/* SECTION 3: FLAGSHIP GUIDED DEMO STEPPER (4 STEPS CONTROLLING LIVE STATE) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <DemoStepper />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: "OLD PROBLEM → OUR UPGRADE" 14 FEATURE CARDS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A86B]/20 text-[#F2C94C] text-xs font-bold border border-[#00A86B]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'bn'
                ? 'বিদ্যমান সিস্টেমের সমস্যা → ল্যান্ডগার্ডের আধুনিক আপগ্রেড'
                : 'Old Problem → LANDGUARD Modern Upgrade'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'bn'
              ? 'ভূমি ব্যবস্থাপনার ১৪টি মূল চ্যালেঞ্জ ও আমাদের উদ্ভাবনী সমাধান'
              : '14 Core Integrity Upgrades Transforming Bangladesh Land Ecosystem'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl">
            {language === 'bn'
              ? 'আমরা বিদ্যমান সরকারি ব্যবস্থার কোনো প্রতিস্থাপন নই; বরং প্রতিটি ধাপে যুক্ত করছি স্বচ্ছতা, ব্যাখ্যাযোগ্যতা এবং নাগরিক অধিকারের পূর্বসক্রিয় সুরক্ষা।'
              : 'We do not replace government portals; we add an explainable, deterministic verification and proactive protection layer around them.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {UPGRADE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-[#0A261D] border border-[#00A86B]/30 shadow-md space-y-3.5 text-left transition-all hover:border-[#00A86B]/80"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#00A86B]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#00A86B]/20 flex items-center justify-center text-emerald-400 border border-[#00A86B]/40">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-black text-white">
                      {language === 'bn' ? card.titleBn : card.titleEn}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-white/10 text-gray-300">
                    #{card.id}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Left: Old Problem */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>{language === 'bn' ? 'পূর্ববর্তী সমস্যা' : 'Old Problem'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {language === 'bn' ? card.oldBn : card.oldEn}
                    </p>
                  </div>

                  {/* Right: LANDGUARD Upgrade */}
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 space-y-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#F2C94C]" />
                      <span>{language === 'bn' ? 'ল্যান্ডগার্ড সমাধান' : 'LANDGUARD Upgrade'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {language === 'bn' ? card.newBn : card.newEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: "HOW IT WORKS" 4-STEP FLOW */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A86B]/20 text-[#F2C94C] text-xs font-bold border border-[#00A86B]/40">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'কার্যপদ্ধতি' : 'Operational Flow'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'bn'
              ? 'ল্যান্ডগার্ড কীভাবে কার্যকরভাবে সুরক্ষা নিশ্চিত করে'
              : 'How LANDGUARD Verifies & Proactively Protects in 4 Steps'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '১',
              titleBn: 'রেকর্ড ইনপুট ও এক্সট্রাকশন',
              titleEn: '1. Ingestion & Extraction',
              descBn: 'দলিল, খতিয়ান বা খাজনা রশিদের তথ্য এআই এক্সট্রাকশন ইঞ্জিনে স্ক্যান হয়ে কাঠামোগত ডেটায় রূপান্তরিত হয়।',
              descEn: 'Raw Deed, Khatian & Dakhila records scanned into structured, normalized verification fields.'
            },
            {
              step: '২',
              titleBn: 'ডিটারমিনিস্টিক ক্রস-চেক',
              titleEn: '2. Deterministic Verification',
              descBn: 'ক্ষেত্রফল অমিল, খতিয়ানের প্রাপ্যতা, মালিকানা চেইন এবং দ্বৈত হস্তান্তরের ঝুঁকি স্বয়ংক্রিয়ভাবে খতিয়ে দেখা হয়।',
              descEn: 'Mathematical consistency rules cross-validate acreage, predecessor title & joint-holding limits.'
            },
            {
              step: '৩',
              titleBn: 'শিল্ড রিয়েলটাইম মনিটরিং',
              titleEn: '3. Real-Time SHIELD Alert',
              descBn: 'বেসলাইনে সংরক্ষিত জমিতে কোনো অপ্রত্যাশিত সাব-রেজিস্ট্রি বা নামজারি আবেদন পড়লে মালিককে সাথে সাথে সতর্ক করা হয়।',
              descEn: 'Baseline monitoring sends instant push/SMS alerts whenever an unexpected transfer is staged.'
            },
            {
              step: '৪',
              titleBn: 'ক্রিপ্টোগ্রাফিক অডিট ট্রেইল',
              titleEn: '4. Cryptographic Hash Chain',
              descBn: 'প্রতিটি সিদ্ধান্ত ও ঘটনার সারাংশ SHA-256 হ্যাশ চেইনে স্থায়ীভাবে যুক্ত থাকে, যা ভবিষ্যতে যেকোনো জালিয়াতি রোধ করে।',
              descEn: 'Every event appended into a tamper-evident SHA-256 chained log for immutable lifetime auditing.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0A261D] border border-[#00A86B]/30 space-y-2 text-left relative overflow-hidden"
            >
              <div className="w-8 h-8 rounded-full bg-[#F2C94C] text-[#06140F] font-black text-xs flex items-center justify-center">
                {item.step}
              </div>
              <h3 className="text-sm font-bold text-white pt-1">
                {language === 'bn' ? item.titleBn : item.titleEn}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {language === 'bn' ? item.descBn : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: "WHAT WE DO NOT BUILD" HONEST POSITIONING SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#020F0A] border border-[#00A86B]/40 space-y-4 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>
              {language === 'bn'
                ? 'আমরা কী তৈরি করছি না (সততা ও বাস্তবসম্মত পরিধি)'
                : 'What We Do NOT Build (Explicit Non-Goals)'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'bn'
              ? 'বিদ্যমান সিস্টেমের প্রতিস্থাপন নয়, এটি একটি স্বচ্ছ সুরক্ষার স্তর'
              : 'Not a Replacement, but an Intelligence & Proactive Protection Layer'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 text-xs text-gray-300">
            <div className="p-3.5 rounded-xl bg-[#061A14] border border-white/10 space-y-1">
              <span className="font-bold text-white">❌ অন্য কোনো ই-নামজারি পোর্টাল নয়</span>
              <p>আমরা সরকারি মিউটেশন আবেদন ব্যবস্থা প্রতিস্থাপন করি না; বরং আবেদনের পূর্বে দলিল ও খতিয়ানের অসঙ্গতি যাচাই করি।</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#061A14] border border-white/10 space-y-1">
              <span className="font-bold text-white">❌ সাধারণ চ্যাটবট বা এআই নয়</span>
              <p>আমাদের কপাইলট কোনো কাল্পনিক উত্তর তৈরি করে না; এটি কেবলমাত্র নির্দিষ্ট সরকারি আইন ও সার্কুলার উদ্ধৃত করে উত্তর দেয়।</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#061A14] border border-white/10 space-y-1">
              <span className="font-bold text-white">❌ ক্রিপ্টোকারেন্সি বা জটিল ব্লকচেইন নয়</span>
              <p>আমরা কোনো ক্রিপ্টো টোকেন বা মাইনিং ব্যবহার করি না। শুধুমাত্র স্ট্যান্ডার্ড ওয়েব ক্রিপ্টো SHA-256 অডিট লগ দিয়ে অখণ্ডতা যাচাই করি।</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAST CITIZEN SEARCH / DEMO PARCEL LOOKUP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#0A261D] border border-[#00A86B]/40 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-300 border border-white/15">
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>নাগরিক তথ্য সুরক্ষা নীতি (land.gov.bd Standard)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {language === 'bn'
                  ? 'গোপনীয়তা রক্ষা করে আপনার জমির বিবরণী অনুসন্ধান'
                  : 'Secure Records Lookup via Tracking Code'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                {language === 'bn'
                  ? 'এই হ্যাকাথন প্রোটোটাইপে মোছাঃ রহিমা বেগমের সিন্থেটিক পার্সেল (কালীগঞ্জ, গাজীপুর · খতিয়ান ১০৪২ · দাগ ৩৩১৮) অথবা ডেমো কোড দিয়ে সিস্টেম পরীক্ষা করুন।'
                  : 'Test this prototype by inspecting Mst. Rahima Begum\'s synthetic parcel or entering any demo code.'}
              </p>

              {/* Fast Code Chips */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-emerald-300 mb-2">
                  ১-ক্লিকে সিন্থেটিক ডেমো পার্সেল লোড করুন:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'LG-P-001', label: '১০৪২ (কালীগঞ্জ · মোছাঃ রহিমা বেগম · ১.০০ একর)' },
                    { id: 'LG-P-002', label: '২০৪ (গুলশান · ক্ষেত্রফল অমিল)' },
                    { id: 'LG-P-003', label: '৩০৮ (মিরপুর · অতিরিক্ত হস্তান্তর)' },
                    { id: 'LG-P-004', label: '৪১০ (উত্তরা · তথ্য অসম্পূর্ণ)' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedParcelId(item.id);
                        navigateTo('/my-land');
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#061A14] hover:bg-[#F2C94C] hover:text-[#06140F] text-emerald-200 border border-[#00A86B]/30 transition-all cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#061A14] rounded-2xl p-5 border border-[#00A86B]/40 space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-[#00A86B]/30">
                <span className="text-xs font-bold text-[#F2C94C]">সরাসরি সার্চ বক্স</span>
                <span className="text-[10px] text-emerald-300 font-semibold">আমার জমি পোর্টাল</span>
              </div>
              <p className="text-xs text-gray-300">
                খতিয়ান নং ১০৪২, দাগ নং ৩৩১৮ বা কেস আইডি LT-BD-2026-00182 দিয়ে অনুসন্ধান করুন:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="খতিয়ান নং বা দাগ নং লিখুন"
                  defaultValue="1042"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0A261D] border border-[#00A86B]/50 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
                />
                <button
                  onClick={() => {
                    setSelectedParcelId('LG-P-001');
                    navigateTo('/my-land');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#F2C94C] hover:bg-yellow-300 text-[#06140F] text-xs font-black transition-colors cursor-pointer"
                >
                  সার্চ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: 16122 HELPLINE & FARAIS CALCULATOR */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#0A261D] border border-[#00A86B]/40 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#061A14] flex items-center justify-center shrink-0 border border-[#00A86B]/50">
              <span className="text-2xl font-black text-[#F2C94C]">১৬১২২</span>
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300">
                {language === 'bn' ? 'জাতীয় ভূমি সেবা কল সেন্টার (১৬১২২)' : 'National Land Service Helpline (16122)'}
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                {language === 'bn'
                  ? 'ভূমি রেকর্ড, ই-নামজারি, খাজনা ও সেবা সংক্রান্ত যেকোনো সহায়তায় সার্বক্ষণিক কল করুন।'
                  : '24/7 Citizen Support · Official Ministry of Land Helpline.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="px-4 py-2.5 text-xs font-bold text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'উত্তরাধিকার গণনা' : 'Faraiz Calculator'}
            </button>
            <button
              onClick={() => navigateTo('/guide')}
              className="px-4 py-2.5 text-xs font-bold text-emerald-300 bg-[#061A14] hover:bg-[#0E3529] rounded-xl border border-[#00A86B]/40 transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'সেবা নির্দেশিকা' : 'Service Guide'}
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CORE POSITIONING / ABOUT LANDGUARD BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#03140E] via-[#07241A] to-[#03140E] border border-[#00A86B]/40 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A86B]/20 text-[#F2C94C] text-xs font-bold border border-[#00A86B]/40">
            <Shield className="w-3.5 h-3.5" />
            <span>ল্যান্ডগার্ডের মূল দর্শন ও উদ্দেশ্য</span>
          </div>
          <blockquote className="text-lg sm:text-2xl font-black text-white max-w-4xl mx-auto leading-snug">
            {language === 'bn'
              ? '"আমরা বাংলাদেশের বিদ্যমান ভূমি ব্যবস্থা প্রতিস্থাপন করছি না। আমরা এর মধ্য দিয়ে নাগরিকের মালিকানা যাত্রাকে বোধগম্য, যাচাইযোগ্য এবং পূর্বসক্রিয়ভাবে সুরক্ষিত করছি।"'
              : '"We are not replacing Bangladesh\'s land systems. We are making the ownership journey across them understandable, verifiable and proactively protected."'}
          </blockquote>
          <p className="text-xs text-gray-300 max-w-2xl mx-auto">
            {language === 'bn'
              ? 'ভূমি সেবা আরও সহজ, নিরাপদ ও দুর্নীতিমুক্ত করতে হ্যাকাথন প্রোটোটাইপ উদ্যোগ।'
              : 'Empowering citizens, reducing disputes, and ensuring mathematical integrity across records.'}
          </p>
        </div>
      </section>
    </div>
  );
};
