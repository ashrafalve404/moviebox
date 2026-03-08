'use client';

import { useRef } from 'react';
import { Movie } from '@/types';
import MovieCard from './MovieCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies.length) return null;

  return (
    <div className="relative group">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      </div>
      
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-start pl-2"
      >
        <FaChevronLeft className="text-white text-xl" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="container mx-auto flex gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-2"
      >
        <FaChevronRight className="text-white text-xl" />
      </button>
    </div>
  );
}
