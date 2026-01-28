const API_BASE = import.meta.env.VITE_API_BASE || "http://13.233.140.171:8001";

export async function createPaste(data) {
  const res = await fetch(`${API_BASE}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create paste");
  }

  return res.json();
}

export async function fetchPaste(id) {
  const res = await fetch(`${API_BASE}/api/pastes/${id}`);

  if (!res.ok) {
    throw new Error("Paste not found or expired");
  }

  return res.json();
}
