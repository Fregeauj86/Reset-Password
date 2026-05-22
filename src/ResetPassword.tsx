import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (!error) setDone(true);
    else alert(error.message);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Reset Password</h2>

      {done ? (
        <p>Password updated. You can return to the app.</p>
      ) : (
        <>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, display: "block", marginBottom: 10 }}
          />

          <button onClick={updatePassword}>
            Set New Password
          </button>
        </>
      )}
    </div>
  );
}