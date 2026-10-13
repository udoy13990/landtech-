import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize GoogleGenAI client on server
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// System prompt trained specifically for Bangladesh Land Services (land.gov.bd)
const BD_LAND_SYSTEM_INSTRUCTION = `
You are the official "স্মার্ট ভূমি সহকারী" (Smart Land AI Assistant) for BD LAND GUARD, an advanced citizen verification and protection platform inspired by Bangladesh's official land portal https://land.gov.bd/.
Your job is to answer questions from citizens and landowners accurately, courteously, and authoritatively in Bengali (Bangla) by default, or English if asked in English.

Key Bangladesh Land Knowledge to enforce:
1. e-Namjari (ই-নামজারি ও জমাখারিজ):
   - What it is: Changing record of rights to the new owner's name and creating a separate khatian at Upazila AC Land office.
   - Government fee: Total BDT 1,170 (Court fee BDT 20, Notice fee BDT 50, Record correction fee BDT 1,000, DCR copy fee BDT 100) or BDT 2,872 for accelerated processing.
   - Timeframe: Maximum 28 working days (often 7-15 days in Smart Land offices).
2. Khatians (খতিয়ান):
   - CS (Cadastral Survey, 1888-1940, British Bengal Tenancy Act)
   - SA (State Acquisition, 1956-1962, post-Zamindari abolition)
   - RS (Revisional Survey, error-correction and update)
   - BS / City Survey (Latest computerized survey in metropolitan areas).
3. Dag Numbers (দাগ নম্বর): Plot boundaries on cadastral mouza maps. Bata Dag (বাটা দাগ) is fragmented sub-plot; Chhut Dag (ছুট দাগ) is inadvertently omitted plot.
4. Mouza & JL (মৌজা ও জেএল নম্বর): Foundational revenue unit with unique Jurisdictional List number.
5. Deeds (দলিল): Saf-Kabla (সাফ-কবলা/Sale Deed), Heba (হেবা/Gift among blood relations), Bantan-nama (বণ্টননামা/Partition), Baya Deed (বায়া দলিল/Preceding chain deed).
6. 10 Golden Rules before buying land:
   - Check original title deed and 25-30 years of preceding Baya deeds.
   - Verify latest CS, SA, RS, BS khatians at DC Record Room / land.gov.bd.
   - Inspect physical possession (সরজমিনে দখল ও সীমানা).
   - Verify up-to-date Land Development Tax digital Dakhila (ldtax.gov.bd).
   - Check non-encumbrance certificate (দলিল নির্দায় সনদ - Form 12) from Sub-Registry to ensure land is not mortgaged.
7. Land Development Tax (ভূমি উন্নয়ন কর - খাজনা):
   - Paid online via ldtax.gov.bd with citizen NID and mobile number.
   - Dakhila (দাখিলা) is the QR-coded official payment receipt.
8. Official Land Helpline: 16122 (১৬১২২) - open 24/7 for citizen inquiries.
9. BD LAND GUARD: An intelligent verification layer that cross-checks deeds vs khatians for area mismatches, provides LandGuard Shield simulated alerts against unauthorized attempts, and maintains a tamper-evident SHA-256 audit ledger.

Always give clear, empathetic, structured answers with bullet points and practical advice.
`;

// AI Land Chatbot API Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // If Gemini API Key is available, call gemini-3.8-flash on server
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction: BD_LAND_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'দুঃখিত, তথ্যটি প্রক্রিয়াকরণে সমস্যা হয়েছে। অনুগ্রহ করে ১৬১২২ নম্বরে কল করুন।';
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local expert system:', err?.message);
    }
  }

  // Fallback: Expert system trained on Bangladesh land laws
  const reply = generateLocalLandExpertResponse(message);
  return res.json({ reply });
});

// Comprehensive local expert response generator in Bengali
function generateLocalLandExpertResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('নামজারি') || q.includes('namjari') || q.includes('খারিজ') || q.includes('mutation')) {
    return `**ই-নামজারি (Mutation) সংক্রান্ত প্রয়োজনীয় তথ্য:**

১. **নামজারি কি?**
জমি ক্রয়, ওয়ারিশ বা হেবা সূত্রে মালিকানা অর্জনের পর সরকারি রেকর্ড বুকে পূর্বের মালিকের নাম কর্তন করে নতুন মালিকের নামে খতিয়ান তৈরি করাই হলো নামজারি বা জমাখারিজ।

২. **আবেদনের মাধ্যম:**
ভূমি মন্ত্রণালয়ের অফিসিয়াল পোর্টাল **www.mutation.land.gov.bd** অথবা নিকটস্থ ডিজিটাল সেন্টার থেকে আবেদন করা যায়।

৩. **প্রয়োজনীয় কাগজপত্র:**
- মূল সাফ-কবলা দলিলের সার্টিফাইড কপি
- পিঠ বা বায়া দলিল (প্রযোজ্য ক্ষেত্রে)
- সর্বশেষ জরিপ খতিয়ান (RS বা BS/সিটি জরিপ)
- হালনাগাদ ভূমি উন্নয়ন কর (খাজনা) দাখিলা
- আবেদনকারীর জাতীয় পরিচয়পত্র (NID) ও পাসপোর্ট সাইজ ছবি
- ওয়ারিশান সনদ (উত্তরাধিকার সূত্রের ক্ষেত্রে)

৪. **সরকারি ফি:**
মোট ১,১cw৭ টাকা (কোর্ট ফি ২০ টাকা, নোটিশ জারি ফি ৫০ টাকা, রেকর্ড সংশোধন ফি ১,০০০ টাকা ও খতিয়ান ফি ১০০ টাকা)। 

৫. **সময়সীমা:**
সাধারণত সর্বোচ্চ ২৮ কার্যদিবসের মধ্যে নামজারি মঞ্জুর হয়। কোনো সমস্যা হলে সরাসরি ১৬১২২ হেল্পলাইনে যোগাযোগ করতে পারেন।`;
  }

  if (q.includes('খতিয়ান') || q.includes('khatian') || q.includes('সিএস') || q.includes('আরএস') || q.includes('বিএস') || q.includes('porcha') || q.includes('পরচা')) {
    return `**খতিয়ান (Record of Rights) পরিচিতি ও পার্থক্য:**

১. **সিএস (CS) খতিয়ান (১৮৮৮-১৯৪০):**
ব্রিটিশ আমলে ভারত উপমহাদেশের প্রথম বৈজ্ঞানিক জরিপ খতিয়ান।

২. **এসএ (SA) খতিয়ান (১৯৫৬-১৯৬২):**
জমিদারী প্রথা বিলুপ্তির পর প্রজাদের স্বত্ব নির্ধারণে তৈরি খতিয়ান।

৩. **আরএস (RS) খতিয়ান:**
সিএস ও এসএ জরিপের ভুলভ্রান্তি দূর করে প্রণীত রিভিশনাল জরিপ খতিয়ান। আদালতের কাছে এটি অত্যন্ত গ্রহণযোগ্য।

৪. **বিএস / সিটি জরিপ (BS/City Survey):**
বর্তমানে প্রস্তুতকৃত কম্পিউটারাইজড হালনাগাদ জরিপ খতিয়ান।

**খতিয়ান বের করার নিয়ম:**
অনলাইনে **eporcha.gov.bd** বা **land.gov.bd** পোর্টালে বিভাগ, জেলা, উপজেলা, মৌজা ও খতিয়ান নম্বর দিয়ে সরাসরি খতিয়ান অনুসন্ধান ও সার্টিফাইড কপি অর্ডার করা যায়।`;
  }

  if (q.includes('দাগ') || q.includes('dag') || q.includes('বাটা') || q.includes('ছুট')) {
    return `**দাগ নম্বর ও নকশা সংক্রান্ত তথ্য:**

- **দাগ নম্বর কি?**
মৌজা নকশায় চিহ্নিত প্রতিটি পৃথক প্লট বা জমির খণ্ডকে নির্দিষ্ট করার জন্য যে নম্বর দেওয়া হয় তাই দাগ নম্বর।
- **বাটা দাগ (Bata Dag):**
জমি ভাগ বা বিভক্ত হওয়ার পর মূল দাগ ভেঙে নতুন অংশ তৈরি হলে যে ভগ্নাংশ দাগ নম্বর দেওয়া হয় (যেমন: ১০১/১)।
- **ছুট দাগ (Chhut Dag):**
জরিপের সময় ভুলবশত কোনো দাগ নম্বর বাদ পড়ে গেলে পরবর্তীতে তা ছুট দাগ হিসেবে অন্তর্ভুক্ত করা হয়।
- **ডিজিটাল নকশা:** মৌজা ম্যাপ এখন অনলাইনে DLR-S এর মাধ্যমে ডিজিটাল ফরম্যাটে যাচাই করা যায়।`;
  }

  if (q.includes('কেনার') || q.includes('সাবধান') || q.includes('কাগজপত্র') || q.includes('buy') || q.includes('ক্রয়')) {
    return `**জমি কেনার পূর্বে ১০টি অত্যাবশ্যকীয় সতর্কতা:**

১. **দলিল ও বায়া দলিল যাচাই:** বিক্রেতার সাফ-কবলা দলিল এবং পূর্ববর্তী অন্তত ২৫-৩০ বছরের বায়া দলিল মিলিয়ে দেখুন।
২. **খতিয়ান ধারাবাহিকতা:** সিএস, এসএ, আরএস ও হাল সিটি/বিএস খতিয়ানে মালিকানার ধারাবাহিকতা মিল আছে কি না যাচাই করুন।
৩. **ই-নামজারি ও ডিএলআরএস নকশা:** বিক্রেতার নামে নামজারি সম্পন্ন হয়েছে কি না এবং নকশায় জমির সঠিক অবস্থান নিশ্চিত হোন।
৪. **হালনাগাদ দাখিলা (খাজনা):** চলতি বছরের ভূমি উন্নয়ন কর পরিশোধিত আছে কি না ldtax.gov.bd থেকে চেক করুন।
৫. **নির্দায় সনদ (Non-Encumbrance / Form 12):** সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিস থেকে জমিটি ব্যাংকে বন্ধক বা পূর্বে বিক্রিত কি না তা যাচাই করুন।
৬. **সরজমিনে দখল:** স্থানীয়ভাবে গিয়ে সীমানা মেপে দেখুন এবং বিক্রেতার বাস্তব দখল আছে কি না নিশ্চিত হোন।
৭. **সরকারি জমি কিনা:** জমিটি অর্পিত, পরিত্যক্ত, খাস বা বন বিভাগের আওতাভুক্ত কি না খোঁজ নিন।
৮. **পাওয়ার অব অ্যাটর্নি সতর্কতা:** আমমোক্তারনামার মাধ্যমে জমি কেনার ক্ষেত্রে মূল মালিকের সম্মতি যাচাই করুন।`;
  }

  if (q.includes('খাজনা') || q.includes('কর') || q.includes('ldtax') || q.includes('ট্যাক্স') || q.includes('দাখিলা')) {
    return `**অনলাইনে ভূমি উন্নয়ন কর (খাজনা) প্রদানের নিয়ম:**

১. **ওয়েবসাইট:** **www.ldtax.gov.bd** পোর্টালে প্রবেশ করুন।
২. **নাগরিক নিবন্ধন:** আপনার মোবাইল নম্বর ও জাতীয় পরিচয়পত্র (NID) নম্বর দিয়ে এককালীন রেজিস্ট্রেশন সম্পন্ন করুন।
৩. **হোল্ডিং এন্ট্রি:** আপনার খতিয়ান, দাগ ও পূর্বের দাখিলার বিবরণ দিয়ে হোল্ডিং যুক্ত করুন।
৪. **কর পরিশোধ:** ইউনিয়ন ভূমি সহকারী কর্মকর্তা অনুমোদনের পর বিকাশ, নগদ বা ব্যাংকিং চ্যানেলে কর পরিশোধ করুন।
৫. **ডিজিটাল দাখিলা:** কর পরিশোধের সাথে সাথে তাৎক্ষণিক কিউআর কোডযুক্ত সরকারি ডিজিটাল দাখিলা ডাউনলোড ও প্রিন্ট করে সংরক্ষণ করুন।`;
  }

  if (q.includes('জাল') || q.includes('বিরোধ') || q.includes('মামলা') || q.includes('fraud') || q.includes('সমস্যা')) {
    return `**জাল দলিল বা জমি সংক্রান্ত বিরোধের আইনি প্রতিকার:**

১. **সহকারী কমিশনার (ভূমি) এর কাছে আবেদন:**
নামজারিতে কোনো কারচুপি বা জালিয়াতি থাকলে সংশ্লিষ্ট উপজেলা এসিল্যান্ড অফিসে 'বিবিধ মিসকেস' (Miss Case) দায়ের করা যায়।

২. **সাব-রেজিস্ট্রি অফিসে তল্লাশি:**
জাল দলিলের সত্যতা যাচাইয়ে সাব-রেজিস্ট্রি অফিসের ভলিউম বই তল্লাশি দিয়ে নকল উত্তোলন করুন।

৩. **দেওয়ানি আদালত:**
দলিল বাতিলের জন্য সুনির্দিষ্ট প্রতিকার আইন (Specific Relief Act)-এর ৩৯ ধারা অনুযায়ী উপযুক্ত আদালতে মোকদ্দমা দায়ের করতে পারেন।

৪. **ল্যান্ড সার্ভে ট্রাইব্যুনাল (LST):**
সর্বশেষ জরিপে কোনো ভুল রেকর্ড হলে ল্যান্ড সার্ভে ট্রাইব্যুনালে মামলা দায়েরের সুযোগ রয়েছে।

৫. **১৬১২২ হটলাইন:**
ভূমি সংক্রান্ত যেকোনো জটিলতায় সরাসরি সরকারের ১৬১২২ নম্বরে কল করে আইনি পরামর্শ নিন।`;
  }

  return `আপনার প্রশ্নের জন্য ধন্যবাদ। 
ভূমি সংক্রান্ত যেকোনো বিষয় (যেমন: **ই-নামজারি**, **খতিয়ান অনুসন্ধান**, **জমির দাগ ও মৌজা**, **দলিল রেজিস্ট্রেশন**, **ভূমি উন্নয়ন কর বা খাজনা**, এবং **জমি কেনার সতর্কতা**) সম্পর্কে জানতে সুনির্দিষ্ট প্রশ্ন করতে পারেন।

এছাড়াও জরুরি সরকারি তথ্যের জন্য সরকারের সার্বক্ষণিক কলসেন্টার **১৬১২২** নম্বরে যোগাযোগ করতে পারেন।`;
}

// Development with Vite middleware or Production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`BD Land Guard server running at http://0.0.0.0:${port}`);
  });
}

startServer();
