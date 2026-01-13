'use client';

import { useEffect, useState, Suspense, SetStateAction } from 'react';
import { useSearchParams } from 'next/navigation';
import { Job, JobFilters, JobsResponse } from '@/app/lib/types';
import { jobsApi } from '@/app/lib/api';
import Header from '@/app/components/Header';
import JobCard from '@/app/components/JobCard';
import FilterSidebar from '@/app/components/FilterSidebar';

function JobsContent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<JobFilters>({
    category: searchParams.get('category') || undefined,
    organization: searchParams.get('organization') || undefined,
    location: searchParams.get('location') || undefined,
    searchQuery: searchParams.get('search') || undefined,
    sortBy: (searchParams.get('sortBy') as any) || undefined,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [cats, orgs, locs] = await Promise.all([
          jobsApi.getCategories(),
          jobsApi.getOrganizations(),
          jobsApi.getLocations(),
        ]);
        setCategories(cats || []);
        setOrganizations(orgs || []);
        setLocations(locs || []);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: JobsResponse = await jobsApi.getJobs(page, limit, filters);
        setJobs(response.jobs || []);
        setTotal(response.total || 0);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page, filters]);

  const handleFilterChange = (newFilters: SetStateAction<JobFilters>) => {
    if (typeof newFilters === 'function') {
      setFilters(prev => {
        const next = newFilters(prev);
        return next;
      });
    } else {
      setFilters(newFilters);
    }
    setPage(1);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Government Jobs</h1>
            <p className="text-gray-600">Showing {jobs.length} of {total} jobs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar
                filters={filters}
                setFilters={handleFilterChange}
                categories={categories}
                organizations={organizations}
                locations={locations}
                loading={loading}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600 text-lg">No jobs found matching your filters.</p>
                  <button
                    onClick={() =>
                      handleFilterChange({
                        category: undefined,
                        organization: undefined,
                        location: undefined,
                        searchQuery: undefined,
                      })
                    }
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1 || loading}
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages || loading}
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading jobs portal...</div>
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}
