import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/types';

interface MovieStore {
  watchlist: Movie[];
  likedMovies: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleLike: (movie: Movie) => void;
  isInWatchlist: (movieId: number) => boolean;
  isLiked: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      watchlist: [],
      likedMovies: [],

      addToWatchlist: (movie: Movie) => {
        const { watchlist } = get();
        if (!watchlist.find(m => m.id === movie.id)) {
          set({ watchlist: [...watchlist, movie] });
        }
      },

      removeFromWatchlist: (movieId: number) => {
        const { watchlist } = get();
        set({ watchlist: watchlist.filter(m => m.id !== movieId) });
      },

      toggleLike: (movie: Movie) => {
        const { likedMovies } = get();
        const isLiked = likedMovies.find(m => m.id === movie.id);
        if (isLiked) {
          set({ likedMovies: likedMovies.filter(m => m.id !== movie.id) });
        } else {
          set({ likedMovies: [...likedMovies, movie] });
        }
      },

      isInWatchlist: (movieId: number) => {
        return get().watchlist.some(m => m.id === movieId);
      },

      isLiked: (movieId: number) => {
        return get().likedMovies.some(m => m.id === movieId);
      },
    }),
    {
      name: 'movie-storage',
    }
  )
);
