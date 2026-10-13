import React from 'react';
import { HelpCircle, CheckCircle2, ArrowRight, ShieldCheck, AlertTriangle, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HelpPage: React.FC = () => {
  const { language, navigateTo } = useApp();

  const scenarios = [
    {
      id: 'A',
      title: 'Scenario A: Consistent Records',
      parcel: 'LG-P-001',
      desc: 'All selected sample fields match across deed, khatian, and tax dakhila. Expected result: Consistent in Available Demo Records.',
      actionRoute: '/verify'
    },
    {
      id: 'B',
      title: 'Scenario B: Area Mismatch',
      parcel: 'LG-P-002',
      desc: 'Sample deed indicates 0.80 Acre, but official City Survey (BS) khatian indicates 0.60 Acre. Discrepancy: 0.20 Acre. Expected result: Potential Area Inconsistency (Review Required).',
      actionRoute: '/verify'
    },
    {
      id: 'C',
      title: 'Scenario C: Potential Over-Transfer',
      parcel: 'LG-P-003',
      desc: 'Co-sharer holds 0.30 Acre in joint RS khatian 415, but conveyance draft attempts to convey 0.50 Acre. Deficit: 0.20 Acre. Expected result: Potential Over-Transfer.',
      actionRoute: '/verify'
    },
    {
      id: 'D',
      title: 'Scenario D: Missing Lineage Information',
      parcel: 'LG-P-004',
      desc: 'Gift deed references predecessor, but intermediate RS mutation reference is missing from bundle. Expected result: Missing Information.',
      actionRoute: '/verify'
    },
    {
      id: 'E',
      title: 'Scenario E: LandGuard Shield & Unrecognized Event',
      parcel: 'LG-P-005',
      desc: 'An unrecognized mutation petition is detected in the simulated event feed. Citizen can choose "I Don\'t Recognize This" to create incident LG-INC-0001 and escalate to the officer queue.',
      actionRoute: '/protection'
    },
    {
      id: 'F',
      title: 'Scenario F: Cryptographic Tampering Simulation',
      parcel: 'LG-P-006 & Ledger',
      desc: 'Historical event payload is modified without recomputing the SHA-256 hash. Real cryptographic verification detects the mismatch and highlights the broken block.',
      actionRoute: '/audit'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-[#DCE6DF]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#006A4E] uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Hackathon Demonstration Walkthrough</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#17231E]">
          {language === 'bn' ? 'ডেমো প্রদর্শন নির্দেশিকা' : 'How to Test the 6 Demo Scenarios'}
        </h1>
        <p className="text-xs sm:text-sm text-[#68766F] max-w-2xl leading-relaxed">
          {language === 'bn'
            ? 'বিচারক ও মূল্যায়নকারীদের জন্য সকল ডেমো সিনারিও সহজে পরীক্ষা করার সম্পূর্ণ নির্দেশাবলী।'
            : 'Step-by-step guide for judges and evaluators to test all deterministic verification rules, simulated alerts, and cryptographic audit proofs.'}
        </p>
      </div>

      {/* Scenario Cards */}
      <div className="space-y-4">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            className="bg-white border border-[#DCE6DF] rounded-2xl p-6 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs">
                  {sc.id}
                </span>
                <h3 className="font-bold text-sm text-[#17231E]">{sc.title}</h3>
              </div>
              <span className="font-mono text-xs font-bold text-[#006A4E] bg-[#F5F8F6] px-2.5 py-1 rounded-lg">
                Target: {sc.parcel}
              </span>
            </div>

            <p className="text-xs text-[#68766F] leading-relaxed">
              {sc.desc}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => navigateTo(sc.actionRoute)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#006A4E] hover:bg-[#064E3B] rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <span>Launch {sc.id} in Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
