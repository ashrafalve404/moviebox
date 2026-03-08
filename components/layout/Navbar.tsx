'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaSearch, FaUser, FaSignOutAlt, FaFilm, FaHeart, FaList } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';
import { useMovieStore } from '@/store/movieStore';
import SearchBar from '@/components/ui/SearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const { watchlist, likedMovies } = useMovieStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <FaFilm className="text-red-600 text-2xl" />
              <span className="text-white text-xl font-bold">MovieBox</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href ? 'text-white' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {showSearch && (
              <div className="hidden md:block">
                <SearchBar />
              </div>
            )}
            
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-zinc-300 hover:text-white transition-colors p-2"
            >
              <FaSearch />
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="text-zinc-300 hover:text-white transition-colors p-2 relative"
                  title="Watchlist"
                >
                  <FaList />
                  {watchlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {watchlist.length}
                    </span>
                  )}
                </Link>
                <Link
                  href="/profile?tab=liked"
                  className="text-zinc-300 hover:text-white transition-colors p-2 relative"
                  title="Liked Movies"
                >
                  <FaHeart />
                  {likedMovies.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {likedMovies.length}
                    </span>
                  )}
                </Link>
                
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-700">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.username}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <FaUser />
                        </div>
                      )}
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-zinc-300 hover:text-white transition-colors p-2"
                    title="Logout"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-zinc-300 hover:text-white p-2"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="mb-4">
              <SearchBar />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href ? 'text-white' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
