import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPaste } from "../api";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaste(id)
      .then(setPaste)
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  if (error) return <h3>{error}</h3>;
  if (!paste) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Paste</h2>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#f5f5f5",
          padding: "10px",
        }}
      >
        {paste.content}
      </pre>

      <p>
        Remaining views:{" "}
        {paste.remaining_views === null
          ? "Unlimited"
          : paste.remaining_views}
      </p>

      <p>
        Expires at:{" "}
        {paste.expires_at ? paste.expires_at : "No expiry"}
      </p>
    </div>
  );
}
