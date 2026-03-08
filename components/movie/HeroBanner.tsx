'use client';

import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay, FaInfoCircle, FaStar } from 'react-icons/fa';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <div className="relative h-[60vh] md:h-[75vh] w-full">
      <Image
        src={movie.backdrop_path}
        alt={movie.title}
        fill
        priority
        className="object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-3">
              <span className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                <FaStar className="text-xs" /> {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-zinc-400 text-sm">{movie.release_date?.split('-')[0]}</span>
              <span className="text-zinc-400 text-sm">{movie.runtime} min</span>
              <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded">HD</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-zinc-300 text-sm md:text-base italic mb-3">"{movie.tagline}"</p>
            )}
            
            <p className="text-zinc-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4">{movie.overview}</p>
            
            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres?.slice(0, 4).map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/90"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/watch/${movie.id}`}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-all hover:scale-105"
              >
                <FaPlay className="text-sm" /> Play Now
              </Link>
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium rounded-md transition-colors"
              >
                <FaInfoCircle /> More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
