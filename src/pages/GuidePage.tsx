import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  HelpCircle,
  MessageSquare,
  FileText,
  Send,
  Trash2,
  ExternalLink,
  Info,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface QAItem {
  id: string;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
  category: string;
  source: string;
}

const KNOWLEDGE_BASE: QAItem[] = [
  {
    id: 'kht-diff',
    questionEn: 'What is the difference between CS, SA, RS, and City/BS Khatians?',
    questionBn: 'সিএস, এসএ, আরএস এবং সিটি/বিএস খতিয়ানের মধ্যে পার্থক্য কী?',
    answerEn: 'CS (Cadastral Survey, 1888-1940) was the first systematic survey under the British Bengal Tenancy Act. SA (State Acquisition, 1956-1962) recorded tenants after the abolition of the Zamindari system. RS (Revisional Survey) updated errors and partition mutations. BS / City Survey is the latest computerized survey in major metropolitan zones.',
    answerBn: 'সিএস (ক্যাডাস্ট্রাল সার্ভে, ১৮৮৮-১৯৪০) ব্রিটিশ আমলে প্রথম বিজ্ঞানসম্মত জরিপ। এসএ (১৯৫৬-১৯৬২) জমিদারী প্রথা বিলুপ্তির পর প্রস্তুতকৃত খতিয়ান। আরএস (রিভিশনাল সার্ভে) সিএস ও এসএ-এর ভুল সংশোধনকারী জরিপ। সিটি বা বিএস জরিপ বর্তমানের আধুনিকতম কম্পিউটারাইজড জরিপ রেকর্ড।',
    category: 'KHATIAN',
    source: 'State Acquisition and Tenancy Act, 1950 & Bengal Survey Act, 1875'
  },
  {
    id: 'dag-meaning',
    questionEn: 'What is a Dag Number and why can it change across surveys?',
    questionBn: 'দাগ নম্বর কী এবং বিভিন্ন জরিপে এটি কেন পরিবর্তিত হয়?',
    answerEn: 'A Dag Number represents an individual delineated plot boundary on a cadastral mouza map. When land is divided among heirs or sold, plots get fragmented. Consequently, a single CS Dag might be divided into multiple RS or BS Dags with new sequential identifiers.',
    answerBn: 'দাগ নম্বর হলো মৌজা নকশায় চিহ্নিত নির্দিষ্ট প্লট বা সীমানা। উত্তরাধিকার সূত্রে জমি বণ্টন বা বিক্রির ফলে পুরোনো একটি দাগ ভেঙে একাধিক নতুন দাগে রূপান্তরিত হতে পারে।',
    category: 'DAG',
    source: 'Ministry of Land Survey Guidelines'
  },
  {
    id: 'mouza-jl',
    questionEn: 'What is a Mouza and what does JL Number mean?',
    questionBn: 'মৌজা কী এবং জেএল নম্বরের তাৎপর্য কী?',
    answerEn: 'A Mouza is the foundational geographical revenue unit in Bangladesh. Each Mouza within an Upazila is assigned a unique Jurisdictional List (JL) Number for revenue administration and record room retrieval.',
    answerBn: 'মৌজা হলো ভূমি রাজস্ব প্রশাসনের ক্ষুদ্রতম ভৌগোলিক একক। একটি উপজেলার প্রতিটি মৌজাকে শনাক্ত করার জন্য একটি নির্দিষ্ট জেএল (Jurisdiction List) নম্বর বরাদ্দ থাকে।',
    category: 'MOUZA',
    source: 'Directorate of Land Records and Surveys (DLRS)'
  },
  {
    id: 'namjari-process',
    questionEn: 'What does Mutation (Namjari) mean and why is a deed alone not enough?',
    questionBn: 'নামজারি বা জমাখারিজ বলতে কী বোঝায় এবং শুধু দলিল কেন যথেষ্ট নয়?',
    answerEn: 'A registered deed transfers title between parties, but the government revenue records still show the seller as the tax-paying tenant. Mutation (e-Namjari) registers the buyer’s name in the Upazila AC Land office, cancels the previous owner’s holding, and creates a separate Khatian with a distinct DCR receipt.',
    answerBn: 'রেজিস্ট্রিকৃত দলিল মালিকানা হস্তান্তরের প্রমাণ হলেও সরকারি রেকর্ড রুমে পূর্বের মালিকের নাম বহাল থাকে। ই-নামজারির মাধ্যমে সাবেক মালিকের নাম কর্তন করে নতুন মালিকের নামে পৃথক খতিয়ান খোলা হয়।',
    category: 'MUTATION',
    source: 'e-Mutation Operations Manual, Land Reform Board'
  },
  {
    id: 'qr-vs-consistency',
    questionEn: 'Why can a QR-verified document still have an area mismatch?',
    questionBn: 'একটি কিউআর-কোড যাচাইকৃত দলিলেও কেন ক্ষেত্রফলের অমিল থাকতে পারে?',
    answerEn: 'A digital QR code confirms that the digital document was authentic as registered at the sub-registry. However, it does not guarantee cross-record consistency if the deed attempted to convey 0.80 Acre when the underlying survey record only permits 0.60 Acre. Cross-record consistency requires comparing across registers.',
    answerBn: 'কিউআর কোড কেবল নিশ্চিত করে যে দলিলটি সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে সঠিকভাবে নিবন্ধিত হয়েছে। কিন্তু দলিলে যদি খতিয়ানের নির্ধারিত পরিমাণের চেয়ে বেশি জমি লেখা থাকে, তবে তা ক্রস-রেকর্ড যাচাইয়ে ধরা পড়ে।',
    category: 'VERIFICATION',
    source: 'BD LAND GUARD Verification Principles'
  },
  {
    id: 'ldtax-dakhila',
    questionEn: 'What is Land Development Tax and Digital Dakhila?',
    questionBn: 'ভূমি উন্নয়ন কর (খাজনা) এবং ডিজিটাল দাখিলা কী?',
    answerEn: 'Land Development Tax is the annual statutory revenue payable to the state for holding land. Digital Dakhila is the instant computerized payment receipt generated with a verifiable QR code upon paying through the national ldtax.gov.bd portal.',
    answerBn: 'ভূমি উন্নয়ন কর হলো জমির মালিকানার বিপরীতে সরকারকে প্রদেয় বার্ষিক খাজনা। ডিজিটাল দাখিলা হলো ldtax.gov.bd পোর্টালে খাজনা পরিশোধের পর প্রাপ্ত তাৎক্ষণিক কিউআর কোডযুক্ত সরকারি রশিদ।',
    category: 'TAX',
    source: 'Land Development Tax Act, 2023'
  }
];

export const GuidePage: React.FC = () => {
  const { language, t, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { role: 'user' | 'assistant'; text: string; source?: string }[]
  >([
    {
      role: 'assistant',
      text:
        language === 'bn'
          ? 'স্বাগতম! আমি বিডি ল্যান্ড গার্ড ডেমো গাইড অ্যাসিস্ট্যান্ট। ভূমি রেকর্ড, খতিয়ান, নামজারি বা দলিল সংক্রান্ত যেকোনো বিষয়ে প্রশ্ন করতে পারেন।'
          : 'Welcome! I am the BD LAND GUARD Demo Guidance Assistant. Ask any question regarding Bangladesh land records, khatians, mutations, or verification procedures.'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  const filteredQAs = KNOWLEDGE_BASE.filter(
    (item) =>
      item.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.questionBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answerEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAsk = (questionText?: string) => {
    const q = questionText || inputQuestion;
    if (!q.trim()) return;

    const userMsg = { role: 'user' as const, text: q };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');

    // Match with knowledge base
    const lower = q.toLowerCase();
    const match = KNOWLEDGE_BASE.find(
      (k) =>
        lower.includes('khatian') ||
        lower.includes('খতিয়ান') ||
        lower.includes('dag') ||
        lower.includes('দাগ') ||
        lower.includes('mutation') ||
        lower.includes('namjari') ||
        lower.includes('নামজারি') ||
        lower.includes('qr') ||
        lower.includes('tax') ||
        lower.includes('খাজনা')
    );

    setTimeout(() => {
      if (match) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: language === 'bn' ? match.answerBn : match.answerEn,
            source: match.source
          }
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text:
              language === 'bn'
                ? 'আপনার প্রশ্নের সুনির্দিষ্ট তথ্য আমাদের ডেমো নির্দেশিকায় নেই। বিস্তারিত তথ্যের জন্য স্থানীয় উপজেলা ভূমি অফিস বা land.gov.bd পোর্টালে যোগাযোগ করুন।'
                : 'The specific guidance for this inquiry is not cataloged in our local demo knowledge base. Please consult the official land.gov.bd portal or your local Upazila Land Office for authoritative legal advice.'
          }
        ]);
      }
    }, 400);
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        role: 'assistant',
        text:
          language === 'bn'
            ? 'চ্যাট হিস্ট্রি রিসেট করা হয়েছে। নতুন প্রশ্ন লিখুন।'
            : 'Chat conversation reset. Feel free to ask a new question.'
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="space-y-1 pb-6 border-b border-[#DCE6DF]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#006A4E] uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge Base & Guidance Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#17231E]">
          {language === 'bn' ? 'ভূমি সেবা নির্দেশিকা ও পরিভাষা' : 'Land Service Guide & Copilot'}
        </h1>
        <p className="text-xs sm:text-sm text-[#68766F] max-w-3xl leading-relaxed">
          {language === 'bn'
            ? 'খতিয়ান, দাগ, মৌজা, নামজারি ও ভূমি রেজিস্ট্রেশনের সাধারণ পরিভাষা ও নির্দেশনাবলী সহজ ভাষায় জানুন।'
            : 'Explore clear, plain-language explanations of Bangladesh land rights, cadastral surveys, e-Mutation hearings, and taxes.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Assistant Chat */}
        <div className="lg:col-span-5 bg-white border border-[#DCE6DF] rounded-3xl p-6 shadow-xs space-y-4 flex flex-col h-[580px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE6DF]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#006A4E] flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#17231E]">Demo Guidance Copilot</h3>
                <span className="text-[10px] text-[#68766F]">Grounded Demo Knowledge</span>
              </div>
            </div>
            <button
              onClick={handleClearChat}
              className="text-xs text-[#68766F] hover:text-[#C62828] p-1.5 rounded-lg hover:bg-gray-100"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Question Prompts */}
          <div className="space-y-1.5 pb-2 border-b border-[#DCE6DF]/60">
            <span className="text-[10px] font-bold text-[#68766F] uppercase block">
              Suggested Questions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleAsk('What is the difference between CS and RS Khatians?')}
                className="text-[11px] bg-[#F5F8F6] hover:bg-[#EAEFEA] text-[#17231E] px-2.5 py-1 rounded-lg border border-[#DCE6DF] transition-colors"
              >
                CS vs RS Khatian
              </button>
              <button
                onClick={() => handleAsk('What does mutation mean?')}
                className="text-[11px] bg-[#F5F8F6] hover:bg-[#EAEFEA] text-[#17231E] px-2.5 py-1 rounded-lg border border-[#DCE6DF] transition-colors"
              >
                Why e-Namjari?
              </button>
              <button
                onClick={() => handleAsk('Why can a QR document have area mismatch?')}
                className="text-[11px] bg-[#F5F8F6] hover:bg-[#EAEFEA] text-[#17231E] px-2.5 py-1 rounded-lg border border-[#DCE6DF] transition-colors"
              >
                QR vs Area Discrepancy
              </button>
            </div>
          </div>

          {/* Conversation Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#006A4E] text-white rounded-br-none'
                      : 'bg-[#F5F8F6] border border-[#DCE6DF] text-[#17231E] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.source && (
                    <div className="text-[10px] text-gray-500 pt-1 mt-1 border-t border-black/5">
                      Grounding: {msg.source}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2 pt-2 border-t border-[#DCE6DF]"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Ask about land records, khatians, dags..."
              className="flex-1 bg-[#F5F8F6] border border-[#DCE6DF] rounded-xl px-3 py-2 text-xs text-[#17231E] focus:outline-hidden focus:ring-2 focus:ring-[#006A4E]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#006A4E] text-white hover:bg-[#064E3B] transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Grounded Glossary & Curated Q&A */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#68766F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search land terms, Khatians, Dags, Mutation..."
              className="w-full bg-white border border-[#DCE6DF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#17231E] focus:outline-hidden focus:ring-2 focus:ring-[#006A4E]"
            />
          </div>

          <div className="space-y-3">
            {filteredQAs.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#DCE6DF] rounded-2xl p-5 shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#17231E]">
                    {language === 'bn' ? item.questionBn : item.questionEn}
                  </h3>
                  <span className="text-[10px] font-mono text-[#68766F] bg-[#F5F8F6] px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-[#68766F] leading-relaxed">
                  {language === 'bn' ? item.answerBn : item.answerEn}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#006A4E] border-t border-[#DCE6DF]/50">
                  <span className="text-[#68766F]">Source: {item.source}</span>
                  <button
                    onClick={() => handleAsk(item.questionEn)}
                    className="font-semibold hover:underline"
                  >
                    Ask in Copilot →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Legal Notice */}
          <div className="p-4 rounded-xl bg-[#F5F8F6] border border-[#DCE6DF] text-xs text-[#68766F] leading-relaxed">
            <span className="font-bold text-[#17231E]">Official Reference Note: </span>
            For authoritative legal guidance and formal mutation procedures, always refer to the official Ministry of Land website (land.gov.bd) and visit your respective Assistant Commissioner (Land) office.
          </div>
        </div>
      </div>
    </div>
  );
};
