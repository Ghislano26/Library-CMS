import React from 'react';
import { Book } from '../types';
import { Sparkles, BookOpen, Layers } from 'lucide-react';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function BookCover({ book, size = 'md', onClick }: BookCoverProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  // Base sizing styles
  const sizeClasses = isSm
    ? 'w-32 h-44 text-xs'
    : isLg
    ? 'w-64 h-96 text-base shadow-2xl'
    : 'w-44 h-64 text-sm shadow-lg hover:shadow-xl hover:-translate-y-1';

  return (
    <div
      id={`book-cover-${book.id}`}
      onClick={onClick}
      className={`relative rounded-md overflow-hidden bg-gradient-to-br ${book.coverColor} transition-all duration-300 select-none cursor-pointer flex flex-col justify-between p-4 border border-white/10 ${sizeClasses}`}
    >
      {/* Decorative Overlays based on Design Type */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-black" />

      {book.coverDesignType === 'artistic' && (
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
          <div className="border border-white/30 rounded-full w-2/3 h-2/3 animate-pulse duration-10000" />
          <div className="absolute border border-white/20 rounded-full w-1/2 h-1/2" />
          <Sparkles className="absolute text-white top-6 right-6 w-5 h-5 opacity-80" />
        </div>
      )}

      {book.coverDesignType === 'classic' && (
        <div className="absolute inset-2 pointer-events-none border border-white/20 rounded-sm" />
      )}

      {book.coverDesignType === 'modern' && (
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      )}

      {/* Header Info */}
      <div className="relative z-10 flex items-start justify-between">
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
          {book.genre ? book.genre : 'LITTÉRATURE'}
        </span>
        <BookOpen className={`${isSm ? 'w-3.5 h-3.5' : isLg ? 'w-6 h-6' : 'w-4 h-4'} opacity-40`} />
      </div>

      {/* Main Title Block */}
      <div className="relative z-10 my-auto text-left py-2">
        <h3
          className={`font-serif font-extrabold tracking-tight text-white leading-tight ${
            isSm ? 'text-xs line-clamp-3' : isLg ? 'text-2xl' : 'text-base line-clamp-4'
          }`}
        >
          {book.title}
        </h3>
        
        {/* Underline decorative bar for Modern type */}
        {book.coverDesignType === 'modern' && (
          <div className="w-12 h-1 bg-white/40 mt-2 rounded" />
        )}
      </div>

      {/* Footer Info / Author */}
      <div className="relative z-10">
        {book.coverDesignType === 'minimalist' && (
          <div className="w-full border-t border-white/10 pt-1.5 mb-1.5" />
        )}
        <p className={`font-medium tracking-wide text-white/80 ${isSm ? 'text-[9px] line-clamp-1' : 'text-xs'}`}>
          {book.author}
        </p>
        {!isSm && (
          <div className="flex items-center justify-between mt-1 text-[10px] font-mono opacity-50">
            <span>{book.chapters?.length || 0} Chapitres</span>
            <span>{book.pagesCount || 0} p.</span>
          </div>
        )}
      </div>
    </div>
  );
}
