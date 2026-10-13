export type Language = 'en' | 'bn';

export type UserRole = 'citizen' | 'officer' | 'public';

export type IntegrityStatus = 
  | 'CONSISTENT' 
  | 'REVIEW_REQUIRED' 
  | 'CRITICAL_MISMATCH' 
  | 'MISSING_DATA' 
  | 'AUDIT_FAILED';

export type ShieldLevel = 'NORMAL' | 'REVIEW' | 'CRITICAL';

export interface LandDocument {
  id: string;
  documentType: 'DEED' | 'KHATIAN_CS' | 'KHATIAN_SA' | 'KHATIAN_RS' | 'KHATIAN_BS' | 'MUTATION_KHT' | 'DAKHILA';
  titleEn: string;
  titleBn: string;
  docNumber: string;
  registrationDate: string;
  subRegistryOffice: string;
  firstParty: string; // Seller / Ancestor
  secondParty: string; // Buyer / Current Record Holder
  mouzaEn: string;
  mouzaBn: string;
  dagNumber: string;
  khatianNumber: string;
  recordedAreaAcres: number;
  qrVerifiedDemo: boolean;
  notes?: string;
}

export interface Parcel {
  id: string; // e.g. LG-P-001
  landTransactionId?: string; // e.g. LT-BD-2026-00182 (Internal project ID)
  demoLabel: string;
  divisionEn: string;
  divisionBn: string;
  districtEn: string;
  districtBn: string;
  upazilaEn: string;
  upazilaBn: string;
  mouzaEn: string;
  mouzaBn: string;
  dagNumber: string;
  khatianNumber: string;
  jlNumber: string;
  recordedOwnerEn: string;
  recordedOwnerBn: string;
  recordedAreaAcres: number;
  landClassEn: string; // e.g., 'Nal (Agricultural)', 'Viti (Homestead)'
  landClassBn: string;
  integrityStatus: IntegrityStatus;
  shieldLevel: ShieldLevel;
  lastSimulatedActivity: string;
  lastUpdated: string;
  documents: LandDocument[];
  scenarioId: 'A_CONSISTENT' | 'B_AREA_MISMATCH' | 'C_OVER_TRANSFER' | 'D_MISSING_INFO' | 'E_UNRECOGNIZED_EVENT' | 'F_AUDIT_TAMPER' | 'OTHER';
}

export interface OwnershipEvent {
  id: string;
  parcelId: string;
  year: number;
  date: string;
  eventTypeEn: 'INITIAL_SETTLEMENT' | 'DEED_TRANSFER' | 'INHERITANCE_WARISHAN' | 'MUTATION_APPROVAL' | 'POWER_OF_ATTORNEY' | 'MORTGAGE_LIEN' | 'TAX_CLEARANCE';
  eventTypeBn: string;
  titleEn: string;
  titleBn: string;
  fromPartyEn?: string;
  fromPartyBn?: string;
  toPartyEn: string;
  toPartyBn: string;
  areaAcres: number;
  documentRef: string;
  status: 'VERIFIED' | 'NEEDS_REVIEW' | 'FLAGGED';
  notesEn: string;
  notesBn: string;
}

export interface ProtectionAlert {
  id: string; // e.g. ALT-2026-001
  parcelId: string;
  parcelName: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  severity: 'CRITICAL' | 'REVIEW' | 'NORMAL';
  timestamp: string;
  sourceEn: string;
  sourceBn: string;
  status: 'PENDING_USER_REVIEW' | 'ACKNOWLEDGED' | 'ESCALATED_INCIDENT';
  incidentId?: string;
  details: {
    reportedParty?: string;
    actionType?: string;
    officeLocation?: string;
    affectedAreaAcres?: number;
  };
}

export interface IncidentReport {
  id: string; // LG-INC-0001
  parcelId: string;
  alertId?: string;
  citizenDeclaration: string;
  contactEmail?: string;
  timestamp: string;
  status: 'TRIAGED_BY_OFFICER' | 'UNDER_REVIEW' | 'RESOLVED_DEMO' | 'ESCALATED';
  officerNotes?: string;
  evidenceSummary: string;
}

export interface AuditBlock {
  index: number;
  eventId: string;
  parcelId: string;
  eventType: string;
  timestamp: string;
  payload: Record<string, any>;
  previousHash: string;
  hash: string;
  isTampered?: boolean;
}

export interface VerificationFinding {
  ruleId: string;
  titleEn: string;
  titleBn: string;
  severity: 'PASS' | 'WARNING' | 'CRITICAL';
  descriptionEn: string;
  descriptionBn: string;
  evidence: {
    field: string;
    expectedValue?: string | number;
    foundValue?: string | number;
    difference?: string | number;
    sourceA?: string;
    sourceB?: string;
  };
}

export interface VerificationResult {
  id: string;
  parcelId: string;
  timestamp: string;
  overallStatus: IntegrityStatus;
  summaryEn: string;
  summaryBn: string;
  findings: VerificationFinding[];
  documentsAnalyzed: string[];
}

export interface OfficerCase {
  id: string; // e.g. CASE-2026-101
  parcelId: string;
  issueTypeEn: string;
  issueTypeBn: string;
  riskLevel: 'CRITICAL' | 'REVIEW' | 'NORMAL';
  detectionTime: string;
  evidenceCount: number;
  status: 'NEEDS_REVIEW' | 'UNDER_REVIEW' | 'MORE_INFO_REQUESTED' | 'RESOLVED' | 'ESCALATED';
  incidentId?: string;
  descriptionEn: string;
  descriptionBn: string;
  reviewerNotes?: string;
}
