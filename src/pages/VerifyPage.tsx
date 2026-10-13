import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Upload,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  Clock,
  ExternalLink,
  ShieldAlert,
  Search,
  Sparkles,
  QrCode,
  Layers,
  HelpCircle,
  FileSearch,
  ChevronDown,
  ChevronUp,
  Printer,
  XCircle,
  Check,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LandDocument, VerificationResult } from '../types';

export const VerifyPage: React.FC = () => {
  const {
    language,
    t,
    navigateTo,
    parcels,
    selectedParcelId,
    setSelectedParcelId,
    runParcelVerification,
    verificationHistory,
    showToast
  } = useApp();

  const [activeParcelId, setActiveParcelId] = useState<string>(selectedParcelId);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isScanningOcr, setIsScanningOcr] = useState<boolean>(false);
  const [expandedWhy, setExpandedWhy] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [showIntegrityReportModal, setShowIntegrityReportModal] = useState<boolean>(false);

  // Editable extracted table fields
  const [extractedFields, setExtractedFields] = useState({
    owner: 'মোছাঃ রহিমা বেগম (মক)',
    dag: '৩৩১৮',
    khatian: '১০৪২',
    area: '১.০০ একর',
    date: '২০২২-০৩-১৫'
  });

  const activeParcel = parcels.find((p) => p.id === activeParcelId) || parcels[0];

  // Update selected doc IDs when parcel changes
  React.useEffect(() => {
    setSelectedDocIds(activeParcel.documents.map((d) => d.id));
    setVerificationResult(null);

    // Update extracted fields based on active parcel
    setExtractedFields({
      owner: activeParcel.recordedOwnerBn,
      dag: activeParcel.dagNumber,
      khatian: activeParcel.khatianNumber,
      area: `${activeParcel.recordedAreaAcres.toFixed(2)} একর`,
      date: activeParcel.documents[0]?.registrationDate || '2022-03-15'
    });
  }, [activeParcelId, activeParcel]);

  const toggleDocSelection = (docId: string) => {
    if (selectedDocIds.includes(docId)) {
      if (selectedDocIds.length > 1) {
        setSelectedDocIds(selectedDocIds.filter((id) => id !== docId));
      } else {
        showToast('At least one document must remain selected.', 'warning');
      }
    } else {
      setSelectedDocIds([...selectedDocIds, docId]);
    }
  };

  const handleRunVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const res = runParcelVerification(activeParcelId);
      setVerificationResult(res);
      setIsVerifying(false);
      showToast(
        language === 'bn' ? 'যাচাই সম্পন্ন হয়েছে!' : 'Verification check executed successfully!',
        'success'
      );
    }, 700);
  };

  const handleSimulateExtraction = () => {
    setIsScanningOcr(true);
    setTimeout(() => {
      setIsScanningOcr(false);
      showToast(
        language === 'bn' ? 'AI এক্সট্রাকশন সম্পন্ন! সারণী হালনাগাদ করা হয়েছে।' : 'AI extraction complete! Fields extracted into table.',
        'success'
      );
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10 text-left bg-[#061A14] text-white">
      {/* Top Banner with Synthetic Data Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#00A86B]/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2C94C]/15 text-[#F2C94C] font-bold border border-[#F2C94C]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Synthetic demo data · সিন্থেটিক ডেমো ডেটা</span>
          </span>
          <span className="text-gray-400">
            Internal Case ID: <strong className="text-emerald-300 font-mono">LT-BD-2026-00182</strong>
          </span>
        </div>
        <div className="text-[11px] text-gray-400">
          Not a legal clearance. Human review required on critical outputs.
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-[#00A86B]/30">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#F2C94C]" />
          <span>{language === 'bn' ? 'ভূমি রেকর্ড সমন্বয় ও কনফ্লিক্ট ইঞ্জিন' : 'Land Record Verification & Conflict Engine'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'bn' ? 'ক্রস-রেকর্ড যাচাইকরণ ও AI "Why?" প্যানেল' : 'Cross-Record Verification & Explainable AI'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
          {language === 'bn'
            ? 'দলিল ও খতিয়ানের তথ্যে কোনো অসামঞ্জস্য রয়েছে কিনা তা গভীরভাবে যাচাই করুন। সরকারি কিউআর সনদ যাচাইকরণ এবং ডেটা কনসিস্টেন্সিকে পৃথক স্তরে পরীক্ষা করা হয়।'
            : 'Cross-check deeds against survey khatians for acreage mismatches, broken chains-of-title, and overlapping conveyances. Government QR validity is treated separately from data consistency.'}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Options & Document Selection */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Parcel Selector */}
          <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-300 block">
                {language === 'bn' ? '১. নমুনা পার্সেল নির্বাচন করুন' : '1. Select Demonstration Parcel'}
              </label>
              <span className="text-[10px] text-gray-400 font-mono">
                {activeParcel.landTransactionId || 'LT-BD-2026-00182'}
              </span>
            </div>

            <select
              value={activeParcelId}
              onChange={(e) => {
                setActiveParcelId(e.target.value);
                setSelectedParcelId(e.target.value);
              }}
              className="w-full bg-[#061A14] border border-[#00A86B]/40 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
            >
              {parcels.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0A261D] text-white">
                  {p.id}: {p.demoLabel} ({p.mouzaEn})
                </option>
              ))}
            </select>

            <div className="p-3 bg-[#061A14] rounded-xl text-xs space-y-1.5 border border-[#00A86B]/20">
              <div className="flex justify-between text-gray-300">
                <span>{language === 'bn' ? 'মালিক:' : 'Registered Owner:'}</span>
                <span className="font-bold text-white">
                  {language === 'bn' ? activeParcel.recordedOwnerBn : activeParcel.recordedOwnerEn}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>{language === 'bn' ? 'মৌজা ও দাগ:' : 'Mouza & Dag:'}</span>
                <span className="font-bold text-white">
                  {activeParcel.mouzaEn} · #{activeParcel.dagNumber}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>{language === 'bn' ? 'সংরক্ষিত পরিমাণ:' : 'Recorded Baseline Area:'}</span>
                <span className="font-bold text-[#F2C94C]">
                  {activeParcel.recordedAreaAcres} একর (Acre)
                </span>
              </div>
            </div>
          </div>

          {/* 2. AI Pre-Submission Extraction & Scanning Simulation */}
          <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-300">
                {language === 'bn' ? '২. অন্তর্ভুক্ত নথিসমূহ (২-৩টি দলিল/খতিয়ান)' : '2. Documents for Cross-Check'}
              </label>
              <button
                onClick={handleSimulateExtraction}
                disabled={isScanningOcr}
                className="text-[11px] font-bold text-[#F2C94C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'AI এক্সট্রাক্ট' : 'Simulate Extraction'}</span>
              </button>
            </div>

            {/* Scanning animation overlay if running */}
            {isScanningOcr && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-3 animate-pulse">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-bold text-emerald-300">
                  {language === 'bn'
                    ? 'AI স্ক্যানিং চলছে... ফিল্ডসমূহ এক্সট্রাক্ট হচ্ছে...'
                    : 'AI scanning records... extracting normalized fields...'}
                </span>
              </div>
            )}

            <div className="space-y-2.5">
              {activeParcel.documents.length === 0 ? (
                <div className="text-xs text-gray-400 p-4 text-center bg-[#061A14] rounded-xl border border-[#00A86B]/20">
                  {language === 'bn' ? 'এই পার্সেলে কোনো নমুনা নথি নেই।' : 'No sample documents configured for this parcel.'}
                </div>
              ) : (
                activeParcel.documents.map((doc) => {
                  const isChecked = selectedDocIds.includes(doc.id);
                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDocSelection(doc.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                        isChecked
                          ? 'bg-[#0E3529] border-[#00A86B] shadow-sm'
                          : 'bg-[#061A14] border-[#00A86B]/20 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-[#00A86B] focus:ring-0"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">
                            {language === 'bn' ? doc.titleBn : doc.titleEn}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#F2C94C]">
                            {doc.recordedAreaAcres} একর
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-300">
                          <span>{doc.subRegistryOffice}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                              doc.qrVerifiedDemo
                                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                                : 'bg-gray-800 text-gray-400'
                            }`}
                          >
                            {doc.qrVerifiedDemo ? 'QR Passed' : 'No QR'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Run Verification Button */}
          <button
            onClick={handleRunVerification}
            disabled={isVerifying || selectedDocIds.length === 0}
            className="w-full py-3.5 text-xs font-black text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer hover:scale-[1.02]"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-[#06140F] border-t-transparent rounded-full animate-spin" />
                <span>{language === 'bn' ? 'ক্রস-ভেরিফিকেশন যাচাই চলছে...' : 'Executing Deterministic Rules...'}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#06140F]" />
                <span>{language === 'bn' ? 'রেকর্ড যাচাই ও কনফ্লিক্ট ইঞ্জিন চালু করুন' : 'Run Verification Pipeline'}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Verification Results & Explainable "Why?" Panel */}
        <div className="lg:col-span-7 space-y-6">
          {verificationResult ? (
            <div className="space-y-6">
              {/* Overall Status Banner */}
              <div
                className={`p-6 rounded-2xl border ${
                  verificationResult.overallStatus === 'CONSISTENT'
                    ? 'bg-emerald-950/40 border-emerald-500/40'
                    : verificationResult.overallStatus === 'CRITICAL_MISMATCH'
                    ? 'bg-rose-950/40 border-rose-500/50'
                    : 'bg-amber-950/40 border-amber-500/50'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    {verificationResult.overallStatus === 'CONSISTENT' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                    )}
                    <div>
                      <div className="text-base font-black text-white">
                        {verificationResult.overallStatus === 'CONSISTENT'
                          ? 'Normal: সকল রেকর্ড সামঞ্জস্যপূর্ণ'
                          : verificationResult.overallStatus === 'CRITICAL_MISMATCH'
                          ? 'Critical Mismatch: গুরুতর অমিল শনাক্ত'
                          : 'Review Required: নথির পর্যালোচনা আবশ্যক'}
                      </div>
                      <div className="text-[11px] text-gray-300">
                        Verification Case ID: {verificationResult.id} · {verificationResult.findings.length} findings
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full ${
                      verificationResult.overallStatus === 'CONSISTENT'
                        ? 'bg-emerald-900 text-emerald-300 border border-emerald-500/40'
                        : verificationResult.overallStatus === 'CRITICAL_MISMATCH'
                        ? 'bg-rose-900 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-900 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {verificationResult.overallStatus}
                  </span>
                </div>

                <p className="text-xs text-gray-200 font-medium mt-3 leading-relaxed">
                  {language === 'bn' ? verificationResult.summaryBn : verificationResult.summaryEn}
                </p>

                {/* Explicit QR vs Data Consistency Demonstration Box */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#061A14] border border-[#00A86B]/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <QrCode className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">সরকারি কিউআর যাচাই (Government QR):</span>
                      <span className="text-[11px] text-emerald-300">
                        {activeParcel.documents.some((d) => d.qrVerifiedDemo)
                          ? 'বৈধ সনদ (QR Passed) · অফিসিয়ালি রেজিস্ট্রিকৃত'
                          : 'অননুমোদিত বা কিউআরবিহীন কপি'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-[#F2C94C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">ল্যান্ডগার্ড অখণ্ডতা যাচাই (Data Consistency):</span>
                      <span className="text-[11px] text-gray-300">
                        {verificationResult.overallStatus === 'CONSISTENT'
                          ? 'শতভাগ সামঞ্জস্যপূর্ণ ক্ষেত্রফল ও মালিকানা'
                          : 'ক্ষেত্রফল অমিল বা অতিরিক্ত হস্তান্তর ধরা পড়েছে'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI "Why?" Explanation Breakdown */}
                <div className="mt-5 space-y-3">
                  <div className="text-xs font-black text-emerald-300 uppercase tracking-wide flex items-center justify-between">
                    <span>AI "Why?" প্রমাণ ও বিশ্লেষণ (No Red Warning Without Evidence)</span>
                    <span className="text-[10px] text-gray-400 lowercase">expandable panels</span>
                  </div>

                  {verificationResult.findings.map((f, idx) => {
                    const isExpanded = expandedWhy[idx] !== false;
                    return (
                      <div
                        key={idx}
                        className="bg-[#061A14] p-4 rounded-xl border border-[#00A86B]/30 shadow-md space-y-2 text-xs"
                      >
                        <div
                          onClick={() => setExpandedWhy((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                          className="flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2">
                            {f.severity === 'PASS' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            <span className="font-bold text-white">
                              {language === 'bn' ? f.titleBn : f.titleEn}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                f.severity === 'PASS'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                  : f.severity === 'CRITICAL'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                                  : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {f.severity}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="space-y-2 pt-2 border-t border-[#00A86B]/20">
                            <p className="text-gray-300 leading-relaxed">
                              {language === 'bn' ? f.descriptionBn : f.descriptionEn}
                            </p>

                            {/* Evidence Callout Box */}
                            <div className="bg-[#0A261D] p-3 rounded-lg border border-[#00A86B]/30 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              {f.evidence.expectedValue && (
                                <div>
                                  <span className="text-gray-400 block">সরকারি রেকর্ডে প্রাপ্য (Reference):</span>
                                  <span className="font-bold text-white">{f.evidence.expectedValue}</span>
                                </div>
                              )}
                              {f.evidence.foundValue && (
                                <div>
                                  <span className="text-gray-400 block">দলিলে দাবিকৃত (Presented Deed):</span>
                                  <span className="font-bold text-amber-300">{f.evidence.foundValue}</span>
                                </div>
                              )}
                              {f.evidence.difference && (
                                <div className="sm:col-span-2 text-rose-400 font-bold bg-rose-950/30 p-1.5 rounded border border-rose-500/20">
                                  পার্থক্য/ঘাটতি (Discrepancy): {f.evidence.difference}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Report Generation Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowIntegrityReportModal(true)}
                    className="px-4 py-2 text-xs font-bold text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#06140F]" />
                    <span>ভূমি অখণ্ডতা রিপোর্ট দেখুন ও প্রিন্ট করুন</span>
                  </button>
                  <button
                    onClick={() => navigateTo('/ownership-history')}
                    className="px-4 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>মালিকানা গ্রাফ দেখুন</span>
                  </button>
                  <button
                    onClick={() => navigateTo('/protection')}
                    className="px-4 py-2 text-xs font-bold text-emerald-300 bg-[#00A86B]/20 hover:bg-[#00A86B]/30 border border-[#00A86B]/40 rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-300" />
                    <span>শিল্ড নজরদারি খুলুন</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Standby State */
            <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00A86B]/20 flex items-center justify-center mx-auto text-emerald-400 border border-[#00A86B]/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? 'যাচাই ফলাফল দেখতে প্রস্তুত' : 'Ready to Run Verification Pipeline'}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === 'bn'
                    ? 'বাম পাশের প্যানেল থেকে পার্সেল ও নথিসমূহ নির্বাচন করে "Run Verification" বোতামে চাপুন।'
                    : 'Select your target demo parcel and documents on the left, then click "Run Verification Pipeline" to inspect inconsistencies.'}
                </p>
              </div>
            </div>
          )}

          {/* AI Pre-Submission Extracted Fields Table (Editable) */}
          <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                  {language === 'bn' ? 'AI এক্সট্রাক্টকৃত তথ্য সারণী (সম্পাদনাযোগ্য)' : 'AI Extracted Fields Table (Editable)'}
                </h3>
              </div>
              <span className="text-[10px] text-[#F2C94C] font-semibold">
                OCR Schema
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="p-2 bg-[#061A14] rounded-lg border border-[#00A86B]/30">
                <span className="text-[10px] text-gray-400 block">মালিক (Owner):</span>
                <input
                  type="text"
                  value={extractedFields.owner}
                  onChange={(e) => setExtractedFields({ ...extractedFields, owner: e.target.value })}
                  className="w-full bg-transparent text-white font-bold text-xs focus:outline-none"
                />
              </div>
              <div className="p-2 bg-[#061A14] rounded-lg border border-[#00A86B]/30">
                <span className="text-[10px] text-gray-400 block">দাগ (Dag No):</span>
                <input
                  type="text"
                  value={extractedFields.dag}
                  onChange={(e) => setExtractedFields({ ...extractedFields, dag: e.target.value })}
                  className="w-full bg-transparent text-white font-bold text-xs focus:outline-none"
                />
              </div>
              <div className="p-2 bg-[#061A14] rounded-lg border border-[#00A86B]/30">
                <span className="text-[10px] text-gray-400 block">খতিয়ান (Khatian):</span>
                <input
                  type="text"
                  value={extractedFields.khatian}
                  onChange={(e) => setExtractedFields({ ...extractedFields, khatian: e.target.value })}
                  className="w-full bg-transparent text-white font-bold text-xs focus:outline-none"
                />
              </div>
              <div className="p-2 bg-[#061A14] rounded-lg border border-[#00A86B]/30">
                <span className="text-[10px] text-gray-400 block">পরিমাণ (Area):</span>
                <input
                  type="text"
                  value={extractedFields.area}
                  onChange={(e) => setExtractedFields({ ...extractedFields, area: e.target.value })}
                  className="w-full bg-transparent text-[#F2C94C] font-bold text-xs focus:outline-none"
                />
              </div>
              <div className="p-2 bg-[#061A14] rounded-lg border border-[#00A86B]/30">
                <span className="text-[10px] text-gray-400 block">তারিখ (Date):</span>
                <input
                  type="text"
                  value={extractedFields.date}
                  onChange={(e) => setExtractedFields({ ...extractedFields, date: e.target.value })}
                  className="w-full bg-transparent text-white font-bold text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAND INTEGRITY REPORT MODAL (Download / Print) */}
      {showIntegrityReportModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#0A261D] border border-[#00A86B]/50 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-[#F2C94C]" />
                <div>
                  <h3 className="text-base font-black text-white">
                    LANDGUARD অখণ্ডতা অডিট রিপোর্ট (Land Integrity Report)
                  </h3>
                  <span className="text-[11px] text-gray-400 font-mono">
                    Case ID: {activeParcel.landTransactionId || 'LT-BD-2026-00182'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowIntegrityReportModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Structured Report Sections */}
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#061A14] rounded-xl border border-[#00A86B]/30 space-y-1">
                <span className="text-[#F2C94C] font-bold block uppercase text-[10px]">১. ডকুমেন্ট ভেরিফিকেশন (Document Verification)</span>
                <p className="text-gray-200">উপস্থাপিত সাফ-কবলা দলিল ও ই-নামজারি খতিয়ান সরকারি কিউআর ভেরিফাইড (QR Passed)।</p>
              </div>

              <div className="p-3 bg-[#061A14] rounded-xl border border-[#00A86B]/30 space-y-1">
                <span className="text-[#F2C94C] font-bold block uppercase text-[10px]">২. মালিকানা সামঞ্জস্য (Owner Consistency)</span>
                <p className="text-gray-200">রেকর্ডভুক্ত মালিক: মোছাঃ রহিমা বেগম (মক)। ওয়ারিশান ও পূর্ববর্তী আরএস রেকর্ডের সাথে নাম সংগতিপূর্ণ।</p>
              </div>

              <div className="p-3 bg-[#061A14] rounded-xl border border-[#00A86B]/30 space-y-1">
                <span className="text-[#F2C94C] font-bold block uppercase text-[10px]">৩. ক্ষেত্রফল সামঞ্জস্য (Area Consistency)</span>
                <p className="text-gray-200">দাগ নং ৩৩১৮ তে মোট ১.০০ একর জমির সীমা অনুমোদিত খতিয়ান ১০৪২ এর সীমার মধ্যে অবস্থান করছে।</p>
              </div>

              <div className="p-3 bg-[#061A14] rounded-xl border border-[#00A86B]/30 space-y-1">
                <span className="text-[#F2C94C] font-bold block uppercase text-[10px]">৪. মালিকানা ধারাবাহিকতা (Ownership Continuity)</span>
                <p className="text-gray-200">১৯৮২ বন্দোবস্ত → ২০০৫ ওয়ারিশান সনদ → ২০২২ সাফ-কবলা হস্তান্তর চেইন অক্ষুণ্ণ রয়েছে।</p>
              </div>

              <div className="p-3 bg-[#061A14] rounded-xl border border-[#00A86B]/30 space-y-1">
                <span className="text-[#F2C94C] font-bold block uppercase text-[10px]">৫. অডিট স্ট্যাটাস (Audit & Cryptographic Status)</span>
                <p className="text-gray-200">SHA-256 হ্যাশ চেইনে ব্লক বৈধ। কোনো ব্যাকডেটেড ট্যাম্পারিং বা জালিয়াতি পরিলক্ষিত হয়নি।</p>
              </div>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200">
              <strong>আইনি অস্বীকৃতিপত্র (Disclaimer):</strong> This is not legal clearance. এটি একটি স্বয়ংক্রিয় প্রযুক্তিগত ও গাণিতিক অখণ্ডতা যাচাই প্রতিবেদন; আদালতের চূড়ান্ত আইনি ডিগ্রি বা সাব-রেজিস্ট্রারের বিচারিক আদেশের বিকল্প নয়।
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>রিপোর্ট ডাউনলোড / প্রিন্ট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
