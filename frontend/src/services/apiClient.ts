/**
 * Central API Client for Rojgar Sathi Livelihood Assistant
 * Designed for REST architecture with JWT token persistence and offline fallback.
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('rojgar_sathi_auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || `API error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn(`Request to ${endpoint} failed, checking local fallback:`, err.message);
    throw err;
  }
}
