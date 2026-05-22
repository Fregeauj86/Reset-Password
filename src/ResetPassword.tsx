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

        // 🆕 SIGNUP DETECTION (ADDED)
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

      {/* ICONS ONLY - HEROES & VILLAINS */}
      <div style={styles.villains}>
        👹 🧟 🐉 ⚠️ 💀
      </div>

      <div style={styles.heroes}>
        🦸‍♂️ ⚡ 🦸‍♀️ 📚 ✨
      </div>

      <div style={styles.card}>
        <div style={styles.title}>
          ESL Super Squad - Learn English. Save the World.
        </div>

        <div style={styles.subtitle}>
          The darkness corrupted your password. Restore your power and return to the squad.
        </div>

        {/* 🆕 SIGNUP SCREEN (ADDED) */}
        {isSignup ? (
          <div style={styles.success}>
            🎉 EMAIL CONFIRMED 🎉
            <br />
            You have joined the ESL Super Squad.
          </div>
        ) : done ? (
          <div style={styles.success}>
            🎉 POWER RESTORED 🎉
            <br />
            You are back in the ESL Super Squad.
          </div>
        ) : (
          <>
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
      "radial-gradient(circle at top, #0b1220, #000000 70%)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 6px)",
    opacity: 0.6,
  },

  villains: {
    position: "absolute",
    top: "15%",
    left: "5%",
    fontSize: 22,
    textShadow: "0 0 12px black",
    animation: "float 4s ease-in-out infinite",
  },

  heroes: {
    position: "absolute",
    bottom: "15%",
    right: "5%",
    fontSize: 22,
    textShadow: "0 0 12px black",
    animation: "float 5s ease-in-out infinite",
  },

  card: {
    width: 420,
    padding: 30,
    borderRadius: 16,
    background: "rgba(20, 20, 40, 0.75)",
    border: "2px solid rgba(255,255,255,0.15)",
    boxShadow:
      "0 0 40px rgba(239,68,68,0.3), 0 0 40px rgba(96,165,250,0.2)",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    zIndex: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#facc15",
    textShadow: "2px 2px 0px #000",
  },

  subtitle: {
    fontSize: 13,
    marginBottom: 20,
    color: "#cbd5e1",
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "2px solid #334155",
    marginBottom: 15,
    fontSize: 14,
    outline: "none",
  },

  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    background: "linear-gradient(90deg, #ef4444, #f59e0b, #3b82f6)",
    boxShadow: "0 0 20px rgba(239,68,68,0.5)",
  },

  success: {
    padding: 20,
    borderRadius: 12,
    background: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.4)",
    color: "#86efac",
    fontWeight: "bold",
  },
};