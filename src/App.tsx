import React, { useState, useEffect } from 'react';
import { Book } from './types';
import { INITIAL_BOOKS } from './data';
import Library from './components/Library';
import Reader from './components/Reader';
import CMSDashboard from './components/CMSDashboard';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentView, setCurrentView] = useState<'library' | 'reader' | 'cms'>('library');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Initialize books from localStorage or preset defaults
  useEffect(() => {
    const saved = localStorage.getItem('ghislain-library-catalogue');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBooks(parsed);
          return;
        }
      } catch (e) {
        console.error("Could not parse saved catalog, loading presets instead.", e);
      }
    }
    setBooks(INITIAL_BOOKS);
  }, []);

  const handleSaveBooks = (newBooks: Book[]) => {
    setBooks(newBooks);
    localStorage.setItem('ghislain-library-catalogue', JSON.stringify(newBooks));
  };

  const handleSelectBookToRead = (book: Book) => {
    setSelectedBook(book);
    setCurrentView('reader');
  };

  const handleBackToLibrary = () => {
    setSelectedBook(null);
    setCurrentView('library');
  };

  const handleEnterAdminCMS = () => {
    setCurrentView('cms');
  };

  const handleExitAdminCMS = () => {
    setCurrentView('library');
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8f5]">
      {currentView === 'library' && (
        <Library
          books={books}
          onSelectBook={handleSelectBookToRead}
          onEnterAdmin={handleEnterAdminCMS}
        />
      )}

      {currentView === 'reader' && selectedBook && (
        <Reader
          book={selectedBook}
          onBack={handleBackToLibrary}
        />
      )}

      {currentView === 'cms' && (
        <CMSDashboard
          books={books}
          onSaveBooks={handleSaveBooks}
          onExit={handleExitAdminCMS}
        />
      )}
    </div>
  );
}
