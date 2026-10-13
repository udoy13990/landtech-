import React from 'react';
import { Shield, Lock, Layers, CheckCircle2, AlertTriangle, Sparkles, Database, Fingerprint, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 text-left text-white">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#00A86B]/30">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A86B]/20 text-[#F2C94C] text-xs font-bold border border-[#00A86B]/40">
          <Shield className="w-3.5 h-3.5" />
          <span>About LANDGUARD</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {language === 'bn' ? 'ল্যান্ডগার্ড পরিচিতি ও অবস্থান' : 'Core Positioning & Product Identity'}
        </h1>
        <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
          {language === 'bn'
            ? 'বাংলাদেশে বিদ্যমান ভূমি সেবাসমূহের সাথে সমন্বিত একটি আধুনিক কৃত্রিম বুদ্ধিমত্তা ও অখণ্ডতা স্তর।'
            : 'An intelligent verification, explanation, and proactive protection layer that upgrades Bangladesh\'s existing land administration ecosystem.'}
        </p>
      </div>

      {/* SECTION 0: CORE POSITIONING QUOTE BOX */}
      <div className="bg-gradient-to-r from-[#03140E] via-[#0A2E22] to-[#03140E] border border-[#00A86B]/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="text-xs font-black uppercase tracking-widest text-[#F2C94C] flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Core Positioning · মূল দর্শন</span>
        </div>
        <blockquote className="text-lg sm:text-2xl font-black text-white leading-snug italic">
          "We are not replacing Bangladesh's land systems. We are making the ownership journey across them understandable, verifiable and proactively protected."
        </blockquote>
        <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
          LANDGUARD adds an intelligence, verification, explanation and proactive protection layer around the existing ecosystem. It is <strong>NOT</strong> another e-Mutation portal, <strong>NOT</strong> a generic chatbot, <strong>NOT</strong> a basic QR scanner, <strong>NOT</strong> a blockchain, <strong>NOT</strong> a GIS platform.
        </p>
      </div>

      {/* The 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-6 shadow-md space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#00A86B] flex items-center justify-center text-white text-xs font-black">
            01
          </div>
          <h3 className="text-base font-bold text-white">UNDERSTAND</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Translate complicated land laws, CS/SA/RS/BS survey records, and bureaucratic steps into plain-language citizen guidance and visual ownership history graphs.
          </p>
        </div>

        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-6 shadow-md space-y-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white text-xs font-black">
            02
          </div>
          <h3 className="text-base font-bold text-white">VERIFY</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Execute deterministic rule checks comparing recorded deed areas with cadastral settlement limits (e.g. Deed 0.80 vs Khatian 0.60 acre) even when certificate QR codes pass.
          </p>
        </div>

        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-6 shadow-md space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#F2C94C] flex items-center justify-center text-[#06140F] text-xs font-black">
            03
          </div>
          <h3 className="text-base font-bold text-white">PROTECT</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Monitor real-time simulated deed registrations via LANDGUARD SHIELD, empower 1-click citizen repudiation, and anchor lifecycle logs in a SHA-256 audit ledger.
          </p>
        </div>
      </div>

      {/* Synthetic Demo Baseline Details */}
      <div className="bg-[#061A14] border border-[#00A86B]/40 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-[#F2C94C]" />
          <span>Synthetic Demonstration Baseline Parcel</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#0A261D] border border-[#00A86B]/30">
            <div className="text-[10px] text-gray-400">Owner (মালিক)</div>
            <div className="font-bold text-white">Mst. Rahima Begum (mock)</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A261D] border border-[#00A86B]/30">
            <div className="text-[10px] text-gray-400">Location (অবস্থান)</div>
            <div className="font-bold text-white">Kaliganj (mock), Gazipur</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A261D] border border-[#00A86B]/30">
            <div className="text-[10px] text-gray-400">Khatian & Dag</div>
            <div className="font-bold text-white">Khatian: 1042 · Dag: 3318</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0A261D] border border-[#00A86B]/30">
            <div className="text-[10px] text-gray-400">Transaction Case ID</div>
            <div className="font-bold text-[#F2C94C]">LT-BD-2026-00182</div>
          </div>
        </div>
        <p className="text-[11px] text-gray-400">
          Note: LT-BD-2026-00182 is an internal project case ID linking related documents and lifecycle events; it is not a new legal government ID.
        </p>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-6 rounded-2xl bg-[#F42A41]/10 border border-[#F42A41]/30 text-xs text-rose-200 space-y-2">
        <div className="flex items-center gap-2 font-black text-rose-300 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>HACKATHON PROTOTYPE DEMONSTRATION DISCLAIMER</span>
        </div>
        <p className="leading-relaxed">
          LANDGUARD is an academic and technology demonstration prototype built for a GovTech hackathon. Uses synthetic/mock data only. Not an official government service. Production deployment would require authorized government data access and official API integrations with the Ministry of Land and Directorate of Registration.
        </p>
      </div>
    </div>
  );
};
