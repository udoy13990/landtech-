import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  AlertTriangle,
  CheckCircle2,
  BellRing,
  RotateCw,
  PlusCircle,
  FileQuestion,
  FileWarning,
  ExternalLink,
  Info,
  X,
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProtectionAlert } from '../types';

export const ProtectionPage: React.FC = () => {
  const {
    language,
    t,
    navigateTo,
    parcels,
    alerts,
    selectedParcelId,
    setSelectedParcelId,
    acknowledgeAlert,
    reportUnrecognizedEvent,
    simulateNewActivity,
    incidentReports
  } = useApp();

  const [activeParcelId, setActiveParcelId] = useState<string>(selectedParcelId);
  const [selectedAlertForIncident, setSelectedAlertForIncident] = useState<ProtectionAlert | null>(null);
  const [citizenDeclaration, setCitizenDeclaration] = useState<string>('');
  const [isSubmittingIncident, setIsSubmittingIncident] = useState<boolean>(false);
  const [createdIncidentId, setCreatedIncidentId] = useState<string | null>(null);

  // Confirmation state for "This was me"
  const [acknowledgeAlertTarget, setAcknowledgeAlertTarget] = useState<ProtectionAlert | null>(null);

  const activeParcel = parcels.find((p) => p.id === activeParcelId) || parcels[0];
  const parcelAlerts = alerts.filter((a) => a.parcelId === activeParcelId);
  const openAlertsCount = alerts.filter((a) => a.status === 'PENDING_USER_REVIEW').length;

  const handleConfirmAcknowledge = async () => {
    if (acknowledgeAlertTarget) {
      await acknowledgeAlert(acknowledgeAlertTarget.id);
      setAcknowledgeAlertTarget(null);
    }
  };

  const handleConfirmIncident = async () => {
    if (!selectedAlertForIncident) return;
    setIsSubmittingIncident(true);
    const incId = await reportUnrecognizedEvent(
      selectedAlertForIncident.id,
      citizenDeclaration || 'Registered owner declares this event completely unfamiliar and unauthorized.'
    );
    setIsSubmittingIncident(false);
    setCreatedIncidentId(incId);
  };

  const handleCloseIncidentModal = () => {
    setSelectedAlertForIncident(null);
    setCitizenDeclaration('');
    setCreatedIncidentId(null);
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
            Internal Case ID: <strong className="text-emerald-300 font-mono">LT-BD-2026-00182</strong>
          </span>
        </div>
        <div className="text-[11px] text-gray-400">
          Not a legal clearance. Human review required on critical outputs.
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#00A86B]/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#F2C94C]" />
            <span>LANDGUARD SHIELD · প্রোঅ্যাকটিভ নাগরিক সুরক্ষা</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'bn' ? 'ল্যান্ডগার্ড শিল্ড — রিয়েলটাইম নজরদারি ও সতর্কবার্তা' : 'LANDGUARD SHIELD — Proactive Land Protection'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {language === 'bn'
              ? 'জমির শেষ বৈধ অবস্থা বেসলাইন হিসেবে সংরক্ষিত। কোনো নতুন নামজারি বা দলিল সম্পাদন শুরু হলে মালিককে সাথে সাথে সতর্ক করা হয়।'
              : 'Baselines your verified land state. Whenever an unexpected ownership event occurs, receive instantaneous notifications to confirm or repudiate.'}
          </p>
        </div>

        {/* Simulate Unexpected Ownership-Related Event Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => simulateNewActivity()}
            className="px-5 py-3 text-xs font-black text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#06140F]" />
            <span>{language === 'bn' ? 'অপ্রত্যাশিত মালিকানা সংক্রান্ত ইভেন্ট অনুকরণ করুন' : 'Simulate unexpected ownership-related event'}</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Selected Parcel */}
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="text-[11px] font-bold text-gray-400">
            {language === 'bn' ? 'পর্যবেক্ষিত পার্সেল' : 'Monitored Parcel'}
          </div>
          <select
            value={activeParcelId}
            onChange={(e) => {
              setActiveParcelId(e.target.value);
              setSelectedParcelId(e.target.value);
            }}
            className="w-full bg-[#061A14] border border-[#00A86B]/40 rounded-xl px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-[#F2C94C]"
          >
            {parcels.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0A261D]">
                {p.id}: {p.demoLabel}
              </option>
            ))}
          </select>
          <div className="text-[11px] text-emerald-300">
            মালিক: {activeParcel.recordedOwnerBn}
          </div>
        </div>

        {/* Card 2: Shield Level */}
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-gray-400">
            {language === 'bn' ? 'শিল্ড সুরক্ষা স্থিতি' : 'Current Shield Level'}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div
              className={`w-3.5 h-3.5 rounded-full ${
                activeParcel.shieldLevel === 'CRITICAL'
                  ? 'bg-rose-500 animate-pulse'
                  : activeParcel.shieldLevel === 'REVIEW'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
            />
            <span
              className={`text-lg font-black ${
                activeParcel.shieldLevel === 'CRITICAL'
                  ? 'text-rose-400'
                  : activeParcel.shieldLevel === 'REVIEW'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {activeParcel.shieldLevel}
            </span>
          </div>
          <div className="text-[10px] text-gray-400">
            {activeParcel.shieldLevel === 'CRITICAL'
              ? 'উচ্চ অগ্রাধিকার: অননুমোদিত ঘটনা তদন্তাধীন'
              : activeParcel.shieldLevel === 'REVIEW'
              ? 'পর্যালোচনার জন্য নোটিশ পাঠানো হয়েছে'
              : 'কোনো অস্বাভাবিক কার্যকলাপ নেই (স্বাভাবিক)'}
          </div>
        </div>

        {/* Card 3: Pending Alerts */}
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-gray-400">
            {language === 'bn' ? 'অমীমাংসিত অ্যালার্ট' : 'Pending Alerts'}
          </div>
          <div className="text-2xl font-black text-[#F2C94C] font-mono-numbers">
            {parcelAlerts.filter((a) => a.status === 'PENDING_USER_REVIEW').length}
          </div>
          <div className="text-[10px] text-gray-400">
            নাগরিক অনুমোদনের অপেক্ষায়
          </div>
        </div>

        {/* Card 4: Open Incidents */}
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-5 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-gray-400">
            {language === 'bn' ? 'দায়েরকৃত ইনসিডেন্ট' : 'Reported Incidents'}
          </div>
          <div className="text-2xl font-black text-teal-400 font-mono-numbers">
            {incidentReports.length}
          </div>
          <div
            className="text-[10px] text-[#F2C94C] hover:underline cursor-pointer font-bold"
            onClick={() => navigateTo('/officer')}
          >
            অফিসার ক্রিটিক্যাল কিউ দেখুন →
          </div>
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#00A86B]/30">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <BellRing className="w-4 h-4 text-[#F2C94C]" />
            <span>
              {language === 'bn'
                ? `সক্রিয় অ্যালার্ট তালিকা (${parcelAlerts.length})`
                : `Active Protection Alerts for ${activeParcel.id}`}
            </span>
          </h2>
          <span className="text-xs text-emerald-300">
            রিয়েলটাইম নোটিফিকেশন স্ট্রিম
          </span>
        </div>

        {parcelAlerts.length === 0 ? (
          <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-10 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">
              {language === 'bn' ? 'কোনো সক্রিয় সতর্কবার্তা নেই' : 'No Active Alerts'}
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {language === 'bn'
                ? 'এই পার্সেলে কোনো অপ্রত্যাশিত ঘটনা শনাক্ত হয়নি। নতুন কার্যকলাপ অনুকরণ করতে উপরের বাটনে চাপুন।'
                : 'All records peaceful. Click "Simulate unexpected ownership-related event" to test.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {parcelAlerts.map((alert) => {
              const isPending = alert.status === 'PENDING_USER_REVIEW';
              const isEscalated = alert.status === 'ESCALATED_INCIDENT';
              const isAcknowledged = alert.status === 'ACKNOWLEDGED';

              return (
                <div
                  key={alert.id}
                  className={`bg-[#0A261D] border rounded-2xl p-5 sm:p-6 shadow-md transition-all space-y-4 ${
                    isPending
                      ? alert.severity === 'CRITICAL'
                        ? 'border-rose-500/70 ring-1 ring-rose-500/40'
                        : 'border-amber-500/70 ring-1 ring-amber-500/40'
                      : 'border-[#00A86B]/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          alert.severity === 'CRITICAL'
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-500/40'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#F2C94C]">
                            {alert.id}
                          </span>
                          <span className="text-gray-400">·</span>
                          <span className="text-xs font-bold text-emerald-300">
                            {alert.parcelId}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-0.5">
                          {language === 'bn' ? alert.titleBn : alert.titleEn}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          isAcknowledged
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : isEscalated
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {alert.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed">
                    {language === 'bn' ? alert.descriptionBn : alert.descriptionEn}
                  </p>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#061A14] rounded-xl text-[11px] border border-[#00A86B]/20">
                    <div>
                      <span className="text-gray-400 block">Reported Party:</span>
                      <span className="font-bold text-white">
                        {alert.details.reportedParty || 'অজ্ঞাত ব্যক্তি'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Action Category:</span>
                      <span className="font-bold text-[#F2C94C]">
                        {alert.details.actionType || 'Deed Registration'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Office Location:</span>
                      <span className="font-bold text-white">
                        {alert.details.officeLocation || 'Kaliganj Sub-Registry'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Event Stream Source:</span>
                      <span className="font-bold text-emerald-300">
                        {alert.sourceBn || alert.sourceEn}
                      </span>
                    </div>
                  </div>

                  {/* Citizen Action Triggers: "This was me" vs "I Don't Recognize This" */}
                  {isPending && (
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setAcknowledgeAlertTarget(alert)}
                        className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        <span>This was me (হ্যাঁ, এটি আমি করেছি)</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedAlertForIncident(alert);
                          setCitizenDeclaration('');
                        }}
                        className="px-4 py-2.5 text-xs font-bold text-white bg-[#F42A41] hover:bg-rose-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <AlertTriangle className="w-4 h-4 text-white" />
                        <span>I Don't Recognize This (আমি এটা চিনি না)</span>
                      </button>

                      <button
                        onClick={() => navigateTo('/verify')}
                        className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white rounded-xl"
                      >
                        প্রমাণ দেখুন →
                      </button>
                    </div>
                  )}

                  {isEscalated && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span>
                        অফিসার ক্রিটিক্যাল কিউতে ইনসিডেন্ট আইডি <strong>{alert.incidentId}</strong> অধীনে প্রেরণ করা হয়েছে।
                      </span>
                      <button
                        onClick={() => navigateTo('/officer')}
                        className="font-bold underline text-[#F2C94C] cursor-pointer"
                      >
                        কর্মকর্তা ড্যাশবোর্ডে কেস দেখুন →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* "I DON'T RECOGNIZE THIS" INCIDENT REPORTING MODAL */}
      {selectedAlertForIncident && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#0A261D] border border-[#00A86B]/40 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>অস্বীকৃতি ও ইনসিডেন্ট রিপোর্টিং</span>
              </div>
              <button onClick={handleCloseIncidentModal} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              আপনি কি নিশ্চিত যে এই কার্যক্রমটি আপনার অজ্ঞাতসারে উপস্থাপন করা হয়েছে? এটি একটি প্রাতিষ্ঠানিক ডিজিটাল অভিযোগ হিসেবে সংরক্ষিত হবে এবং সাথে সাথে কর্মকর্তার <strong>Critical Triage Queue</strong>-তে স্থানান্তরিত হবে।
            </p>

            <div className="p-3 bg-[#061A14] rounded-xl text-xs space-y-1 border border-[#00A86B]/30">
              <span className="text-[10px] text-gray-400">ঘটনার সারসংক্ষেপ:</span>
              <div className="font-bold text-white">{selectedAlertForIncident.titleBn || selectedAlertForIncident.titleEn}</div>
              <div className="text-emerald-300 font-mono text-[11px]">পার্সেল: {selectedAlertForIncident.parcelId} (দাগ ৩৩১৮)</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 block">নাগরিকের স্পষ্ট বিবৃতি (Declaration):</label>
              <textarea
                rows={3}
                value={citizenDeclaration}
                onChange={(e) => setCitizenDeclaration(e.target.value)}
                placeholder="আমি নিবন্ধিত মালিক হিসেবে ঘোষণা করছি যে, এই হস্তান্তরের কোনো দলিল আমি সম্পাদন করিনি..."
                className="w-full bg-[#061A14] border border-[#00A86B]/40 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F2C94C]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleCloseIncidentModal}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmIncident}
                disabled={isSubmittingIncident}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#F42A41] hover:bg-rose-700 shadow-lg cursor-pointer"
              >
                {isSubmittingIncident ? 'প্রেরণ করা হচ্ছে...' : 'ইনসিডেন্ট দাখিল ও এসকেলেট করুন'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACKNOWLEDGE "THIS WAS ME" CONFIRMATION MODAL */}
      {acknowledgeAlertTarget && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#0A261D] border border-[#00A86B]/40 text-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>স্বীকৃতি নিশ্চিতকরণ (This was me)</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              আপনি নিশ্চিত করছেন যে এই আবেদনটি আপনি নিজেই সম্পন্ন করেছেন। এটি আপনার বৈধ ক্রিপ্টোগ্রাফিক অডিট লগে স্বীকৃতি হিসেবে নথিভুক্ত হবে।
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setAcknowledgeAlertTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmAcknowledge}
                className="px-5 py-2 rounded-xl text-xs font-black text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 cursor-pointer"
              >
                স্বীকৃতি নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
