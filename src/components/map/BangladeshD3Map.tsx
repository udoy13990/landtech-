import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  Compass,
  Layers,
  MapPin,
  Eye,
  Activity,
  Zap,
  Globe2
} from 'lucide-react';
import {
  BANGLADESH_DIVISIONS_GEOJSON,
  DivisionFeatureProperties
} from '../../data/bangladeshGeoData';
import { useApp } from '../../context/AppContext';

// The exact high-resolution map image from the user's provided link (https://share.google/wcK3YwPDOPDnZcQmZ)
import bdMapExactImg from '../../assets/bangladesh_exact_map.png';

interface DivisionMeta {
  id: string;
  nameEn: string;
  nameBn: string;
  xPercent: number; // percentage in map coordinate frame
  yPercent: number;
  records: string;
  mutations: string;
  disputes: string;
  settledRate: string;
  color: string;
  descriptionBn: string;
}

const DIVISIONS_META: DivisionMeta[] = [
  {
    id: 'dhaka',
    nameEn: 'Dhaka Division',
    nameBn: 'ঢাকা বিভাগ (কেন্দ্রীয় সদর)',
    xPercent: 50.8,
    yPercent: 47.8,
    records: '৩,৮৫০,৪২০',
    mutations: '১,২০৪,৩১০',
    disputes: '১২,৪৫০',
    settledRate: '৯৮.৬%',
    color: '#F2C94C',
    descriptionBn: 'জাতীয় কেন্দ্রীয় ডেটাসেন্টার ও ল্যান্ড ক্লাউড হাব'
  },
  {
    id: 'chattogram',
    nameEn: 'Chattogram Division',
    nameBn: 'চট্টগ্রাম বিভাগ',
    xPercent: 76.5,
    yPercent: 67.2,
    records: '২,৯৪০,১২০',
    mutations: '৮৭৪,৫০০',
    disputes: '১৮,৩২০',
    settledRate: '৯৬.৮%',
    color: '#00D68F',
    descriptionBn: 'উপকূলীয় বন্দর ও পাহাড়ি মৌজা রেকর্ড সিস্টেম'
  },
  {
    id: 'rajshahi',
    nameEn: 'Rajshahi Division',
    nameBn: 'রাজশাহী বিভাগ',
    xPercent: 23.8,
    yPercent: 37.6,
    records: '১,৯৮০,৩৪০',
    mutations: '৬৩০,২০০',
    disputes: '৬,৫২০',
    settledRate: '৯৯.১%',
    color: '#00E5FF',
    descriptionBn: 'কৃষি জমি ও সিল্ক রুট ক্যাডাস্ট্রাল নেটওয়ার্ক'
  },
  {
    id: 'khulna',
    nameEn: 'Khulna Division',
    nameBn: 'খুলনা বিভাগ',
    xPercent: 34.2,
    yPercent: 65.4,
    records: '১,৬২০,১০০',
    mutations: '৫৪০,৩০০',
    disputes: '৭,১৮০',
    settledRate: '৯৮.২%',
    color: '#10B981',
    descriptionBn: 'সুন্দরবন অববাহিকা ও উপকূলীয় খাসজমি ডাটাবেজ'
  },
  {
    id: 'barishal',
    nameEn: 'Barishal Division',
    nameBn: 'বরিশাল বিভাগ',
    xPercent: 53.4,
    yPercent: 69.2,
    records: '১,০৮০,৪৫০',
    mutations: '৩২০,৪০০',
    disputes: '৪,২০০',
    settledRate: '৯৮.৮%',
    color: '#38BDF8',
    descriptionBn: 'নদীমাতৃক দক্ষিণাঞ্চলীয় চর ও দ্বীপ রেকর্ড সুরক্ষা'
  },
  {
    id: 'sylhet',
    nameEn: 'Sylhet Division',
    nameBn: 'সিলেট বিভাগ',
    xPercent: 77.2,
    yPercent: 31.4,
    records: '১,৪২০,৩০০',
    mutations: '৪১০,৮০০',
    disputes: '৩,৯৫০',
    settledRate: '৯৯.৪%',
    color: '#A78BFA',
    descriptionBn: 'হাওর অঞ্চল ও প্রবাসী মালিকানা সুরক্ষা সেল'
  },
  {
    id: 'rangpur',
    nameEn: 'Rangpur Division',
    nameBn: 'রংপুর বিভাগ',
    xPercent: 27.4,
    yPercent: 19.2,
    records: '১,৩৪০,৫০০',
    mutations: '৪৬০,৭০০',
    disputes: '৫,১০০',
    settledRate: '৯৮.৭%',
    color: '#F472B6',
    descriptionBn: 'উত্তরাঞ্চলীয় তিস্তা ও সীমান্ত ভূমি অটোমেশন'
  },
  {
    id: 'mymensingh',
    nameEn: 'Mymensingh Division',
    nameBn: 'ময়মনসিংহ বিভাগ',
    xPercent: 52.2,
    yPercent: 30.2,
    records: '১,১২০,৩০০',
    mutations: '৩৯০,১০০',
    disputes: '৪,৭৮০',
    settledRate: '৯৭.৯%',
    color: '#FBBF24',
    descriptionBn: 'গারো পাহাড় পাদদেশীয় ডিজিটাল খতিয়ান হাব'
  }
];

export const BangladeshD3Map: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [mapMode, setMapMode] = useState<'exact' | 'vector'>('exact'); // Default to the exact photo map from user's link
  const [selectedDivision, setSelectedDivision] = useState<DivisionMeta | null>(null);
  const [hoveredDivision, setHoveredDivision] = useState<DivisionMeta | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showStreams, setShowStreams] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(true);

  // D3 Vector State for secondary toggle mode
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection<GeoJSON.Geometry, DivisionFeatureProperties> | null>(null);
  const [d3Dimensions] = useState({ width: 560, height: 640 });

  useEffect(() => {
    // Load GeoJSON for vector toggle mode fallback
    setGeoData(BANGLADESH_DIVISIONS_GEOJSON as GeoJSON.FeatureCollection<GeoJSON.Geometry, DivisionFeatureProperties>);
  }, []);

  const dhakaMeta = DIVISIONS_META.find((d) => d.id === 'dhaka')!;

  const handleResetZoom = () => {
    setSelectedDivision(null);
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto flex flex-col items-center">
      {/* Subtle emerald ambient aura behind the map */}
      <div className="absolute inset-0 bg-radial from-[#00A86B]/25 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Map Interactive Stage - Pure seamless transparent container without bulky white frames */}
      <div className="relative w-full aspect-[480/540] flex items-center justify-center select-none">
        {/* Subtle holographic survey grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00A86B 1px, transparent 1px), radial-gradient(#00A86B 1px, #071913 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#00A86B]/40"
              animate={{
                y: [0, -60, 0],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8
              }}
              style={{
                left: `${15 + i * 14}%`,
                top: `${30 + (i % 3) * 20}%`
              }}
            />
          ))}
        </div>

        {/* ============================================================== */}
        {/* MODE A: THE EXACT BANGLADESH MAP FROM USER'S PROVIDED LINK     */}
        {/* ============================================================== */}
        {mapMode === 'exact' ? (
          <motion.div
            className="relative w-full h-full flex items-center justify-center p-3"
            animate={{
              scale: selectedDivision ? 1.45 : 1,
              x: selectedDivision ? `${(50 - selectedDivision.xPercent) * 1.3}%` : '0%',
              y: selectedDivision ? `${(50 - selectedDivision.yPercent) * 1.3}%` : '0%'
            }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          >
            {/* The Authentic Map Image */}
            <div className="relative w-full h-full max-w-[420px] max-h-[520px] flex items-center justify-center">
              {/* Outer Emerald Glow Layer under map */}
              <img
                src={bdMapExactImg}
                alt="Bangladesh Map Glow"
                className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,168,107,0.45)] brightness-125 opacity-70 pointer-events-none"
              />

              {/* Main Authentic Map Graphic */}
              <img
                src={bdMapExactImg}
                alt="Exact Bangladesh Administrative Map"
                className="relative z-10 w-full h-full object-contain filter contrast-110 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                onLoad={() => setImageLoaded(true)}
              />

              {/* SVG Overlays for Network Lines, Traveling Light & Pulse */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Linear gradient for data stream */}
                  <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F2C94C" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#00A86B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
                  </linearGradient>

                  <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Animated Connection Lines from Dhaka to all 7 other divisions */}
                {showStreams &&
                  DIVISIONS_META.filter((d) => d.id !== 'dhaka').map((target) => (
                    <g key={`stream-${target.id}`}>
                      {/* Base connecting line */}
                      <line
                        x1={dhakaMeta.xPercent}
                        y1={dhakaMeta.yPercent}
                        x2={target.xPercent}
                        y2={target.yPercent}
                        stroke="#00A86B"
                        strokeWidth="0.35"
                        strokeDasharray="1.5 1.5"
                        strokeOpacity="0.45"
                      />

                      {/* Traveling Light / Pulse along line */}
                      <circle r="0.8" fill="#F2C94C" filter="url(#lineGlow)">
                        <animateMotion
                          path={`M ${dhakaMeta.xPercent} ${dhakaMeta.yPercent} L ${target.xPercent} ${target.yPercent}`}
                          dur={`${2.2 + Math.random() * 0.8}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  ))}
              </svg>

              {/* Division Capital Hotspots & Interactive Badges */}
              {DIVISIONS_META.map((div) => {
                const isSelected = selectedDivision?.id === div.id;
                const isHovered = hoveredDivision?.id === div.id;
                const isDhaka = div.id === 'dhaka';

                return (
                  <div
                    key={div.id}
                    className="absolute z-30 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${div.xPercent}%`,
                      top: `${div.yPercent}%`
                    }}
                    onMouseEnter={() => setHoveredDivision(div)}
                    onMouseLeave={() => setHoveredDivision(null)}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedDivision(null);
                      } else {
                        setSelectedDivision(div);
                      }
                    }}
                  >
                    {/* Glowing Ripple Pulse */}
                    <div className="relative flex items-center justify-center">
                      <span
                        className="absolute inline-flex rounded-full animate-ping opacity-75"
                        style={{
                          width: isDhaka ? '28px' : '20px',
                          height: isDhaka ? '28px' : '20px',
                          backgroundColor: isDhaka ? '#F2C94C' : '#00A86B',
                          animationDuration: isDhaka ? '1.8s' : '2.4s'
                        }}
                      />

                      {/* Main Capital Center Dot */}
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full border-2 transition-transform duration-200 ${
                          isSelected
                            ? 'scale-135 border-white shadow-[0_0_15px_#F2C94C]'
                            : isHovered
                            ? 'scale-120 border-white shadow-[0_0_10px_#00A86B]'
                            : 'border-white/80'
                        }`}
                        style={{
                          width: isDhaka ? '14px' : '10px',
                          height: isDhaka ? '14px' : '10px',
                          backgroundColor: div.color
                        }}
                      >
                        {isDhaka && <span className="w-1.5 h-1.5 rounded-full bg-[#06140F]" />}
                      </span>

                      {/* Division Name Tag */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-4 px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap transition-all duration-200 pointer-events-none shadow-md ${
                          isSelected || isHovered
                            ? 'bg-[#061A14] text-[#F2C94C] border border-[#F2C94C]/60 scale-105 z-40'
                            : 'bg-[#061A14]/80 text-gray-200 border border-[#00A86B]/30'
                        }`}
                      >
                        {language === 'bn' ? div.nameBn.split(' ')[0] : div.nameEn.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* MODE B: D3.JS VECTOR GEOJSON MAP                               */
          /* ============================================================== */
          <div className="w-full h-full flex items-center justify-center p-2">
            <svg
              viewBox={`0 0 ${d3Dimensions.width} ${d3Dimensions.height}`}
              className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            >
              <defs>
                <pattern id="vecLandGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 0 0 L 16 0 L 16 16 L 0 16 Z" fill="none" stroke="#00A86B" strokeWidth="0.4" strokeOpacity="0.25" />
                  <circle cx="8" cy="8" r="0.75" fill="#F2C94C" fillOpacity="0.4" />
                </pattern>
              </defs>

              {geoData &&
                (() => {
                  const projection = d3
                    .geoMercator()
                    .fitSize([d3Dimensions.width - 40, d3Dimensions.height - 40], geoData);
                  const pathGen = d3.geoPath().projection(projection);

                  return (
                    <g transform="translate(20, 20)">
                      {geoData.features.map((feature, idx) => {
                        const pathD = pathGen(feature) || '';
                        const divId = feature.properties.id;
                        const meta = DIVISIONS_META.find((d) => d.id === divId);
                        const isHovered = hoveredDivision?.id === divId;

                        return (
                          <path
                            key={divId || idx}
                            d={pathD}
                            fill={isHovered ? '#00A86B' : '#0B261D'}
                            fillOpacity={isHovered ? 0.6 : 0.8}
                            stroke={isHovered ? '#F2C94C' : '#00A86B'}
                            strokeWidth={isHovered ? 2 : 1}
                            className="cursor-pointer transition-colors duration-200"
                            onMouseEnter={() => meta && setHoveredDivision(meta)}
                            onMouseLeave={() => setHoveredDivision(null)}
                            onClick={() => meta && setSelectedDivision(meta)}
                          />
                        );
                      })}
                    </g>
                  );
                })()}
            </svg>
          </div>
        )}

        {/* Hover / Selected Division Info Card Overlaid on Map Bottom */}
        <AnimatePresence>
          {(hoveredDivision || selectedDivision) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-[#061A14]/95 border border-[#00A86B]/50 backdrop-blur-md shadow-2xl z-40 text-left"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: (hoveredDivision || selectedDivision)?.color }}
                    />
                    <h4 className="text-sm font-black text-white">
                      {(hoveredDivision || selectedDivision)?.nameBn}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-mono">
                      ({(hoveredDivision || selectedDivision)?.nameEn})
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-300 font-medium mt-0.5">
                    {(hoveredDivision || selectedDivision)?.descriptionBn}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleResetZoom}
                    className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                    title={language === 'bn' ? 'রিসেট' : 'Reset'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigateTo('/my-land')}
                    className="px-2.5 py-1 rounded-lg bg-[#00A86B] hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'রেকর্ড দেখুন' : 'View Records'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3 Live Stats Chips as requested */}
              <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-white/10 text-center">
                <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
                  <div className="text-[9px] text-gray-400 font-medium">মোট খতিয়ান রেকর্ড</div>
                  <div className="text-xs font-black text-white font-mono-numbers">
                    {(hoveredDivision || selectedDivision)?.records}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
                  <div className="text-[9px] text-gray-400 font-medium">নামজারি আবেদন</div>
                  <div className="text-xs font-black text-emerald-300 font-mono-numbers">
                    {(hoveredDivision || selectedDivision)?.mutations}
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
                  <div className="text-[9px] text-gray-400 font-medium">বিরোধ নিষ্পত্তি হার</div>
                  <div className="text-xs font-black text-[#F2C94C] font-mono-numbers">
                    {(hoveredDivision || selectedDivision)?.settledRate}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Footer helper indicators */}
      <div className="w-full flex items-center justify-between text-[11px] text-gray-400 mt-2 px-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-[#F2C94C]" /> ঢাকা সদর
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00A86B]" /> ৮টি বিভাগীয় নেটওয়ার্ক
          </span>
        </div>
        <div className="text-gray-400 text-[10px]">
          বিভাগে ক্লিক করে জুম ও তথ্য দেখুন
        </div>
      </div>
    </div>
  );
};
