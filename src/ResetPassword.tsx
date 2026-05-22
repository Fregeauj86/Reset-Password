import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handleSession = async () => {
      await supabase.auth.exchangeCodeForSession(window.location.href);
    };

    handleSession();
  }, []);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (!error) setDone(true);
    else alert(error.message);
  };

  return (
    <div style={styles.bg}>
      {/* DARK OVERLAY */}
      <div style={styles.overlay} />

      {/* FLOATING VILLAINS */}
      <div style={styles.villains}>
        👹 Shadow Grammar Beast &nbsp;&nbsp; 🧟 Syntax Zombie &nbsp;&nbsp; 🐉 Error Dragon
      </div>

      {/* HEROES */}
      <div style={styles.heroes}>
        🦸‍♂️ Captain Grammar &nbsp;&nbsp; ⚡ Verb Flash &nbsp;&nbsp; 🦸‍♀️ Queen Vocabulary
      </div>

      {/* MAIN CARD */}
      <div style={styles.card}>
        <div style={styles.title}>📖⚡ COMIC BOOK RESET ZONE ⚡📖</div>

        <div style={styles.subtitle}>
          The villains corrupted your password — the heroes are restoring your powers!
        </div>

        {done ? (
          <div style={styles.success}>
            🎉 HERO RESTORED! 🎉  
            <br />
            You have defeated the villains and reclaimed your account.
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
              ⚡ DEFEAT THE VILLAINS & RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* 🎨 COMIC STYLES */
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
      "radial-gradient(circle at top, #111827, #000000 70%)",
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
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "bold",
    textShadow: "0 0 10px black",
    animation: "float 4s ease-in-out infinite",
  },

  heroes: {
    position: "absolute",
    bottom: "15%",
    right: "5%",
    fontSize: 16,
    color: "#60a5fa",
    fontWeight: "bold",
    textShadow: "0 0 10px black",
    animation: "float 5s ease-in-out infinite",
  },

  card: {
    width: 420,
    padding: 30,
    borderRadius: 16,
    background:
      "rgba(20, 20, 40, 0.75)",
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