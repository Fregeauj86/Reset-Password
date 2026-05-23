import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const handleSession = async () => {
      try {
        // 1. Try PKCE flow (new Supabase)
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );

        if (!error) return;

        // 2. Fallback: implicit flow (#access_token)
        const hash = window.location.hash;

        if (hash.includes("access_token")) {
          const params = new URLSearchParams(hash.replace("#", "?"));

          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");

          if (access_token && refresh_token) {
            await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
          }
        }

        // SIGNUP DETECTION
        if (window.location.hash.includes("type=signup")) {
          setIsSignup(true);
        }
      } catch (err) {
        console.error("Auth handling failed:", err);
      }
    };

    handleSession();
  }, []);

  const updatePassword = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) {
      alert("Auth session missing! Please reopen the email link.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (!error) setDone(true);
    else alert(error.message);
  };

  return (
    <div style={styles.bg}>
      <div style={styles.overlay} />
      <div style={styles.stars} />

      {/* HERO + ENGLISH DECORATIONS */}
      <div style={styles.leftDecor}>
        🦸‍♂️ ⚡ 📚 ✨ 🇬🇧
      </div>

      <div style={styles.rightDecor}>
        🦸‍♀️ 💬 🌎 🔤 ⭐
      </div>

      <div style={styles.topDecor}>
        ⚔️ HERO TRAINING PORTAL ⚔️
      </div>

      <div style={styles.bottomDecor}>
        💥 Learn English • Build Confidence • Become a Hero 💥
      </div>

      {/* MAIN CARD */}
      <div style={styles.card}>
        {/* WEBSITE NAME */}
        <div style={styles.websiteName}>
          ESL SUPER SQUAD
        </div>

        {/* SUPERHERO IMAGE */}
        <div style={styles.heroImage}>
          🦸‍♂️📚🦸‍♀️
        </div>

        {/* PAGE TITLE */}
        <div style={styles.title}>
          Restore Your Power
        </div>

        <div style={styles.subtitle}>
          The darkness corrupted your password.
          <br />
          Restore your power and return to the squad.
        </div>

        {/* SIGNUP SUCCESS */}
        {isSignup ? (
          <div style={styles.success}>
            🎉 EMAIL CONFIRMED 🎉
            <br />
            <br />
            Welcome to ESL Super Squad.
            <br />
            Your hero journey begins now.
          </div>
        ) : done ? (
          <div style={styles.success}>
            ⚡ POWER RESTORED ⚡
            <br />
            <br />
            Your hero account is active again.
          </div>
        ) : (
          <>
            {/* DECORATIVE BADGES */}
            <div style={styles.badges}>
              <span style={styles.badge}>Grammar</span>
              <span style={styles.badge}>Speaking</span>
              <span style={styles.badge}>Heroes</span>
            </div>

            <input
              type="password"
              placeholder="Enter new power code..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button onClick={updatePassword} style={styles.button}>
              ⚡ RESTORE POWER
            </button>

            <div style={styles.footerText}>
              Protect your hero identity with a strong password.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles: Record<string, React.CSSProperties> = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
    color: "white",
    position: "relative",
    overflow: "hidden",
    background:
      "radial-gradient(circle at top, #0f172a, #020617 70%)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 6px)",
    opacity: 0.5,
  },

  stars: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(white 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    opacity: 0.15,
  },

  leftDecor: {
    position: "absolute",
    left: "3%",
    top: "20%",
    fontSize: 28,
    lineHeight: 1.8,
    textShadow: "0 0 12px rgba(59,130,246,0.8)",
    animation: "float 5s ease-in-out infinite",
    zIndex: 2,
  },

  rightDecor: {
    position: "absolute",
    right: "3%",
    bottom: "18%",
    fontSize: 28,
    lineHeight: 1.8,
    textShadow: "0 0 12px rgba(239,68,68,0.8)",
    animation: "float 6s ease-in-out infinite",
    zIndex: 2,
  },

  topDecor: {
    position: "absolute",
    top: 30,
    fontSize: 18,
    letterSpacing: 2,
    color: "#facc15",
    fontWeight: "bold",
    textShadow: "0 0 12px rgba(250,204,21,0.8)",
    zIndex: 2,
  },

  bottomDecor: {
    position: "absolute",
    bottom: 25,
    fontSize: 14,
    color: "#cbd5e1",
    opacity: 0.85,
    zIndex: 2,
  },

  card: {
    width: 430,
    padding: 35,
    borderRadius: 20,
    background: "rgba(15, 23, 42, 0.82)",
    border: "2px solid rgba(255,255,255,0.15)",
    boxShadow:
      "0 0 60px rgba(239,68,68,0.25), 0 0 60px rgba(59,130,246,0.25)",
    textAlign: "center",
    backdropFilter: "blur(14px)",
    zIndex: 2,
    position: "relative",
  },

  websiteName: {
    fontSize: 14,
    letterSpacing: 3,
    color: "#93c5fd",
    marginBottom: 16,
    fontWeight: "bold",
  },

  heroImage: {
    fontSize: 52,
    marginBottom: 15,
    textShadow:
      "0 0 15px rgba(59,130,246,0.9), 0 0 15px rgba(239,68,68,0.7)",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#facc15",
    textShadow: "2px 2px 0px #000",
  },

  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    color: "#cbd5e1",
    lineHeight: 1.6,
  },

  badges: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 18,
    flexWrap: "wrap",
  },

  badge: {
    background: "rgba(59,130,246,0.18)",
    border: "1px solid rgba(147,197,253,0.4)",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    color: "#dbeafe",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "2px solid #334155",
    marginBottom: 18,
    fontSize: 14,
    outline: "none",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
    color: "white",
    background:
      "linear-gradient(90deg, #ef4444, #f59e0b, #3b82f6)",
    boxShadow:
      "0 0 25px rgba(239,68,68,0.45)",
    transition: "0.3s",
  },

  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: "#94a3b8",
  },

  success: {
    padding: 24,
    borderRadius: 14,
    background: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.4)",
    color: "#86efac",
    fontWeight: "bold",
    lineHeight: 1.8,
    boxShadow: "0 0 25px rgba(34,197,94,0.2)",
  },
};