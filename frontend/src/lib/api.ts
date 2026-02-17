import type { ClassifyResponse } from '../types';

const API_BASE = 'http://localhost:8001/api';

export async function classifyMessage(text: string): Promise<ClassifyResponse> {
  const res = await fetch(`${API_BASE}/classify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error(`Classification failed: ${res.status}`);
  }

  return res.json();
}
