const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/dashboard';

export async function fetchKpi() {
  const res = await fetch(`${API_BASE}/kpi`);
  return res.json();
}

export async function fetchTrend() {
  const res = await fetch(`${API_BASE}/trend`);
  return res.json();
}

export async function fetchFeature() {
  const res = await fetch(`${API_BASE}/feature`);
  return res.json();
}

export async function fetchMonitor(type, timeRange = '7') {
  const res = await fetch(`${API_BASE}/monitor/${type}?timeRange=${timeRange}`);
  return res.json();
}

export async function fetchRealtime() {
  const res = await fetch(`${API_BASE}/realtime`);
  return res.json();
}

export async function fetchPcTopFeatures(timeRange = '7') {
  const res = await fetch(`${API_BASE}/top-features/pc?timeRange=${timeRange}`);
  return res.json();
}

export async function fetchMobileTopFeatures(timeRange = '7') {
  const res = await fetch(`${API_BASE}/top-features/mobile?timeRange=${timeRange}`);
  return res.json();
}
