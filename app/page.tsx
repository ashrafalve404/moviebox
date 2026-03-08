'use client';

import { useEffect, useState } from 'react';
import { Movie, Genre } from '@/types';
import { movieService } from '@/services/movies';
import HeroBanner from '@/components/movie/HeroBanner';
import MovieRow from '@/components/movie/MovieRow';
import { HeroBannerSkeleton } from '@/components/ui/LoadingSkeleton';
import { MovieRowSkeleton } from '@/components/ui/LoadingSkeleton';

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<number, Movie[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, trending, topRated, popular] = await Promise.all([
          movieService.getFeaturedMovie(),
          movieService.getTrendingMovies(),
          movieService.getTopRatedMovies(),
          movieService.getPopularMovies(),
        ]);

        setFeaturedMovie(featured);
        setTrendingMovies(trending);
        setTopRatedMovies(topRated);
        setPopularMovies(popular);

        const [actionMovies, sciFiMovies, comedyMovies] = await Promise.all([
          movieService.getMoviesByGenre(28),
          movieService.getMoviesByGenre(878),
          movieService.getMoviesByGenre(35),
        ]);

        setGenreMovies({
          28: actionMovies,
          878: sciFiMovies,
          35: comedyMovies,
        });
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <HeroBannerSkeleton />
        <div className="container mx-auto px-4 md:px-8 pb-12 space-y-12">
          <MovieRowSkeleton />
          <MovieRowSkeleton />
          <MovieRowSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {featuredMovie && <HeroBanner movie={featuredMovie} />}
      
      <div className="relative -mt-32 z-10 pb-16 space-y-12">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Top Rated" movies={topRatedMovies} />
        <MovieRow title="Popular" movies={popularMovies} />
        
        {genreMovies[28]?.length > 0 && (
          <MovieRow title="Action Movies" movies={genreMovies[28]} />
        )}
        {genreMovies[878]?.length > 0 && (
          <MovieRow title="Sci-Fi Movies" movies={genreMovies[878]} />
        )}
        {genreMovies[35]?.length > 0 && (
          <MovieRow title="Comedy Movies" movies={genreMovies[35]} />
        )}
      </div>
    </div>
  );
}
