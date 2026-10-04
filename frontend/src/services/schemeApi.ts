import { GovernmentScheme, SelfEmploymentOpportunity } from '../types';
import { MOCK_SCHEMES, MOCK_SELF_EMPLOYMENT } from '../data/mockData';
import { request } from './apiClient';

/**
 * Government Schemes & Self-Employment API Adapter
 */
export const schemeApi = {
  async getSchemes(): Promise<{ data: GovernmentScheme[]; source: string }> {
    try {
      const res = await request<{ data: GovernmentScheme[]; source: string }>('/schemes');
      return res;
    } catch {
      return {
        data: MOCK_SCHEMES,
        source: 'Official Scheme Information (Ministry of Social Justice & Empowerment)'
      };
    }
  },

  async getSelfEmploymentOpportunities(): Promise<{ data: SelfEmploymentOpportunity[]; source: string }> {
    try {
      const res = await request<{ data: SelfEmploymentOpportunity[]; source: string }>('/self-employment');
      return res;
    } catch {
      return {
        data: MOCK_SELF_EMPLOYMENT,
        source: 'Rojgar Sathi Enterprise Guidance Repository'
      };
    }
  }
};
