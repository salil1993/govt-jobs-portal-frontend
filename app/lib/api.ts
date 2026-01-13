'use client';

import axios, { AxiosInstance } from 'axios';
import { Job, JobFilters, JobsResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
      const params = new URLSearchParams();
      params.append('skip', ((page - 1) * limit).toString());
      params.append('limit', limit.toString());

      if (filters?.category) params.append('category', filters.category);
      if (filters?.organization) params.append('organization', filters.organization);
      if (filters?.location) params.append('location', filters.location);
      if (filters?.searchQuery) params.append('search', filters.searchQuery);
      if (filters?.sortBy) params.append('sort_by', filters.sortBy);

      const response = await apiClient.get<JobsResponse>('/api/jobs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Get job by ID
  getJobById: async (id: number) => {
    try {
      const response = await apiClient.get<Job>(`/api/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  // Get unique categories
  getCategories: async () => {
    try {
      const response = await apiClient.get<string[]>('/api/jobs/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get unique organizations
  getOrganizations: async () => {
    try {
      const response = await apiClient.get<string[]>('/api/jobs/organizations');
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  },

  // Get unique locations
  getLocations: async () => {
    try {
      const response = await apiClient.get<string[]>('/api/jobs/locations');
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },
};

export default apiClient;
