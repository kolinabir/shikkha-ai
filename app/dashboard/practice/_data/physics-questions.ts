// Mock data for Class 9 Physics - Chapter 3: চাপ ও পদার্থের অবস্থা (Pressure and States of Matter)

export interface Question {
  id: string;
  question: string;
  type: 'mcq' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  points: number;
}

export const PHYSICS_CHAPTER_3_QUESTIONS: Question[] = [
  // Easy Questions
  {
    id: 'phy-ch3-easy-1',
    question: 'চাপের (Pressure) এসআই একক কী?',
    type: 'mcq',
    options: ['নিউটন', 'প্যাসকেল', 'জুল', 'ওয়াট'],
    correctAnswer: 1,
    explanation: 'চাপের এসআই একক হলো প্যাসকেল (Pa)। 1 Pa = 1 N/m²',
    difficulty: 'easy',
    topic: 'চাপের সংজ্ঞা',
    points: 10
  },
  {
    id: 'phy-ch3-easy-2',
    question: 'পদার্থের তিনটি অবস্থা হলো: কঠিন, তরল এবং গ্যাসীয়।',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'সঠিক। পদার্থের তিনটি প্রধান অবস্থা হলো কঠিন, তরল এবং গ্যাসীয়।',
    difficulty: 'easy',
    topic: 'পদার্থের অবস্থা',
    points: 10
  },
  {
    id: 'phy-ch3-easy-3',
    question: 'প্যাসকেলের সূত্র অনুযায়ী, তরলে প্রযুক্ত চাপ সব দিকে _______ ভাবে সঞ্চালিত হয়।',
    type: 'fill-blank',
    correctAnswer: 'সমান',
    explanation: 'প্যাসকেলের সূত্র অনুযায়ী, একটি আবদ্ধ তরলে প্রযুক্ত চাপ সব দিকে সমানভাবে সঞ্চালিত হয়।',
    difficulty: 'easy',
    topic: 'প্যাসকেলের সূত্র',
    points: 10
  },
  {
    id: 'phy-ch3-easy-4',
    question: 'বায়ুমণ্ডলীয় চাপ পরিমাপ করার যন্ত্রের নাম কী?',
    type: 'mcq',
    options: ['থার্মোমিটার', 'ব্যারোমিটার', 'হাইগ্রোমিটার', 'অ্যানিমোমিটার'],
    correctAnswer: 1,
    explanation: 'বায়ুমণ্ডলীয় চাপ পরিমাপ করার যন্ত্র হলো ব্যারোমিটার।',
    difficulty: 'easy',
    topic: 'চাপ পরিমাপ',
    points: 10
  },
  {
    id: 'phy-ch3-easy-5',
    question: 'সমুদ্রপৃষ্ঠে বায়ুমণ্ডলীয় চাপের মান প্রায় 101325 প্যাসকেল।',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'সঠিক। সমুদ্রপৃষ্ঠে আদর্শ বায়ুমণ্ডলীয় চাপ 101325 Pa বা 1 atm।',
    difficulty: 'easy',
    topic: 'বায়ুমণ্ডলীয় চাপ',
    points: 10
  },

  // Medium Questions
  {
    id: 'phy-ch3-medium-1',
    question: 'একটি বাক্সের ক্ষেত্রফল 2 m² এবং এর উপর 1000 N বল প্রযুক্ত হলে চাপ কত হবে?',
    type: 'mcq',
    options: ['500 Pa', '1000 Pa', '2000 Pa', '5000 Pa'],
    correctAnswer: 0,
    explanation: 'চাপ = বল/ক্ষেত্রফল = 1000 N / 2 m² = 500 Pa',
    difficulty: 'medium',
    topic: 'চাপের হিসাব',
    points: 15
  },
  {
    id: 'phy-ch3-medium-2',
    question: 'প্যাসকেলের সূত্রের প্রয়োগ কোন যন্ত্রে দেখা যায়?',
    type: 'mcq',
    options: ['হাইড্রোলিক লিফট', 'থার্মোমিটার', 'স্পিডোমিটার', 'অলটিমিটার'],
    correctAnswer: 0,
    explanation: 'হাইড্রোলিক লিফট প্যাসকেলের সূত্রের একটি বাস্তব প্রয়োগ। ছোট বল প্রয়োগ করে বড় ভার উত্তোলন করা যায়।',
    difficulty: 'medium',
    topic: 'প্যাসকেলের সূত্রের প্রয়োগ',
    points: 15
  },
  {
    id: 'phy-ch3-medium-3',
    question: 'তরলের গভীরতা বৃদ্ধি পেলে চাপ _______।',
    type: 'fill-blank',
    correctAnswer: 'বৃদ্ধি পায়',
    explanation: 'তরলের গভীরতা বৃদ্ধি পেলে চাপ বৃদ্ধি পায়। কারণ P = hρg সূত্র অনুযায়ী চাপ গভীরতার সমানুপাতিক।',
    difficulty: 'medium',
    topic: 'তরলে চাপ',
    points: 15
  },
  {
    id: 'phy-ch3-medium-4',
    question: 'একটি তরলের ঘনত্ব 1000 kg/m³ এবং গভীরতা 5 m হলে চাপ কত হবে? (g = 9.8 m/s²)',
    type: 'mcq',
    options: ['4900 Pa', '49000 Pa', '5000 Pa', '50000 Pa'],
    correctAnswer: 1,
    explanation: 'P = hρg = 5 m × 1000 kg/m³ × 9.8 m/s² = 49000 Pa',
    difficulty: 'medium',
    topic: 'তরলে চাপের হিসাব',
    points: 15
  },
  {
    id: 'phy-ch3-medium-5',
    question: 'বায়ুচাপ পরিমাপে পারদ ব্যারোমিটারের উচ্চতা সমুদ্রপৃষ্ঠে প্রায় 76 cm হয়।',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'সঠিক। সমুদ্রপৃষ্ঠে আদর্শ বায়ুমণ্ডলীয় চাপ পারদ ব্যারোমিটারে 76 cm উচ্চতা তৈরি করে।',
    difficulty: 'medium',
    topic: 'ব্যারোমিটার',
    points: 15
  },

  // Hard Questions
  {
    id: 'phy-ch3-hard-1',
    question: 'একটি হাইড্রোলিক লিফটে ছোট পিস্টনের ক্ষেত্রফল 0.01 m² এবং বড় পিস্টনের ক্ষেত্রফল 0.5 m²। যদি ছোট পিস্টনে 100 N বল প্রয়োগ করা হয়, তাহলে বড় পিস্টনে কত বল পাওয়া যাবে?',
    type: 'mcq',
    options: ['500 N', '5000 N', '10000 N', '50000 N'],
    correctAnswer: 1,
    explanation: 'প্যাসকেলের সূত্র অনুযায়ী: F₁/A₁ = F₂/A₂, তাই F₂ = (F₁ × A₂)/A₁ = (100 × 0.5)/0.01 = 5000 N',
    difficulty: 'hard',
    topic: 'হাইড্রোলিক সিস্টেম',
    points: 20
  },
  {
    id: 'phy-ch3-hard-2',
    question: 'একটি তরলের মধ্যে 10 m গভীরতায় চাপ 98000 Pa হলে, তরলের ঘনত্ব কত? (g = 9.8 m/s²)',
    type: 'mcq',
    options: ['800 kg/m³', '900 kg/m³', '1000 kg/m³', '1100 kg/m³'],
    correctAnswer: 2,
    explanation: 'P = hρg, তাই ρ = P/(hg) = 98000/(10 × 9.8) = 1000 kg/m³',
    difficulty: 'hard',
    topic: 'তরলের ঘনত্ব নির্ণয়',
    points: 20
  },
  {
    id: 'phy-ch3-hard-3',
    question: 'প্যাসকেলের সূত্র শুধুমাত্র সংকোচনযোগ্য তরলের জন্য প্রযোজ্য।',
    type: 'true-false',
    correctAnswer: false,
    explanation: 'ভুল। প্যাসকেলের সূত্র সংকোচনযোগ্য তরলের জন্য প্রযোজ্য নয়, এটি অপরিবর্তনীয় (incompressible) তরলের জন্য প্রযোজ্য।',
    difficulty: 'hard',
    topic: 'প্যাসকেলের সূত্রের শর্ত',
    points: 20
  },
  {
    id: 'phy-ch3-hard-4',
    question: 'একটি জলাধারের তলদেশে চাপ 196000 Pa। জলাধারের গভীরতা কত? (জলের ঘনত্ব = 1000 kg/m³, g = 9.8 m/s²)',
    type: 'mcq',
    options: ['15 m', '18 m', '20 m', '25 m'],
    correctAnswer: 2,
    explanation: 'P = hρg, তাই h = P/(ρg) = 196000/(1000 × 9.8) = 20 m',
    difficulty: 'hard',
    topic: 'গভীরতা নির্ণয়',
    points: 20
  },
  {
    id: 'phy-ch3-hard-5',
    question: 'বায়ুমণ্ডলীয় চাপের পরিবর্তন আবহাওয়া পূর্বাভাসে গুরুত্বপূর্ণ ভূমিকা পালন করে।',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'সঠিক। বায়ুমণ্ডলীয় চাপের পরিবর্তন আবহাওয়ার পূর্বাভাসের জন্য একটি গুরুত্বপূর্ণ সূচক। উচ্চ চাপ সাধারণত ভালো আবহাওয়া নির্দেশ করে।',
    difficulty: 'hard',
    topic: 'বায়ুমণ্ডলীয় চাপের প্রয়োগ',
    points: 20
  }
];

export const CHAPTER_3_TOPICS = [
  'চাপের সংজ্ঞা',
  'পদার্থের অবস্থা',
  'প্যাসকেলের সূত্র',
  'চাপ পরিমাপ',
  'বায়ুমণ্ডলীয় চাপ',
  'চাপের হিসাব',
  'প্যাসকেলের সূত্রের প্রয়োগ',
  'তরলে চাপ',
  'তরলে চাপের হিসাব',
  'ব্যারোমিটার',
  'হাইড্রোলিক সিস্টেম',
  'তরলের ঘনত্ব নির্ণয়',
  'প্যাসকেলের সূত্রের শর্ত',
  'গভীরতা নির্ণয়',
  'বায়ুমণ্ডলীয় চাপের প্রয়োগ'
];

