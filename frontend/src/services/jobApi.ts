import { JobOpportunity } from '../types';
import { MOCK_JOBS } from '../data/mockData';
import { request } from './apiClient';

/**
 * Job Opportunities API Adapter
 * Connects to National Career Service (NCS) / State Skill Mission APIs or mock fallback.
 */
export const jobApi = {
  async getJobs(filters?: {
    sector?: string;
    district?: string;
    searchQuery?: string;
    minMatchPercentage?: number;
  }): Promise<{ data: JobOpportunity[]; source: string }> {
    try {
      const params = new URLSearchParams();
      if (filters?.sector) params.append('sector', filters.sector);
      if (filters?.district) params.append('district', filters.district);
      if (filters?.searchQuery) params.append('q', filters.searchQuery);

      const res = await request<{ data: JobOpportunity[]; source: string }>(
        `/jobs?${params.toString()}`
      );
      return res;
    } catch {
      let result = [...MOCK_JOBS];
      if (filters?.sector) {
        result = result.filter(j => j.sector.toLowerCase().includes(filters.sector!.toLowerCase()));
      }
      if (filters?.district) {
        result = result.filter(j => j.location.district.toLowerCase() === filters.district!.toLowerCase());
      }
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        result = result.filter(j =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.requiredSkills.some(s => s.toLowerCase().includes(q))
        );
      }
      if (filters?.minMatchPercentage) {
        result = result.filter(j => j.matchPercentage >= filters.minMatchPercentage!);
      }
      return {
        data: result,
        source: 'Demo Mock Data (National Career Service Portal)'
      };
    }
  },

  async getJobById(id: string): Promise<JobOpportunity | null> {
    try {
      const res = await request<JobOpportunity>(`/jobs/${id}`);
      return res;
    } catch {
      return MOCK_JOBS.find(j => j.id === id) || null;
    }
  }
};
