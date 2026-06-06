/**
 * Types definition for the Book Library & CMS platform.
 */

export interface Chapter {
  id: string;
  title: string;
  content: string; // Chapter body text formatted in paragraphs (or Markdown)
  durationMin: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverColor: string; // Tailwind class string for gradient (e.g. 'from-cyan-900 to-indigo-950')
  coverDesignType: 'classic' | 'modern' | 'minimalist' | 'artistic';
  chapters: Chapter[];
  createdAt: string;
  tags: string[];
  pagesCount: number;
  pdfUrl?: string; // Optional raw PDF file data or mock link
}
