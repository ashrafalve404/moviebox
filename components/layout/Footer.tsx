import Link from 'next/link';
import { FaFilm, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <FaFilm className="text-red-600 text-2xl" />
              <span className="text-white text-xl font-bold">MovieBox</span>
            </Link>
            <p className="text-zinc-400 text-sm">
              Your ultimate destination for streaming movies and TV shows.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Browse</h4>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-zinc-400 text-sm hover:text-white transition-colors">All Movies</Link></li>
              <li><Link href="/browse?genre=28" className="text-zinc-400 text-sm hover:text-white transition-colors">Action</Link></li>
              <li><Link href="/browse?genre=878" className="text-zinc-400 text-sm hover:text-white transition-colors">Sci-Fi</Link></li>
              <li><Link href="/browse?genre=35" className="text-zinc-400 text-sm hover:text-white transition-colors">Comedy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/profile" className="text-zinc-400 text-sm hover:text-white transition-colors">Profile</Link></li>
              <li><Link href="/profile?tab=watchlist" className="text-zinc-400 text-sm hover:text-white transition-colors">Watchlist</Link></li>
              <li><Link href="/profile?tab=liked" className="text-zinc-400 text-sm hover:text-white transition-colors">Liked Movies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 text-center">
          <p className="text-zinc-500 text-sm">
            &copy; {currentYear} MovieBox. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
