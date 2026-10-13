import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  UserRole,
  Parcel,
  OwnershipEvent,
  ProtectionAlert,
  OfficerCase,
  AuditBlock,
  VerificationResult,
  IncidentReport
} from '../types';
import {
  INITIAL_PARCELS,
  INITIAL_OWNERSHIP_EVENTS,
  INITIAL_ALERTS,
  INITIAL_OFFICER_CASES,
  INITIAL_AUDIT_BLOCKS
} from '../data/mockData';
import { runDeterministicVerification } from '../lib/verificationEngine';
import { computeBlockHash } from '../lib/crypto';
import { TRANSLATIONS } from '../lib/translations';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
  currentRoute: string;
  navigateTo: (route: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  parcels: Parcel[];
  selectedParcelId: string;
  setSelectedParcelId: (id: string) => void;
  selectedParcel: Parcel;
  alerts: ProtectionAlert[];
  officerCases: OfficerCase[];
  ownershipEvents: OwnershipEvent[];
  auditBlocks: AuditBlock[];
  verificationHistory: VerificationResult[];
  incidentReports: IncidentReport[];
  isTampered: boolean;
  tamperedIndex: number | null;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  acknowledgeAlert: (alertId: string) => Promise<void>;
  reportUnrecognizedEvent: (alertId: string, declaration: string) => Promise<string>;
  simulateNewActivity: () => Promise<void>;
  runTamperingDemo: () => Promise<void>;
  resetTamperingScenario: () => void;
  updateOfficerCaseStatus: (caseId: string, status: OfficerCase['status'], notes?: string) => Promise<void>;
  runParcelVerification: (parcelId: string) => VerificationResult;
  isCalculatorOpen: boolean;
  setIsCalculatorOpen: (open: boolean) => void;
  isLawsOpen: boolean;
  setIsLawsOpen: (open: boolean) => void;
  activeDemoStep: number;
  setDemoStep: (step: number) => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'BD_LAND_GUARD_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language & Routing - Defaulting to Bangla ('bn') just like land.gov.bd
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}LANG`);
    return (saved as Language) || 'bn';
  });
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [userRole, setUserRole] = useState<UserRole>('citizen');

  // 2. Data state
  const [parcels, setParcels] = useState<Parcel[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}PARCELS`);
    return saved ? JSON.parse(saved) : INITIAL_PARCELS;
  });

  const [selectedParcelId, setSelectedParcelId] = useState<string>('LG-P-001');

  const [alerts, setAlerts] = useState<ProtectionAlert[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}ALERTS`);
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [officerCases, setOfficerCases] = useState<OfficerCase[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}CASES`);
    return saved ? JSON.parse(saved) : INITIAL_OFFICER_CASES;
  });

  const [ownershipEvents, setOwnershipEvents] = useState<OwnershipEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}EVENTS`);
    return saved ? JSON.parse(saved) : INITIAL_OWNERSHIP_EVENTS;
  });

  const [auditBlocks, setAuditBlocks] = useState<AuditBlock[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}AUDIT`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_BLOCKS;
  });

  const [verificationHistory, setVerificationHistory] = useState<VerificationResult[]>([]);
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([]);
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [tamperedIndex, setTamperedIndex] = useState<number | null>(null);

  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isLawsOpen, setIsLawsOpen] = useState<boolean>(false);
  const [activeDemoStep, setActiveDemoStep] = useState<number>(1);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  // 3. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}LANG`, lang);
    showToast(lang === 'bn' ? 'ভাষা পরিবর্তন করা হয়েছে: বাংলা' : 'Language switched to English', 'info');
  };

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key] || String(key);
  };

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}PARCELS`, JSON.stringify(parcels));
  }, [parcels]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}ALERTS`, JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}CASES`, JSON.stringify(officerCases));
  }, [officerCases]);

  const selectedParcel = parcels.find((p) => p.id === selectedParcelId) || parcels[0];

  // Helper to append a new cryptographic block
  const appendAuditBlock = async (parcelId: string, eventType: string, payload: Record<string, any>) => {
    const lastBlock = auditBlocks[auditBlocks.length - 1];
    const newIndex = auditBlocks.length;
    const timestamp = new Date().toISOString();
    const eventId = `EVT-LOG-${Date.now().toString().slice(-5)}`;
    const previousHash = lastBlock.hash;
    const hash = await computeBlockHash(payload, previousHash, eventId, timestamp);

    const newBlock: AuditBlock = {
      index: newIndex,
      eventId,
      parcelId,
      eventType,
      timestamp,
      payload,
      previousHash,
      hash
    };

    setAuditBlocks((prev) => [...prev, newBlock]);
    return newBlock;
  };

  // 1. Run Verification
  const runParcelVerification = (parcelId: string): VerificationResult => {
    const parcelToVerify = parcels.find((p) => p.id === parcelId) || selectedParcel;
    const result = runDeterministicVerification(parcelToVerify);

    setVerificationHistory((prev) => [result, ...prev.slice(0, 19)]);

    // Update parcel status
    setParcels((prev) =>
      prev.map((p) => {
        if (p.id === parcelId) {
          return {
            ...p,
            integrityStatus: result.overallStatus,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return p;
      })
    );

    return result;
  };

  // 2. Acknowledge Alert (Citizen recognizes the activity)
  const acknowledgeAlert = async (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId);
    if (!alert) return;

    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'ACKNOWLEDGED' } : a))
    );

    // Update parcel shield level
    setParcels((prev) =>
      prev.map((p) => (p.id === alert.parcelId ? { ...p, shieldLevel: 'NORMAL' } : p))
    );

    await appendAuditBlock(alert.parcelId, 'ALERT_ACKNOWLEDGED_BY_OWNER', {
      alertId,
      parcelId: alert.parcelId,
      action: 'Recognized by registered landowner'
    });

    showToast(
      language === 'bn'
        ? 'ঘটনাটি স্বীকৃতি দেওয়া হয়েছে এবং অডিট লগে লিপিবদ্ধ হয়েছে।'
        : 'Event acknowledged. Cryptographic record added to audit log.',
      'success'
    );
  };

  // 3. Report Unrecognized Event (Citizen creates an incident)
  const reportUnrecognizedEvent = async (alertId: string, declaration: string): Promise<string> => {
    const alert = alerts.find((a) => a.id === alertId);
    if (!alert) return '';

    const incidentId = `LG-INC-${(incidentReports.length + 1).toString().padStart(4, '0')}`;
    const timestamp = new Date().toISOString();

    const newIncident: IncidentReport = {
      id: incidentId,
      parcelId: alert.parcelId,
      alertId,
      citizenDeclaration: declaration || 'Registered owner explicitly declared this event unfamiliar and unauthorized.',
      timestamp,
      status: 'TRIAGED_BY_OFFICER',
      evidenceSummary: `Alert: ${alert.titleEn}. Reported party: ${alert.details.reportedParty || 'Unknown'}`
    };

    setIncidentReports((prev) => [newIncident, ...prev]);

    // Update alert status
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId ? { ...a, status: 'ESCALATED_INCIDENT', incidentId } : a
      )
    );

    // Update parcel shield level
    setParcels((prev) =>
      prev.map((p) => (p.id === alert.parcelId ? { ...p, shieldLevel: 'CRITICAL' } : p))
    );

    // Add case to officer queue
    const newCaseId = `CASE-2026-${(officerCases.length + 101).toString()}`;
    const newCase: OfficerCase = {
      id: newCaseId,
      parcelId: alert.parcelId,
      issueTypeEn: `Unrecognized Event Report (${incidentId})`,
      issueTypeBn: `অননুমোদিত ঘটনা সংক্রান্ত রিপোর্ট (${incidentId})`,
      riskLevel: 'CRITICAL',
      detectionTime: new Date().toISOString().replace('T', ' ').slice(0, 16),
      evidenceCount: 3,
      status: 'NEEDS_REVIEW',
      incidentId,
      descriptionEn: `Citizen reported: "${declaration.slice(0, 100)}...". Triggered by ${alert.titleEn}.`,
      descriptionBn: `নাগরিক রিপোর্ট: "${declaration.slice(0, 100)}..."। উৎস: ${alert.titleBn}।`
    };

    setOfficerCases((prev) => [newCase, ...prev]);

    // Cryptographic audit entry
    await appendAuditBlock(alert.parcelId, 'INCIDENT_ESCALATION_CITIZEN', {
      incidentId,
      alertId,
      parcelId: alert.parcelId,
      declarationSummary: declaration.slice(0, 80)
    });

    showToast(
      language === 'bn'
        ? `ডেমো ইনসিডেন্ট তৈরি হয়েছে (${incidentId})। পর্যালোচনার জন্য কর্মকর্তা প্যানেলে পাঠানো হয়েছে।`
        : `Demo Incident created (${incidentId}). Escalated to authorized reviewer queue.`,
      'warning'
    );

    return incidentId;
  };

  // 4. Simulate New Activity
  const simulateNewActivity = async () => {
    const newAlertId = `ALT-2026-${(alerts.length + 1).toString().padStart(3, '0')}`;
    const targetParcel = parcels[0]; // LG-P-001

    const newAlert: ProtectionAlert = {
      id: newAlertId,
      parcelId: targetParcel.id,
      parcelName: `${targetParcel.mouzaEn} (Dag #${targetParcel.dagNumber})`,
      titleEn: 'Simulated Power of Attorney Execution Staged',
      titleBn: 'পাওয়ার অফ অ্যাটর্নি দলিল উপস্থাপনা সিমুলেশন',
      descriptionEn: 'An irrevocable general Power of Attorney execution draft was staged at Dhanmondi Sub-Registry Office.',
      descriptionBn: 'ধানমন্ডি সাব-রেজিস্ট্রি অফিসে একটি সাধারণ আমমোক্তারনামা দলিল নিবন্ধনের প্রস্তুতি রেকর্ড করা হয়েছে।',
      severity: 'REVIEW',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceEn: 'Sub-Registry Simulated Event Stream',
      sourceBn: 'সাব-রেজিস্ট্রি সিমুলেটেড ইভেন্ট স্ট্রিম',
      status: 'PENDING_USER_REVIEW',
      details: {
        reportedParty: 'Apex Agro Developers',
        actionType: 'Power of Attorney / আমমোক্তারনামা',
        officeLocation: 'Dhanmondi Sub-Registry',
        affectedAreaAcres: 0.50
      }
    };

    setAlerts((prev) => [newAlert, ...prev]);

    // Update parcel status
    setParcels((prev) =>
      prev.map((p) =>
        p.id === targetParcel.id
          ? {
              ...p,
              shieldLevel: 'REVIEW',
              lastSimulatedActivity: 'New Power of Attorney draft staged at Sub-Registry'
            }
          : p
      )
    );

    await appendAuditBlock(targetParcel.id, 'SIMULATED_ACTIVITY_STREAM', {
      alertId: newAlertId,
      parcelId: targetParcel.id,
      type: 'POWER_OF_ATTORNEY_STAGING'
    });

    showToast(
      language === 'bn'
        ? 'নতুন সিমুলেটেড কার্যকলাপ যুক্ত হয়েছে! ল্যান্ডগার্ড শিল্ডে দেখুন।'
        : 'New simulated activity event added! Check LandGuard Shield.',
      'info'
    );
  };

  // 5. Tampering Demonstration (Modifies payload in block #2 without updating hash)
  const runTamperingDemo = async () => {
    setIsTampered(true);
    setTamperedIndex(2);

    setAuditBlocks((prev) =>
      prev.map((b, idx) => {
        if (idx === 2) {
          // Intentionally tamper with payload data (e.g. change owner name secretly)
          return {
            ...b,
            isTampered: true,
            payload: {
              ...b.payload,
              owner: 'FRAUDULENT_TAMPERED_ENTRY (Tampered without hash update)'
            }
          };
        }
        return b;
      })
    );

    showToast(
      language === 'bn'
        ? 'সতর্কতা: ব্লক #২ এর ডেটা ট্যাম্পার করা হয়েছে! ক্রিপ্টোগ্রাফিক যাচাইয়ে অমিল দেখা যাবে।'
        : 'Tampering simulated: Block #2 data modified without recomputing SHA-256 hash.',
      'error'
    );
  };

  const resetTamperingScenario = () => {
    setIsTampered(false);
    setTamperedIndex(null);
    setAuditBlocks(INITIAL_AUDIT_BLOCKS);
    showToast(
      language === 'bn'
        ? 'ট্যাম্পারিং সিনারিও রিসেট করা হয়েছে। অডিট চেইনের অখণ্ডতা পুনরুদ্ধার হয়েছে।'
        : 'Tampering scenario reset. Cryptographic audit chain restored.',
      'success'
    );
  };

  // 6. Officer Case Resolution
  const updateOfficerCaseStatus = async (
    caseId: string,
    status: OfficerCase['status'],
    notes?: string
  ) => {
    setOfficerCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, status, reviewerNotes: notes || c.reviewerNotes }
          : c
      )
    );

    const c = officerCases.find((x) => x.id === caseId);
    if (c) {
      await appendAuditBlock(c.parcelId, 'OFFICER_REVIEW_DECISION', {
        caseId,
        newStatus: status,
        notes: notes || 'Status updated by authorized reviewer.'
      });
    }

    showToast(
      language === 'bn'
        ? `কেস ${caseId} আপডেট করা হয়েছে: ${status}`
        : `Case ${caseId} status updated to: ${status}`,
      'success'
    );
  };

  // 7. Complete Demo Reset
  const resetAllDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}PARCELS`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}ALERTS`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}CASES`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}EVENTS`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}AUDIT`);

    setParcels(INITIAL_PARCELS);
    setSelectedParcelId('LG-P-001');
    setAlerts(INITIAL_ALERTS);
    setOfficerCases(INITIAL_OFFICER_CASES);
    setOwnershipEvents(INITIAL_OWNERSHIP_EVENTS);
    setAuditBlocks(INITIAL_AUDIT_BLOCKS);
    setVerificationHistory([]);
    setIncidentReports([]);
    setIsTampered(false);
    setTamperedIndex(null);

    showToast(
      language === 'bn'
        ? 'সকল ডেমো ডেটা সফলভাবে প্রাথমিক অবস্থায় রিসেট করা হয়েছে।'
        : 'All demonstration data reset to initial baseline state.',
      'info'
    );
  };

  // 8. Flagship Demo 4-Step Guided Controller
  const setDemoStep = (step: number) => {
    setActiveDemoStep(step);
    if (step === 1) {
      // 1. Normal: 1.00-acre parcel, documents consistent → status Normal (green)
      setSelectedParcelId('LG-P-001');
      setIsTampered(false);
      setTamperedIndex(null);
      setAuditBlocks(INITIAL_AUDIT_BLOCKS);
      setParcels((prev) =>
        prev.map((p) =>
          p.id === 'LG-P-001'
            ? { ...p, integrityStatus: 'CONSISTENT', shieldLevel: 'NORMAL' }
            : p
        )
      );
      showToast(
        language === 'bn'
          ? 'ডেমো ধাপ ১: সাধারণ অবস্থা — ১.০০ একর পার্সেল (মোছাঃ রহিমা বেগম), সকল রেকর্ড সামঞ্জস্যপূর্ণ।'
          : 'Demo Step 1: Normal — 1.00-acre parcel (Mst. Rahima Begum), all records consistent.',
        'success'
      );
    } else if (step === 2) {
      // 2. Conflict: a new transfer requests 0.50 acre while only 0.30 acre is available → flag "Potential over-transfer"
      setSelectedParcelId('LG-P-003');
      setParcels((prev) =>
        prev.map((p) =>
          p.id === 'LG-P-003'
            ? { ...p, integrityStatus: 'CRITICAL_MISMATCH', shieldLevel: 'REVIEW' }
            : p
        )
      );
      showToast(
        language === 'bn'
          ? 'ডেমো ধাপ ২: সম্ভাব্য অতিরিক্ত হস্তান্তর ফ্ল্যাগ — ০.৫০ একর প্রার্থিত বনাম ০.৩০ একর প্রাপ্য।'
          : 'Demo Step 2: Conflict — Potential over-transfer (0.50 acre requested vs 0.30 available).',
        'warning'
      );
    } else if (step === 3) {
      // 3. Tampering: change an old event in mock DB without updating hash → "Record Integrity Failure"
      setSelectedParcelId('LG-P-001');
      setIsTampered(true);
      setTamperedIndex(2);
      setAuditBlocks((prev) =>
        prev.map((b, idx) =>
          idx === 2
            ? {
                ...b,
                isTampered: true,
                payload: {
                  ...b.payload,
                  areaAcres: 1.80,
                  tamperedNote: 'UNAUTHORIZED_REGISTRY_MODIFICATION_SIMULATED'
                }
              }
            : b
        )
      );
      showToast(
        language === 'bn'
          ? 'ডেমো ধাপ ৩: ক্রিপ্টোগ্রাফিক ডেটাবেজ ট্যাম্পারিং — ব্লক #২ এর ডেটা পরিবর্তিত, হ্যাশ অখণ্ডতা লঙ্ঘন।'
          : 'Demo Step 3: Tampering — Block #2 payload altered without hash update (Record Integrity Failure).',
        'error'
      );
    } else if (step === 4) {
      // 4. Protection: simulate unrecognized ownership-related event → owner alert → "I Don't Recognize This"
      setSelectedParcelId('LG-P-001');
      const alertId = 'ALT-2026-999';
      const criticalAlert: ProtectionAlert = {
        id: alertId,
        parcelId: 'LG-P-001',
        parcelName: 'কালীগঞ্জ (মক) · দাগ নং ৩৩১৮',
        titleEn: 'Simulated Unauthorized Deed Execution Attempt Detected',
        titleBn: 'অননুমোদিত সাফ-কবলা দলিল সম্পাদন প্রচেষ্টার সতর্কবার্তা',
        descriptionEn: 'A draft deed for 1.00 acre was staged at Kaliganj Sub-Registry without registered owner biometric confirmation.',
        descriptionBn: 'কালীগঞ্জ সাব-রেজিস্ট্রি অফিসে মোছাঃ রহিমা বেগমের বায়োমেট্রিক সম্মতি ব্যতীত ১.০০ একর হস্তান্তরের খসড়া উপস্থাপিত হয়েছে।',
        severity: 'CRITICAL',
        timestamp: 'Just now · এখন',
        sourceEn: 'LandGuard Shield Realtime Stream',
        sourceBn: 'ল্যান্ডগার্ড শিল্ড রিয়েলটাইম নজরদারি',
        status: 'PENDING_USER_REVIEW',
        details: {
          reportedParty: 'Unknown Agent / অজ্ঞাত ব্যক্তি',
          actionType: 'Deed Transfer / সাফ-কবলা হস্তান্তর',
          officeLocation: 'Kaliganj Sub-Registry',
          affectedAreaAcres: 1.00
        }
      };
      setAlerts((prev) => [criticalAlert, ...prev.filter((a) => a.id !== alertId)]);
      setParcels((prev) =>
        prev.map((p) => (p.id === 'LG-P-001' ? { ...p, shieldLevel: 'CRITICAL' } : p))
      );
      showToast(
        language === 'bn'
          ? 'ডেমো ধাপ ৪: অননুমোদিত ঘটনার সতর্কবার্তা সক্রিয়! শিল্ড পেজে গিয়ে "I Don\'t Recognize This" বোতাম চাপুন।'
          : 'Demo Step 4: Protection alert active! Go to SHIELD and click "I Don\'t Recognize This".',
        'warning'
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRoute,
        navigateTo,
        userRole,
        setUserRole,
        parcels,
        selectedParcelId,
        setSelectedParcelId,
        selectedParcel,
        alerts,
        officerCases,
        ownershipEvents,
        auditBlocks,
        verificationHistory,
        incidentReports,
        isTampered,
        tamperedIndex,
        toasts,
        showToast,
        acknowledgeAlert,
        reportUnrecognizedEvent,
        simulateNewActivity,
        runTamperingDemo,
        resetTamperingScenario,
        updateOfficerCaseStatus,
        runParcelVerification,
        isCalculatorOpen,
        setIsCalculatorOpen,
        isLawsOpen,
        setIsLawsOpen,
        activeDemoStep,
        setDemoStep,
        isDemoModalOpen,
        setIsDemoModalOpen,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
