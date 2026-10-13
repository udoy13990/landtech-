import React, { useState } from 'react';
import {
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  FileText,
  ShieldAlert,
  ArrowRight,
  Eye,
  UserCheck,
  RotateCw,
  ExternalLink,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OfficerCase } from '../types';

export const OfficerPage: React.FC = () => {
  const {
    language,
    t,
    navigateTo,
    officerCases,
    updateOfficerCaseStatus,
    parcels,
    incidentReports
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'CRITICAL' | 'REVIEW' | 'NORMAL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEEDS_REVIEW' | 'UNDER_REVIEW' | 'RESOLVED'>('ALL');
  const [activeCase, setActiveCase] = useState<OfficerCase | null>(null);
  const [reviewNote, setReviewNote] = useState('');

  // Filtering
  const filteredCases = officerCases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issueTypeEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issueTypeBn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || c.riskLevel === riskFilter;
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;

    return matchesSearch && matchesRisk && matchesStatus;
  });

  const criticalCount = officerCases.filter((c) => c.riskLevel === 'CRITICAL').length;
  const reviewCount = officerCases.filter((c) => c.riskLevel === 'REVIEW').length;
  const normalCount = officerCases.filter((c) => c.riskLevel === 'NORMAL').length;
  const resolvedCount = officerCases.filter((c) => c.status === 'RESOLVED').length;

  const handleAction = async (status: OfficerCase['status']) => {
    if (activeCase) {
      await updateOfficerCaseStatus(activeCase.id, status, reviewNote);
      setActiveCase((prev) => (prev ? { ...prev, status, reviewerNotes: reviewNote || prev.reviewerNotes } : null));
      setReviewNote('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-left bg-[#061A14] text-white">
      {/* Top Banner with Synthetic Data Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#00A86B]/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2C94C]/15 text-[#F2C94C] font-bold border border-[#F2C94C]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Synthetic demo data · সিন্থেটিক ডেমো ডেটা</span>
          </span>
          <span className="text-gray-400">
            Role: <strong className="text-emerald-300">Assistant Commissioner (Land) / Reviewer Console</strong>
          </span>
        </div>
        <div className="text-[11px] text-gray-400">
          Risk-Prioritized Triage: Critical incidents escalated from citizen repudiation.
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#00A86B]/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-[#F2C94C]" />
            <span>Officer Exception Dashboard · দায়িত্বশীল কর্মকর্তা প্যানেল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'bn' ? 'অফিসার এক্সেপশন ড্যাশবোর্ড — ঝুঁকিভিত্তিক ট্রায়াজ কিউ' : 'Officer Exception Dashboard — Risk-Prioritized Triage'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            {language === 'bn'
              ? 'নাগরিকদের রিপোর্টকৃত "I Don\'t Recognize This" ইনসিডেন্ট, ক্ষেত্রফল অমিল ও সিস্টেম ফ্ল্যাগিংয়ের ঝুঁকিভিত্তিক অগ্রাধিকার তালিকা।'
              : 'Prioritized queue for triage of citizen-repudiated events, area mismatches, and over-transfer conflicts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#06140F] bg-[#F2C94C] px-3.5 py-1.5 rounded-xl shadow-sm">
            {language === 'bn' ? 'দায়িত্বশীল কর্মকর্তা মোড (লাইভ)' : 'Authorized Reviewer Role Active'}
          </span>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-4 shadow-lg space-y-1">
          <span className="text-[11px] text-gray-400 block">{language === 'bn' ? 'মোট কেস সংখ্যা' : 'Total Queue Cases'}</span>
          <span className="text-2xl font-black text-white font-mono-numbers">{officerCases.length}</span>
        </div>
        <div className="bg-[#0A261D] border border-rose-500/40 rounded-2xl p-4 shadow-lg space-y-1">
          <span className="text-[11px] text-rose-300 font-bold block">{language === 'bn' ? 'জরুরি ঝুঁকি (Critical)' : 'Critical Risk Flags'}</span>
          <span className="text-2xl font-black text-rose-400 font-mono-numbers">{criticalCount}</span>
        </div>
        <div className="bg-[#0A261D] border border-amber-500/40 rounded-2xl p-4 shadow-lg space-y-1">
          <span className="text-[11px] text-amber-300 font-bold block">{language === 'bn' ? 'পর্যালোচনাধীন (Review)' : 'Pending Review'}</span>
          <span className="text-2xl font-black text-amber-400 font-mono-numbers">{reviewCount}</span>
        </div>
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-4 shadow-lg space-y-1">
          <span className="text-[11px] text-emerald-400 font-bold block">{language === 'bn' ? 'মীমাংসিত (Resolved)' : 'Resolved Cases'}</span>
          <span className="text-2xl font-black text-emerald-300 font-mono-numbers">{resolvedCount}</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কেস আইডি, দাগ বা পার্সেল অনুসন্ধান..."
            className="w-full pl-9 pr-3 py-2 bg-[#061A14] border border-[#00A86B]/40 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F2C94C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-center text-xs">
          <span className="text-gray-400 text-[11px]">ঝুঁকি ফিল্টার:</span>
          {(['ALL', 'CRITICAL', 'REVIEW'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setRiskFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                riskFilter === lvl
                  ? lvl === 'CRITICAL'
                    ? 'bg-rose-700 text-white'
                    : 'bg-[#F2C94C] text-[#06140F]'
                  : 'bg-[#061A14] text-gray-300 border border-[#00A86B]/30 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Cases List and Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cases Table List */}
        <div className="lg:col-span-7 space-y-3">
          {filteredCases.length === 0 ? (
            <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-8 text-center text-xs text-gray-400">
              কোনো কেস খুঁজে পাওয়া যায়নি।
            </div>
          ) : (
            filteredCases.map((c) => {
              const isCritical = c.riskLevel === 'CRITICAL';
              const isSelected = activeCase?.id === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => setActiveCase(c)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 select-none ${
                    isSelected
                      ? 'bg-[#0E3529] border-[#F2C94C] ring-2 ring-[#F2C94C]/40 shadow-xl'
                      : isCritical
                      ? 'bg-[#0A261D] border-rose-500/50 hover:border-rose-400'
                      : 'bg-[#0A261D] border-[#00A86B]/30 hover:border-[#00A86B]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#F2C94C]">{c.id}</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-xs font-bold text-emerald-300">{c.parcelId}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {c.riskLevel}
                      </span>
                      <span className="text-[10px] text-gray-400">{c.detectionTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {language === 'bn' ? c.issueTypeBn : c.issueTypeEn}
                  </h3>

                  <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? c.descriptionBn : c.descriptionEn}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-[#00A86B]/15">
                    <span>স্ট্যাটাস: <strong className="text-white">{c.status}</strong></span>
                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                      বিস্তারিত ড্রয়ার খুলুন <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Case Detail & Action Drawer */}
        <div className="lg:col-span-5 bg-[#0A261D] border border-[#00A86B]/40 rounded-2xl p-5 sm:p-6 space-y-5 sticky top-24 shadow-xl">
          {activeCase ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">কেস ড্রয়ার (Case Drawer)</span>
                  <span className="font-mono text-sm font-black text-[#F2C94C]">{activeCase.id}</span>
                </div>
                <button onClick={() => setActiveCase(null)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px]">সমস্যা ও অভিযোগ:</span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {language === 'bn' ? activeCase.issueTypeBn : activeCase.issueTypeEn}
                </h4>
              </div>

              <div className="p-3 bg-[#061A14] rounded-xl border border-[#00A86B]/20 space-y-1">
                <span className="text-gray-400 block text-[10px]">বিবরণ ও এভিডেন্স:</span>
                <p className="text-gray-200 leading-relaxed text-[11px]">
                  {language === 'bn' ? activeCase.descriptionBn : activeCase.descriptionEn}
                </p>
              </div>

              {activeCase.incidentId && (
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-[11px]">
                  লিঙ্কযুক্ত নাগরিক ইনসিডেন্ট: <strong>{activeCase.incidentId}</strong>
                </div>
              )}

              {/* Reviewer Note Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 block">কর্মকর্তার পর্যালোচনা মন্তব্য (Notes):</label>
                <textarea
                  rows={2}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="নথি তলব করা হয়েছে / তদন্ত সম্পন্ন..."
                  className="w-full bg-[#061A14] border border-[#00A86B]/30 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Officer Actions: Mark as reviewed, Request documents, Escalate */}
              <div className="pt-2 border-t border-[#00A86B]/30 space-y-2">
                <div className="text-[10px] font-bold text-gray-400 uppercase">প্রশাসনিক পদক্ষেপ (Actions):</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleAction('RESOLVED')}
                    className="p-2 rounded-xl text-center font-bold text-[#06140F] bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer"
                  >
                    Mark as Reviewed
                  </button>
                  <button
                    onClick={() => handleAction('MORE_INFO_REQUESTED')}
                    className="p-2 rounded-xl text-center font-bold text-white bg-amber-600 hover:bg-amber-500 transition-colors cursor-pointer"
                  >
                    Request Documents
                  </button>
                  <button
                    onClick={() => handleAction('ESCALATED')}
                    className="p-2 rounded-xl text-center font-bold text-white bg-[#F42A41] hover:bg-rose-700 transition-colors cursor-pointer"
                  >
                    Escalate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-gray-400 space-y-2">
              <Eye className="w-8 h-8 mx-auto text-emerald-400/50" />
              <p>বাম পাশের তালিকা থেকে যেকোনো কেস নির্বাচন করে বিস্তারিত পর্যবেক্ষণ ও ব্যবস্থা গ্রহণ করুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
