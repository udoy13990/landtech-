import React, { useState } from 'react';
import {
  FileCheck,
  FileSpreadsheet,
  Layers,
  Building2,
  Key,
  ShieldCheck,
  Scale,
  Database,
  HelpCircle,
  Eye,
  MapPin,
  Calculator,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface OfficialServiceItem {
  id: string;
  badge: 'LSG';
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  descBn: string;
  icon: React.ComponentType<{ className?: string }>;
  actionType: 'ROUTE' | 'CALCULATOR' | 'LAWS' | 'INFO_MODAL';
  targetRoute?: string;
  detailsModalTitle?: string;
  detailsContentBn?: string;
}

export const OFFICIAL_LAND_SERVICES: OfficialServiceItem[] = [
  {
    id: 'mutation',
    badge: 'LSG',
    titleBn: 'মিউটেশন',
    titleEn: 'e-Mutation / e-Namjari',
    categoryBn: 'মালিকানা হস্তান্তর ও নামজারি',
    descBn: 'অনলাইনে সহকারী কমিশনার (ভূমি) কার্যালয়ে নামজারি আবেদন, ট্র্যাকিং ও ডিসিআর ফি পরিশোধ।',
    icon: FileCheck,
    actionType: 'ROUTE',
    targetRoute: '/services'
  },
  {
    id: 'tax',
    badge: 'LSG',
    titleBn: 'ভূমি উন্নয়ন কর',
    titleEn: 'Land Development Tax',
    categoryBn: 'অনলাইন খাজনা পরিশোধ',
    descBn: 'এনআইডি ও মোবাইল নম্বর দিয়ে নাগরিক পোর্টালে ডিজিটাল দাখিলা ও বার্ষিক ভূমি উন্নয়ন কর প্রদান।',
    icon: FileSpreadsheet,
    actionType: 'ROUTE',
    targetRoute: '/verify'
  },
  {
    id: 'records-map',
    badge: 'LSG',
    titleBn: 'ভূমি রেকর্ড ও ম্যাপ',
    titleEn: 'Land Records & Cadastral Maps',
    categoryBn: 'খতিয়ান ও মৌজা রেকর্ড',
    descBn: 'সিএস, এসএ, আরএস ও বিএস খতিয়ান অনুসন্ধান এবং মৌজা ম্যাপের ডিজিটাল সিট অবলোকন।',
    icon: Layers,
    actionType: 'ROUTE',
    targetRoute: '/my-land'
  },
  {
    id: 'acquisition',
    badge: 'LSG',
    titleBn: 'ভূমি অধিগ্রহণ ও হুকুমদখল',
    titleEn: 'Land Acquisition & Requisition',
    categoryBn: 'উন্নয়ন প্রকল্প ও ক্ষতিপূরণ',
    descBn: 'জাতীয় উন্নয়ন প্রকল্পাধীন জমির এলএ কেস ট্র্যাকিং, যৌথ তদন্ত ও নোটিশ পর্যবেক্ষণ।',
    icon: Building2,
    actionType: 'INFO_MODAL',
    detailsModalTitle: 'ভূমি অধিগ্রহণ ও হুকুমদখল (LA Case)',
    detailsContentBn: 'সরকারের বিভিন্ন উন্নয়ন প্রকল্পের জন্য জমি অধিগ্রহণে চার ধারার নোটিশ, যৌথ তদন্তের প্রতিবেদন এবং ক্ষতিগ্রস্ত ভূমি মালিকদের ন্যায্য ক্ষতিপূরণ প্রদানের তথ্য ও ট্র্যাকিং সেবা।'
  },
  {
    id: 'lease',
    badge: 'LSG',
    titleBn: 'ইজারা ও বন্দোবস্ত',
    titleEn: 'Lease & Settlement Management',
    categoryBn: 'খাস জমি ও সায়রাত মহাল',
    descBn: 'কৃষি ও অকৃষি খাস জমি বন্দোবস্ত, অর্পিত সম্পত্তি এবং জলমহাল ইজারার স্বচ্ছ অনলাইন আবেদন।',
    icon: Key,
    actionType: 'INFO_MODAL',
    detailsModalTitle: 'খাস জমি ও জলমহাল ইজারা বন্দোবস্ত',
    detailsContentBn: 'ভূমিহীনদের মাঝে কৃষি খাস জমি বন্দোবস্ত নীতিমালা এবং সরকারি জলমহাল/বালুমহাল সমবায় সমিতির মাধ্যমে উন্মুক্ত ইজারার আবেদন ও যাচাইকরণ।'
  },
  {
    id: 'administration',
    badge: 'LSG',
    titleBn: 'ভূমি প্রশাসন ব্যবস্থাপনা',
    titleEn: 'Land Administration Management',
    categoryBn: 'প্রশাসনিক ব্যবস্থাপনা ও রেকর্ডরুম',
    descBn: 'জেলা ও উপজেলা ভূমি অফিসের ডিজিটাল কার্যক্রম, ডিসি রেকর্ড রুম এবং রেজিস্ট্রি সমন্বয়।',
    icon: ShieldCheck,
    actionType: 'ROUTE',
    targetRoute: '/audit'
  },
  {
    id: 'cases',
    badge: 'LSG',
    titleBn: 'ভূমি রাজস্ব মামলা',
    titleEn: 'Land Revenue Court Cases',
    categoryBn: 'মিসকেস ও আপিল ট্র্যাকিং',
    descBn: 'অতিরিক্ত জেলা প্রশাসক (রাজস্ব) ও বিভাগীয় কমিশনার আদালতে বিচারাধীন ভূমি মামলার শুনানির তারিখ।',
    icon: Scale,
    actionType: 'ROUTE',
    targetRoute: '/protection'
  },
  {
    id: 'infobank',
    badge: 'LSG',
    titleBn: 'ভূমি তথ্য ব্যাংক',
    titleEn: 'Land Information Bank',
    categoryBn: 'জাতীয় ভূমি ডেটা ভল্ট',
    descBn: 'সারাদেশের সকল মৌজার ডিজিটাল জিও-রেফারেন্সড খতিয়ান ও মালিকানা তথ্যের কেন্দ্রীয় ডেটাহাব।',
    icon: Database,
    actionType: 'ROUTE',
    targetRoute: '/my-land'
  },
  {
    id: 'grs',
    badge: 'LSG',
    titleBn: 'কারিগরি ও অভিযোগ প্রতিকার ব্যবস্থাপনা',
    titleEn: 'Grievance Redress System (GRS)',
    categoryBn: 'নাগরিক অভিযোগ ও সমাধান',
    descBn: 'ভূমি সেবা প্রাপ্তিতে হয়রানি, ঘুষ বা অনিয়মের প্রতিকারে ১৬১২২ ও জিআরএস পোর্টালে সরাসরি অভিযোগ।',
    icon: HelpCircle,
    actionType: 'ROUTE',
    targetRoute: '/guide'
  },
  {
    id: 'drishti',
    badge: 'LSG',
    titleBn: 'ভূমি দৃষ্টি',
    titleEn: 'Bhumi Drishti (Satellite GIS)',
    categoryBn: 'স্যাটেলাইট জিআইএস পর্যবেক্ষণ',
    descBn: 'কৃত্রিম উপগ্রহের চিত্রে ফসলি জমি, নদীভাঙন, জলাশয় ও নগরায়নের ভৌগোলিক পরিবর্তন নজরদারি।',
    icon: Eye,
    actionType: 'INFO_MODAL',
    detailsModalTitle: 'ভূমি দৃষ্টি (স্যাটেলাইট ও জিআইএস নজরদারি)',
    detailsContentBn: 'মহাকাশ গবেষণা কেন্দ্র (স্পারসো) ও জিআইএস উপগ্রহ মানচিত্র ব্যবহার করে কৃষি জমি সংরক্ষণ, অবৈধ নদী দখল শনাক্তকরণ ও ভূমির ব্যবহার পরিবর্তনের ডিজিটাল মনিটরিং।'
  },
  {
    id: 'naksha',
    badge: 'LSG',
    titleBn: 'ভূমি নকশা',
    titleEn: 'Bhumi Naksha (Cadastral Mapping)',
    categoryBn: 'ডিজিটাল মৌজা ম্যাপ ও দাগ',
    descBn: 'সরাসরি জুমযোগ্য ডিজিটাল ক্যাডাস্ট্রাল ম্যাপে দাগভিত্তিক জমির সীমানা ও পরিমাপ অনুসন্ধান।',
    icon: MapPin,
    actionType: 'ROUTE',
    targetRoute: '/ownership-history'
  },
  {
    id: 'faraiz',
    badge: 'LSG',
    titleBn: 'উত্তরাধিকার ক্যালকুলেটর',
    titleEn: 'Inheritance Faraiz Calculator',
    categoryBn: 'ওয়ারিশান হিস্যা বণ্টন',
    descBn: 'সরকারি আইন ও ফারায়েজ অনুসারে ছেলে, মেয়ে, স্ত্রী ও বাবা-মায়ের জমির নির্ভুল অংশ গণনা।',
    icon: Calculator,
    actionType: 'CALCULATOR'
  }
];

export const OfficialLandGovServices: React.FC = () => {
  const { language, navigateTo, setIsCalculatorOpen } = useApp();
  const [activeModalItem, setActiveModalItem] = useState<OfficialServiceItem | null>(null);

  const handleCardClick = (item: OfficialServiceItem) => {
    if (item.actionType === 'CALCULATOR') {
      setIsCalculatorOpen(true);
    } else if (item.actionType === 'INFO_MODAL') {
      setActiveModalItem(item);
    } else if (item.targetRoute) {
      navigateTo(item.targetRoute);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 text-left">
      {/* Official Section Title matching land.gov.bd */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#00A86B]/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A86B]/15 border border-[#00A86B]/30 text-xs font-bold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-[#F2C94C] animate-pulse" />
            <span>স্মার্ট ল্যান্ড সার্ভিস গেটওয়ে (LSG)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
            ভূমি সংক্রান্ত সেবা (Land Related Services)
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার · ভূমি মন্ত্রণালয় (land.gov.bd) অনুমোদিত ডিজিটাল সেবা তালিকা
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-emerald-300 bg-[#0E3327] px-3 py-1.5 rounded-xl border border-[#00A86B]/40">
            মোট ১২টি ডিজিটাল সার্ভিস
          </span>
        </div>
      </div>

      {/* 12 Official Service Cards Grid with LSG Badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {OFFICIAL_LAND_SERVICES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group bg-[#0A261D] hover:bg-[#0E3529] border border-[#00A86B]/30 hover:border-[#F2C94C]/60 rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between text-left hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Top Row: Icon and LSG Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#061A14] border border-[#00A86B]/40 flex items-center justify-center text-emerald-400 group-hover:text-[#F2C94C] group-hover:scale-105 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Official LSG Badge */}
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-linear-to-r from-[#F2C94C] to-amber-400 text-[#06140F] shadow-sm tracking-wider">
                    {item.badge}
                  </span>
                </div>

                {/* Service Titles */}
                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {item.titleBn}
                  </h3>
                  <div className="text-[11px] font-semibold text-emerald-400/90 mt-0.5">
                    {item.categoryBn}
                  </div>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed line-clamp-3">
                    {item.descBn}
                  </p>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 mt-3 border-t border-[#00A86B]/20 flex items-center justify-between text-xs font-bold text-emerald-300 group-hover:text-[#F2C94C] transition-colors">
                <span>সেবা গ্রহণ করুন</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal for Acquisition / Lease / Drishti */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
          <div className="bg-[#0A261D] border border-[#00A86B]/60 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-left space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black bg-[#F2C94C] text-[#06140F] px-2 py-0.5 rounded-md">
                  LSG
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeModalItem.detailsModalTitle || activeModalItem.titleBn}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {activeModalItem.detailsContentBn}
            </p>

            <div className="p-3.5 rounded-xl bg-[#061A14] border border-[#00A86B]/30 text-xs text-emerald-300 space-y-1">
              <div className="font-bold">স্মার্ট ভূমি সেবা সংযোগ:</div>
              <div className="text-[11px] text-gray-300">
                এই সেবার সকল রেকর্ড কেন্দ্রীয় ভূমি তথ্য ব্যাংক ও ক্রিপ্টোগ্রাফিক সুরক্ষা স্তরের সাথে সংযুক্ত।
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setActiveModalItem(null);
                  navigateTo('/my-land');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00A86B] hover:bg-emerald-600 text-white transition-colors cursor-pointer"
              >
                আমার জমিতে রেকর্ড দেখুন
              </button>
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-gray-200 transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
