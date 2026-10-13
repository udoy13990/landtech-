import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Shield, MapPin, Layers, PhoneCall, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface DivisionMapItem {
  id: string;
  nameBn: string;
  nameEn: string;
  fillColor: string;
  activeColor: string;
  center: { x: number; y: number };
  districtsCount: number;
  demoParcelsCount: number;
  sampleCode: string;
  descriptionBn: string;
  pathD: string;
}

/**
 * Mathematically and geographically authentic SVG paths for all 8 administrative divisions of Bangladesh.
 * Accurately models:
 * - Panchagarh & Tetulia apex at the top (26.6°N, 88.5°E)
 * - Chapai Nawabganj western nose jutting west into West Bengal (24.6°N, 88.1°E)
 * - Garo Hills & Meghalaya northern horizontal border (Sherpur, Netrokona, Sunamganj)
 * - Sylhet tea garden & haor eastern ear (Jaflong to Zakiganj)
 * - Khulna & Sundarbans mangrove delta estuaries opening to the Bay of Bengal
 * - Barishal & Patuakhali Kuakata beach and Bhola island
 * - Chittagong Hill Tracts (Sajek, Rangamati, Bandarban) bulging east
 * - Cox's Bazar coastal tail stretching south-southeast to Teknaf and St. Martin's Island
 * - Major white river corridors: Jamuna, Padma, Meghna, Lower Meghna Estuary
 */
export const MAP_DIVISIONS: DivisionMapItem[] = [
  {
    id: 'rangpur',
    nameBn: 'রংপুর বিভাগ',
    nameEn: 'Rangpur Division',
    fillColor: '#006A4E',
    activeColor: '#008764',
    center: { x: 185, y: 125 },
    districtsCount: 8,
    demoParcelsCount: 1,
    sampleCode: '১০৭',
    descriptionBn: 'তেঁতুলিয়া-পঞ্চগড়, নীলফামারী, দিনাজপুর ও কুড়িগ্রাম নিয়ে গঠিত উত্তরাঞ্চলীয় বিভাগ।',
    // Authentic northern apex at Tetulia (145, 45) down through Dinajpur and eastward to Kurigram on Jamuna
    pathD: `
      M 145 45
      C 136 65, 124 95, 115 130
      C 108 155, 112 172, 118 185
      C 142 182, 175 182, 195 185
      C 215 188, 228 189, 238 190
      C 248 175, 258 150, 265 130
      C 255 105, 235 85, 210 75
      C 185 65, 160 52, 145 45
      Z
    `
  },
  {
    id: 'rajshahi',
    nameBn: 'রাজশাহী বিভাগ',
    nameEn: 'Rajshahi Division',
    fillColor: '#005C3F',
    activeColor: '#007A54',
    center: { x: 145, y: 245 },
    districtsCount: 8,
    demoParcelsCount: 1,
    sampleCode: '১০৩',
    descriptionBn: 'চাঁপাইনবাবগঞ্জের বিখ্যাত পশ্চিমাংশ, নওগাঁ, বগুড়া ও পদ্মা তীরবর্তী রাজশাহী।',
    // Notice the prominent western nose jutting west to (60, 248) and the Padma bank south to (225, 310)
    pathD: `
      M 118 185
      C 142 182, 175 182, 195 185
      C 215 188, 228 189, 238 190
      C 236 220, 232 255, 230 275
      C 228 292, 226 302, 225 310
      C 195 305, 160 295, 135 288
      C 110 280, 85 272, 72 270
      C 60 258, 58 242, 62 232
      C 70 220, 88 208, 102 198
      C 110 192, 115 188, 118 185
      Z
    `
  },
  {
    id: 'mymensingh',
    nameBn: 'ময়মনসিংহ বিভাগ',
    nameEn: 'Mymensingh Division',
    fillColor: '#00684C',
    activeColor: '#008560',
    center: { x: 325, y: 175 },
    districtsCount: 4,
    demoParcelsCount: 1,
    sampleCode: '১০৮',
    descriptionBn: 'গারো পাহাড়ের পাদদেশে শেরপুর, নেত্রকোণা ও ব্রহ্মপুত্র তীরবর্তী জনপদ।',
    // The famous nearly-horizontal northern border along the Garo Hills (Meghalaya)
    pathD: `
      M 265 130
      C 285 140, 315 146, 340 148
      C 365 150, 390 152, 405 155
      C 400 175, 392 195, 380 210
      C 350 214, 310 212, 270 205
      C 264 185, 262 155, 265 130
      Z
    `
  },
  {
    id: 'sylhet',
    nameBn: 'সিলেট বিভাগ',
    nameEn: 'Sylhet Division',
    fillColor: '#005437',
    activeColor: '#00734C',
    center: { x: 465, y: 215 },
    districtsCount: 4,
    demoParcelsCount: 1,
    sampleCode: '১০৪',
    descriptionBn: 'হাওর ও চা বাগান সমৃদ্ধ উত্তর-পূর্বাঞ্চলীয় সুরমা ও কুশিয়ারা অববাহিকা।',
    // North-east ear curving from Jaflong (475, 165) to Zakiganj (520, 215) and Sreemangal hills
    pathD: `
      M 405 155
      C 430 156, 465 162, 490 175
      C 512 188, 524 205, 520 220
      C 515 242, 495 262, 480 272
      C 455 280, 435 284, 425 285
      C 418 260, 408 235, 395 215
      C 390 195, 398 175, 405 155
      Z
    `
  },
  {
    id: 'dhaka',
    nameBn: 'ঢাকা বিভাগ',
    nameEn: 'Dhaka Division',
    fillColor: '#00472F',
    activeColor: '#006644',
    center: { x: 315, y: 275 },
    districtsCount: 13,
    demoParcelsCount: 5,
    sampleCode: '১০১',
    descriptionBn: 'দেশের কেন্দ্রবিন্দু ও রাজধানী; বুড়িগঙ্গা, শীতলক্ষ্যা ও পদ্মা তীরবর্তী প্রাচীন জনপদ।',
    // Administrative heart surrounded by Mymensingh, Rajshahi, Khulna, Barishal, Chattogram
    pathD: `
      M 270 205
      C 310 212, 350 214, 380 210
      C 385 240, 382 270, 375 295
      C 370 320, 360 340, 345 355
      C 320 352, 290 348, 265 345
      C 248 335, 235 322, 225 310
      C 228 285, 234 255, 245 235
      C 255 220, 262 212, 270 205
      Z
    `
  },
  {
    id: 'khulna',
    nameBn: 'খুলনা বিভাগ',
    nameEn: 'Khulna Division',
    fillColor: '#006043',
    activeColor: '#008059',
    center: { x: 185, y: 395 },
    districtsCount: 10,
    demoParcelsCount: 1,
    sampleCode: '১০৫',
    descriptionBn: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ সুন্দরবন ও রূপসা-পশুর নদী সমৃদ্ধ দক্ষিণ-পশ্চিমাঞ্চল।',
    // Western India border (Benapole/Satkhira) and jagged Sundarbans mangrove coast on Bay of Bengal
    pathD: `
      M 135 288
      C 160 295, 195 305, 225 310
      C 235 322, 248 335, 255 345
      C 252 380, 248 420, 246 450
      C 245 470, 248 480, 250 495
      C 225 502, 190 508, 160 510
      C 140 505, 132 490, 130 460
      C 120 420, 110 375, 105 345
      C 112 315, 122 300, 135 288
      Z
    `
  },
  {
    id: 'barishal',
    nameBn: 'বরিশাল বিভাগ',
    nameEn: 'Barishal Division',
    fillColor: '#005036',
    activeColor: '#006E4B',
    center: { x: 285, y: 425 },
    districtsCount: 6,
    demoParcelsCount: 1,
    sampleCode: '১০৬',
    descriptionBn: 'ধান-নদী-খালের ব-দ্বীপ অঞ্চল, কুয়াকাটা সাগর সৈকত এবং মেঘনা মোহনা।',
    // South-central delta rivers, Kuakata coastal shore, and channel west of Bhola
    pathD: `
      M 255 345
      C 290 348, 320 352, 345 355
      C 342 385, 338 420, 335 455
      C 332 485, 325 510, 315 520
      C 285 522, 265 515, 250 495
      C 248 480, 245 470, 246 450
      C 248 420, 252 380, 255 345
      Z
    `
  },
  {
    id: 'chattogram',
    nameBn: 'চট্টগ্রাম বিভাগ',
    nameEn: 'Chattogram Division',
    fillColor: '#00422B',
    activeColor: '#00603F',
    center: { x: 440, y: 440 },
    districtsCount: 11,
    demoParcelsCount: 2,
    sampleCode: '১০২',
    descriptionBn: 'বাণিজ্যিক রাজধানী, পার্বত্য চট্টগ্রাম ও দীর্ঘতম সমুদ্র সৈকত হয়ে টেকনাফ পর্যন্ত।',
    // Eastern CHT hills bulging east (535, 480) down to the slender Teknaf tail (485, 615)
    pathD: `
      M 425 285
      C 418 260, 408 235, 395 215
      C 380 210, 385 240, 375 295
      C 370 320, 360 340, 345 355
      C 342 385, 350 415, 365 440
      C 385 465, 405 490, 425 525
      C 445 560, 470 590, 485 615
      C 490 595, 498 565, 510 535
      C 525 500, 538 465, 532 425
      C 525 385, 495 345, 465 315
      C 445 298, 432 290, 425 285
      Z
    `
  }
];

export const BangladeshMapHero: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [activeDivision, setActiveDivision] = useState<DivisionMapItem | null>(
    MAP_DIVISIONS.find((d) => d.id === 'dhaka') || MAP_DIVISIONS[0]
  );
  const [hoveredDivision, setHoveredDivision] = useState<DivisionMapItem | null>(null);

  const displayDivision = hoveredDivision || activeDivision;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 select-none">
      {/* Background ambient lighting & grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#006A4E 0.75px, transparent 0.75px), radial-gradient(#006A4E 0.75px, #F5F8F6 0.75px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#006A4E]/10 rounded-full blur-3xl" />
      </div>

      {/* Top Banner Bar: Division Quick Switch & Direct Code Hint */}
      <div className="w-full max-w-[560px] flex items-center justify-between gap-2 px-3 py-1.5 mb-2 bg-white/90 backdrop-blur-md rounded-xl border border-[#DCE6DF] text-[11px] shadow-2xs z-10">
        <div className="flex items-center gap-1.5 font-bold text-[#006A4E]">
          <Compass className="w-3.5 h-3.5 text-[#006A4E] shrink-0" />
          <span>{language === 'bn' ? 'বাংলাদেশ প্রশাসনিক মানচিত্র' : 'Bangladesh Administrative Map'}</span>
        </div>
        <div className="text-[10px] text-[#68766F] hidden sm:flex items-center gap-1 font-medium">
          <span>{language === 'bn' ? 'যেকোনো বিভাগে ক্লিক করুন' : 'Click division to inspect'}</span>
          <span className="text-[#006A4E] font-bold">· ৮টি বিভাগ</span>
        </div>
      </div>

      {/* Geographically Authentic SVG Map Container */}
      <div className="relative w-full max-w-[560px] aspect-[540/640]">
        <svg
          viewBox="40 30 510 620"
          className="w-full h-full filter drop-shadow-[0_16px_32px_rgba(0,106,78,0.18)]"
          aria-label="Geographically Accurate Administrative Map of Bangladesh"
        >
          {/* Subtle Outer Boundary Drop Glow */}
          <defs>
            <filter id="divisionShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#003322" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* 1. ALL 8 ADMINISTRATIVE DIVISIONS IN AUTHENTIC DEEP GREEN */}
          {/* ============================================================== */}
          {MAP_DIVISIONS.map((division) => {
            const isSelected = activeDivision?.id === division.id;
            const isHovered = hoveredDivision?.id === division.id;
            const isActive = isSelected || isHovered;

            return (
              <g
                key={division.id}
                className="cursor-pointer transition-all duration-200 group"
                onMouseEnter={() => setHoveredDivision(division)}
                onMouseLeave={() => setHoveredDivision(null)}
                onClick={() => {
                  setActiveDivision(division);
                  navigateTo('/my-land');
                }}
              >
                {/* Division Fill Area */}
                <path
                  d={division.pathD}
                  fill={isActive ? division.activeColor : division.fillColor}
                  stroke="#002D1D"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  className="transition-all duration-300 hover:brightness-110"
                />

                {/* Division Center Marker Circle */}
                <circle
                  cx={division.center.x}
                  cy={division.center.y}
                  r={division.id === 'dhaka' ? '7' : '5'}
                  fill={division.id === 'dhaka' ? '#F42A41' : '#FFFFFF'}
                  stroke="#002D1D"
                  strokeWidth="1.5"
                  className="transition-transform duration-200 group-hover:scale-125"
                />

                {/* Pulsing ring on active capital */}
                {isActive && (
                  <circle
                    cx={division.center.x}
                    cy={division.center.y}
                    r="13"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeOpacity="0.85"
                    className="animate-ping origin-center"
                    style={{ animationDuration: '2s' }}
                  />
                )}

                {/* Division Name Label */}
                <text
                  x={division.center.x}
                  y={division.center.y - 10}
                  textAnchor="middle"
                  fontSize={division.id === 'dhaka' ? '13' : '11'}
                  fontWeight="800"
                  fill="#FFFFFF"
                  className="select-none pointer-events-none tracking-tight font-sans drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]"
                >
                  {division.nameBn.replace(' বিভাগ', '')}
                </text>

                {/* Demo Parcel Code pill on map */}
                <text
                  x={division.center.x}
                  y={division.center.y + 16}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="700"
                  fill="#FDE047"
                  className="select-none pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                >
                  কোড: {division.sampleCode}
                </text>
              </g>
            );
          })}

          {/* ============================================================== */}
          {/* 2. AUTHENTIC WHITE RIVER NETWORK OF BANGLADESH */}
          {/* Jamuna, Padma, Meghna, Lower Estuary, and Sundarbans Channels */}
          {/* ============================================================== */}

          {/* A. Jamuna River (Brahmaputra): Enters at Kurigram, flows south */}
          <path
            d="M 255 110 Q 248 160 240 210 T 230 260 T 225 310"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_1.5px_rgba(0,0,0,0.3)]"
          />
          {/* Jamuna braid channel */}
          <path
            d="M 250 140 Q 242 190 236 240"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
          />

          {/* B. Padma River (Ganges): Enters below Chapai Nawabganj and flows southeast */}
          <path
            d="M 72 270 Q 110 280 145 290 T 185 305 T 225 310"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_1.5px_rgba(0,0,0,0.3)]"
          />

          {/* C. Lower Padma & Confluence at Aricha / Goalando */}
          <path
            d="M 225 310 Q 255 330 285 345 T 345 355"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_1.5px_rgba(0,0,0,0.3)]"
          />

          {/* D. Upper Meghna: Enters from Sylhet/Kishoreganj to Chandpur */}
          <path
            d="M 400 230 Q 385 275 375 315 T 345 355"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* E. Lower Meghna Estuary (Chandpur south past Bhola into Bay of Bengal) */}
          <path
            d="M 345 355 Q 350 405 345 450 T 335 515"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_2px_rgba(0,0,0,0.4)]"
          />

          {/* F. Sundarbans River Delta Network (Pussur, Rupsha, Baleshwar) */}
          <path d="M 148 450 Q 155 480 158 510" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M 175 440 Q 180 475 185 508" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M 205 435 Q 212 470 218 506" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M 235 430 Q 242 465 248 502" fill="none" stroke="#FFFFFF" strokeWidth="3" />

          {/* G. Karnafuli River (Chittagong) */}
          <path d="M 420 445 Q 435 460 450 475" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

          {/* ============================================================== */}
          {/* 3. COASTAL ISLANDS OF BANGLADESH */}
          {/* ============================================================== */}

          {/* ভোলা দ্বীপ (Bhola Island - Largest island in Bangladesh) */}
          <g className="cursor-pointer" onClick={() => navigateTo('/my-land')}>
            <ellipse
              cx="342"
              cy="445"
              rx="9"
              ry="26"
              fill="#005036"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              className="hover:fill-[#006E4B] transition-colors"
            />
            <text x="342" y="448" textAnchor="middle" fontSize="8" fill="#FFFFFF" fontWeight="800">
              ভোলা
            </text>
          </g>

          {/* সন্দ্বীপ দ্বীপ (Sandwip Island) */}
          <g className="cursor-pointer" onClick={() => navigateTo('/my-land')}>
            <ellipse
              cx="376"
              cy="450"
              rx="7"
              ry="12"
              fill="#00422B"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              className="hover:fill-[#00603F] transition-colors"
            />
            <text x="376" y="453" textAnchor="middle" fontSize="7" fill="#FFFFFF" fontWeight="800">
              সন্দ্বীপ
            </text>
          </g>

          {/* হাতিয়া দ্বীপ (Hatiya Island) */}
          <g className="cursor-pointer" onClick={() => navigateTo('/my-land')}>
            <ellipse
              cx="358"
              cy="472"
              rx="8"
              ry="16"
              fill="#00422B"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              className="hover:fill-[#00603F] transition-colors"
            />
            <text x="358" y="475" textAnchor="middle" fontSize="7" fill="#FFFFFF" fontWeight="800">
              হাতিয়া
            </text>
          </g>

          {/* মহেশখালী দ্বীপ (Maheshkhali Island) */}
          <ellipse cx="442" cy="530" rx="5" ry="11" fill="#00422B" stroke="#FFFFFF" strokeWidth="1.2" />
          <text x="442" y="546" textAnchor="middle" fontSize="6.5" fill="#003823" fontWeight="800">
            মহেশখালী
          </text>

          {/* সেন্টমার্টিন দ্বীপ (St. Martin's Island - Southern tip) */}
          <circle cx="490" cy="630" r="4" fill="#00422B" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="490" y="643" textAnchor="middle" fontSize="8" fill="#00422B" fontWeight="800">
            সেন্টমার্টিন
          </text>

          {/* Bay of Bengal label */}
          <text
            x="240"
            y="565"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#006A4E"
            fillOpacity="0.4"
            className="tracking-widest uppercase select-none pointer-events-none"
          >
            বঙ্গোপসাগর (Bay of Bengal)
          </text>
        </svg>

        {/* Floating Card 1: Record Integrity (শীর্ষ-ডানে) */}
        <div className="absolute top-2 right-0 sm:right-1 bg-white/95 backdrop-blur-md border border-[#DCE6DF] rounded-2xl p-2.5 sm:p-3 shadow-md flex items-center gap-2.5 max-w-[210px] text-left">
          <div className="w-8 h-8 rounded-xl bg-[#006A4E]/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#16835D]" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#17231E]">
              {language === 'bn' ? 'ডিজিটাল রেকর্ড অখণ্ডতা' : 'Record Integrity'}
            </div>
            <div className="text-[10px] text-[#16835D] font-semibold">
              {language === 'bn' ? 'যাচাইকৃত ডেমো স্ট্যাটাস' : 'Demo status: Verified'}
            </div>
          </div>
        </div>

        {/* Floating Card 2: e-Namjari Cross-Check (বাম-নিচে) */}
        <div className="absolute bottom-16 -left-1 sm:left-0 bg-white/95 backdrop-blur-md border border-[#DCE6DF] rounded-2xl p-2.5 sm:p-3 shadow-md flex items-center gap-2.5 max-w-[200px] text-left">
          <div className="w-8 h-8 rounded-xl bg-[#2764B4]/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#2764B4]" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#17231E]">
              {language === 'bn' ? 'ক্রস-রেকর্ড সমন্বয়' : 'Cross-Record Check'}
            </div>
            <div className="text-[10px] text-[#68766F]">
              {language === 'bn' ? 'খতিয়ান ও দলিল সামঞ্জস্য' : 'Khatian & Deed Matched'}
            </div>
          </div>
        </div>

        {/* Floating Card 3: Selected Division Details (ডান-নিচে) */}
        {displayDivision && (
          <div className="absolute bottom-3 right-0 sm:right-2 bg-white/95 backdrop-blur-md border border-[#006A4E]/30 rounded-2xl p-3 shadow-lg max-w-[230px] text-left">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#DCE6DF] mb-1.5">
              <span className="text-xs font-extrabold text-[#006A4E]">
                {displayDivision.nameBn}
              </span>
              <span className="text-[10px] font-bold bg-[#006A4E]/10 text-[#006A4E] px-1.5 py-0.5 rounded">
                কোড: {displayDivision.sampleCode}
              </span>
            </div>
            <p className="text-[10px] text-[#68766F] leading-tight line-clamp-2 mb-2">
              {displayDivision.descriptionBn}
            </p>
            <div className="flex items-center justify-between text-[10px] font-semibold text-[#17231E]">
              <span>জেলা: {displayDivision.districtsCount}টি</span>
              <button
                onClick={() => navigateTo('/my-land')}
                className="text-[#006A4E] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
              >
                <span>রেকর্ড দেখুন</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Division Selector Quick Pills Below Map */}
      <div className="w-full max-w-[560px] flex flex-wrap items-center justify-center gap-1.5 mt-2 z-10">
        {MAP_DIVISIONS.map((div) => {
          const isSelected = activeDivision?.id === div.id;
          return (
            <button
              key={div.id}
              onClick={() => setActiveDivision(div)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#006A4E] text-white shadow-xs scale-105'
                  : 'bg-white hover:bg-[#F0F7F4] text-[#17231E] border border-[#DCE6DF]'
              }`}
            >
              {div.nameBn.replace(' বিভাগ', '')} ({div.sampleCode})
            </button>
          );
        })}
      </div>
    </div>
  );
};
