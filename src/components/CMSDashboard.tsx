import React, { useState } from 'react';
import { Book, Chapter } from '../types';
import BookCover from './BookCover';
import { 
  Plus, Trash2, Edit3, Save, Check, RefreshCw, Sparkles, 
  Layers, ChevronUp, ChevronDown, Download, Upload, Info, FileText
} from 'lucide-react';

interface CMSDashboardProps {
  books: Book[];
  onSaveBooks: (newBooks: Book[]) => void;
  onExit: () => void;
}

const GRADIENT_PRESETS = [
  'from-blue-950 via-slate-900 to-indigo-950',
  'from-emerald-950 via-slate-900 to-zinc-950',
  'from-amber-950 via-stone-900 to-neutral-950',
  'from-rose-950 via-zinc-900 to-stone-900',
  'from-purple-950 via-indigo-950 to-neutral-900',
  'from-red-950 via-slate-900 to-red-900',
  'from-teal-950 via-slate-900 to-cyan-950',
  'from-neutral-900 via-neutral-950 to-neutral-900'
];

export default function CMSDashboard({ books, onSaveBooks, onExit }: CMSDashboardProps) {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  
  // Form State for active editing book
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [coverColor, setCoverColor] = useState(GRADIENT_PRESETS[0]);
  const [coverDesignType, setCoverDesignType] = useState<Book['coverDesignType']>('classic');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [tagsInput, setTagsInput] = useState('');
  const [pagesCount, setPagesCount] = useState(100);

  // Active Editing Chapter Form State
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);
  const [chapTitle, setChapTitle] = useState('');
  const [chapContent, setChapContent] = useState('');
  const [chapDuration, setChapDuration] = useState(5);

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Select a book to load into the form
  const handleSelectBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    setSelectedBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setDescription(book.description);
    setCoverColor(book.coverColor);
    setCoverDesignType(book.coverDesignType);
    setChapters(book.chapters || []);
    setTagsInput(book.tags ? book.tags.join(', ') : '');
    setPagesCount(book.pagesCount || 100);

    // Reset Chapter Subform
    setActiveChapterIndex(null);
    setChapTitle('');
    setChapContent('');
    setChapDuration(5);
  };

  // Initialize a completely blank book
  const handleCreateNewBookClean = () => {
    setSelectedBookId('new-book-temp');
    setTitle('Nouveau Livre');
    setAuthor('Auteur');
    setGenre('Roman');
    setDescription('Une brève description du nouveau livre à saisir.');
    setCoverColor(GRADIENT_PRESETS[0]);
    setCoverDesignType('classic');
    setChapters([]);
    setTagsInput('Nouveau, Création');
    setPagesCount(120);

    setActiveChapterIndex(null);
    setChapTitle('');
    setChapContent('');
    setChapDuration(5);
  };

  // Save Book Handler (Updates list of books)
  const handleSaveBook = () => {
    if (!title.trim()) {
      showNotification('Veuillez spécifier au moins un titre de livre.');
      return;
    }

    const processedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const isExisting = selectedBookId !== 'new-book-temp' && books.some(b => b.id === selectedBookId);
    const bookId = isExisting ? selectedBookId! : `custom-book-${Date.now()}`;

    const newBookData: Book = {
      id: bookId,
      title: title.trim(),
      author: author.trim() || 'Auteur Anonyme',
      genre: genre.trim() || 'Indéterminé',
      description: description.trim() || 'Aucune description disponible.',
      coverColor,
      coverDesignType,
      chapters,
      tags: processedTags,
      pagesCount: Number(pagesCount) || 120,
      createdAt: new Date().toISOString()
    };

    let updatedBooks: Book[] = [];
    if (isExisting) {
      updatedBooks = books.map(b => (b.id === bookId ? newBookData : b));
      showNotification('Livre mis à jour avec succès !');
    } else {
      updatedBooks = [...books, newBookData];
      setSelectedBookId(bookId); // transition draft mode to saved mode
      showNotification('Nouveau livre créé et disponible !');
    }

    onSaveBooks(updatedBooks);
  };

  // Delete Book
  const handleDeleteBook = (bookId: string) => {
    if (confirm('Êtes-vous absolument sûr de vouloir supprimer définitivement ce livre de la bibliothèque ?')) {
      const remaining = books.filter(b => b.id !== bookId);
      onSaveBooks(remaining);
      setSelectedBookId(null);
      showNotification('Livre supprimé de la base de données.');
    }
  };

  // Chapter Creation / Editing inside current book draft
  const handleSelectChapterForEdit = (idx: number) => {
    setActiveChapterIndex(idx);
    const chap = chapters[idx];
    setChapTitle(chap.title);
    setChapContent(chap.content);
    setChapDuration(chap.durationMin);
  };

  const handleAddNewChapterPlaceholder = () => {
    const newChap: Chapter = {
      id: `chap-${Date.now()}`,
      title: `Nouveau Chapitre ${chapters.length + 1}`,
      content: 'Écrivez votre texte ici...',
      durationMin: 5
    };
    const updated = [...chapters, newChap];
    setChapters(updated);
    setActiveChapterIndex(updated.length - 1);
    setChapTitle(newChap.title);
    setChapContent(newChap.content);
    setChapDuration(newChap.durationMin);
  };

  const handleSaveActiveChapter = () => {
    if (activeChapterIndex === null) return;
    if (!chapTitle.trim()) {
      showNotification('Le titre du chapitre ne peut pas être vide.');
      return;
    }

    const updatedChapters = [...chapters];
    updatedChapters[activeChapterIndex] = {
      ...updatedChapters[activeChapterIndex],
      title: chapTitle.trim(),
      content: chapContent.trim(),
      durationMin: Number(chapDuration) || 5
    };

    setChapters(updatedChapters);
    showNotification('Chapitre enregistré avec succès ! Enregistrez ensuite le livre.');
  };

  const handleDeleteChapter = (idx: number) => {
    if (confirm('Supprimer ce chapitre ?')) {
      const updated = chapters.filter((_, i) => i !== idx);
      setChapters(updated);
      setActiveChapterIndex(null);
      showNotification('Chapitre supprimé du plan.');
    }
  };

  // Move Chapter sequence order
  const handleMoveChapter = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === chapters.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const list = [...chapters];
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;

    setChapters(list);
    if (activeChapterIndex === idx) setActiveChapterIndex(targetIdx);
    else if (activeChapterIndex === targetIdx) setActiveChapterIndex(idx);
  };

  // DB Backup Operations (Import/Export entire JSON database)
  const handleExportJSONDataAndBooks = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(books, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `catalogue-bibliotheque-sauvegarde.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showNotification('Export complet du catalogue effectué !');
  };

  const handleImportJSONDataAndBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onload = (fileEvent) => {
      try {
        const text = fileEvent.target?.result as string;
        const importedData = JSON.parse(text);
        
        if (Array.isArray(importedData)) {
          // simple check for schema validity
          const isValid = importedData.every(b => b.id && b.title && Array.isArray(b.chapters));
          if (isValid) {
            onSaveBooks(importedData);
            setSelectedBookId(null);
            showNotification('Catalogue chargé avec succès depuis le fichier JSON !');
          } else {
            alert('Le format du catalogue importé semble incorrect.');
          }
        }
      } catch (err) {
        alert('Erreur lors du décodage du fichier JSON de sauvegarde.');
      }
    };
    reader.readAsText(files[0]);
  };

  // Simulated Cover Generator Preview values inside the Cover designer
  const previewDraftBook: Book = {
    id: 'preview',
    title: title || 'Titre de votre livre',
    author: author || 'Auteur',
    genre: genre || 'Genre Littéraire',
    description: description || '',
    coverColor,
    coverDesignType,
    chapters,
    tags: [],
    pagesCount,
    createdAt: ''
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-6 px-4 sm:px-6">
      
      {/* CMS Header */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-805 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-linear-to-r from-emerald-500 to-teal-600 text-zinc-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">
              Studio Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-white">
            Espace d'Édition & CMS Littéraire
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Constructeur intuitif de récits chapitrés sans complexité technique.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Backup Database buttons */}
          <button
            onClick={handleExportJSONDataAndBooks}
            className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-xs text-zinc-300 font-medium flex items-center gap-1.5 cursor-pointer"
            title="Exporter tous les livres vers un fichier de sauvegarde"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Exporter Catalogue</span>
          </button>

          <label className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-xs text-zinc-300 font-medium flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Importer Sauvegarde</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSONDataAndBooks}
              className="hidden"
            />
          </label>

          <button
            id="cms-dashboard-exit"
            onClick={onExit}
            className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-transform cursor-pointer"
          >
            Quitter l'Admin (Lien Client)
          </button>
        </div>
      </header>

      {/* Dynamic Toast System */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 border border-emerald-500 text-white font-sans text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-2">
          <Check className="w-4 h-4 stroke-3" />
          <span>{notification}</span>
        </div>
      )}

      {/* CMS Main Content Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
        
        {/* Left column: Book selector list (3 span) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-400 font-mono">
                Vos Livres Publiés ({books.length})
              </h2>
              <button
                id="cmd-create-new-book"
                onClick={handleCreateNewBookClean}
                className="p-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer transition-colors"
                title="Ajouter un nouveau livre blanc"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {books.map(b => (
                <div
                  key={b.id}
                  onClick={() => handleSelectBook(b.id)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex justify-between items-start gap-2 ${
                    selectedBookId === b.id
                      ? 'bg-zinc-800 border-emerald-500 shadow-md shadow-emerald-500/5'
                      : 'border-zinc-800 bg-zinc-950/40 hover:bg-zinc-850 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-white truncate">{b.title}</h3>
                    <p className="text-zinc-500 text-xs font-serif italic truncate">{b.author}</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mt-1">
                      <span>{b.chapters?.length || 0} chap.</span>
                      <span>•</span>
                      <span>{b.genre}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBook(b.id);
                    }}
                    className="p-1 rounded text-zinc-500 hover:text-red-500 transition-colors"
                    title="Supprimer ce livre"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-805 text-[11px] text-zinc-500 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p>Cliquez sur un livre existant pour commencer à rédiger des chapitres ou modifiez son esthétique générale.</p>
            </div>
          </div>
        </div>

        {/* Right column: Form & Visual Builder (9 span) */}
        <div className="lg:col-span-9">
          {selectedBookId ? (
            <div className="space-y-8 animate-fade-in">
              {/* Section Part 1: Metadata & Stylist */}
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Book settings Form fields (8 span) */}
                <div className="md:col-span-8 space-y-4 text-sm">
                  <div className="border-b border-zinc-800 pb-3 mb-2">
                    <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                      <span>Configuration du Livre</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Titre du livre *</label>
                      <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Ex : Le Petit Prince"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Auteur *</label>
                      <input
                        type="text"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        placeholder="Ex : Antoine de Saint-Exupéry"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Genre</label>
                      <input
                        type="text"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        placeholder="Ex : Roman, Conte, Essai..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Pagination estimée (pages)</label>
                      <input
                        type="number"
                        value={pagesCount}
                        onChange={e => setPagesCount(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Mots-clés (tags séparés par virgules)</label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={e => setTagsInput(e.target.value)}
                        placeholder="Ex : Classique, Aventure"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Résumé / Description de l'œuvre</label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Décrivez l'argument ou le synopsis..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Gradient cover generator tool */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-400">Arrière-plan Couverture (Palette)</label>
                    <div className="flex flex-wrap gap-2">
                      {GRADIENT_PRESETS.map((grad, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCoverColor(grad)}
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} border transition-all ${
                            coverColor === grad ? 'border-white scale-110 ring-2 ring-emerald-500/40' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Layout selector */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">Gabarit Couverture</label>
                      <select
                        value={coverDesignType}
                        onChange={e => setCoverDesignType(e.target.value as Book['coverDesignType'])}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="classic">Gothique / Classique (Cadre délimité)</option>
                        <option value="modern">Moderne minimaliste (Bande géométrique)</option>
                        <option value="minimalist">Brut Épuré (Ligne séparatrice)</option>
                        <option value="artistic">Spatio-Artistique (Sphère et halo)</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={handleSaveBook}
                        className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Publier / Enregistrer Livre</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cover graphic block (4 span) */}
                <div className="md:col-span-4 flex flex-col items-center justify-center bg-zinc-950/60 rounded-xl p-4 border border-zinc-805">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-550 mb-3">Rendu Couverture</span>
                  <BookCover book={previewDraftBook} size="md" />
                </div>
              </div>

              {/* Section Part 2: Chapters Outline & Visual editor */}
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 space-y-6">
                <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-400" />
                      <span>Plan et Structuration des Chapitres ({chapters.length})</span>
                    </h2>
                    <p className="text-zinc-500 text-xs mt-1">Gérez la chronologie chapitrée de l'histoire.</p>
                  </div>

                  <button
                    onClick={handleAddNewChapterPlaceholder}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter un Chapitre</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Outline tree selector (left 4 span) */}
                  <div className="lg:col-span-4 space-y-2 max-h-[360px] overflow-y-auto pr-1">
                    {chapters.length === 0 ? (
                      <div className="text-center py-10 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500 text-xs font-sans">Aucun chapitre créé ou importé dans l'écurie.</p>
                      </div>
                    ) : (
                      chapters.map((ch, idx) => {
                        const isActive = activeChapterIndex === idx;
                        return (
                          <div
                            key={ch.id}
                            onClick={() => handleSelectChapterForEdit(idx)}
                            className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between gap-2 text-xs ${
                              isActive
                                ? 'bg-zinc-800 border-zinc-700 text-white font-bold'
                                : 'border-zinc-850 bg-zinc-950/20 hover:bg-zinc-850'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] text-zinc-500 block uppercase font-mono tracking-wider">Chapitre {idx + 1}</span>
                              <h4 className="truncate font-semibold mt-0.5 text-zinc-100">{ch.title}</h4>
                            </div>

                            {/* Arrangers & deletion */}
                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              <button
                                disabled={idx === 0}
                                onClick={() => handleMoveChapter(idx, 'up')}
                                className="p-1 rounded text-zinc-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                disabled={idx === chapters.length - 1}
                                onClick={() => handleMoveChapter(idx, 'down')}
                                className="p-1 rounded text-zinc-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteChapter(idx)}
                                className="p-1 rounded text-zinc-500 hover:text-red-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Chapter content editor field (right 8 span) */}
                  <div className="lg:col-span-8 bg-zinc-950 rounded-xl p-4 border border-zinc-805 space-y-4">
                    {activeChapterIndex !== null && chapters[activeChapterIndex] ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-850 pb-2 mb-2">
                          <span className="text-xs font-mono font-bold text-emerald-400">ÉDITEUR DU CHAPITRE {activeChapterIndex + 1}</span>
                          <span className="text-[11px] text-zinc-500 uppercase">{chapters[activeChapterIndex].durationMin} min. lecture</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="sm:col-span-3">
                            <label className="block text-xs font-semibold text-zinc-400 mb-1">Titre du Chapitre</label>
                            <input
                              type="text"
                              value={chapTitle}
                              onChange={e => setChapTitle(e.target.value)}
                              placeholder="Ex : Introduction des aventures"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
                            />
                          </div>

                          <div className="sm:col-span-1">
                            <label className="block text-xs font-semibold text-zinc-400 mb-1">Durée (min)</label>
                            <input
                              type="number"
                              value={chapDuration}
                              onChange={e => setChapDuration(Number(e.target.value))}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-zinc-400">Contenu Textuel (Saut de ligne double pour délimiter les paragraphes)</label>
                            <span className="text-[10px] text-zinc-500 font-mono">Caractères : {chapContent.length}</span>
                          </div>
                          
                          <textarea
                            value={chapContent}
                            onChange={e => setChapContent(e.target.value)}
                            rows={10}
                            placeholder="Écrivez le fil conducteur ici..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-400 text-sm font-sans line-clamp-none resize-y"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={handleSaveActiveChapter}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Enregistrer ce Chapitre</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <FileText className="w-10 h-10 text-zinc-600 mb-2" />
                        <h4 className="text-sm font-bold text-zinc-400">Aucun chapitre sélectionné</h4>
                        <p className="text-xs text-zinc-500 max-w-xs mt-1">Sélectionnez un chapitre à gauche ou cliquez sur "Ajouter un Chapitre" pour commencer à composer.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 text-center bg-zinc-900 rounded-2xl border border-zinc-805 p-8 max-w-2xl mx-auto">
              <Layers className="w-16 h-16 text-emerald-500 opacity-60 mb-4" />
              <h3 className="text-xl font-serif font-extrabold text-white">Prêt à créer pour vos lecteurs ?</h3>
              <p className="text-zinc-400 text-sm mt-2 max-w-sm">
                Sélectionnez un livre dans la colonne de gauche ou cliquez sur le bouton "+" pour ajouter un tout nouveau chef-d'œuvre à votre catalogue virtuel.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleCreateNewBookClean}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs uppercase tracking-wider rounded-lg text-white"
                >
                  Rédiger mon premier livre
                </button>
                <button
                  onClick={handleExportJSONDataAndBooks}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs"
                >
                  Télécharger une copie JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
