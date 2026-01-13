// Type definitions for the government jobs portal

export interface Job {
  id: number;
  title: string;
  organization: string;
  job_url: string;
  description: string;
  posting_date: string;
  last_date: string;
  exam_date: string | null;
  location: string;
  category: string;
  posts: number;
  salary: string | null;
  qualification: string;
  feed_source: string;
}

export interface JobFilters {
  category?: string;
  organization?: string;
  location?: string;
  searchQuery?: string;
  lastDate?: string;
  sortBy?: 'recent' | 'title' | 'organization';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
}
