import ResetPassword from "./ResetPassword";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function EmailConfirmed() {
  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1>🎉 EMAIL CONFIRMED!</h1>
        <p>The heroes have accepted you into ESL Super Squad.</p>
        <p>🦸‍♂️ You are now officially part of the team.</p>
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
    background: "#0b0f1a",
    color: "white",
    fontFamily: "Arial",
  },
  card: {
    padding: 30,
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    textAlign: "center",
  },
};