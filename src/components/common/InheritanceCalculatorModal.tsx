import React, { useState } from 'react';
import { X, Calculator, Users, CheckCircle2, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InheritanceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InheritanceCalculatorModal: React.FC<InheritanceCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useApp();

  // Inputs
  const [totalLandAcres, setTotalLandAcres] = useState<number>(1.0); // 1 acre (100 decimal)
  const [sons, setSons] = useState<number>(2);
  const [daughters, setDaughters] = useState<number>(1);
  const [wives, setWives] = useState<number>(1);
  const [hasFather, setHasFather] = useState<boolean>(false);
  const [hasMother, setHasMother] = useState<boolean>(true);

  if (!isOpen) return null;

  // Calculation based on Bangladesh Muslim / General Faraiz Principles
  const totalDecimals = totalLandAcres * 100;

  // Wife's share: 1/8 (if children exist), or 1/4 (if no children)
  const wifeFraction = (sons > 0 || daughters > 0) ? 0.125 : 0.25;
  const wifeTotalDecimals = wives > 0 ? totalDecimals * wifeFraction : 0;
  const perWifeDecimals = wives > 0 ? wifeTotalDecimals / wives : 0;

  // Mother's share: 1/6 (if children exist)
  const motherDecimals = hasMother ? totalDecimals * (1 / 6) : 0;

  // Father's share: 1/6 (if children exist)
  const fatherDecimals = hasFather ? totalDecimals * (1 / 6) : 0;

  // Remainder for children: Son gets 2 shares, Daughter gets 1 share
  const allocatedFixed = wifeTotalDecimals + motherDecimals + fatherDecimals;
  const remainderDecimals = Math.max(0, totalDecimals - allocatedFixed);

  const totalChildrenUnits = sons * 2 + daughters * 1;
  const unitDecimals = totalChildrenUnits > 0 ? remainderDecimals / totalChildrenUnits : 0;

  const perSonDecimals = unitDecimals * 2;
  const perDaughterDecimals = unitDecimals * 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DCE6DF] text-left">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#006A4E] text-white p-5 rounded-t-3xl flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {language === 'bn' ? 'উত্তরাধিকার ক্যালকুলেটর (ফারায়েজ)' : 'Inheritance Land Calculator'}
              </h3>
              <p className="text-xs text-emerald-100">
                {language === 'bn' ? 'সরকারি ল্যান্ড পোর্টাল (land.gov.bd) ভিত্তিক হিসাব' : 'Official land.gov.bd inheritance division model'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-[#17231E]">
          {/* Total Land Input */}
          <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-[#DCE6DF] space-y-2">
            <label className="text-xs font-bold text-[#006A4E] uppercase tracking-wider block">
              {language === 'bn' ? 'মোট সম্পত্তির পরিমাণ (একর)' : 'Total Property Area (Acres)'}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={totalLandAcres}
                onChange={(e) => setTotalLandAcres(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="w-40 px-3.5 py-2 rounded-xl border border-[#DCE6DF] bg-white text-base font-bold text-[#17231E] focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
              />
              <span className="text-xs text-[#68766F] font-semibold">
                = {(totalLandAcres * 100).toFixed(1)} শতাংশ (Decimal)
              </span>
            </div>
          </div>

          {/* Heirs Controls Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white border border-[#DCE6DF] rounded-2xl">
              <div className="text-xs font-semibold text-[#68766F] mb-1">ছেলে সন্তান</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSons(Math.max(0, sons - 1))}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  -
                </button>
                <span className="font-bold text-sm w-6 text-center">{sons}</span>
                <button
                  onClick={() => setSons(sons + 1)}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#DCE6DF] rounded-2xl">
              <div className="text-xs font-semibold text-[#68766F] mb-1">মেয়ে সন্তান</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDaughters(Math.max(0, daughters - 1))}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  -
                </button>
                <span className="font-bold text-sm w-6 text-center">{daughters}</span>
                <button
                  onClick={() => setDaughters(daughters + 1)}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#DCE6DF] rounded-2xl">
              <div className="text-xs font-semibold text-[#68766F] mb-1">স্ত্রী</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWives(Math.max(0, wives - 1))}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  -
                </button>
                <span className="font-bold text-sm w-6 text-center">{wives}</span>
                <button
                  onClick={() => setWives(Math.min(4, wives + 1))}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#17231E]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasMother}
                onChange={(e) => setHasMother(e.target.checked)}
                className="w-4 h-4 rounded text-[#006A4E]"
              />
              <span>মাতা জীবিত</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasFather}
                onChange={(e) => setHasFather(e.target.checked)}
                className="w-4 h-4 rounded text-[#006A4E]"
              />
              <span>পিতা জীবিত</span>
            </label>
          </div>

          {/* Results Summary Table */}
          <div className="border border-[#DCE6DF] rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-[#F0F7F4] px-4 py-2.5 font-bold text-xs text-[#006A4E] border-b border-[#DCE6DF] flex items-center justify-between">
              <span>ওয়ারিশদের অংশ ও জমির হিস্যা</span>
              <span>মোট: {(totalLandAcres * 100).toFixed(1)} শতাংশ</span>
            </div>

            <div className="divide-y divide-[#DCE6DF] text-xs">
              {wives > 0 && (
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#17231E]">স্ত্রী ({wives} জন)</span>
                    <span className="text-[11px] text-[#68766F] block">মোট ১/৮ অংশ</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#006A4E]">{wifeTotalDecimals.toFixed(2)} শতাংশ</span>
                    <span className="text-[11px] text-[#68766F] block">প্রতিজন: {perWifeDecimals.toFixed(2)} শতাংশ</span>
                  </div>
                </div>
              )}

              {hasMother && (
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#17231E]">মাতা (১ জন)</span>
                    <span className="text-[11px] text-[#68766F] block">১/৬ অংশ</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#006A4E]">{motherDecimals.toFixed(2)} শতাংশ</span>
                  </div>
                </div>
              )}

              {hasFather && (
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#17231E]">পিতা (১ জন)</span>
                    <span className="text-[11px] text-[#68766F] block">১/৬ অংশ</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#006A4E]">{fatherDecimals.toFixed(2)} শতাংশ</span>
                  </div>
                </div>
              )}

              {sons > 0 && (
                <div className="p-3 flex items-center justify-between bg-emerald-50/40">
                  <div>
                    <span className="font-bold text-[#17231E]">ছেলে ({sons} জন)</span>
                    <span className="text-[11px] text-[#68766F] block">অবশিষ্টাংশের দ্বিগুণ ভাগ</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#006A4E]">{(perSonDecimals * sons).toFixed(2)} শতাংশ</span>
                    <span className="text-[11px] text-[#006A4E] block font-semibold">প্রতি ছেলে: {perSonDecimals.toFixed(2)} শতাংশ</span>
                  </div>
                </div>
              )}

              {daughters > 0 && (
                <div className="p-3 flex items-center justify-between bg-emerald-50/40">
                  <div>
                    <span className="font-bold text-[#17231E]">মেয়ে ({daughters} জন)</span>
                    <span className="text-[11px] text-[#68766F] block">অবশিষ্টাংশের এক ভাগ</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#006A4E]">{(perDaughterDecimals * daughters).toFixed(2)} শতাংশ</span>
                    <span className="text-[11px] text-[#006A4E] block font-semibold">প্রতি মেয়ে: {perDaughterDecimals.toFixed(2)} শতাংশ</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Legal Note */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              উক্ত হিসাবটি প্রাথমিক ওয়ারিশ বণ্টন সহায়িকা। সরকারিভাবে চূড়ান্ত নামজারি ও বাটোয়ারা দলিলের জন্য সংশ্লিষ্ট ইউনিয়ন ভূমি অফিস অথবা উপজেলা সহকারী কমিশনার (ভূমি) কার্যালয়ে ওয়ারিশান সনদ দাখিল করতে হবে।
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F5F8F6] p-4 rounded-b-3xl border-t border-[#DCE6DF] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#006A4E] hover:bg-[#064E3B] transition-colors cursor-pointer"
          >
            সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
};
