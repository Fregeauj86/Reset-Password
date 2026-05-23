import ResetPassword from "./ResetPassword";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function EmailConfirmed() {
  return (
    <div style={styles.bg}>
      <div style={styles.overlay} />
      <div style={styles.stars} />

      {/* SIDE DECOR */}
      <div style={styles.leftDecor}>
        🦸‍♂️ ⚡ 📚 ✨ 🌎
      </div>

      <div style={styles.rightDecor}>
        🦸‍♀️ 💬 🔤 ⭐ 🇬🇧
      </div>

      <div style={styles.topBanner}>
        ⚔️ ESL SUPER SQUAD ⚔️
      </div>

      <div style={styles.bottomBanner}>
        💥 Learn English • Build Confidence • Become a Hero 💥
      </div>

      {/* MAIN CARD */}
      <div style={styles.card}>
        {/* HERO VISUAL */}
        <div style={styles.heroImage}>
          🦸‍♂️📚🦸‍♀️
        </div>

        {/* TITLE */}
        <h1 style={styles.title}>
          🎉 EMAIL CONFIRMED!
        </h1>

        <div style={styles.subtitle}>
          The heroes have accepted you into
          <br />
          <span style={styles.highlight}>
            ESL Super Squad
          </span>
        </div>

        {/* SUCCESS MESSAGE */}
        <div style={styles.successBox}>
          🦸‍♂️ You are now officially part of the team.
          <br />
          <br />
          Your English learning adventure begins now.
        </div>

        {/* POWER BADGES */}
        <div style={styles.badges}>
          <div style={styles.badge}>Grammar Power</div>
          <div style={styles.badge}>Speaking Boost</div>
          <div style={styles.badge}>Hero Status</div>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          🌟 Prepare for missions, lessons, and hero training.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"reset" | "confirmed">("reset");

  useEffect(() => {
    const hash = window.location.hash;

    // If Supabase sends signup confirmation
    if (hash.includes("type=signup")) {
      supabase.auth.exchangeCodeForSession(window.location.href);
      setView("confirmed");
    }

    // If password reset
    if (hash.includes("type=recovery")) {
      setView("reset");
    }
  }, []);

  if (view === "confirmed") return <EmailConfirmed />;
  return <ResetPassword />;
}

const styles: Record<string, React.CSSProperties> = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at top, #111827, #020617 75%)",
    color: "white",
    fontFamily: "Arial",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 8px)",
    opacity: 0.5,
  },

  stars: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(white 1px, transparent 1px)",
    backgroundSize: "45px 45px",
    opacity: 0.12,
  },

  leftDecor: {
    position: "absolute",
    left: "4%",
    top: "20%",
    fontSize: 30,
    lineHeight: 1.8,
    textShadow: "0 0 15px rgba(59,130,246,0.8)",
    zIndex: 2,
  },

  rightDecor: {
    position: "absolute",
    right: "4%",
    bottom: "18%",
    fontSize: 30,
    lineHeight: 1.8,
    textShadow: "0 0 15px rgba(239,68,68,0.8)",
    zIndex: 2,
  },

  topBanner: {
    position: "absolute",
    top: 28,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#facc15",
    textShadow: "0 0 15px rgba(250,204,21,0.8)",
    zIndex: 2,
  },

  bottomBanner: {
    position: "absolute",
    bottom: 24,
    fontSize: 14,
    color: "#cbd5e1",
    opacity: 0.85,
    zIndex: 2,
  },

  card: {
    width: 460,
    padding: 40,
    borderRadius: 24,
    background: "rgba(15, 23, 42, 0.82)",
    border: "2px solid rgba(255,255,255,0.12)",
    textAlign: "center",
    backdropFilter: "blur(16px)",
    position: "relative",
    zIndex: 2,
    boxShadow:
      "0 0 70px rgba(59,130,246,0.2), 0 0 70px rgba(239,68,68,0.18)",
  },

  heroImage: {
    fontSize: 60,
    marginBottom: 18,
    textShadow:
      "0 0 20px rgba(59,130,246,0.8), 0 0 20px rgba(239,68,68,0.7)",
  },

  title: {
    margin: 0,
    fontSize: 34,
    color: "#facc15",
    textShadow: "2px 2px 0px #000",
    marginBottom: 18,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#dbeafe",
    marginBottom: 28,
  },

  highlight: {
    color: "#93c5fd",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  successBox: {
    padding: 24,
    borderRadius: 16,
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.35)",
    color: "#86efac",
    fontWeight: "bold",
    lineHeight: 1.8,
    boxShadow: "0 0 25px rgba(34,197,94,0.15)",
    marginBottom: 24,
  },

  badges: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 24,
  },

  badge: {
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(59,130,246,0.18)",
    border: "1px solid rgba(147,197,253,0.4)",
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  footer: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 1.7,
  },
};