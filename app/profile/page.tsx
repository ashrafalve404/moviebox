'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaFilm, FaHeart, FaList, FaSignOutAlt, FaStar } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';
import { useMovieStore } from '@/store/movieStore';
import MovieCard from '@/components/movie/MovieCard';

type TabType = 'watchlist' | 'liked';

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { watchlist, likedMovies } = useMovieStore();
  
  const [activeTab, setActiveTab] = useState<TabType>('watchlist');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'liked') {
      setActiveTab('liked');
    } else {
      setActiveTab('watchlist');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-black min-h-screen pt-24 flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const displayedMovies = activeTab === 'watchlist' ? watchlist : likedMovies;

  return (
    <div className="bg-black min-h-screen pt-28 pb-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-zinc-800 mb-4">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-4xl">
                  <FaUser />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
            <p className="text-zinc-400">{user.email}</p>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-900 rounded-lg p-6 text-center">
                <FaList className="mx-auto text-red-500 text-2xl mb-2" />
                <div className="text-2xl font-bold text-white">{watchlist.length}</div>
                <div className="text-zinc-400 text-sm">Watchlist</div>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 text-center">
                <FaHeart className="mx-auto text-red-500 text-2xl mb-2" />
                <div className="text-2xl font-bold text-white">{likedMovies.length}</div>
                <div className="text-zinc-400 text-sm">Liked</div>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 text-center">
                <FaStar className="mx-auto text-red-500 text-2xl mb-2" />
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-zinc-400 text-sm">Reviews</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>

        <div className="border-b border-zinc-800 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'watchlist'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FaList className="inline mr-2" />
              Watchlist
              {activeTab === 'watchlist' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'liked'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FaHeart className="inline mr-2" />
              Liked Movies
              {activeTab === 'liked' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          </div>
        </div>

        {displayedMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaFilm className="mx-auto text-zinc-600 text-5xl mb-4" />
            <p className="text-zinc-400 text-lg">
              {activeTab === 'watchlist' 
                ? 'Your watchlist is empty' 
                : 'You haven\'t liked any movies yet'}
            </p>
            <Link
              href="/browse"
              className="inline-block mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="bg-black min-h-screen pt-28 flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
