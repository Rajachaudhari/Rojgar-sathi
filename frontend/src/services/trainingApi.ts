import { TrainingProgram } from '../types';
import { MOCK_TRAINING_PROGRAMS } from '../data/mockData';
import { request } from './apiClient';

/**
 * Training API Adapter
 * Standardized interface to consume official MSDE / NSDC / Rojgar Sathi skill training APIs.
 * When real government APIs become accessible, replace endpoint handlers without touching UI.
 */
export const trainingApi = {
  async getPrograms(filters?: {
    sector?: string;
    district?: string;
    maxDurationMonths?: number;
    searchQuery?: string;
  }): Promise<{ data: TrainingProgram[]; source: string }> {
    try {
      const params = new URLSearchParams();
      if (filters?.sector) params.append('sector', filters.sector);
      if (filters?.district) params.append('district', filters.district);
      if (filters?.searchQuery) params.append('q', filters.searchQuery);

      const res = await request<{ data: TrainingProgram[]; source: string }>(
        `/training?${params.toString()}`
      );
      return res;
    } catch {
      // Local fallback with simulated filtering
      let result = [...MOCK_TRAINING_PROGRAMS];
      if (filters?.sector) {
        result = result.filter(p => p.sector.toLowerCase().includes(filters.sector!.toLowerCase()));
      }
      if (filters?.district) {
        result = result.filter(p => p.trainingCenter.district.toLowerCase() === filters.district!.toLowerCase());
      }
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        result = result.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.sector.toLowerCase().includes(q) ||
          p.jobRole.toLowerCase().includes(q)
        );
      }
      return {
        data: result,
        source: 'Demo Mock Data (Skill India / Rojgar Sathi Registry)'
      };
    }
  },

  async getProgramById(id: string): Promise<TrainingProgram | null> {
    try {
      const res = await request<TrainingProgram>(`/training/${id}`);
      return res;
    } catch {
      return MOCK_TRAINING_PROGRAMS.find(p => p.id === id) || null;
    }
  }
};
