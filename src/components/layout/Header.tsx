import React, { useState } from 'react';
import {
  Bell,
  Menu,
  X,
  Search,
  UserCheck,
  Calculator,
  Scale,
  PhoneCall,
  ChevronDown,
  Layers,
  ShieldCheck,
  FileText,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

export const Header: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    language,
    alerts,
    setIsCalculatorOpen,
    setIsLawsOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Streamlined primary items for a clean, professional top bar:
  const primaryNavItems = [
    { id: '/', labelBn: 'হোম', labelEn: 'Home' },
    { id: '/my-land', labelBn: 'আমার জমি', labelEn: 'My Land' },
    { id: '/verify', labelBn: 'যাচাই', labelEn: 'Verify' },
    { id: '/protection', labelBn: 'শিল্ড সুরক্ষা', labelEn: 'SHIELD' }
  ];

  // Secondary tools organized neatly inside a dropdown
  const moreNavItems = [
    { id: '/ownership-history', labelBn: 'মালিকানা গ্রাফ', labelEn: 'Ownership Graph', icon: Layers },
    { id: '/audit', labelBn: 'ক্রিপ্টো অডিট শিল্ড', labelEn: 'Audit Shield', icon: ShieldCheck },
    { id: '/officer', labelBn: 'অফিসার ড্যাশবোর্ড', labelEn: 'Officer Dashboard', icon: UserCheck },
    { id: '/guide', labelBn: 'সার্ভিস কপাইলট', labelEn: 'Service Copilot', icon: Sparkles },
    { id: '/about', labelBn: 'আমাদের সম্পর্কে', labelEn: 'About', icon: FileText }
  ];

  const pendingAlerts = alerts.filter((a) => a.status === 'PENDING_USER_REVIEW');

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#041510]/95 backdrop-blur-md border-b border-[#00A86B]/30 select-none no-print text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Official Brand Emblem & Government Logo */}
          <button
            onClick={() => {
              navigateTo('/');
              setMobileMenuOpen(false);
            }}
            className="shrink-0 text-left cursor-pointer transition-transform hover:opacity-95"
          >
            <BrandLogo size="md" showText={true} className="[&_*]:text-white" />
          </button>

          {/* Zone 2: Navigation Links (Clean, organized, not cluttered) */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-gray-300">
            {primaryNavItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`whitespace-nowrap transition-colors py-1.5 relative ${
                    isActive
                      ? 'text-[#F2C94C] font-bold'
                      : 'hover:text-emerald-300'
                  }`}
                >
                  {language === 'bn' ? item.labelBn : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2C94C] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Clean Dropdown for More Modules */}
            <div
              className="relative"
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <button
                className={`whitespace-nowrap transition-colors py-1.5 flex items-center gap-1 cursor-pointer ${
                  moreNavItems.some((m) => m.id === currentRoute)
                    ? 'text-[#F2C94C] font-bold'
                    : 'hover:text-emerald-300'
                }`}
              >
                <span>{language === 'bn' ? 'আরও সেবা ও মডিউল' : 'More Modules'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showServicesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-[#0A261D] rounded-2xl shadow-2xl border border-[#00A86B]/40 p-2 z-50 text-left">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F2C94C] border-b border-[#00A86B]/20">
                    {language === 'bn' ? 'অতিরিক্ত ফিচারসমূহ' : 'Specialized Modules'}
                  </div>
                  <div className="py-1 space-y-0.5 text-xs">
                    {moreNavItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = currentRoute === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            navigateTo(sub.id);
                            setShowServicesDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                            isSubActive
                              ? 'bg-[#00A86B]/20 text-[#F2C94C] font-bold'
                              : 'text-gray-200 hover:bg-[#0E3529] hover:text-white'
                          }`}
                        >
                          <SubIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{language === 'bn' ? sub.labelBn : sub.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Signature Quick Tools & Citizen Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Faraiz Calculator Button */}
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#F2C94C] bg-[#F2C94C]/10 hover:bg-[#F2C94C]/20 border border-[#F2C94C]/30 transition-colors"
              title="উত্তরাধিকার ক্যালকুলেটর (ফারায়েজ)"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>ফারায়েজ</span>
            </button>

            {/* Quick Land Laws Button */}
            <button
              onClick={() => setIsLawsOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="ভূমি আইন ও বিধিমালা ২০২৩"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>আইন ও বিধি</span>
            </button>

            {/* Notifications bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {pendingAlerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#F42A41] ring-2 ring-[#041510]" />
                )}
              </button>

              {/* Notifications Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0A261D] rounded-2xl shadow-2xl border border-[#00A86B]/40 p-3.5 z-50 text-white">
                  <div className="flex items-center justify-between pb-2 border-b border-[#00A86B]/30 mb-2">
                    <span className="text-xs font-bold text-white">
                      {language === 'bn' ? 'সক্রিয় সতর্কবার্তা' : 'Simulated Alerts'}
                    </span>
                    <span className="text-[11px] font-semibold text-[#F2C94C]">
                      {pendingAlerts.length} {language === 'bn' ? 'টি অমীমাংসিত' : 'Pending'}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {pendingAlerts.length === 0 ? (
                      <div className="text-xs text-gray-400 py-3 text-center">
                        {language === 'bn' ? 'কোনো নতুন সতর্কবার্তা নেই' : 'No active alerts pending'}
                      </div>
                    ) : (
                      pendingAlerts.map((a) => (
                        <div
                          key={a.id}
                          onClick={() => {
                            setShowNotifications(false);
                            navigateTo('/protection');
                          }}
                          className="p-2.5 rounded-xl bg-[#061A14] hover:bg-[#0E3529] cursor-pointer transition-colors text-left border border-[#00A86B]/20"
                        >
                          <div className="text-xs font-bold text-white">
                            {language === 'bn' ? a.titleBn : a.titleEn}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            {a.parcelName} · {a.timestamp}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigateTo('/protection');
                    }}
                    className="w-full mt-2.5 py-1.5 text-xs text-center font-bold text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl transition-colors cursor-pointer"
                  >
                    {language === 'bn' ? 'সকল সতর্কবার্তা দেখুন' : 'View all alerts in Shield'}
                  </button>
                </div>
              )}
            </div>

            {/* Run Flagship Demo Stepper Button */}
            <button
              onClick={() => {
                navigateTo('/');
                setTimeout(() => {
                  const el = document.getElementById('flagship-demo-stepper');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 border border-emerald-400/40 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
              title="Run 4-Step Flagship Demo Stepper"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2C94C]" />
              <span>{language === 'bn' ? 'ডেমো চালান' : 'Run Demo'}</span>
            </button>

            {/* Official Citizen Corner / Login Trigger */}
            <button
              onClick={() => setShowLoginModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 transition-colors shadow-sm cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#06140F]" />
              <span>{language === 'bn' ? 'নাগরিক কর্নার' : 'Citizen Corner'}</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A261D] border-b border-[#00A86B]/40 px-4 py-4 space-y-2 text-white">
            <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-[#00A86B]/20">
              <button
                onClick={() => {
                  setIsCalculatorOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#061A14] text-[#F2C94C] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#F2C94C]/30"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>ফারায়েজ ক্যালকুলেটর</span>
              </button>
              <button
                onClick={() => {
                  setIsLawsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-[#061A14] text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-[#00A86B]/30"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>ভূমি আইন ও বিধি</span>
              </button>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-3 pt-1">
              {language === 'bn' ? 'প্রধান সার্ভিস' : 'Main Services'}
            </div>
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                  currentRoute === item.id
                    ? 'bg-[#00A86B]/20 text-[#F2C94C] font-bold'
                    : 'text-gray-200 hover:bg-[#0E3529]'
                }`}
              >
                {language === 'bn' ? item.labelBn : item.labelEn}
              </button>
            ))}

            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-3 pt-2 border-t border-[#00A86B]/20">
              {language === 'bn' ? 'অতিরিক্ত মডিউল' : 'More Modules'}
            </div>
            {moreNavItems.map((item) => {
              const SubIcon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                    currentRoute === item.id
                      ? 'bg-[#00A86B]/20 text-[#F2C94C] font-bold'
                      : 'text-gray-200 hover:bg-[#0E3529]'
                  }`}
                >
                  <SubIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Official land.gov.bd Citizen Corner Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
          <div className="bg-[#0A261D] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#00A86B]/50 text-left space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#061A14] flex items-center justify-center text-[#F2C94C] border border-[#00A86B]/40">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">নাগরিক লগইন ও এনআইডি ভেরিফিকেশন</h3>
                  <span className="text-[10px] text-emerald-300">ভূমি সেবা প্রবেশদ্বার (land.gov.bd SSO)</span>
                </div>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              সরকারি পোর্টালে আপনার খতিয়ান ও কর দেখতে জাতীয় পরিচয়পত্র নম্বর (NID) ও মোবাইল নম্বর প্রয়োজন। ডেমো সিস্টেমে সরাসরি ১০১ ট্র্যাকিং কোড দিয়ে অনুসন্ধান করতে পারেন।
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-emerald-300 mb-1">জাতীয় পরিচয়পত্র নম্বর (NID)</label>
                <input
                  type="text"
                  placeholder="১০ বা ১৭ ডিজিটের এনআইডি লিখুন (যেমন: 198826925...)"
                  defaultValue="19882692541001201"
                  className="w-full px-3 py-2 rounded-xl border border-[#00A86B]/40 bg-[#061A14] text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-emerald-300 mb-1">মোবাইল নম্বর</label>
                <input
                  type="text"
                  placeholder="০১৭xxxxxxxx"
                  defaultValue="01712-345678"
                  className="w-full px-3 py-2 rounded-xl border border-[#00A86B]/40 bg-[#061A14] text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigateTo('/my-land');
                }}
                className="w-full py-2.5 rounded-xl bg-[#F2C94C] text-[#06140F] text-xs font-black hover:bg-yellow-300 transition-colors"
              >
                ওটিপি প্রেরণ ও আমার জমিতে প্রবেশ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
