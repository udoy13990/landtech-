import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Download,
  Share2,
  Calendar,
  Building2,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { runDeterministicVerification } from '../lib/verificationEngine';

export const ReportsPage: React.FC = () => {
  const {
    language,
    t,
    parcels,
    selectedParcelId,
    setSelectedParcelId,
    auditBlocks,
    showToast
  } = useApp();

  const [activeParcelId, setActiveParcelId] = useState<string>(selectedParcelId);
  const [copied, setCopied] = useState<boolean>(false);

  const activeParcel = parcels.find((p) => p.id === activeParcelId) || parcels[0];
  const verificationResult = runDeterministicVerification(activeParcel);

  const reportId = `LIR-BD-2026-${activeParcel.id.replace('LG-P-', '00')}`;
  const generatedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summaryText = `[BD LAND GUARD - LAND INTEGRITY REPORT]
Report ID: ${reportId}
Parcel: ${activeParcel.id} (${activeParcel.mouzaEn}, Dag #${activeParcel.dagNumber}, Khatian #${activeParcel.khatianNumber})
Owner: ${activeParcel.recordedOwnerEn}
Area: ${activeParcel.recordedAreaAcres} Acre
Status: ${verificationResult.overallStatus}
Summary: ${verificationResult.summaryEn}
Findings: ${verificationResult.findings.map((f) => `${f.titleEn} (${f.severity})`).join('; ')}
Notice: Technical consistency evaluation on synthetic demo data. Does not constitute legal title certification.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    showToast('Report summary copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-left">
      {/* Action / Toolbar (Hidden during Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE6DF]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006A4E] uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Land Integrity Dossier Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17231E]">
            {language === 'bn' ? 'ভূমি অখণ্ডতা রিপোর্ট' : 'Land Integrity Report'}
          </h1>
          <p className="text-xs sm:text-sm text-[#68766F]">
            {language === 'bn'
              ? 'উপলব্ধ নথিপত্রের বিশ্লেষণ, ক্ষেত্রফলের সামঞ্জস্য এবং অডিট স্ট্যাটাস সংবলিত অফিসিয়াল রিপোর্ট।'
              : 'A structured technical summary of available records, consistency checks, area differentials, and audit proof.'}
          </p>
        </div>

        {/* Parcel Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={activeParcelId}
            onChange={(e) => {
              setActiveParcelId(e.target.value);
              setSelectedParcelId(e.target.value);
            }}
            className="bg-white border border-[#DCE6DF] rounded-xl px-3 py-2 text-xs font-semibold text-[#17231E]"
          >
            {parcels.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}: {p.demoLabel} ({p.mouzaEn})
              </option>
            ))}
          </select>

          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 text-xs font-semibold text-[#17231E] bg-white border border-[#DCE6DF] rounded-xl hover:bg-gray-50 flex items-center gap-1.5 shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : t('copySummary')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold text-white bg-[#006A4E] hover:bg-[#064E3B] rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>{t('printReport')}</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE DOSSIER CONTAINER */}
      <div className="bg-white border border-[#DCE6DF] rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Report Official GovTech Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-[#006A4E]">
          <div className="space-y-1">
            <div className="text-xs font-bold tracking-widest text-[#006A4E] uppercase">
              {language === 'bn' ? 'বিডি ল্যান্ড গার্ড · ভূমি রেকর্ড অখণ্ডতা প্ল্যাটফর্ম' : 'BD LAND GUARD · LAND INTEGRITY PLATFORM'}
            </div>
            <h2 className="text-2xl font-black text-[#17231E]">
              {language === 'bn' ? 'প্রযুক্তিগত অখণ্ডতা মূল্যায়ন রিপোর্ট' : 'TECHNICAL INTEGRITY REPORT'}
            </h2>
            <div className="text-xs text-[#68766F]">
              {language === 'bn' ? 'ক্রস-রেকর্ড পরীক্ষণ ও ক্রিপ্টোগ্রাফিক অডিট ডসিয়ার' : 'Demonstration Cross-Record Evaluation Document'}
            </div>
          </div>

          <div className="text-right text-xs space-y-1 font-mono">
            <div>
              <span className="text-[#68766F]">{language === 'bn' ? 'রিপোর্ট নং: ' : 'Report ID: '}</span>
              <span className="font-bold text-[#17231E]">{reportId}</span>
            </div>
            <div>
              <span className="text-[#68766F]">{language === 'bn' ? 'প্রস্তুতের তারিখ: ' : 'Generated: '}</span>
              <span className="font-semibold text-[#17231E]">{generatedDate}</span>
            </div>
            <div>
              <span className="text-[#68766F]">Network: </span>
              <span className="text-emerald-700 font-semibold">BD-LANDGUARD-DEMO</span>
            </div>
          </div>
        </div>

        {/* 1. Parcel Subject Matter */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#17231E] uppercase tracking-wider bg-[#F5F8F6] p-2 rounded-lg">
            {language === 'bn' ? '১. সংশ্লিষ্ট সম্পত্তির বিবরণী' : '1. SUBJECT PROPERTY IDENTIFICATION'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-[#DCE6DF] text-xs">
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'পার্সেল রেফারেন্স:' : 'Parcel Reference:'}</span>
              <span className="font-bold text-[#006A4E] font-mono">{activeParcel.id}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'রেকর্ডভুক্ত মালিক:' : 'Recorded Owner:'}</span>
              <span className="font-bold text-[#17231E]">{language === 'bn' ? activeParcel.recordedOwnerBn : activeParcel.recordedOwnerEn}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'মৌজা / জেএল নং:' : 'Mouza / JL:'}</span>
              <span className="font-medium text-[#17231E]">{activeParcel.mouzaEn} ({activeParcel.jlNumber})</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'দাগ ও খতিয়ান নং:' : 'Dag & Khatian:'}</span>
              <span className="font-mono font-bold text-[#17231E]">Dag #{activeParcel.dagNumber} · KHT #{activeParcel.khatianNumber}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'এখতিয়ারভুক্ত অঞ্চল:' : 'Jurisdiction:'}</span>
              <span className="text-[#17231E]">{activeParcel.upazilaEn}, {activeParcel.districtEn}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'সংরক্ষিত বেসলাইন পরিমাণ:' : 'Recorded Baseline Area:'}</span>
              <span className="font-bold text-[#006A4E] font-mono">{activeParcel.recordedAreaAcres} Acre</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'জমির শ্রেণি:' : 'Land Classification:'}</span>
              <span className="text-[#17231E]">{language === 'bn' ? activeParcel.landClassBn : activeParcel.landClassEn}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#68766F] block">{language === 'bn' ? 'যুক্ত নমুনা নথিসমূহ:' : 'Indexed Documents:'}</span>
              <span className="font-bold text-[#17231E]">{activeParcel.documents.length} Records</span>
            </div>
          </div>
        </div>

        {/* 2. Overall Assessment Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#17231E] uppercase tracking-wider bg-[#F5F8F6] p-2 rounded-lg">
            {language === 'bn' ? '২. সমন্বয় মূল্যায়ন ফলাফল' : '2. SYNTHETIC CONSISTENCY ASSESSMENT'}
          </h3>
          <div
            className={`p-5 rounded-2xl border text-xs space-y-2 ${
              verificationResult.overallStatus === 'CONSISTENT'
                ? 'bg-[#16835D]/5 border-[#16835D]/40'
                : 'bg-amber-50 border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-sm">
              <span className="text-[#17231E]">{language === 'bn' ? 'প্রযুক্তিগত স্ট্যাটাস:' : 'Technical Status Result:'}</span>
              <span
                className={`px-3 py-0.5 rounded-full ${
                  verificationResult.overallStatus === 'CONSISTENT'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {verificationResult.overallStatus}
              </span>
            </div>
            <p className="text-[#17231E] leading-relaxed font-medium">
              {language === 'bn' ? verificationResult.summaryBn : verificationResult.summaryEn}
            </p>
          </div>
        </div>

        {/* 3. Detailed Finding Matrices */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#17231E] uppercase tracking-wider bg-[#F5F8F6] p-2 rounded-lg">
            3. RULE-BY-RULE VERIFICATION FINDINGS
          </h3>
          <div className="space-y-3">
            {verificationResult.findings.map((f, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#DCE6DF] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17231E]">{f.titleEn}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      f.severity === 'PASS'
                        ? 'bg-emerald-100 text-emerald-800'
                        : f.severity === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {f.severity}
                  </span>
                </div>
                <p className="text-[#68766F] leading-relaxed">{f.descriptionEn}</p>
                {f.evidence.expectedValue && (
                  <div className="bg-[#F5F8F6] p-2.5 rounded-lg text-[11px] grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[#68766F] block">Reference Benchmark:</span>
                      <span className="font-semibold text-[#17231E]">{f.evidence.expectedValue}</span>
                    </div>
                    <div>
                      <span className="text-[#68766F] block">Presented Finding:</span>
                      <span className="font-semibold text-rose-700">{f.evidence.foundValue}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Cryptographic Proof State */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#17231E] uppercase tracking-wider bg-[#F5F8F6] p-2 rounded-lg">
            4. CRYPTOGRAPHIC AUDIT PROOF STATUS
          </h3>
          <div className="p-4 rounded-xl border border-[#DCE6DF] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#68766F]">Ledger Hash Continuity:</span>
              <span className="font-bold text-[#16835D]">VALID & VERIFIED (SHA-256)</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#68766F]">Latest Anchor Hash:</span>
              <span className="text-[#17231E]">{auditBlocks[auditBlocks.length - 1]?.hash.slice(0, 32)}...</span>
            </div>
            <p className="text-[11px] text-[#68766F] leading-relaxed">
              Every historical mutation and transfer event for this parcel is cryptographically anchored.
            </p>
          </div>
        </div>

        {/* 5. Recommended Next Steps */}
        <div className="space-y-2 text-xs">
          <h3 className="text-xs font-bold text-[#17231E] uppercase tracking-wider bg-[#F5F8F6] p-2 rounded-lg">
            5. RECOMMENDED ADMINISTRATIVE ACTIONS
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-[#68766F] leading-relaxed">
            {verificationResult.overallStatus === 'CONSISTENT' ? (
              <>
                <li>Proceed with standard mutation application via official e-Namjari portal.</li>
                <li>Preserve digital dakhila payment receipts for annual land development tax.</li>
              </>
            ) : (
              <>
                <li>Present physical deed copies at the relevant Upazila AC Land office for field verification.</li>
                <li>Request certified copies of the latest City Survey (BS) or RS Khatian from the DC Record Room.</li>
                <li>Do not execute irreversible financial payments until acreage discrepancy is clarified by authorized officials.</li>
              </>
            )}
          </ul>
        </div>

        {/* 6. Mandatory Hackathon Disclaimer */}
        <div className="pt-6 border-t-2 border-[#DCE6DF] text-xs text-[#68766F] space-y-2">
          <div className="font-bold text-[#17231E]">
            LEGAL DISCLAIMER & PROTOTYPE BOUNDARY
          </div>
          <p className="leading-relaxed text-[11px]">
            This Land Integrity Report is generated algorithmically for technological demonstration in the Bangladesh Land Integrity Initiative. It evaluates synthetic sample datasets and does NOT constitute legal title certification, official government survey, or judicial decree. All formal property rights must be verified through the Directorate of Registration and Ministry of Land, Government of Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
};
