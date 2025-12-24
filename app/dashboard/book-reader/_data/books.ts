// Book data structure for NCTB books
// Books from: https://nctb.portal.gov.bd/site/page/3a96de78-a64d-49e0-8a24-df9a1d305d87
//
// NOTE: The Google Drive URLs below are placeholders. To get the actual URLs:
// 1. Visit the NCTB portal page above
// 2. Click on the download links for each book
// 3. Copy the Google Drive URL (format: https://drive.google.com/file/d/FILE_ID/view?usp=drive_link)
// 4. Replace the placeholder URLs in this file with the actual URLs
// 5. The getDirectPdfUrl() function will automatically convert them to direct PDF download links

export interface Book {
  id: string;
  title: string;
  subject: string;
  class: string;
  chapters: Chapter[];
  coverImage?: string;
}

export interface Chapter {
  id: string;
  title: string;
  pdfPath: string; // Can be local path or external URL
  pageCount?: number;
  isExternal?: boolean; // Flag to indicate if it's an external URL
}

// Helper function to convert Google Drive view link to direct PDF link
export function getDirectPdfUrl(googleDriveUrl: string): string {
  // Extract file ID from Google Drive URL
  const match = googleDriveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return googleDriveUrl;
}

export const NCTB_BOOKS: Book[] = [
  {
    id: 'bengali-literature-9-10',
    title: 'বাংলা সাহিত্য',
    subject: 'Bengali',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'বাংলা সাহিত্য (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'bengali-companion-9-10',
    title: 'বাংলা সহপাঠ',
    subject: 'Bengali',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'বাংলা সহপাঠ (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'bengali-grammar-9-10',
    title: 'বাংলা ভাষার ব্যাকরণ ও নির্মিতি',
    subject: 'Bengali',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'বাংলা ভাষার ব্যাকরণ ও নির্মিতি (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'english-today-9-10',
    title: 'English For Today',
    subject: 'English',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'English For Today (Full Book)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'english-grammar-9-10',
    title: 'English Grammar and Composition',
    subject: 'English',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'English Grammar and Composition (Full Book)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'mathematics-9-10',
    title: 'গণিত',
    subject: 'Mathematics',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'গণিত (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'ict-9-10',
    title: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    subject: 'ICT',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'তথ্য ও যোগাযোগ প্রযুক্তি (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'science-9-10',
    title: 'বিজ্ঞান',
    subject: 'Science',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'বিজ্ঞান (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'physics-9-10',
    title: 'পদার্থবিজ্ঞান',
    subject: 'Physics',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'অধ্যায় ১: ভৌত রাশি এবং পরিমাপ',
        pdfPath: '/Class9-10Phy/অধ্যায়_১_ভৌত_রাশি_এবং_পরিমাপ.pdf',
        isExternal: false,
      },
      {
        id: 'ch2',
        title: 'অধ্যায় ২: গতি',
        pdfPath: '/Class9-10Phy/অধ্যায়-২_গতি.pdf',
        isExternal: false,
      },
      {
        id: 'full',
        title: 'পদার্থবিজ্ঞান (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'chemistry-9-10',
    title: 'রসায়ন',
    subject: 'Chemistry',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'রসায়ন (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'biology-9-10',
    title: 'জীববিজ্ঞান',
    subject: 'Biology',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'জীববিজ্ঞান (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'higher-mathematics-9-10',
    title: 'উচ্চতর গণিত',
    subject: 'Mathematics',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'উচ্চতর গণিত (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'geography-9-10',
    title: 'ভূগোল ও পরিবেশ',
    subject: 'Geography',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'ভূগোল ও পরিবেশ (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'economics-9-10',
    title: 'অর্থনীতি',
    subject: 'Economics',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'অর্থনীতি (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
  {
    id: 'agriculture-9-10',
    title: 'কৃষিশিক্ষা',
    subject: 'Agriculture',
    class: '৯-১০',
    chapters: [
      {
        id: 'ch1',
        title: 'কৃষিশিক্ষা (পূর্ণ বই)',
        pdfPath: 'https://drive.google.com/file/d/1EL_DZGQXh-w2qVVlHKo_BWOXkiPWGF3R/view?usp=drive_link',
        isExternal: true,
      },
    ],
  },
];

export function getBookById(id: string): Book | undefined {
  return NCTB_BOOKS.find(book => book.id === id);
}

export function getChapterById(bookId: string, chapterId: string): Chapter | undefined {
  const book = getBookById(bookId);
  return book?.chapters.find(ch => ch.id === chapterId);
}

