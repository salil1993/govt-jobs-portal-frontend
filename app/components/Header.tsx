'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 hidden sm:inline">Sarkari Jobs</h1>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/jobs"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            All Jobs
          </Link>
          <Link
            href="/jobs?sortBy=recent"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            Latest
          </Link>
          <Link
            href="/jobs?sortBy=last_date"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            Dates
          </Link>
          <Link
            href="/jobs?category=admit_card"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            Admit Cards
          </Link>
          <Link
            href="/jobs?category=result"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            Results
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/jobs"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold shadow-md"
          >
            Browse
          </Link>
        </div>
      </nav>
    </header>
  );
}
