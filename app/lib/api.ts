'use client';

import axios, { AxiosInstance } from 'axios';
import { Job, JobFilters, JobsResponse } from './types';

const API_BASE_URL = '/api';
const SERVER_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: typeof window === 'undefined' ? SERVER_API_URL : API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
export const jobsApi = {
  // Get all jobs with pagination and filters
  getJobs: async (page: number = 1, limit: number = 20, filters?: JobFilters) => {
    try {
      const skip = (page - 1) * limit;
      const params: any = { skip, limit };

      if (filters?.searchQuery) params.search = filters.searchQuery;
      if (filters?.category) params.category = filters.category;
      if (filters?.organization) params.organization = filters.organization;
      if (filters?.location) params.location = filters.location;
      if (filters?.sortBy) params.sort_by = filters.sortBy;

      // Call the proxy without a trailing slash
      const response = await apiClient.get<Job[]>('jobs', { params });

      // Fetch total count separately
      const statsResponse = await apiClient.get<{ total_jobs: number }>('jobs/stats/count');

      return {
        jobs: response.data,
        total: statsResponse.data.total_jobs,
        page: page,
        limit: limit,
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // New Specialized Endpoints
  getLatestJobs: async () => {
    try {
      const response = await apiClient.get<Job[]>('jobs/latest');
      return response.data;
    } catch (error) {
      console.error('Error fetching latest jobs:', error);
      return [];
    }
  },

  getUpcomingDates: async () => {
    try {
      const response = await apiClient.get<Job[]>('jobs/upcoming-dates');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming dates:', error);
      return [];
    }
  },

  getAdmitCards: async () => {
    try {
      const response = await apiClient.get<Job[]>('jobs/admit-cards');
      return response.data;
    } catch (error) {
      console.error('Error fetching admit cards:', error);
      return [];
    }
  },

  getResults: async () => {
    try {
      const response = await apiClient.get<Job[]>('jobs/results');
      return response.data;
    } catch (error) {
      console.error('Error fetching results:', error);
      return [];
    }
  },

  // Get job by ID
  getJobById: async (id: number) => {
    try {
      const response = await apiClient.get<Job>(`jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  // Get unique categories
  getCategories: async () => {
    try {
      const response = await apiClient.get<string[]>('jobs/categories');
      return response.data;
    } catch (error) {
      console.warn('Error fetching categories, using fallback:', error);
      return ['job', 'admit_card', 'result'];
    }
  },

  // Get unique organizations
  getOrganizations: async () => {
    try {
      const response = await apiClient.get<string[]>('jobs/organizations');
      return response.data;
    } catch (error) {
      console.warn('Error fetching organizations:', error);
      return [];
    }
  },

  // Get unique locations
  getLocations: async () => {
    try {
      const response = await apiClient.get<string[]>('jobs/locations');
      return response.data;
    } catch (error) {
      console.warn('Error fetching locations:', error);
      return [];
    }
  },
};

export default apiClient;
