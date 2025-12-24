// Book data structure for NCTB books

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
  pdfPath: string;
  pageCount?: number;
}

export const NCTB_BOOKS: Book[] = [
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
      },
      {
        id: 'ch2',
        title: 'অধ্যায় ২: গতি',
        pdfPath: '/Class9-10Phy/অধ্যায়-২_গতি.pdf',
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

