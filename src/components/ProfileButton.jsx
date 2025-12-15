import React, { useState } from "react";
import API from "../api";

export default function ProfileButton({ setUsername }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e && e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const res = await API.post(`/login`, { email, password });
        setUsername(res.data?.username || "User");
      } else {
        const res = await API.post(`/signup`, { email, password, username: name });
        setUsername(res.data?.username || name || "User");
      }
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ position: "relative" }}>
      <button className="link" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        Profile
      </button>

      {open && (
        <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", width: 300, background: "rgba(2,6,23,0.95)", padding: 12, borderRadius: 8, boxShadow: "0 6px 18px rgba(2,6,23,0.6)" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button className="link" onClick={() => setMode("login")} style={{ flex: 1, textAlign: "left" }}>Login</button>
            <button className="link" onClick={() => setMode("signup")} style={{ flex: 1, textAlign: "left" }}>Signup</button>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mode === "signup" && (
              <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
            )}
            <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button type="submit" disabled={loading} style={{ padding: "6px 10px", borderRadius: 6, background: "#06b6d4", border: "none", color: "#012" }}>{loading ? "..." : (mode === "login" ? "Login" : "Signup")}</button>
              <button type="button" className="link" onClick={() => { setOpen(false); setError(null); }}>Close</button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
}
