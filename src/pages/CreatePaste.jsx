import { useState } from "react";
import { createPaste } from "../api";
import { Link } from "react-router-dom";

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
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Create a Paste</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            placeholder="Write your text here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.textarea}
          />

          <div style={styles.row}>
            <input
              type="number"
              placeholder="TTL (seconds)"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Max views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Create</button>
        </form>

        {result && (
          <div style={styles.result}>
            <p>Paste created:</p>
            <Link to={`/p/${result.id}`} style={styles.link}>
              {window.location.origin}/p/{result.id}
            </Link>
          </div>
        )}

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: 600,
    padding: 20,
    background: "#fff",
    borderRadius: 6,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    color: "#222",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  textarea: {
    width: "100%",
    minHeight: 120,
    padding: 10,
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    resize: "vertical",
  },

  row: {
    display: "flex",
    gap: 10,
  },

  input: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
  },

  button: {
    padding: 10,
    fontSize: 15,
    borderRadius: 4,
    border: "1px solid #ccc",
    background: "#eee",
    cursor: "pointer",
  },

  result: {
    marginTop: 16,
    padding: 10,
    background: "#e6ffe6",
    border: "1px solid #34d399",
    borderRadius: 4,
  },

  link: {
    textDecoration: "none",
    color: "#065f46",
    wordBreak: "break-all",
  },

  error: {
    marginTop: 12,
    color: "#c00",
    textAlign: "center",
  },
};
