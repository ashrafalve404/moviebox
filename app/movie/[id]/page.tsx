'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Movie, Review } from '@/types';
import { movieService } from '@/services/movies';
import { FaPlay, FaStar, FaPlus, FaHeart, FaCalendar, FaClock } from 'react-icons/fa';
import MovieCard from '@/components/movie/MovieCard';
import VideoPlayer from '@/components/movie/VideoPlayer';
import ReviewCard from '@/components/review/ReviewCard';
import ReviewForm from '@/components/review/ReviewForm';
import { MovieDetailSkeleton } from '@/components/ui/LoadingSkeleton';
import { useMovieStore } from '@/store/movieStore';

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = Number(params.id);
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToWatchlist, removeFromWatchlist, toggleLike, isInWatchlist, isLiked } = useMovieStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, movieReviews, recommended] = await Promise.all([
          movieService.getMovieById(movieId),
          movieService.getMovieReviews(movieId),
          movieService.getRecommendedMovies(movieId),
        ]);

        setMovie(movieData);
        setReviews(movieReviews);
        setRecommendedMovies(recommended);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const handleReviewSubmitted = async () => {
    const updatedReviews = await movieService.getMovieReviews(movieId);
    setReviews(updatedReviews);
  };

  const handleWatchlist = () => {
    if (!movie) return;
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleLike = () => {
    if (!movie) return;
    toggleLike(movie);
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen pt-20">
        <MovieDetailSkeleton />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Movie not found</h1>
          <Link href="/" className="text-red-500 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(movie.id);
  const liked = isLiked(movie.id);

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="relative h-[40vh] md:h-[60vh]">
        <Image
          src={movie.backdrop_path}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="container-custom -mt-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
              <Image
                src={movie.poster_path}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-zinc-400 text-lg italic mb-4">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="flex items-center gap-1.5 text-yellow-500 font-medium">
                <FaStar className="text-xs" /> {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-zinc-400">({movie.vote_count.toLocaleString()} votes)</span>
              <span className="text-zinc-400">{movie.release_date?.split('-')[0]}</span>
              <span className="text-zinc-400">{movie.runtime} min</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/browse?genre=${genre.id}`}
                  className="px-4 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 rounded-full text-sm text-zinc-200 transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                href={`/watch/${movie.id}`}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                <FaPlay className="text-sm" /> Play
              </Link>
              <button
                onClick={() => setShowTrailer(!showTrailer)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
              >
                <FaPlay className="text-sm" /> Trailer
              </button>
              <button
                onClick={handleWatchlist}
                className={`flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-colors ${
                  inWatchlist 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <FaPlus className={inWatchlist ? 'rotate-45' : ''} />
                {inWatchlist ? 'Added' : 'Watchlist'}
              </button>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-colors ${
                  liked 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <FaHeart className={liked ? 'fill-current' : ''} />
                {liked ? 'Liked' : 'Like'}
              </button>
            </div>

            {showTrailer && movie.trailer_url && (
              <div className="mb-8">
                <VideoPlayer videoUrl={movie.trailer_url} title={`${movie.title} Trailer`} />
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
              <p className="text-zinc-300 leading-relaxed">{movie.overview}</p>
            </div>

            {movie.cast && movie.cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Cast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {movie.cast.slice(0, 5).map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-zinc-800">
                        <Image
                          src={actor.profile_path}
                          alt={actor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-white text-sm font-medium truncate">{actor.name}</p>
                      <p className="text-zinc-500 text-xs truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="py-8 border-t border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-6">Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-900 rounded-lg p-8 text-center">
                  <p className="text-zinc-400">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
            
            <div>
              <ReviewForm movieId={movie.id} onSuccess={handleReviewSubmitted} />
            </div>
          </div>
        </div>

        {recommendedMovies.length > 0 && (
          <div className="py-8 border-t border-zinc-800">
            <h2 className="text-xl font-semibold text-white mb-6">Recommended</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommendedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
