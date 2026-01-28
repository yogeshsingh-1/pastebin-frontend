import { useState } from "react";
import { createPaste } from "../api";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const payload = {
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      };

      const res = await createPaste(payload);
      setResult(res);
      setContent("");
      setTtl("");
      setViews("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Create PasteBin</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={8}
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: "100%" }}
        />

        <input
          type="number"
          placeholder="TTL (seconds, optional)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max views (optional)"
          value={views}
          onChange={(e) => setViews(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>

      {result && (
        <p>
          ✅ Paste created: <br />
          <a href={result.url} target="_blank">
            {result.url}
          </a>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
