import { Movie, MoviesResponse, Genre, FilterOptions } from '@/types';
import { mockMovies, mockReviews, genres as allGenres } from '@/lib/mockData';
import { get } from '@/lib/api';

const SIMULATED_DELAY = 500;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const movieService = {
  async getMovies(filters?: FilterOptions): Promise<MoviesResponse> {
    await delay(SIMULATED_DELAY);
    
    let results = [...mockMovies];
    
    if (filters?.genre) {
      results = results.filter(m => m.genre_ids.includes(filters.genre!));
    }
    
    if (filters?.year) {
      results = results.filter(m => m.release_date.startsWith(filters.year!.toString()));
    }
    
    if (filters?.rating) {
      results = results.filter(m => m.vote_average >= filters.rating!);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      results = results.filter(m => 
        m.title.toLowerCase().includes(search) ||
        m.overview.toLowerCase().includes(search)
      );
    }
    
    const page = filters?.page || 1;
    const perPage = 6;
    const start = (page - 1) * perPage;
    const paginatedResults = results.slice(start, start + perPage);
    
    return {
      results: paginatedResults,
      page,
      total_pages: Math.ceil(results.length / perPage),
      total_results: results.length,
    };
  },

  async getMovieById(id: number): Promise<Movie | null> {
    await delay(SIMULATED_DELAY);
    return mockMovies.find(m => m.id === id) || null;
  },

  async getTrendingMovies(): Promise<Movie[]> {
    await delay(SIMULATED_DELAY);
    return mockMovies.slice(0, 5);
  },

  async getTopRatedMovies(): Promise<Movie[]> {
    await delay(SIMULATED_DELAY);
    return [...mockMovies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 6);
  },

  async getPopularMovies(): Promise<Movie[]> {
    await delay(SIMULATED_DELAY);
    return mockMovies.slice(0, 8);
  },

  async getMoviesByGenre(genreId: number): Promise<Movie[]> {
    await delay(SIMULATED_DELAY);
    return mockMovies.filter(m => m.genre_ids.includes(genreId));
  },

  async getFeaturedMovie(): Promise<Movie> {
    await delay(SIMULATED_DELAY);
    return mockMovies[0];
  },

  async getGenres(): Promise<Genre[]> {
    await delay(SIMULATED_DELAY);
    return allGenres;
  },

  async getMovieReviews(movieId: number) {
    await delay(SIMULATED_DELAY);
    return mockReviews.filter(r => r.movie_id === movieId);
  },

  async searchMovies(query: string): Promise<Movie[]> {
    await delay(SIMULATED_DELAY);
    const search = query.toLowerCase();
    return mockMovies.filter(m => 
      m.title.toLowerCase().includes(search)
    );
  },

  async getRecommendedMovies(movieId: number): Promise<Movie[]> {
    await delay(SIMULATED_DELAY);
    const movie = mockMovies.find(m => m.id === movieId);
    if (!movie) return mockMovies.slice(0, 4);
    
    return mockMovies
      .filter(m => m.id !== movieId && m.genre_ids.some(g => movie.genre_ids.includes(g)))
      .slice(0, 4);
  },
};
