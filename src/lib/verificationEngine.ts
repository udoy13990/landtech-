import { Parcel, LandDocument, VerificationResult, VerificationFinding, IntegrityStatus } from '../types';

export function runDeterministicVerification(
  parcel: Parcel,
  selectedDocuments: LandDocument[] = parcel.documents
): VerificationResult {
  const findings: VerificationFinding[] = [];
  const docIds = selectedDocuments.map((d) => d.id);

  // 1. Completeness Check
  if (selectedDocuments.length === 0) {
    findings.push({
      ruleId: 'COMPLETENESS_EMPTY',
      titleEn: 'No Documents Selected for Cross-Check',
      titleBn: 'যাচাইয়ের জন্য কোনো নথি নির্বাচন করা হয়নি',
      severity: 'CRITICAL',
      descriptionEn: 'At least two source documents (e.g. Deed and Khatian) are required to perform a cross-record consistency check.',
      descriptionBn: 'ক্রস-রেকর্ড সমন্বয় যাচাই করতে অন্তত দুটি নথি (যেমন দলিল ও খতিয়ান) প্রয়োজন।',
      evidence: { field: 'documents', foundValue: '0 documents' }
    });
  } else if (selectedDocuments.length === 1) {
    findings.push({
      ruleId: 'COMPLETENESS_SINGLE',
      titleEn: 'Single Document Available (Limited Assessment)',
      titleBn: 'কেবল একটি নথি বিদ্যমান (সীমিত মূল্যায়ন)',
      severity: 'WARNING',
      descriptionEn: 'Only one sample document was provided. Multi-record cross-referencing requires comparison against settlement survey or mutation registers.',
      descriptionBn: 'কেবল একটি নমুনা নথি পাওয়া গেছে। পূর্ণাঙ্গ ক্রস-চেকের জন্য জরিপ খতিয়ান বা নামজারি নথির প্রয়োজন।',
      evidence: { field: 'document_count', foundValue: '1 document', sourceA: selectedDocuments[0].titleEn }
    });
  }

  // 2. Identify Deeds and Khatians
  const deeds = selectedDocuments.filter((d) => d.documentType === 'DEED');
  const khatians = selectedDocuments.filter((d) => d.documentType.startsWith('KHATIAN') || d.documentType === 'MUTATION_KHT');

  // 3. Area Consistency Check
  if (deeds.length > 0 && khatians.length > 0) {
    const deed = deeds[0];
    const khatian = khatians[0];

    const deedArea = Number(deed.recordedAreaAcres);
    const khatianArea = Number(khatian.recordedAreaAcres);
    const areaDiff = Math.abs(deedArea - khatianArea);

    if (areaDiff > 0.001) {
      findings.push({
        ruleId: 'AREA_MISMATCH',
        titleEn: 'Potential Area Inconsistency Detected',
        titleBn: 'জমির পরিমাণের সম্ভাব্য অমিল শনাক্ত হয়েছে',
        severity: 'CRITICAL',
        descriptionEn: `The presented deed lists ${deedArea.toFixed(2)} Acre, whereas the reference khatian records ${khatianArea.toFixed(2)} Acre. This discrepancy of ${areaDiff.toFixed(2)} Acre requires verification with local land office records.`,
        descriptionBn: `উপস্থাপিত দলিলে ${deedArea.toFixed(2)} একর জমি উল্লেখ রয়েছে, অথচ রেফারেন্স খতিয়ানে সংরক্ষিত পরিমাণ ${khatianArea.toFixed(2)} একর। ${areaDiff.toFixed(2)} একরের এই অমিল এসিল্যান্ড কার্যালয়ের মাধ্যমে যাচাই প্রয়োজন।`,
        evidence: {
          field: 'recordedAreaAcres',
          expectedValue: `${khatianArea} Acre (${khatian.titleEn})`,
          foundValue: `${deedArea} Acre (${deed.titleEn})`,
          difference: `${areaDiff.toFixed(2)} Acre`,
          sourceA: khatian.docNumber,
          sourceB: deed.docNumber
        }
      });
    } else {
      findings.push({
        ruleId: 'AREA_MATCH',
        titleEn: 'Recorded Area Consistent Across Documents',
        titleBn: 'নথিসমূহে জমির পরিমাণ সামঞ্জস্যপূর্ণ',
        severity: 'PASS',
        descriptionEn: `Both ${deed.titleEn} and ${khatian.titleEn} record an identical area of ${deedArea.toFixed(2)} Acre.`,
        descriptionBn: `দলিল এবং খতিয়ান উভয় নথিতেই একই পরিমাণ ${deedArea.toFixed(2)} একর জমি লিপিবদ্ধ রয়েছে।`,
        evidence: {
          field: 'recordedAreaAcres',
          expectedValue: `${deedArea} Acre`,
          foundValue: `${khatianArea} Acre`
        }
      });
    }
  }

  // 4. Potential Over-Transfer Check
  if (parcel.scenarioId === 'C_OVER_TRANSFER') {
    findings.push({
      ruleId: 'POTENTIAL_OVER_TRANSFER',
      titleEn: 'Potential Over-Transfer (Deficit 0.20 Acre)',
      titleBn: 'সম্ভাব্য অতিরিক্ত হস্তান্তর (০.২০ একর ঘাটতি)',
      severity: 'CRITICAL',
      descriptionEn: 'The recorded available interest in the demo khatian share ledger is 0.30 Acre, but the new conveyance transaction attempts to transfer 0.50 Acre. This exceeds undivided co-sharer legal entitlement.',
      descriptionBn: 'ডেমো খতিয়ানের অংশ বিবরণীতে বিক্রেতার প্রাপ্যতা ০.৩০ একর, কিন্তু হস্তান্তর দলিলে ০.৫০ একর বিক্রির প্রস্তাব করা হয়েছে। এটি অনুমোদিত হিস্যার অতিরিক্ত।',
      evidence: {
        field: 'transferableShareAcres',
        expectedValue: '0.30 Acre (Max Legal Share in RS Khatian 415)',
        foundValue: '0.50 Acre (Draft Deed 6712)',
        difference: '-0.20 Acre (Deficit)',
        sourceA: 'RS-KHT-415-MIRPUR',
        sourceB: 'DEED-6712-DRAFT'
      }
    });
  }

  // 5. Missing Information Check
  if (parcel.scenarioId === 'D_MISSING_INFO') {
    findings.push({
      ruleId: 'MISSING_CHAIN_REFERENCE',
      titleEn: 'Missing Intermediate Title Lineage Link',
      titleBn: 'মধ্যবর্তী মালিকানা সংযোগকারী রেফারেন্স অনুপস্থিত',
      severity: 'WARNING',
      descriptionEn: 'The gift deed references an unlinked predecessor. Neither a registered Warishan succession certificate nor an intermediate RS mutation record was provided in the demo bundle.',
      descriptionBn: 'হেবা দলিলের পূর্ববর্তী স্বত্বাধিকারী প্রমাণের কোনো ওয়ারিশান সনদ বা অন্তর্বর্তী নামজারি খতিয়ান সংযুক্ত করা হয়নি।',
      evidence: {
        field: 'predecessorLink',
        expectedValue: 'Attested Warishan / Mutation Link',
        foundValue: 'Missing / Unverified',
        sourceA: 'Uttara Sub-Registry Bundle'
      }
    });
  }

  // 6. Parcel Identifiers Consistency (Dag, Khatian, Mouza)
  for (const doc of selectedDocuments) {
    if (doc.dagNumber !== parcel.dagNumber) {
      findings.push({
        ruleId: 'DAG_MISMATCH',
        titleEn: `Dag Number Mismatch in ${doc.titleEn}`,
        titleBn: `${doc.titleBn}-এ দাগ নম্বরের অসঙ্গতি`,
        severity: 'CRITICAL',
        descriptionEn: `Document records Dag #${doc.dagNumber}, but master parcel is registered as Dag #${parcel.dagNumber}.`,
        descriptionBn: `নথিতে দাগ নং ${doc.dagNumber} উল্লেখিত, কিন্তু মূল পার্সেল দাগ নং ${parcel.dagNumber}।`,
        evidence: {
          field: 'dagNumber',
          expectedValue: parcel.dagNumber,
          foundValue: doc.dagNumber,
          sourceA: doc.docNumber
        }
      });
    }
    if (doc.mouzaEn !== parcel.mouzaEn) {
      findings.push({
        ruleId: 'MOUZA_MISMATCH',
        titleEn: `Mouza Boundary Inconsistency in ${doc.titleEn}`,
        titleBn: `${doc.titleBn}-এ মৌজা সীমানার অমিল`,
        severity: 'CRITICAL',
        descriptionEn: `Document records Mouza "${doc.mouzaEn}", differing from registered parcel "${parcel.mouzaEn}".`,
        descriptionBn: `নথিতে মৌজা "${doc.mouzaBn}" লিপিবদ্ধ, যা মূল পার্সেলের সাথে মেলে না।`,
        evidence: {
          field: 'mouza',
          expectedValue: parcel.mouzaEn,
          foundValue: doc.mouzaEn
        }
      });
    }
  }

  // 7. Owner Name Consistency Check
  if (deeds.length > 0 && selectedDocuments.length > 1) {
    const deed = deeds[0];
    const normalizedBuyer = deed.secondParty.toLowerCase().trim();
    const normalizedOwner = parcel.recordedOwnerEn.toLowerCase().trim();

    // Check if current owner matches deed buyer
    const matches = normalizedBuyer.includes(normalizedOwner) || normalizedOwner.includes(normalizedBuyer);
    if (!matches && parcel.scenarioId !== 'C_OVER_TRANSFER') {
      findings.push({
        ruleId: 'OWNER_NAME_VARIATION',
        titleEn: 'Party Name Variation Between Records',
        titleBn: 'নথিসমূহের মধ্যে মালিকের নামের ভিন্নতা',
        severity: 'WARNING',
        descriptionEn: `Deed lists buyer as "${deed.secondParty}", whereas parcel record states "${parcel.recordedOwnerEn}". Spelling verification recommended.`,
        descriptionBn: `দলিলে গ্রহীতার নাম "${deed.secondParty}", কিন্তু পার্সেল রেকর্ডে "${parcel.recordedOwnerEn}" লিপিবদ্ধ। বানান যাচাইকরণ আবশ্যক।`,
        evidence: {
          field: 'ownerName',
          expectedValue: parcel.recordedOwnerEn,
          foundValue: deed.secondParty
        }
      });
    } else if (matches) {
      findings.push({
        ruleId: 'OWNER_NAME_MATCH',
        titleEn: 'Recorded Owner Identity Consistent',
        titleBn: 'রেকর্ডভুক্ত মালিকের পরিচয় সামঞ্জস্যপূর্ণ',
        severity: 'PASS',
        descriptionEn: `Owner "${parcel.recordedOwnerEn}" matches party details in ${deed.titleEn}.`,
        descriptionBn: `মালিক "${parcel.recordedOwnerBn}" এর তথ্য দলিলের সাথে সম্পূর্ণ মিলে গেছে।`,
        evidence: {
          field: 'ownerName',
          expectedValue: parcel.recordedOwnerEn,
          foundValue: deed.secondParty
        }
      });
    }
  }

  // 8. Determine Overall Status
  let overallStatus: IntegrityStatus = 'CONSISTENT';
  const hasCritical = findings.some((f) => f.severity === 'CRITICAL');
  const hasWarning = findings.some((f) => f.severity === 'WARNING');

  if (hasCritical) {
    overallStatus = parcel.scenarioId === 'C_OVER_TRANSFER' ? 'CRITICAL_MISMATCH' : 'REVIEW_REQUIRED';
  } else if (hasWarning) {
    overallStatus = parcel.scenarioId === 'D_MISSING_INFO' ? 'MISSING_DATA' : 'REVIEW_REQUIRED';
  } else {
    overallStatus = 'CONSISTENT';
  }

  let summaryEn = 'All selected demonstration records match across owner, identifiers, and acreage.';
  let summaryBn = 'মালিকের নাম, জমির দাগ ও খতিয়ান এবং পরিমাণের ক্ষেত্রে কোনো অমিল পাওয়া যায়নি।';

  if (overallStatus === 'CRITICAL_MISMATCH') {
    summaryEn = 'Critical discrepancy detected (e.g. potential over-transfer or boundary conflict). Manual land officer review required.';
    summaryBn = 'মারাত্মক অসঙ্গতি শনাক্ত হয়েছে (যেমন অতিরিক্ত হস্তান্তর বা সীমানা বিরোধ)। ভূমি কর্মকর্তার পর্যালোচনা প্রয়োজন।';
  } else if (overallStatus === 'REVIEW_REQUIRED') {
    summaryEn = 'Potential inconsistencies found between presented deeds and settlement records. Consult local Upazila land office.';
    summaryBn = 'উপস্থাপিত দলিল ও জরিপ রেকর্ডের মধ্যে সম্ভাব্য অসঙ্গতি পাওয়া গেছে। স্থানীয় উপজেলা ভূমি অফিসে যোগাযোগ করুন।';
  } else if (overallStatus === 'MISSING_DATA') {
    summaryEn = 'Required title chain documentation is incomplete in available sample records.';
    summaryBn = 'উপলব্ধ নমুনা নথিসমূহে মালিকানার ধারাবাহিকতা প্রমাণের প্রয়োজনীয় রেকর্ড অসম্পূর্ণ।';
  }

  return {
    id: `VER-${Date.now().toString().slice(-6)}`,
    parcelId: parcel.id,
    timestamp: new Date().toISOString(),
    overallStatus,
    summaryEn,
    summaryBn,
    findings,
    documentsAnalyzed: docIds
  };
}
