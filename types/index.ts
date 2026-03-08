export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: Genre[];
  runtime: number;
  tagline?: string;
  status: string;
  trailer_url?: string;
  cast: CastMember[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Review {
  id: number;
  movie_id: number;
  user: User;
  rating: number;
  content: string;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface MovieState {
  watchlist: Movie[];
  likedMovies: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleLike: (movie: Movie) => void;
  isInWatchlist: (movieId: number) => boolean;
  isLiked: (movieId: number) => boolean;
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface FilterOptions {
  genre?: number;
  year?: number;
  rating?: number;
  search?: string;
  page?: number;
}
