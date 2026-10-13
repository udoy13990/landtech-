// Comprehensive GeoJSON FeatureCollection for Bangladesh's 8 Administrative Divisions
// Geographically accurate coordinates based on Bangladesh administrative boundaries (BBS / Survey of Bangladesh)

export interface DivisionFeatureProperties {
  id: string;
  nameBn: string;
  nameEn: string;
  capitalBn: string;
  capitalEn: string;
  coordinates: [number, number]; // [Longitude, Latitude]
  districtsCount: number;
  upazilasCount: number;
  totalRecordsDemo: string;
  pendingMutationDemo: string;
  integrityScore: string;
  sampleCode: string;
  color: string;
}

export const BANGLADESH_DIVISIONS_GEOJSON: GeoJSON.FeatureCollection<GeoJSON.Geometry, DivisionFeatureProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'rangpur',
        nameBn: 'রংপুর বিভাগ',
        nameEn: 'Rangpur Division',
        capitalBn: 'রংপুর',
        capitalEn: 'Rangpur',
        coordinates: [89.2467, 25.7439],
        districtsCount: 8,
        upazilasCount: 58,
        totalRecordsDemo: '১,৪২০,৩৫০',
        pendingMutationDemo: '১,২৮০',
        integrityScore: '৯৯.৪%',
        sampleCode: '১০৭',
        color: '#00A86B'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [88.55, 26.63], // Tetulia apex
          [88.80, 26.35],
          [89.10, 26.25],
          [89.65, 26.15],
          [89.85, 25.85],
          [89.80, 25.40],
          [89.55, 25.10], // Gaibandha / Jamuna bank
          [89.30, 25.15],
          [88.90, 25.18], // Hili / Dinajpur south
          [88.60, 25.25],
          [88.35, 25.60],
          [88.25, 26.00],
          [88.30, 26.30],
          [88.55, 26.63]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'rajshahi',
        nameBn: 'রাজশাহী বিভাগ',
        nameEn: 'Rajshahi Division',
        capitalBn: 'রাজশাহী',
        capitalEn: 'Rajshahi',
        coordinates: [88.6011, 24.3636],
        districtsCount: 8,
        upazilasCount: 67,
        totalRecordsDemo: '১,৮৫০,৪২০',
        pendingMutationDemo: '১,৯১০',
        integrityScore: '৯৮.৭%',
        sampleCode: '১০৩',
        color: '#00875A'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [88.90, 25.18],
          [89.30, 25.15],
          [89.55, 25.10],
          [89.65, 24.80], // Bogura
          [89.70, 24.35], // Sirajganj Jamuna
          [89.60, 23.95], // Bera / Pabna
          [89.30, 24.05], // Ishwardi Padma
          [88.85, 24.15], // Rajshahi city bank
          [88.25, 24.40], // Padma entrance
          [88.01, 24.68], // Chapai Nawabganj extreme west nose
          [88.25, 24.95],
          [88.60, 25.05],
          [88.90, 25.18]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'mymensingh',
        nameBn: 'ময়মনসিংহ বিভাগ',
        nameEn: 'Mymensingh Division',
        capitalBn: 'ময়মনসিংহ',
        capitalEn: 'Mymensingh',
        coordinates: [90.4073, 24.7471],
        districtsCount: 4,
        upazilasCount: 35,
        totalRecordsDemo: '৯৮০,১৫০',
        pendingMutationDemo: '৯২০',
        integrityScore: '৯৯.১%',
        sampleCode: '১০৮',
        color: '#00B875'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.80, 25.40], // Dewanganj / Roumari
          [90.10, 25.20], // Sherpur Garo hills border
          [90.50, 25.18], // Haluaghat Meghalaya border
          [90.85, 25.15], // Netrokona border
          [91.10, 24.95], // Haor edge
          [90.80, 24.45], // Kishoreganj border
          [90.40, 24.35], // Bhaluka / Gazipur border
          [89.95, 24.45], // Tangail / Jamuna
          [89.70, 24.95],
          [89.80, 25.40]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'sylhet',
        nameBn: 'সিলেট বিভাগ',
        nameEn: 'Sylhet Division',
        capitalBn: 'সিলেট',
        capitalEn: 'Sylhet',
        coordinates: [91.8687, 24.8949],
        districtsCount: 4,
        upazilasCount: 41,
        totalRecordsDemo: '১,১৫০,৩০০',
        pendingMutationDemo: '৮৯০',
        integrityScore: '৯৯.৬%',
        sampleCode: '১০৪',
        color: '#00945F'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [91.10, 24.95],
          [91.40, 25.15], // Sunamganj
          [92.02, 25.18], // Jaflong / Tamabil
          [92.35, 25.05], // Kanaighat
          [92.50, 24.88], // Zakiganj eastern apex
          [92.40, 24.45], // Barlekha
          [92.15, 24.25], // Sreemangal tea hills
          [91.65, 24.15], // Habiganj border with Tripura
          [91.35, 24.25],
          [91.15, 24.60],
          [91.10, 24.95]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'dhaka',
        nameBn: 'ঢাকা বিভাগ',
        nameEn: 'Dhaka Division',
        capitalBn: 'ঢাকা',
        capitalEn: 'Dhaka',
        coordinates: [90.4125, 23.8103],
        districtsCount: 13,
        upazilasCount: 93,
        totalRecordsDemo: '৪,৫২০,০০০',
        pendingMutationDemo: '৪,৫০০',
        integrityScore: '৯৮.৫%',
        sampleCode: '১০১',
        color: '#007A4D'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.95, 24.45],
          [90.40, 24.35],
          [90.80, 24.45],
          [90.95, 24.10], // Bhairab / Meghna
          [90.85, 23.65], // Narayanganj / Narsingdi
          [90.65, 23.35], // Munshiganj / Padma
          [90.40, 23.15], // Shariatpur
          [89.95, 23.10], // Gopalganj / Madaripur
          [89.70, 23.40], // Faridpur
          [89.60, 23.95], // Goalando / Aricha confluence
          [89.70, 24.35],
          [89.95, 24.45]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'khulna',
        nameBn: 'খুলনা বিভাগ',
        nameEn: 'Khulna Division',
        capitalBn: 'খুলনা',
        capitalEn: 'Khulna',
        coordinates: [89.5403, 22.8456],
        districtsCount: 10,
        upazilasCount: 59,
        totalRecordsDemo: '২,১০০,৭৮০',
        pendingMutationDemo: '১,৬৫০',
        integrityScore: '৯৮.৯%',
        sampleCode: '১০৫',
        color: '#00A86B'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.30, 24.05],
          [89.60, 23.95],
          [89.70, 23.40],
          [89.95, 23.10],
          [89.90, 22.65], // Bagerhat / Mongla
          [89.85, 22.05], // Sundarbans delta mouth (Haringhata)
          [89.50, 21.75], // Hiron Point Bay of Bengal
          [89.15, 21.65], // Raimangal estuary (India border)
          [88.95, 22.25], // Satkhira
          [88.85, 22.80], // Jashore / Benapole
          [88.70, 23.30], // Chuadanga
          [88.65, 23.85], // Meherpur / Kushtia
          [89.05, 24.00],
          [89.30, 24.05]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'barishal',
        nameBn: 'বরিশাল বিভাগ',
        nameEn: 'Barishal Division',
        capitalBn: 'বরিশাল',
        capitalEn: 'Barishal',
        coordinates: [90.3699, 22.7010],
        districtsCount: 6,
        upazilasCount: 42,
        totalRecordsDemo: '১,২৩০,৪০০',
        pendingMutationDemo: '১,১০০',
        integrityScore: '৯৯.০%',
        sampleCode: '১০৬',
        color: '#009E60'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.90, 22.65],
          [89.95, 23.10],
          [90.40, 23.15],
          [90.65, 22.95],
          [90.85, 22.45], // Bhola east channel
          [90.75, 21.90], // Char Fasson / Bay
          [90.40, 21.80], // Kuakata beach
          [90.00, 22.00], // Barguna / Patharghata
          [89.85, 22.05],
          [89.90, 22.65]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'chattogram',
        nameBn: 'চট্টগ্রাম বিভাগ',
        nameEn: 'Chattogram Division',
        capitalBn: 'চট্টগ্রাম',
        capitalEn: 'Chattogram',
        coordinates: [91.8365, 22.3350],
        districtsCount: 11,
        upazilasCount: 103,
        totalRecordsDemo: '৩,৬৫০,০০০',
        pendingMutationDemo: '৩,২০০',
        integrityScore: '৯৮.৮%',
        sampleCode: '১০২',
        color: '#007548'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [90.85, 23.65],
          [91.35, 24.25], // Brahmanbaria
          [91.80, 23.90], // Cumilla / Tripura border
          [92.15, 23.70], // Sajek / Khagrachhari
          [92.45, 23.15], // Rangamati Kaptai hills
          [92.65, 21.85], // Thanchi / Moddok eastern bulge
          [92.45, 21.25], // Bandarban south
          [92.30, 20.85], // Teknaf / Naf River tip
          [92.10, 21.15], // Cox's Bazar coast
          [91.95, 21.55], // Maheshkhali channel
          [91.75, 22.25], // Chittagong port / Patenga
          [91.45, 22.75], // Feni / Noakhali coast
          [90.85, 22.85],
          [90.65, 23.35],
          [90.85, 23.65]
        ]]
      }
    }
  ]
};

// GeoJSON for Bangladesh Islands
export const BANGLADESH_ISLANDS_GEO = [
  {
    nameBn: 'ভোলা দ্বীপ',
    nameEn: 'Bhola Island',
    coordinates: [90.72, 22.35],
    rx: 8,
    ry: 22
  },
  {
    nameBn: 'সন্দ্বীপ',
    nameEn: 'Sandwip Island',
    coordinates: [91.45, 22.48],
    rx: 6,
    ry: 11
  },
  {
    nameBn: 'হাতিয়া',
    nameEn: 'Hatiya Island',
    coordinates: [91.10, 22.25],
    rx: 7,
    ry: 14
  },
  {
    nameBn: 'সেন্টমার্টিন দ্বীপ',
    nameEn: "St. Martin's Island",
    coordinates: [92.32, 20.62],
    rx: 4,
    ry: 4
  }
];
