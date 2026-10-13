import React, { useState } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const { language, navigateTo, resetAllDemoData, t } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetConfirm = () => {
    resetAllDemoData();
    setShowResetConfirm(false);
  };

  return (
    <footer className="bg-[#020F0A] text-white border-t border-[#00A86B]/30 pt-14 pb-10 no-print select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" showText={true} className="[&_*]:text-white" />
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'বাংলাদেশে বিদ্যমান ভূমি সেবাসমূহের সাথে সংযোগ স্থাপনকারী একটি বুদ্ধিমান সুরক্ষা ও সমন্বয় স্তর। জমির তথ্যের অসঙ্গতি শনাক্তকরণ ও ডিজিটাল অখণ্ডতা নিশ্চিতে সহায়ক।'
                : 'An intelligent verification and protection layer designed to cross-check land records, highlight potential inconsistencies, and safeguard recorded ownership activity across Bangladesh.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-amber-400/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('resetDemo')}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Land Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {language === 'bn' ? 'ভূমি সেবা সমূহ' : 'Land Services'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => navigateTo('/verify')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'নথি যাচাইকরণ' : 'Record Verification'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/services')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'নামজারি নির্দেশিকা' : 'Mutation Guidance'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/ownership-history')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'মালিকানা ইতিহাস' : 'Ownership History'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/reports')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'অখণ্ডতা রিপোর্ট' : 'Integrity Reports'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {language === 'bn' ? 'সহায়তা ও তথ্য' : 'Help & Information'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => navigateTo('/guide')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'ভূমি পরিভাষা ও গাইড' : 'Glossary & Guide'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/help')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্ন' : 'Frequently Asked Questions'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/audit')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'ক্রিপ্টোগ্রাফিক অডিট' : 'Cryptographic Audit'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'প্রোটোটাইপ সম্পর্কে' : 'About Platform'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {language === 'bn' ? 'স্বচ্ছতা ও নীতিমালা' : 'Legal & Transparency'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'প্রোটোটাইপ অস্বীকৃতিপত্র' : 'Prototype Disclaimer'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'ডেটা গোপনীয়তা' : 'Data Privacy Notice'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'সাইবার নিরাপত্তা নীতি' : 'Security Principles'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/officer')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'কর্মকর্তা প্যানেল (ডেমো)' : 'Officer Console (Demo)'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Positioning & Mandatory Hackathon Disclaimer */}
        <div className="pt-8 text-center space-y-3">
          <div className="p-4 rounded-2xl bg-white/5 border border-[#00A86B]/30 max-w-3xl mx-auto">
            <blockquote className="text-xs sm:text-sm font-bold text-emerald-200 italic">
              "We are not replacing Bangladesh's land systems. We are making the ownership journey across them understandable, verifiable and proactively protected."
            </blockquote>
          </div>
          <p className="text-xs text-amber-200/90 font-medium max-w-3xl mx-auto leading-relaxed">
            Hackathon prototype. Uses synthetic/mock data only. Not an official government service. Production deployment would require authorized government data access/APIs.
          </p>
          <p className="text-[11px] text-gray-400">
            {t('allRightsReserved')} · Synthetic Demonstration Dataset Only (Gazipur · Kaliganj · Khatian 1042 · Dag 3318).
          </p>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white text-[#17231E] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#DCE6DF] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold">
                {language === 'bn' ? 'ডেমো ডেটা রিসেট নিশ্চিতকরণ' : 'Confirm Reset Demonstration Data'}
              </h3>
            </div>
            <p className="text-xs text-[#68766F] leading-relaxed mb-6">
              {language === 'bn'
                ? 'এই পদক্ষেপে সকল পরিবর্তিত রেকর্ড, নতুন ইনসিডেন্ট, ট্যাম্পারিং সিমুলেশন ও অডিট লগ প্রাথমিক অবস্থায় ফিরে যাবে। আপনি কি নিশ্চিত?'
                : 'This will reset all modified parcel statuses, simulated incidents, alerts, and audit logs back to their initial baseline state. Proceed?'}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-[#68766F] hover:text-[#17231E] rounded-lg border border-[#DCE6DF]"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={handleResetConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#C62828] hover:bg-[#B71C1C] rounded-lg shadow-xs"
              >
                {language === 'bn' ? 'হ্যাঁ, রিসেট করুন' : 'Yes, Reset Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
