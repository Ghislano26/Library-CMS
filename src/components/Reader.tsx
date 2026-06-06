import React, { useState, useEffect } from 'react';
import { Book, Chapter } from '../types';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Moon, Sun, 
  BookOpen, Sliders, Type, Database, Check, RefreshCw, Printer, Download, Eye
} from 'lucide-react';

interface ReaderProps {
  book: Book;
  onBack: () => void;
  initialChapterId?: string;
}

type ReaderTheme = 'sepia' | 'light' | 'dark';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export default function Reader({ book, onBack, initialChapterId }: ReaderProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [theme, setTheme] = useState<ReaderTheme>('sepia');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showPrintTemplate, setShowPrintTemplate] = useState(false);

  // Load initial chapter if specified
  useEffect(() => {
    if (initialChapterId && book.chapters.length > 0) {
      const idx = book.chapters.findIndex(ch => ch.id === initialChapterId);
      if (idx !== -1) {
        setCurrentChapterIndex(idx);
      }
    }
  }, [initialChapterId, book.chapters]);

  // Handle bookmarks in localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`bookmark-${book.id}`);
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, [book.id]);

  const toggleBookmark = (chapterId: string) => {
    const updated = bookmarks.includes(chapterId)
      ? bookmarks.filter(id => id !== chapterId)
      : [...bookmarks, chapterId];
    
    setBookmarks(updated);
    localStorage.setItem(`bookmark-${book.id}`, JSON.stringify(updated));
  };

  const currentChapter: Chapter | undefined = book.chapters[currentChapterIndex];

  // Font class switcher
  const getFontClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm sm:text-base leading-relaxed';
      case 'md': return 'text-base sm:text-lg leading-relaxed';
      case 'lg': return 'text-lg sm:text-xl leading-relaxed';
      case 'xl': return 'text-xl sm:text-2xl leading-relaxed';
    }
  };

  // Background and color themes
  const getThemeClasses = () => {
    switch (theme) {
      case 'sepia':
        return {
          bgColor: 'bg-[#fbf4e9]',
          textColor: 'text-[#433422]',
          accentColor: 'border-[#dfd0bd] bg-[#f8ebd4] hover:bg-[#ebd9bf]',
          navbarColor: 'bg-[#f4e6d3] border-b border-[#dfd0bd]',
        };
      case 'light':
        return {
          bgColor: 'bg-zinc-50',
          textColor: 'text-zinc-805',
          accentColor: 'border-zinc-200 bg-white hover:bg-zinc-100',
          navbarColor: 'bg-white border-b border-zinc-200',
        };
      case 'dark':
        return {
          bgColor: 'bg-zinc-950',
          textColor: 'text-zinc-300',
          accentColor: 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800',
          navbarColor: 'bg-zinc-900/90 border-b border-zinc-800',
        };
    }
  };

  const themeStyle = getThemeClasses();

  // Print friendly PDF or download logic
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const chaptersHtml = book.chapters.map((ch, idx) => `
      <div class="chapter-page">
        <h2>Chapitre ${idx + 1} : ${ch.title}</h2>
        <p class="chapter-meta">Temps de lecture : ${ch.durationMin} minutes</p>
        <div class="chapter-content">
          ${ch.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
    `).join('<div class="page-break"></div>');

    printWindow.document.write(`
      <html>
        <head>
          <title>${book.title} - ${book.author}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600&display=swap');
            body {
              font-family: 'Playfair Display', Georgia, serif;
              color: #111;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              font-family: 'Playfair Display', Georgia, serif;
              text-align: center;
              font-size: 36px;
              margin-top: 100px;
              margin-bottom: 10px;
            }
            .author {
              text-align: center;
              font-size: 20px;
              font-style: italic;
              color: #555;
              margin-bottom: 50px;
            }
            .genre {
              text-align: center;
              font-family: 'Inter', sans-serif;
              text-transform: uppercase;
              letter-spacing: 2px;
              font-size: 12px;
              color: #666;
            }
            .divider {
              width: 80px;
              height: 2px;
              background-color: #333;
              margin: 40px auto;
            }
            .intro {
              text-align: center;
              font-style: italic;
              color: #444;
              margin-bottom: 15rem;
            }
            .page-break {
              page-break-after: always;
              height: 1px;
              margin-top: 20px;
            }
            .chapter-page {
              margin-top: 40px;
              page-break-inside: avoid;
            }
            h2 {
              font-size: 24px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 8px;
              margin-top: 30px;
            }
            .chapter-meta {
              font-family: 'Inter', sans-serif;
              font-size: 12px;
              color: #666;
              margin-bottom: 20px;
            }
            p {
              margin-bottom: 1.5em;
              text-indent: 20px;
              text-align: justify;
            }
            @media print {
              body { padding: 0; }
              .page-break { page-break-after: always; }
            }
          </style>
        </head>
        <body>
          <div class="genre">${book.genre}</div>
          <h1>${book.title}</h1>
          <div class="author">Par ${book.author}</div>
          <div class="divider"></div>
          <div class="intro">${book.description}</div>
          <div class="page-break"></div>
          
          <div class="table-of-contents">
            <h2 style="border:none; text-align:center;">Table des Matières</h2>
            <ul style="list-style: none; padding: 0; max-width: 400px; margin: 0 auto;">
              ${book.chapters.map((ch, i) => `
                <li style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dotted #ccc;">
                  <span>Chapitre ${i + 1} : ${ch.title}</span>
                  <span>${ch.durationMin} min</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="page-break"></div>
          
          ${chaptersHtml}
          
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadTxt = () => {
    let textContent = `=========================================\n`;
    textContent += `${book.title}\n`;
    textContent += `Par ${book.author}\n`;
    textContent += `Genre: ${book.genre}\n`;
    textContent += `=========================================\n\n`;
    textContent += `Description:\n${book.description}\n\n`;
    textContent += `-----------------------------------------\n\n`;

    book.chapters.forEach((ch, idx) => {
      textContent += `Chapitre ${idx + 1} : ${ch.title} (${ch.durationMin} minutes de lecture)\n`;
      textContent += `-----------------------------------------\n\n`;
      textContent += `${ch.content}\n\n\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="reader-container" className={`min-h-screen flex flex-col font-serif ${themeStyle.bgColor} ${themeStyle.textColor} transition-colors duration-300`}>
      
      {/* Top Navigation Bar */}
      <header className={`sticky top-0 z-40 px-4 py-3 flex items-center justify-between ${themeStyle.navbarColor} transition-all shadow-sm`}>
        <div className="flex items-center gap-3">
          <button
            id="reader-back-btn"
            onClick={onBack}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Retour à la bibliothèque"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="text-left">
            <h4 className="font-sans font-bold text-xs sm:text-sm line-clamp-1 opacity-90">{book.title}</h4>
            <p className="font-sans text-[10px] sm:text-xs opacity-60">par {book.author}</p>
          </div>
        </div>

        {/* Reader Toolbar Actions */}
        <div className="flex items-center gap-2">
          {/* Quick PDF generator */}
          <button
            id="pdf-print-btn"
            onClick={handlePrint}
            className="p-2 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 border border-amber-900/10 dark:border-white/10 bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            title="Générer un PDF propre pour imprimer ou enregistrer"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimer/PDF</span>
          </button>

          <button
            id="txt-download-btn"
            onClick={handleDownloadTxt}
            className="p-2 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 border border-amber-900/10 dark:border-white/10 bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            title="Télécharger en fichier texte (.txt)"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Txt</span>
          </button>

          {/* Config Controls Button */}
          <button
            id="reader-settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative"
            title="Ajustements de lecture"
          >
            <Sliders className="w-5 h-5 text-inherit" />
          </button>
        </div>
      </header>

      {/* Floating Adjustments Menu */}
      {showSettings && (
        <div className="mx-auto mt-2 max-w-xl w-full px-4 relative z-50">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-4 font-sans text-sm text-zinc-800 dark:text-zinc-200">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <span className="font-bold">Paramètres de lecture</span>
              <button onClick={() => setShowSettings(false)} className="text-zinc-400 hover:text-zinc-650 font-bold">✕</button>
            </div>

            {/* Themes Selection */}
            <div className="mb-4">
              <span className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Thème de fond</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('sepia')}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 text-[#433422] bg-[#fbf4e9] cursor-pointer ${
                    theme === 'sepia' ? 'border-amber-600 ring-2 ring-amber-500/20' : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Sépia</span>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 text-zinc-900 bg-white cursor-pointer ${
                    theme === 'light' ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Lumière</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 text-zinc-100 bg-zinc-950 cursor-pointer ${
                    theme === 'dark' ? 'border-zinc-500 ring-2 ring-zinc-500/20' : 'border-zinc-850'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Sombre</span>
                </button>
              </div>
            </div>

            {/* Font Size Selection */}
            <div>
              <span className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Taille du texte</span>
              <div className="flex items-center gap-2">
                {(['sm', 'md', 'lg', 'xl'] as FontSize[]).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`flex-1 py-1 px-2 text-center rounded border capitalize cursor-pointer text-xs ${
                      fontSize === sz
                        ? 'border-zinc-800 dark:border-zinc-200 bg-zinc-100 dark:bg-zinc-800 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {sz === 'sm' ? 'Petit' : sz === 'md' ? 'Moyen' : sz === 'lg' ? 'Grand' : 'Très Grand'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-6xl w-full mx-auto p-4 gap-6">
        
        {/* Chapters Left Sidebar Drawer */}
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20 md:h-[calc(100vh-140px)] overflow-y-auto rounded-xl p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5">
          <div className="flex items-center gap-2 font-sans font-bold text-sm mb-3 text-zinc-550 dark:text-zinc-400 uppercase tracking-widest">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Sommaire</span>
          </div>
          
          <ul className="space-y-1 text-sm font-sans">
            {book.chapters.map((ch, index) => {
              const isSelected = index === currentChapterIndex;
              const isBookmarked = bookmarks.includes(ch.id);

              return (
                <li key={ch.id}>
                  <button
                    onClick={() => setCurrentChapterIndex(index)}
                    className={`w-full text-left p-2.5 rounded-lg flex items-start justify-between gap-2 border transition-all text-xs sm:text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600/10 border-amber-500/20 text-amber-600 font-semibold'
                        : 'border-transparent text-inherit hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="line-clamp-2">
                        {index + 1}. {ch.title}
                      </span>
                      <span className="text-[10px] opacity-60 font-mono">{ch.durationMin} minutes</span>
                    </div>

                    {isBookmarked && (
                      <span className="bg-amber-500 text-white rounded-full p-0.5" title="Marque-page actif">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Dynamic Reader Content Section */}
        <main className="flex-1 max-w-2xl mx-auto w-full py-2">
          {currentChapter ? (
            <article className="animate-fade-in">
              {/* Chapter Header */}
              <header className="mb-8 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-sans text-xs tracking-wider uppercase opacity-60">
                    Chapitre {currentChapterIndex + 1} sur {book.chapters.length}
                  </span>

                  {/* Toggle bookmark */}
                  <button
                    onClick={() => toggleBookmark(currentChapter.id)}
                    className={`p-1.5 rounded-md text-xs font-sans flex items-center gap-1 border transition-all ${
                      bookmarks.includes(currentChapter.id)
                        ? 'bg-amber-500 border-amber-600 text-white font-bold'
                        : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    title="Poser un marque-page"
                  >
                    <Check className={`w-3.5 h-3.5 ${bookmarks.includes(currentChapter.id) ? 'inline-block' : 'hidden'}`} />
                    <span>Marque-page</span>
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight mt-1 mb-3">
                  {currentChapter.title}
                </h1>
                
                <div className="flex items-center gap-4 text-xs font-sans opacity-50">
                  <span>Vitesse moyenne : 250 mots/min</span>
                  <span>•</span>
                  <span>Temps de lecture estimé : {currentChapter.durationMin} minutes</span>
                </div>
              </header>

              {/* Chapter Content Paragraphs */}
              <div className={`${getFontClass()} text-justify space-y-6 select-text pr-1 font-serif`}>
                {currentChapter.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-inherit indent-6">
                    {para}
                  </p>
                ))}
              </div>

              {/* Progress and Chapter Navigation */}
              <footer className="mt-12 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-sans">
                <button
                  disabled={currentChapterIndex === 0}
                  onClick={() => setCurrentChapterIndex(currentChapterIndex - 1)}
                  className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs sm:text-sm flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>

                <div className="text-center font-mono text-xs opacity-50">
                  {Math.round(((currentChapterIndex + 1) / book.chapters.length) * 100)}% lu
                </div>

                <button
                  disabled={currentChapterIndex === book.chapters.length - 1}
                  onClick={() => setCurrentChapterIndex(currentChapterIndex + 1)}
                  className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs sm:text-sm flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Suivant</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </footer>
            </article>
          ) : (
            <div className="py-20 text-center font-sans">
              <p className="opacity-50 mb-3">Ce livre ne contient aucun chapitre pour le moment.</p>
              <button onClick={onBack} className="text-amber-600 font-bold text-sm">Retourner à la bibliothèque</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
