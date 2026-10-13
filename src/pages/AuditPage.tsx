import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldCheck,
  AlertOctagon,
  RotateCcw,
  Copy,
  Check,
  FileCode,
  ShieldAlert,
  ArrowRight,
  Info,
  Layers,
  ChevronDown,
  ChevronRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { verifyAuditChain, formatHash } from '../lib/crypto';
import { AuditBlock } from '../types';

export const AuditPage: React.FC = () => {
  const {
    language,
    t,
    auditBlocks,
    isTampered,
    tamperedIndex,
    runTamperingDemo,
    resetTamperingScenario,
    showToast
  } = useApp();

  const [chainVerificationState, setChainVerificationState] = useState<{
    isValid: boolean;
    brokenIndex: number | null;
    reason?: string;
  }>({ isValid: true, brokenIndex: null });

  const [inspectingBlock, setInspectingBlock] = useState<AuditBlock | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Automatically verify chain whenever blocks change
  useEffect(() => {
    const runCheck = async () => {
      setIsVerifying(true);
      const res = await verifyAuditChain(auditBlocks);
      setChainVerificationState(res);
      setIsVerifying(false);
    };
    runCheck();
  }, [auditBlocks]);

  const handleManualVerify = async () => {
    setIsVerifying(true);
    const res = await verifyAuditChain(auditBlocks);
    setChainVerificationState(res);
    setIsVerifying(false);
    if (res.isValid) {
      showToast(
        language === 'bn' ? 'অডিট চেইন ১০০% অক্ষত ও বৈধ প্রমাণিত!' : 'Audit chain 100% verified and mathematically intact!',
        'success'
      );
    } else {
      showToast(
        language === 'bn' ? 'সতর্কতা: রেকর্ড অখণ্ডতা ব্যর্থতা শনাক্ত হয়েছে!' : 'Record Integrity Failure flagged at broken block!',
        'error'
      );
    }
  };

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    showToast('Full hash copied to clipboard', 'info');
    setTimeout(() => setCopiedHash(null), 2000);
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
          SHA-256 Tamper-Evident Ledger · Web Crypto API
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#00A86B]/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Lock className="w-4 h-4 text-[#F2C94C]" />
            <span>Cryptographic Audit Shield · ক্রিপ্টোগ্রাফিক অডিট শিল্ড</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'bn' ? 'ক্রিপ্টোগ্রাফিক অডিট শিল্ড — ট্যাম্পার-এভিডেন্ট লেজার' : 'Cryptographic Audit Shield — Tamper-Evident Ledger'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            {language === 'bn'
              ? 'প্রতিটি ভূমি ইভেন্টের অখণ্ডতা যাচাইয়ের জন্য SHA-256 হ্যাশ-চেইন মডেল। পে-লোডে সামান্যতম পরিবর্তনও ক্রিপ্টোগ্রাফিক অমিল সৃষ্টি করে।'
              : 'Chained append-only event log. Each event stores prevHash and its own SHA-256 hash computed via the Web Crypto API.'}
          </p>
        </div>

        {/* Action Buttons: Tamper, Verify & Reset */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleManualVerify}
            disabled={isVerifying}
            className="px-4 py-2.5 text-xs font-black text-[#06140F] bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>Verify Chain (চেইন যাচাই)</span>
          </button>

          {!isTampered ? (
            <button
              onClick={() => runTamperingDemo()}
              className="px-4 py-2.5 text-xs font-black text-white bg-[#F42A41] hover:bg-rose-700 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Simulate Historical Tampering</span>
            </button>
          ) : (
            <button
              onClick={() => resetTamperingScenario()}
              className="px-4 py-2.5 text-xs font-black text-[#06140F] bg-[#F2C94C] hover:bg-yellow-300 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tamper Scenario</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Philosophical Note */}
      <div className="p-4 rounded-2xl bg-[#082219] border border-[#00A86B]/40 flex items-start gap-3 text-xs text-emerald-200">
        <Info className="w-4 h-4 text-[#F2C94C] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Note: </strong>
          Tamper-evident auditing, not a guarantee that fraud can never happen. Not a blockchain. এটি একটি গাণিতিক হ্যাশ-চেইন যা ডেটাবেজে কোনো ব্যাকডেটেড পরিবর্তন ঘটলে তা সাথে সাথে উন্মোচন করে।
        </div>
      </div>

      {/* Verification Status Banner */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          chainVerificationState.isValid
            ? 'bg-[#0A261D] border-emerald-500/40 shadow-lg'
            : 'bg-rose-950/40 border-rose-500/60 ring-2 ring-rose-500/40 shadow-2xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {chainVerificationState.isValid ? (
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-rose-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                <AlertOctagon className="w-6 h-6" />
              </div>
            )}
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {chainVerificationState.isValid
                  ? (language === 'bn' ? 'অডিট চেইন অক্ষত ও শতভাগ বৈধ' : 'Audit Chain Verified & Mathematically Intact')
                  : (language === 'bn' ? 'রেকর্ড অখণ্ডতা ব্যর্থতা — সিমুলেটেড ট্যাম্পারিং শনাক্ত হয়েছে!' : 'Record Integrity Failure — Tampering Detected')}
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                {chainVerificationState.isValid
                  ? `All ${auditBlocks.length} chronological blocks link continuously via Web Crypto SHA-256 hashes.`
                  : chainVerificationState.reason}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-black ${
                chainVerificationState.isValid
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                  : 'bg-rose-900 text-rose-200 border border-rose-500 font-mono'
              }`}
            >
              {chainVerificationState.isValid ? 'CHAIN INTEGRITY 100%' : 'INTEGRITY BROKEN (FAILURE)'}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-4 shadow-md">
          <span className="text-[11px] text-gray-400 block">Total Audit Blocks</span>
          <span className="text-2xl font-black text-white font-mono-numbers">{auditBlocks.length}</span>
        </div>
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-4 shadow-md">
          <span className="text-[11px] text-gray-400 block">Genesis Anchor</span>
          <span className="text-xs font-mono font-bold text-[#F2C94C] block mt-1">GENESIS-000 (Jan 2026)</span>
        </div>
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-4 shadow-md">
          <span className="text-[11px] text-gray-400 block">Hashing Standard</span>
          <span className="text-xs font-mono font-bold text-emerald-300 block mt-1">Web Crypto SHA-256</span>
        </div>
        <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-2xl p-4 shadow-md">
          <span className="text-[11px] text-gray-400 block">Chain Link Status</span>
          <span
            className={`text-xs font-black block mt-1 ${
              chainVerificationState.isValid ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {chainVerificationState.isValid ? 'Valid Links' : 'Link Broken at Block #2'}
          </span>
        </div>
      </div>

      {/* Audit Blocks Table */}
      <div className="bg-[#0A261D] border border-[#00A86B]/30 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#00A86B]/30">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{language === 'bn' ? 'ক্রিপ্টোগ্রাফিক চেইন ব্লক তালিকা' : 'Chronological Hash Blocks Explorer'}</span>
          </h3>
          <span className="text-xs text-gray-400 font-mono">
            Canonical JSON + prevHash chaining
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#061A14] border-b border-[#00A86B]/30 text-gray-400">
                <th className="py-3 px-3 font-semibold">Block #</th>
                <th className="py-3 px-3 font-semibold">Event ID & Type</th>
                <th className="py-3 px-3 font-semibold">Previous Hash</th>
                <th className="py-3 px-3 font-semibold">Current Block Hash</th>
                <th className="py-3 px-3 font-semibold text-center">Integrity</th>
                <th className="py-3 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#00A86B]/20">
              {auditBlocks.map((block) => {
                const isBroken = !chainVerificationState.isValid && chainVerificationState.brokenIndex === block.index;

                return (
                  <tr
                    key={block.index}
                    className={`transition-colors ${
                      isBroken
                        ? 'bg-rose-950/40 text-rose-200'
                        : 'hover:bg-[#061A14]'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#F2C94C]">
                      #{block.index}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{block.eventType}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{block.eventId}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-gray-400">
                      {formatHash(block.previousHash)}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-emerald-300">
                      <div className="flex items-center gap-1.5">
                        <span>{formatHash(block.hash)}</span>
                        <button
                          onClick={() => handleCopy(block.hash)}
                          className="hover:text-white"
                          title="Copy Full Hash"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-black ${
                          isBroken
                            ? 'bg-rose-900 text-rose-200 border border-rose-500'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {isBroken ? 'TAMPERED (FAIL)' : 'VALID'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setInspectingBlock(block)}
                        className="px-2.5 py-1 rounded bg-[#061A14] hover:bg-emerald-900/40 text-[#F2C94C] font-semibold text-[11px] border border-[#00A86B]/30 cursor-pointer"
                      >
                        Payload
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block Payload Modal */}
      {inspectingBlock && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#0A261D] border border-[#00A86B]/40 text-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#00A86B]/30">
              <span className="font-bold text-sm text-[#F2C94C]">
                ব্লক #{inspectingBlock.index} পে-লোড ডেটা (Payload Snapshot)
              </span>
              <button onClick={() => setInspectingBlock(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <pre className="p-3 bg-[#061A14] rounded-xl text-[11px] text-emerald-300 overflow-x-auto max-h-60 border border-[#00A86B]/30 font-mono">
              {JSON.stringify(inspectingBlock.payload, null, 2)}
            </pre>
            <div className="text-[10px] text-gray-400 font-mono break-all">
              Full Hash: {inspectingBlock.hash}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
