"use client";

export const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function apiFetch(path: string, init?: RequestInit) {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

