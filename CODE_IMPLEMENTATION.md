# Code Implementation Files for Government Jobs Portal

## Quick Clone & Setup

```bash
git clone https://github.com/salil1993/govt-jobs-portal-frontend.git
cd govt-jobs-portal-frontend
npm install

# Create .env.local
echo 'NEXT_PUBLIC_API_BASE_URL=http://localhost:8000' > .env.local

# Run development server
npm run dev
```

## Core Configuration Files

### 1. tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### 2. next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  },
};

module.exports = nextConfig;
```

### 3. tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#3b82f6',
        accent: '#10b981',
      },
    },
  },
  plugins: [],
}
export default config
```

### 4. postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Key Application Files

### File Structure to Create:
```
- types/job.ts
- services/jobService.ts
- hooks/useJobs.ts
- hooks/useFetch.ts
- app/layout.tsx
- app/page.tsx
- app/globals.css
- app/jobs/page.tsx
- app/jobs/[id]/page.tsx
- components/Header.tsx
- components/Footer.tsx
- components/JobCard.tsx
- components/JobList.tsx
- components/SearchBar.tsx
- components/FilterSidebar.tsx
```

## Detailed Code for Each File

### types/job.ts
```typescript
export interface Job {
  id: number;
  title: string;
  organization: string;
  posts: number | null;
  qualification: string | null;
  last_date: string | null;
  notification_url: string | null;
  official_website: string | null;
  category: 'job' | 'admit_card' | 'result';
  source_type: 'scraped' | 'rss' | 'manual';
  scraped_from: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobsResponse {
  total: number;
  skip: number;
  limit: number;
  data: Job[];
}
```

### services/jobService.ts
```typescript
import axios, { AxiosInstance } from 'axios';
import { Job, JobsResponse } from '@/types/job';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/jobs`,
  timeout: 10000,
});

export const jobService = {
  // Get all jobs with pagination
  async getJobs(skip: number = 0, limit: number = 20): Promise<Job[]> {
    try {
      const response = await api.get('/', {
        params: { skip, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Get single job by ID
  async getJobById(id: number): Promise<Job> {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      throw error;
    }
  },

  // Get jobs count/stats
  async getStats(): Promise<{ total_jobs: number }> {
    try {
      const response = await api.get('/stats/count');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Search jobs by title or organization
  async searchJobs(query: string, skip: number = 0, limit: number = 20): Promise<Job[]> {
    try {
      const jobs = await this.getJobs(skip, limit);
      return jobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.organization.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  },

  // Filter jobs by category
  async getJobsByCategory(category: string, skip: number = 0, limit: number = 20): Promise<Job[]> {
    try {
      const jobs = await this.getJobs(skip, limit);
      return jobs.filter(job => job.category === category);
    } catch (error) {
      console.error('Error filtering jobs:', error);
      throw error;
    }
  },
};
```

### hooks/useJobs.ts
```typescript
import { useState, useEffect, useCallback } from 'react';
import { Job } from '@/types/job';
import { jobService } from '@/services/jobService';

export const useJobs = (skip: number = 0, limit: number = 20) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await jobService.getJobs(skip, limit);
        setJobs(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [skip, limit]);

  return { jobs, loading, error };
};
```

### hooks/useFetch.ts
```typescript
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

## Component Files (Abbreviated)

Due to length, component files are simplified. Full implementations available in source.

### components/JobCard.tsx (Essential)
```typescript
'use client';
import Link from 'next/link';
import { Job } from '@/types/job';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <Link href={`/jobs/${job.id}`}>
        <h3 className="text-lg font-bold text-blue-600 hover:underline">{job.title}</h3>
      </Link>
      <p className="text-gray-600">{job.organization}</p>
      <p className="text-sm text-gray-500">Posts: {job.posts || 'N/A'}</p>
      <p className="text-sm text-gray-500">Qualification: {job.qualification || 'N/A'}</p>
      {job.last_date && <p className="text-sm text-red-500">Last Date: {job.last_date}</p>}
      <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
        {job.category}
      </span>
    </div>
  );
}
```

## Deployment Instructions

### Deploy to Vercel (Recommended)

1. Push to GitHub:
```bash
git add .
git commit -m "Initial Next.js frontend setup"
git push origin main
```

2. Go to https://vercel.com/import
3. Select your GitHub repository
4. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_BASE_URL`
   - Value: `https://your-backend-api.com` (or IP if deployed)
5. Click Deploy

Your site will be live at `https://govt-jobs-portal-frontend.vercel.app`

## Production Checklist

- [ ] Backend API URL configured in Vercel env vars
- [ ] CORS enabled on backend for Vercel domain
- [ ] Search functionality tested
- [ ] Filters working properly
- [ ] Job detail page loads correctly
- [ ] Mobile responsiveness verified
- [ ] Performance tested (Lighthouse)
- [ ] Analytics setup (optional)

---

**See SETUP_GUIDE.md for detailed setup instructions.**
