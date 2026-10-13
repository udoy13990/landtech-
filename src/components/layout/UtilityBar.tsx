import React from 'react';
import { Globe, HelpCircle, AlertCircle, ShieldAlert, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UtilityBar: React.FC = () => {
  const { language, setLanguage, t, navigateTo, alerts } = useApp();
  const unreadAlerts = alerts.filter((a) => a.status === 'PENDING_USER_REVIEW').length;

  return (
    <div className="bg-[#020F0A] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#00A86B]/30 select-none no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Bangladesh Government & Ministry Identity */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="font-bold tracking-wide text-emerald-200">
            {language === 'bn'
              ? "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার – ভূমি মন্ত্রণালয় (প্রোটোটাইপ)"
              : "Government of the People's Republic of Bangladesh – Ministry of Land (Prototype)"}
          </span>
          <span className="hidden lg:inline text-emerald-400/40">|</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F42A41]/20 text-rose-200 border border-[#F42A41]/40">
            <AlertCircle className="w-3 h-3 text-[#F2C94C]" />
            <span>
              {language === 'bn'
                ? 'হ্যাকাথন প্রোটোটাইপ · শুধুমাত্র সিন্থেটিক/মক ডেটা · কোনো দাপ্তরিক সরকারি সেবা নয়'
                : 'Hackathon prototype. Uses synthetic/mock data only. Not an official government service.'}
            </span>
          </span>
        </div>

        {/* Right: Land Hotline 16122 (land.gov.bd signature) & Language switcher */}
        <div className="flex items-center gap-3 sm:gap-5 text-emerald-100">
          {/* Iconic Bangladesh Land Service Hotline 16122 */}
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300 font-bold bg-[#006A4E]/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
            <PhoneCall className="w-3 h-3" />
            <span>{language === 'bn' ? 'ভূমি সেবা কলসেন্টার: ১৬১২২' : 'Land Hotline: 16122'}</span>
          </div>

          <button
            onClick={() => navigateTo('/help')}
            className="hidden lg:inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সহায়তা ও নির্দেশিকা' : 'Help & Support'}</span>
          </button>

          {unreadAlerts > 0 && (
            <button
              onClick={() => navigateTo('/protection')}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>
                {language === 'bn' ? `${unreadAlerts}টি ডেমো অ্যালার্ট` : `${unreadAlerts} Alerts`}
              </span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 border-l border-emerald-600/60 pl-3">
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="hover:underline font-bold text-white transition-colors px-1 py-0.5 rounded"
              title="Switch language between বাংলা and English"
            >
              {language === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
