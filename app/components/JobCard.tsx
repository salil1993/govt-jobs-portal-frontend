'use client';

import Link from 'next/link';
import { Job } from '@/app/lib/types';
import { format } from 'date-fns';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const lastDateObj = new Date(job.last_date);
  const daysLeft = Math.ceil((lastDateObj.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const isHot = daysLeft <= 7 && daysLeft > 0;

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="card p-6 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600">{job.organization}</p>
          </div>
          {isHot && (
            <span className="badge bg-red-500 text-white text-xs font-bold whitespace-nowrap ml-2">
              Hot!
            </span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>📍</span>
            <span className="line-clamp-1">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>🏷️</span>
            <span>{job.category}</span>
          </div>
          {job.posts && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>👥</span>
              <span>{job.posts} posts</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Last: {format(lastDateObj, 'MMM dd, yyyy')}
            </span>
            {isHot && (
              <span className="text-xs font-semibold text-red-600">
                {daysLeft} days left
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
