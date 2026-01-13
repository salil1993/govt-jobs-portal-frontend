'use client';

import { JobFilters } from '@/app/lib/types';
import { Dispatch, SetStateAction } from 'react';

interface FilterSidebarProps {
  filters: JobFilters;
  setFilters: Dispatch<SetStateAction<JobFilters>>;
  categories: string[];
  organizations: string[];
  locations: string[];
  loading?: boolean;
}

export default function FilterSidebar({
  filters,
  setFilters,
  categories,
  organizations,
  locations,
  loading = false,
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Search</label>
        <input
          type="text"
          placeholder="Search jobs..."
          value={filters.searchQuery || ''}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Category</label>
        <select
          value={filters.category || ''}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value || undefined })
          }
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Organization */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Organization</label>
        <select
          value={filters.organization || ''}
          onChange={(e) =>
            setFilters({ ...filters, organization: e.target.value || undefined })
          }
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 max-h-40 overflow-y-auto"
        >
          <option value="">All Organizations</option>
          {organizations.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Location</label>
        <select
          value={filters.location || ''}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value || undefined })
          }
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 max-h-40 overflow-y-auto"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() =>
          setFilters({
            category: undefined,
            organization: undefined,
            location: undefined,
            searchQuery: undefined,
          })
        }
        disabled={loading}
        className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 font-medium"
      >
        Clear Filters
      </button>
    </div>
  );
}
