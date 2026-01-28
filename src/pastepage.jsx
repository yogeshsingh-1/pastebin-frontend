import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const API_BASE = import.meta.env.VITE_API_BASE || "http://13.233.140.171:8001";

export default function PastePage() {
    const { slug } = useParams();
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // prevent duplicate state updates

        const fetchPaste = async () => {
            try {
                const res = await fetch(`${API_BASE}/p/${slug}`);
                const data = await res.json();

                if (!res.ok || data.success === false) {
                    throw new Error(data.reason || "NOT_FOUND");
                }

                if (isMounted) setContent(data.content);
            } catch (err) {
                if (isMounted) setError(true);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPaste();

        return () => {
            isMounted = false; // cleanup
        };
    }, [slug]);

    if (loading) return <h3 style={styles.loading}>Loading...</h3>;
    if (error) return <NotFound />;

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Your Paste</h2>
                <pre style={styles.content}>{content}</pre>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
        fontFamily: "sans-serif",
        padding: 20,
        boxSizing: "border-box",
    },

    card: {
        width: "100%",
        maxWidth: 700,
        background: "#fff",
        padding: 30,
        borderRadius: 6,
        boxSizing: "border-box",
    },

    title: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 24,
        color: "#222",
    },

    content: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontSize: 16,
        lineHeight: 1.5,
        color: "#333",
    },

    loading: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 18,
    },
};
