'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sarkari Jobs</h1>
          </div>
          <Link 
            href="/jobs" 
            className="btn-primary"
          >
            Browse Jobs
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container-custom py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Find Your Dream Government Job
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover latest government job opportunities, exam dates, eligibility requirements, 
          and application deadlines all in one place.
        </p>
        <Link 
          href="/jobs"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          View All Jobs
        </Link>
      </section>

      {/* Features */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-3">Latest Openings</h3>
            <p className="text-gray-600">Stay updated with the latest government job openings from various departments.</p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-3">Important Dates</h3>
            <p className="text-gray-600">Never miss important deadlines with our comprehensive date tracking system.</p>
          </div>
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Filtered Search</h3>
            <p className="text-gray-600">Filter jobs by category, location, organization and find the perfect match.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container-custom text-center">
          <p>&copy; 2024 Sarkari Jobs Portal. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
