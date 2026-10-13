import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  FileText,
  FileCheck,
  GitBranch,
  ShieldAlert,
  BookOpen,
  HelpCircle,
  Layers,
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  Lock,
  Calculator,
  Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { language, t, navigateTo, setIsCalculatorOpen, setIsLawsOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'RECORDS' | 'TRANSFER' | 'PROTECTION' | 'TAX'>('ALL');

  const services = [
    // Category A: Records & Information
    {
      id: 'srv-khatian',
      category: 'RECORDS',
      titleEn: 'Khatian Records Information',
      titleBn: 'খতিয়ান রেকর্ড তথ্যাবলি',
      descEn: 'Understand differences across CS, SA, RS, and City/BS surveys and how rights are cataloged.',
      descBn: 'সিএস, এসএ, আরএস এবং সিটি/বিএস জরিপ খতিয়ানের পার্থক্য ও মালিকানা লিপির গঠন জানুন।',
      availability: 'Interactive Demo',
      route: '/my-land',
      icon: Layers
    },
    {
      id: 'srv-dag',
      category: 'RECORDS',
      titleEn: 'Dag (Plot) Number Directory',
      titleBn: 'দাগ নম্বর নির্দেশিকা',
      descEn: 'Guidance on locating cadastral plot boundaries on mouza maps and identifying sub-plots (Chut Dag).',
      descBn: 'মৌজা নকশায় প্লট বা দাগ নম্বর খুঁজে বের করা এবং ছুট দাগ ও বাটা দাগের পরিচয়।',
      availability: 'Guidance Only',
      route: '/guide',
      icon: BookOpen
    },
    {
      id: 'srv-history',
      category: 'RECORDS',
      titleEn: 'Ownership History Lineage',
      titleBn: 'মালিকানা ইতিহাস পরিক্রমা',
      descEn: 'Interactive chronological succession explorer from original settlements to current registered title.',
      descBn: 'মূল সেটেলমেন্ট থেকে শুরু করে বর্তমান নিবন্ধিত স্বত্ব পর্যন্ত ঐতিহাসিক ধারাবাহিকতা।',
      availability: 'Interactive Demo',
      route: '/ownership-history',
      icon: GitBranch
    },

    // Category B: Transfer & Mutation
    {
      id: 'srv-namjari',
      category: 'TRANSFER',
      titleEn: 'Mutation / e-Namjari Guidance',
      titleBn: 'ই-নামজারি ও জমাখারিজ নির্দেশিকা',
      descEn: 'Step-by-step breakdown of mutation hearings at Upazila AC Land offices, DCR fees, and digital khatian issuance.',
      descBn: 'উপজেলা এসিল্যান্ড অফিসে নামজারি শুনানির ধাপ, ডিসিআর ফি এবং ডিজিটাল খতিয়ান প্রাপ্তির নিয়ম।',
      availability: 'Guidance Only',
      route: '/guide',
      icon: FileCheck
    },
    {
      id: 'srv-transfer-check',
      category: 'TRANSFER',
      titleEn: 'Ownership Transfer Checklist',
      titleBn: 'জমি হস্তান্তর চেকলিস্ট',
      descEn: 'Comprehensive checklist of required deeds, bia deeds, non-encumbrance certs, and tax clearances before purchase.',
      descBn: 'জমি ক্রয়ের পূর্বে প্রয়োজনীয় বায়া দলিল, নির্দায় সনদ ও দাখিলা পরিশোধের পূর্ণাঙ্গ চেকলিস্ট।',
      availability: 'Guidance Only',
      route: '/guide',
      icon: CheckCircle2
    },
    {
      id: 'srv-warishan',
      category: 'TRANSFER',
      titleEn: 'Inheritance & Warishan Distribution',
      titleBn: 'ওয়ারিশান ও উত্তরাধিকার বণ্টন',
      descEn: 'Guidance on partition deeds (Bantan-nama) and municipal succession certificates for joint family property.',
      descBn: 'পারিবারিক এজমালি সম্পত্তির ক্ষেত্রে বণ্টননামা দলিল এবং পৌর/ইউনিয়ন ওয়ারিশান সনদ গ্রহণের পদ্ধতি।',
      availability: 'Guidance Only',
      route: '/guide',
      icon: GitBranch
    },
    {
      id: 'srv-calculator',
      category: 'TRANSFER',
      titleEn: 'Inheritance Calculator (Faraiz)',
      titleBn: 'উত্তরাধিকার ক্যালকুলেটর (ফারায়েজ)',
      descEn: 'Calculate legal property shares for sons, daughters, wives, and parents according to Bangladesh law.',
      descBn: 'ওয়ারিশদের মধ্যে সম্পত্তির সঠিক অংশ ও হিস্যা সরকারি নিয়মানুযায়ী নিমেষেই গণনা করুন।',
      availability: 'Interactive Tool',
      route: 'CALCULATOR_MODAL',
      icon: Calculator
    },
    {
      id: 'srv-laws',
      category: 'PROTECTION',
      titleEn: 'Land Acts & Crime Prevention Act 2023',
      titleBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩',
      descEn: 'Directory of major land acts, penal provisions for fake deeds, and regulatory guidelines.',
      descBn: 'ভুয়া দলিল, জবরদখল ও প্রতারণামূলক হস্তান্তরের বিরুদ্ধে নতুন আইনের ৭ বছর কারাদণ্ডের বিধানাবলি।',
      availability: 'Regulatory Index',
      route: 'LAWS_MODAL',
      icon: Scale
    },

    // Category C: Verification & Protection
    {
      id: 'srv-verify',
      category: 'PROTECTION',
      titleEn: 'Cross-Record Verification Workspace',
      titleBn: 'ক্রস-রেকর্ড যাচাইকরণ ওয়ার্কস্পেস',
      descEn: 'Compare deed areas against official survey khatians using deterministic consistency rules.',
      descBn: 'দলিলের ক্ষেত্রফল বনাম খতিয়ানের পরিমাণের মধ্যে নিয়মভিত্তিক স্বয়ংক্রিয় সমন্বয় পরীক্ষা।',
      availability: 'Interactive Demo',
      route: '/verify',
      icon: ShieldCheck
    },
    {
      id: 'srv-shield',
      category: 'PROTECTION',
      titleEn: 'LandGuard Shield Alerting',
      titleBn: 'ল্যান্ডগার্ড শিল্ড অ্যালার্ট',
      descEn: 'Simulated real-time monitoring of land-related filings, unrecognized deed attempts, and incident creation.',
      descBn: 'জমির সাথে সম্পর্কিত যেকোনো নতুন আবেদন ও অস্বাভাবিক ঘটনার সিমুলেটেড নোটিফিকেশন।',
      availability: 'Interactive Demo',
      route: '/protection',
      icon: ShieldAlert
    },
    {
      id: 'srv-audit',
      category: 'PROTECTION',
      titleEn: 'Cryptographic Hash Audit',
      titleBn: 'ক্রিপ্টোগ্রাফিক হ্যাশ অডিট',
      descEn: 'Verify immutable SHA-256 event chains and test retroactive tampering resilience.',
      descBn: 'অপরিবর্তনীয় SHA-256 হ্যাশ চেইন যাচাই এবং রেট্রোঅ্যাক্টিভ ট্যাম্পারিং প্রতিরোধ পরীক্ষা।',
      availability: 'Interactive Demo',
      route: '/audit',
      icon: Lock
    },
    {
      id: 'srv-report',
      category: 'PROTECTION',
      titleEn: 'Land Integrity Dossier Generator',
      titleBn: 'ভূমি অখণ্ডতা রিপোর্ট তৈরি',
      descEn: 'Generate printable technical dossiers summarizing document matches and audit history.',
      descBn: 'নথিপত্রের মিল ও অডিট প্রমাণ সংবলিত প্রিন্টযোগ্য প্রযুক্তিগত ডসিয়ার প্রস্তুত করুন।',
      availability: 'Interactive Demo',
      route: '/reports',
      icon: FileText
    },

    // Category D: Taxes & Other Guidance
    {
      id: 'srv-tax',
      category: 'TAX',
      titleEn: 'Land Development Tax Guidance',
      titleBn: 'ভূমি উন্নয়ন কর (খাজনা) নির্দেশিকা',
      descEn: 'Information on digital LD tax portals (ldtax.gov.bd), holding numbers, and annual Dakhila receipts.',
      descBn: 'ডিজিটাল ভূমি উন্নয়ন কর পোর্টাল, হোল্ডিং নম্বর এবং বার্ষিক দাখিলা রশিদ সংগ্রহের তথ্য।',
      availability: 'Guidance Only',
      route: '/guide',
      icon: FileText
    },
    {
      id: 'srv-fees',
      category: 'TAX',
      titleEn: 'Registration Fees Guidance',
      titleBn: 'রেজিস্ট্রেশন ফি ও শুল্ক নির্দেশিকা',
      descEn: 'Overview of stamp duties, local government taxes, gain tax, and sub-registry fees for conveyances.',
      descBn: 'সাফ-কবলা দলিলের স্ট্যাম্প শুল্ক, স্থানীয় সরকার কর, উৎস কর এবং সাব-রেজিস্ট্রি ফির বিবরণ।',
      availability: 'Guidance Only',
      route: '/guide',
      icon: BookOpen
    }
  ];

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.descEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleBn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || s.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-left bg-[#061A14] text-white">
      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-[#00A86B]/30">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#F2C94C]" />
          <span>Bangladesh Land Services Directory (LSG)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'bn' ? 'ভূমি সেবা ডিরেক্টরি' : 'Land Services Directory'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
          {language === 'bn'
            ? 'খতিয়ান, নামজারি, হস্তান্তর, জমির রেকর্ড যাচাই ও সুরক্ষার সমন্বিত ডিজিটাল ডিরেক্টরি।'
            : 'Structured service directory organizing land records, mutation steps, transaction checklists, and integrity verification tools.'}
        </p>
      </div>

      {/* Prominent Official Authority Notice */}
      <div className="p-4 rounded-2xl bg-[#0A261D] border border-[#00A86B]/40 flex items-start gap-3 text-xs text-emerald-200">
        <Info className="w-4 h-4 text-[#F2C94C] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-white">নাগরিক সেবা বার্তা: </span>
          {language === 'bn'
            ? 'সরকারি বিধিমালা ও ল্যান্ড সার্ভিস গেটওয়ে (LSG) অনুসারে সকল সেবা ডিজিটাল সিস্টেমে সংরক্ষিত। ডেমো সিস্টেমে যেকোনো ১০১ কোড ব্যবহার করে পূর্ণ কার্যপদ্ধতি অবলোকন করা যাবে।'
            : 'BD LAND GUARD organizes and explains information. Formal applications, legal decisions, official mutation gazettes, and registration changes must be completed through authorized land offices.'}
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'সেবা খুঁজুন, ই-নামজারি, খতিয়ান, খাজনা...' : 'Search services, e-Namjari, Khatian, Tax...'}
            className="w-full bg-[#0A261D] border border-[#00A86B]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#00A86B]"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0A261D] border border-[#00A86B]/30 rounded-xl text-xs font-medium self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[#00A86B] text-white shadow-xs font-bold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? `সকল সেবা (${services.length})` : `All Services (${services.length})`}
          </button>
          <button
            onClick={() => setSelectedCategory('RECORDS')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'RECORDS'
                ? 'bg-[#00A86B] text-white shadow-xs font-bold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'রেকর্ড ও খতিয়ান' : 'Records & Information'}
          </button>
          <button
            onClick={() => setSelectedCategory('TRANSFER')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'TRANSFER'
                ? 'bg-[#00A86B] text-white shadow-xs font-bold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'নামজারি ও হস্তান্তর' : 'Transfer & Mutation'}
          </button>
          <button
            onClick={() => setSelectedCategory('PROTECTION')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'PROTECTION'
                ? 'bg-[#00A86B] text-white shadow-xs font-bold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'যাচাই ও সুরক্ষা' : 'Verification & Shield'}
          </button>
          <button
            onClick={() => setSelectedCategory('TAX')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'TAX'
                ? 'bg-[#00A86B] text-white shadow-xs font-bold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'কর ও ফি' : 'Tax & Fees'}
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              onClick={() => {
                if (service.route === 'CALCULATOR_MODAL') {
                  setIsCalculatorOpen(true);
                } else if (service.route === 'LAWS_MODAL') {
                  setIsLawsOpen(true);
                } else {
                  navigateTo(service.route);
                }
              }}
              className="bg-[#0A261D] border border-[#00A86B]/30 hover:border-[#F2C94C]/60 rounded-2xl p-6 shadow-md hover:shadow-xl hover:bg-[#0E3529] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#061A14] border border-[#00A86B]/40 group-hover:border-[#F2C94C]/60 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-emerald-400 group-hover:text-[#F2C94C] transition-colors" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      service.availability === 'Interactive Demo' || service.availability === 'Interactive Tool'
                        ? 'bg-[#00A86B]/20 text-emerald-300 border border-[#00A86B]/40'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {service.availability}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? service.titleBn : service.titleEn}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    {language === 'bn' ? service.descBn : service.descEn}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#00A86B]/20 flex items-center justify-between text-xs font-bold text-emerald-300 group-hover:text-[#F2C94C] transition-colors">
                <span>{language === 'bn' ? 'সেবা গ্রহণ করুন' : 'Explore Service'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
