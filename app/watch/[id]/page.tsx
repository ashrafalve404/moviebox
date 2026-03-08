'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { movieService } from '@/services/movies';
import VideoPlayer from '@/components/movie/VideoPlayer';
import MovieCard from '@/components/movie/MovieCard';
import { FaArrowLeft, FaStar, FaThumbsUp, FaVolumeUp, FaExpand, FaPause, FaPlay } from 'react-icons/fa';

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = Number(params.id);
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, recommended] = await Promise.all([
          movieService.getMovieById(movieId),
          movieService.getRecommendedMovies(movieId),
        ]);

        setMovie(movieData);
        setRecommendedMovies(recommended);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Movie not found</h1>
          <Link href="/" className="text-red-500 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
          <VideoPlayer
            videoUrl={movie.trailer_url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            title={movie.title}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{movie.title}</h1>
                <div className="flex items-center gap-4 text-zinc-400">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" /> {movie.vote_average.toFixed(1)}
                  </span>
                  <span>{movie.release_date?.split('-')[0]}</span>
                  <span>{movie.runtime} min</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-colors">
                  <FaThumbsUp />
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-colors">
                  <FaVolumeUp />
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition-colors">
                  <FaExpand />
                </button>
              </div>
            </div>

            <p className="text-zinc-300 mb-6">{movie.overview}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Cast</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.cast.slice(0, 5).map((actor) => (
                    <div key={actor.id} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800">
                        <Image
                          src={actor.profile_path}
                          alt={actor.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm">{actor.name}</p>
                        <p className="text-zinc-500 text-xs">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-80">
            <h3 className="text-lg font-semibold text-white mb-4">More Like This</h3>
            <div className="space-y-4">
              {recommendedMovies.slice(0, 4).map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  <div className="flex gap-3 bg-zinc-900 rounded-lg p-2 hover:bg-zinc-800 transition-colors">
                    <div className="relative w-20 h-28 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={movie.poster_path}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm truncate">{movie.title}</h4>
                      <p className="text-zinc-500 text-xs mt-1">
                        {movie.release_date?.split('-')[0]} • {movie.runtime} min
                      </p>
                      <p className="text-zinc-400 text-xs mt-1 flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-[10px]" />
                        {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
