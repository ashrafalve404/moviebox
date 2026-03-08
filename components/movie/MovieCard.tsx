'use client';

import { useState } from 'react';
import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay, FaPlus, FaHeart, FaStar } from 'react-icons/fa';
import { useMovieStore } from '@/store/movieStore';

interface MovieCardProps {
  movie: Movie;
  showActions?: boolean;
}

export default function MovieCard({ movie, showActions = true }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWatchlist, removeFromWatchlist, toggleLike, isInWatchlist, isLiked } = useMovieStore();
  
  const inWatchlist = isInWatchlist(movie.id);
  const liked = isLiked(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(movie);
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="relative group cursor-pointer rounded-lg overflow-hidden bg-zinc-900 transition-all duration-300 hover:scale-105 hover:z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[2/3] relative">
          <Image
            src={movie.poster_path}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {showActions && (
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleLikeClick}
                className={`p-2 rounded-full transition-colors ${
                  liked ? 'bg-red-600 text-white' : 'bg-black/50 text-white hover:bg-red-600'
                }`}
              >
                <FaHeart className={liked ? 'fill-current' : ''} />
              </button>
              <button
                onClick={handleWatchlistClick}
                className={`p-2 rounded-full transition-colors ${
                  inWatchlist ? 'bg-red-600 text-white' : 'bg-black/50 text-white hover:bg-red-600'
                }`}
              >
                <FaPlus className={inWatchlist ? 'rotate-45' : ''} />
              </button>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
            <div className="flex items-center gap-2 text-zinc-400 text-xs mt-1">
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-500" /> {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date?.split('-')[0]}</span>
            </div>
          </div>
        </div>
        
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <FaPlay className="text-white ml-1" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
