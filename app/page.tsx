'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Job } from '@/app/lib/types';
import { jobsApi } from '@/app/lib/api';
import Header from '@/app/components/Header';
import JobCard from '@/app/components/JobCard';

export default function Home() {
  const [latestJobs, setLatestJobs] = useState<Job[]>([]);
  const [upcomingJobs, setUpcomingJobs] = useState<Job[]>([]);
  const [admitCards, setAdmitCards] = useState<Job[]>([]);
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [latest, upcoming, cards, res] = await Promise.all([
          jobsApi.getLatestJobs(),
          jobsApi.getUpcomingDates(),
          jobsApi.getAdmitCards(),
          jobsApi.getResults(),
        ]);
        setLatestJobs(latest || []);
        setUpcomingJobs(upcoming || []);
        setAdmitCards(cards || []);
        setResults(res || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Government Jobs Portal
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Your single destination for the latest government job notifications, admit cards, and exam results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/jobs"
              className="bg-white text-blue-700 px-8 py-3 rounded-full hover:bg-blue-50 transition-all font-bold text-lg shadow-lg"
            >
              Start Searching
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Latest Openings Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-blue-600">📋</span> Latest Openings
              </h3>
              <Link href="/jobs" className="text-blue-600 hover:underline text-sm font-medium">View All</Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => <div key={i} className="p-4 h-20 animate-pulse bg-gray-50"></div>)
                ) : latestJobs.length > 0 ? (
                  latestJobs.map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`} className="block p-4 hover:bg-blue-50 transition-colors group">
                      <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-1">{job.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{job.organization} • {job.location}</p>
                    </Link>
                  ))
                ) : (
                  <p className="p-8 text-center text-gray-500">No recent openings found.</p>
                )}
              </div>
            </div>
          </section>

          {/* Important Dates Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-red-500">📅</span> Upcoming Deadlines
              </h3>
              <Link href="/jobs" className="text-blue-600 hover:underline text-sm font-medium">View All</Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => <div key={i} className="p-4 h-20 animate-pulse bg-gray-50"></div>)
                ) : upcomingJobs.length > 0 ? (
                  upcomingJobs.map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`} className="block p-4 hover:bg-blue-50 transition-colors group">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-1">{job.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{job.organization}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase text-red-500">Last Date</span>
                          <p className="text-sm font-bold text-gray-700">{job.last_date || 'N/A'}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-8 text-center text-gray-500">No upcoming deadlines found.</p>
                )}
              </div>
            </div>
          </section>

          {/* Admit Cards Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-yellow-500">🎟️</span> Admit Cards
              </h3>
              <Link href="/jobs?category=admit_card" className="text-blue-600 hover:underline text-sm font-medium">View All</Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => <div key={i} className="p-4 h-20 animate-pulse bg-gray-50"></div>)
                ) : admitCards.length > 0 ? (
                  admitCards.map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`} className="block p-4 hover:bg-blue-50 transition-colors group">
                      <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-1">{job.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{job.organization}</p>
                    </Link>
                  ))
                ) : (
                  <p className="p-8 text-center text-gray-500">No admit cards available.</p>
                )}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-green-500">🎓</span> Exam Results
              </h3>
              <Link href="/jobs?category=result" className="text-blue-600 hover:underline text-sm font-medium">View All</Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {loading ? (
                  Array(5).fill(0).map((_, i) => <div key={i} className="p-4 h-20 animate-pulse bg-gray-50"></div>)
                ) : results.length > 0 ? (
                  results.map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`} className="block p-4 hover:bg-blue-50 transition-colors group">
                      <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-1">{job.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{job.organization}</p>
                    </Link>
                  ))
                ) : (
                  <p className="p-8 text-center text-gray-500">No results published yet.</p>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="container-custom text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Sarkari Jobs Portal. Real-time government notifications.</p>
        </div>
      </footer>
    </main>
  );
}
