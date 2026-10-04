import { LocalMarketCluster } from '../types';
import { MOCK_LOCAL_CLUSTERS } from '../data/mockData';
import { request } from './apiClient';

/**
 * Location & Local District Market Analysis API Adapter
 */
export const locationApi = {
  async getLocalMarketClusters(): Promise<LocalMarketCluster[]> {
    try {
      const res = await request<LocalMarketCluster[]>('/local-opportunities');
      return res;
    } catch {
      return MOCK_LOCAL_CLUSTERS;
    }
  },

  async getClusterByDistrict(district: string): Promise<LocalMarketCluster | null> {
    try {
      const res = await request<LocalMarketCluster>(`/location?district=${district}`);
      return res;
    } catch {
      return MOCK_LOCAL_CLUSTERS.find(c => c.district.toLowerCase() === district.toLowerCase()) || MOCK_LOCAL_CLUSTERS[0];
    }
  }
};
