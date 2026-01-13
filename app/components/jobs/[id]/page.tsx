'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Job } from '@/app/lib/types';
import { jobsApi } from '@/app/lib/api';
import Header from '@/app/components/Header';
import { format } from 'date-fns';

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobId = typeof params.id === 'string' ? parseInt(params.id) : params.id;
        const fetchedJob = await jobsApi.getJobById(jobId);
        setJob(fetchedJob);
      } catch (err) {
        setError('Failed to load job details. Please try again.');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Loading job details...</div>
        </div>
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <div className="text-red-600 mb-4">{error || 'Job not found'}</div>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Go back
          </button>
        </div>
      </>
    );
  }

  const lastDateObj = new Date(job.last_date);
  const examDateObj = job.exam_date ? new Date(job.exam_date) : null;
  const postingDateObj = new Date(job.posting_date);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            ← Back to Jobs
          </button>

          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{job.organization}</p>
              </div>
              <a
                href={job.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Apply Now
              </a>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Location</h3>
                <p className="text-lg text-gray-900">{job.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h3>
                <p className="text-lg text-gray-900">{job.category}</p>
              </div>
              {job.posts && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Posts Available</h3>
                  <p className="text-lg text-gray-900">{job.posts}</p>
                </div>
              )}
              {job.salary && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Salary</h3>
                  <p className="text-lg text-gray-900">{job.salary}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Job</h2>
                <div className="text-gray-700 whitespace-pre-wrap">{job.description}</div>
              </div>

              {/* Qualification */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h2>
                <div className="text-gray-700 whitespace-pre-wrap">{job.qualification}</div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Important Dates */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Important Dates</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(postingDateObj, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Date to Apply</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(lastDateObj, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  {examDateObj && (
                    <div>
                      <p className="text-sm text-gray-500">Exam Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {format(examDateObj, 'MMM dd, yyyy')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Source */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-500 mb-2">Feed Source</p>
                <p className="text-lg font-semibold text-gray-900">{job.feed_source}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
