import React, { useState } from 'react';
import { X, BookOpen, Scale, FileText, ExternalLink, ShieldCheck, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LandLawsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LandLawsModal: React.FC<LandLawsModalProps> = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const laws = [
    {
      titleBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩',
      titleEn: 'Land Crime Prevention and Redress Act, 2023',
      actNo: 'আইন নং ২৮, ২০২৩',
      keyPoints: [
        'জাল বা মিথ্যা দলিল প্রস্তুতকরণ দণ্ডনীয় অপরাধ (সর্বোচ্চ ৭ বছর কারাদণ্ড ও অর্থদণ্ড)।',
        'মালিকানা গোপন করে একই জমি একাধিক ব্যক্তির নিকট হস্তান্তর সম্পূর্ণ নিষিদ্ধ।',
        'সহ-অংশীদার বা ওয়ারিশকে বঞ্চিত করে প্রতারণামূলক নামজারি বা দলিল বাতিলযোগ্য।'
      ]
    },
    {
      titleBn: 'স্টেট একুইজিশন অ্যান্ড টেন্যান্সি অ্যাক্ট, ১৯৫০ (SAT Act)',
      titleEn: 'State Acquisition and Tenancy Act, 1950',
      actNo: 'Act No. XXVIII of 1951',
      keyPoints: [
        'জমিদারি প্রথা উচ্ছেদ এবং রায়তদের সরাসরি সরকারের অধীনে প্রজা হিসাবে স্বীকৃতি।',
        'খতিয়ান তৈরি, সংশোধন ও ধারা ১৪৩ অনুসারে সহকারী কমিশনার (ভূমি) কর্তৃক নামজারি ক্ষমতা।',
        'কৃষি ও অকৃষি জমির সর্বোচ্চ মালিকানা সীমা (সিলিং) নির্ধারণ।'
      ]
    },
    {
      titleBn: 'রেজিস্ট্রেশন আইন, ১৯০৮ (সংশোধিত ২০০৪)',
      titleEn: 'The Registration Act, 1908 (Amended 2004)',
      actNo: 'Act No. XVI of 1908',
      keyPoints: [
        'ধারা ১৭এ: বায়না দলিল ও বিক্রয় দলিল রেজিস্ট্রেশন বাধ্যতামূলক।',
        'দলিল সম্পাদনের সময় পূর্ববর্তী ২৫ বছরের বায়া দলিল ও হালনাগাদ খতিয়ান উপস্থাপন আবশ্যক।',
        'দাখিলা ও নামজারি ব্যতিরেকে দলিল রেজিস্ট্রেশন নিষিদ্ধ।'
      ]
    },
    {
      titleBn: 'ভূমি সংস্কার আইন, ২০২৩',
      titleEn: 'Land Reforms Act, 2023',
      actNo: 'আইন নং ২৯, ২০২৩',
      keyPoints: [
        'ব্যক্তি বা পরিবারের ক্ষেত্রে সর্বোচ্চ ৬০ বিঘা (২০ একর) পর্যন্ত জমির মালিকানা সিলিং।',
        'বর্গাচাষীদের অধিকার সুরক্ষা ও ফসল বণ্টনের আইনানুগ সুরক্ষা।'
      ]
    }
  ];

  const filteredLaws = laws.filter(
    (l) =>
      l.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.keyPoints.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DCE6DF] text-left">
        {/* Header */}
        <div className="sticky top-0 bg-[#006A4E] text-white p-5 rounded-t-3xl flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {language === 'bn' ? 'ভূমি আইন ও সরকারি বিধিমালা' : 'Land Acts & Regulations'}
              </h3>
              <p className="text-xs text-emerald-100">
                {language === 'bn' ? 'ভূমি মন্ত্রণালয় (land.gov.bd) অনুমোদিত বিধিমালা' : 'Official Ministry of Land regulatory index'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#68766F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="আইনের নাম বা বিষয়বস্তু অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE6DF] bg-[#F5F8F6] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
            />
          </div>

          {/* Laws List */}
          <div className="space-y-3.5">
            {filteredLaws.map((law, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F5F8F6] border border-[#DCE6DF] space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#17231E]">{law.titleBn}</h4>
                    <span className="text-[11px] text-[#68766F] block">{law.titleEn}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#006A4E]/10 text-[#006A4E] px-2 py-0.5 rounded-md shrink-0">
                    {law.actNo}
                  </span>
                </div>

                <div className="pt-1 space-y-1 text-xs text-[#17231E]">
                  {law.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <span className="text-[#006A4E] font-bold">✓</span>
                      <span className="text-[11px] leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F5F8F6] p-4 rounded-b-3xl border-t border-[#DCE6DF] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#006A4E] hover:bg-[#064E3B] transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
