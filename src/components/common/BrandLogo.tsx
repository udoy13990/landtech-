import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Bangladesh Government Land & Integrity Emblem */}
      <div
        className={`relative ${iconDimensions} rounded-full bg-[#006A4E] shadow-md flex items-center justify-center shrink-0 border-2 border-[#EAB308] overflow-hidden`}
        title="গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ভূমি অখণ্ডতা প্ল্যাটফর্ম"
      >
        {/* Subtle radial shading */}
        <div className="absolute inset-0 bg-radial from-[#008764] to-[#00523C] opacity-90" />

        {/* National Red Circle */}
        <div className="absolute w-[68%] h-[68%] rounded-full bg-[#F42A41] shadow-inner flex items-center justify-center">
          {/* Authentic Gold Silhouette of Bangladesh Map */}
          <svg
            viewBox="0 0 100 110"
            className="w-[82%] h-[82%] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            fill="#FFD700"
          >
            {/* Real Bangladesh Geographical Outline */}
            <path
              d="
                M 26 8
                C 31 10, 37 13, 42 15
                C 46 17, 47 21, 46 25
                C 51 25, 59 25, 66 26
                C 74 26, 80 27, 85 30
                C 89 33, 91 38, 90 42
                C 88 46, 82 48, 77 50
                C 75 54, 76 59, 78 64
                C 83 67, 89 72, 92 78
                C 95 84, 94 91, 91 97
                C 88 103, 85 108, 83 110
                C 81 109, 81 104, 82 99
                C 81 92, 77 87, 72 82
                C 68 78, 64 74, 60 74
                C 55 77, 50 82, 45 84
                C 40 85, 36 82, 33 84
                C 28 85, 23 85, 20 84
                C 17 80, 18 73, 19 66
                C 17 58, 16 52, 17 46
                C 14 43, 10 40, 9 37
                C 11 32, 16 29, 18 25
                C 20 19, 23 13, 26 8
                Z
              "
              fill="#FFD700"
              stroke="#B45309"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* St. Martin's Island dot */}
            <circle cx="84" cy="113" r="1.5" fill="#FFD700" />
          </svg>
        </div>

        {/* 4 Golden Stars representing State Principles */}
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[5px] text-[#FFD700] leading-none font-bold">
          ★
        </div>
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[5px] text-[#FFD700] leading-none font-bold">
          ★
        </div>
      </div>

      {showText && (
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#17231E] leading-tight">
              বিডি ল্যান্ড গার্ড
            </span>
            <span className="text-[10px] font-bold text-[#006A4E] bg-[#006A4E]/10 border border-[#006A4E]/20 px-1.5 py-0.5 rounded">
              স্মার্ট সংস্করণ
            </span>
          </div>
          <div className="text-[10px] font-semibold text-[#68766F] tracking-wide mt-0.5">
            BD LAND GUARD · ভূমি অখণ্ডতা ও নাগরিক সুরক্ষা
          </div>
        </div>
      )}
    </div>
  );
};
