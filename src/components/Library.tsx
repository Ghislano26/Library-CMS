import React, { useState } from 'react';
import { Book } from '../types';
import BookCover from './BookCover';
import { 
  Search, BookOpen, Clock, Tag, SlidersHorizontal, Lock, Unlock,
  ChevronRight, Calendar, ArrowUpRight, ShieldAlert, Layers
} from 'lucide-react';

interface LibraryProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onEnterAdmin: () => void;
}

const GENRES = ['Tous', 'Conte Philosophique', 'Philosophie & Stratégie', 'Édition & CMS', 'Roman', 'Poésie', 'Essai'];

export default function Library({ books, onSelectBook, onEnterAdmin }: LibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tous');
  const [selectedBook, setSelectedBook] = useState<Book | null>(books[0] || null);

  // Simple secret key protection for admin entry
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const handleAdminGateCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'admin' || adminPasscode === '') { // Simple default or empty to make it highly friendly and accessible!
      setPasscodeError(false);
      setShowAdminPrompt(false);
      onEnterAdmin();
    } else {
      setPasscodeError(true);
    }
  };

  // Filter books list
  const filteredBooks = books.filter(b => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesGenre = selectedGenre === 'Tous' || b.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div id="library-container" className="min-h-screen bg-[#faf8f5] text-zinc-800 selection:bg-amber-100 font-sans">
      
      {/* Editorial Header */}
      <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-700 stroke-2" />
            <span className="font-serif font-black tracking-normal text-lg sm:text-xl text-stone-900">
              Les fables d'Alain Foaleng
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="admin-gate-trigger"
              onClick={() => setShowAdminPrompt(true)}
              className="text-stone-500 hover:text-stone-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>Espace Écriture / CMS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Passcode Modal Gate */}
      {showAdminPrompt && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-stone-100">
            <h3 className="font-serif font-extrabold text-lg text-stone-900 mb-2">Accès Sécurisé Auteur</h3>
            <p className="text-stone-500 text-xs mb-4">
              Pour accéder au CMS de rédaction, veuillez saisir le mot de passe admin.
            </p>
            
            <form onSubmit={handleAdminGateCheck} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400 mb-1">
                  Code d'accès Auteur
                </label>
                <input
                  type="password"
                  placeholder="Code secret"
                  value={adminPasscode}
                  onChange={e => {
                    setAdminPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-950 focus:outline-none focus:border-amber-700 text-sm"
                  autoFocus
                />
                {passcodeError && (
                  <span className="text-red-650 text-xs mt-1 block">Code incorrect.</span>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminPrompt(false)}
                  className="px-3 py-2 rounded-lg text-stone-500 hover:text-stone-800 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg"
                >
                  Confirmer l'accès
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Jumbotron Section */}
      <section className="bg-linear-to-b from-[#f3eee7] to-transparent py-12 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left md:flex md:items-center md:justify-between gap-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] tracking-widest uppercase font-mono font-extrabold text-amber-700 bg-amber-500/10 px-2.5 py-1 rounded-full">
              Œuvres Numériques Originales
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-stone-905 leading-[1.12]">
              Lisez, Évadez-vous.
            </h1>
            <p className="text-stone-600 font-serif italic text-base sm:text-lg">
              « Un livre est un phare de sagesse et un espace d'absolue liberté. À travers ce cabinet interactif, je partage avec vous mes pensées, mes récits et mon univers littéraire. Installez-vous confortablement, parcourez mes ouvrages et laissez-vous emporter par le pouvoir des mots. » <br />
              <b>Foaleng Alain</b>
            </p>
          </div>

          {/* Quick instructions panel */}
          <div className="hidden md:block w-72 p-5 bg-white rounded-xl border border-stone-200/60 shadow-sm space-y-3.5 text-xs text-stone-600">
            <h4 className="font-bold text-stone-800 font-serif flex items-center gap-1">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Gabarit Client & Admin</span>
            </h4>
            <p>
              Consultez les livres disponibles à gauche. Pour en créer de nouveaux ou importer vos propres textes, rejoignez l'espace <strong>CMS Auteur</strong> conçu sur mesure.
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10px] font-mono">
              <span>Catalogue</span>
              <span className="text-amber-800 font-bold">{books.length} Titre(s)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Browse & Detail workspace Split */}
      <main className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Books & Filter catalog list (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre, auteur, genre ou tag..."
                className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-700 text-sm shadow-xs"
              />
            </div>
          </div>

          {/* Horizontal Genres bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedGenre === g
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'bg-white border border-stone-205 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Book Catalog Grid */}
          {filteredBooks.length === 0 ? (
            <div className="py-20 text-center bg-white border border-stone-100 rounded-2xl">
              <p className="text-stone-500 font-serif italic mb-2">Aucun ouvrage correspondant à vos critères.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('Tous');
                }}
                className="text-amber-700 font-bold text-xs uppercase tracking-wider"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {filteredBooks.map(b => {
                const isSelected = selectedBook?.id === b.id;
                return (
                  <div key={b.id} className="flex flex-col items-center">
                    <BookCover
                      book={b}
                      size="md"
                      onClick={() => {
                        setSelectedBook(b);
                        // Optional scroll on mobile to detail card
                        if (window.innerWidth < 1024) {
                          const el = document.getElementById('book-detail-panel');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    />
                    <div className="mt-3 text-center px-1">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1 hover:underline cursor-pointer" onClick={() => setSelectedBook(b)}>
                        {b.title}
                      </h4>
                      <p className="text-stone-500 text-[10px] sm:text-xs truncate">{b.author}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Book Sidebar detail card (5 columns) */}
        <div id="book-detail-panel" className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
          {selectedBook ? (
            <div className="bg-white border border-stone-200/60 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                {/* Visual miniature cover */}
                <div className="shrink-0">
                  <BookCover book={selectedBook} size="sm" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded bg-amber-500/10 text-amber-800">
                    {selectedBook.genre}
                  </span>
                  <h2 className="font-serif font-black text-xl text-stone-900 leading-tight pt-1.5">{selectedBook.title}</h2>
                  <p className="text-xs text-stone-500 font-serif italic">Par {selectedBook.author}</p>
                  
                  <div className="flex flex-wrap gap-1 pt-2 justify-center sm:justify-start">
                    {selectedBook.tags?.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono text-stone-400 border border-stone-200 bg-stone-50 px-1.5 py-0.5 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book description panel */}
              <div className="space-y-2 border-t border-b border-stone-100 py-4 text-justify">
                <h4 className="text-xs uppercase font-mono tracking-widest text-stone-400 font-extrabold">Synopsis de l'œuvre</h4>
                <p className="text-stone-605 text-xs sm:text-sm font-serif leading-relaxed italic pr-1">
                  {selectedBook.description}
                </p>
              </div>

              {/* Summary / sommarize table of chapters */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-stone-400 font-extrabold">Plan de lecture ({selectedBook.chapters?.length || 0} chap.)</h4>
                  <span className="text-[10px] font-sans font-bold text-amber-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{selectedBook.chapters?.reduce((acc, ch) => acc + ch.durationMin, 0) || 0} min. au total</span>
                  </span>
                </div>

                <div className="max-h-40 overflow-y-auto pr-1 space-y-1 text-xs">
                  {selectedBook.chapters?.map((ch, idx) => (
                    <div key={ch.id} className="p-2 sm:p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between hover:bg-stone-100/50 transition-colors">
                      <span className="font-semibold text-stone-700 truncate max-w-xs">{idx + 1}. {ch.title}</span>
                      <span className="text-[10px] text-stone-400 uppercase font-mono">{ch.durationMin} min</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master call to action */}
              <div className="pt-2">
                <button
                  id={`read-button-${selectedBook.id}`}
                  onClick={() => onSelectBook(selectedBook)}
                  className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-amber-950 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  <span>Commencer la lecture</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-stone-200/60 rounded-2xl p-10 shadow-sm text-center font-serif text-stone-500">
              <BookOpen className="w-12 h-12 mx-auto text-stone-300 mb-3" />
              <p>Sélectionnez un livre de la bibliothèque pour consulter ses informations, son sommaire et commencer sa lecture.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
