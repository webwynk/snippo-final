import { useState } from "react";
import { apiRequest } from "../../utils/api";

export default function AuthModal({ onClose, onAuth, initTab = "login" }) {
  const [tab, setTab] = useState(initTab);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [f, setF] = useState({ name: "", email: "", pass: "", phone: "" });
  const [showPass, setShowPass] = useState(false);

  const submit = async () => {
    setErr("");
    if (!f.email.includes("@")) {
      setErr("Enter a valid email address");
      return;
    }
    if (f.pass.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }
    if (tab === "register" && !f.name.trim()) {
      setErr("Please enter your full name");
      return;
    }
    setLoading(true);
    try {
      const payload =
        tab === "login"
          ? await apiRequest("/auth/login-user", {
              method: "POST",
              body: { email: f.email, password: f.pass },
            })
          : await apiRequest("/auth/register-user", {
              method: "POST",
              body: { name: f.name, email: f.email, password: f.pass, phone: f.phone },
            });
      onAuth(payload);
    } catch (e) {
      setErr(e.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mov" onClick={() => onClose()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
            fontSize: 20,
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 900, fontSize: 21, letterSpacing: "-.03em", marginBottom: 3 }}>
            {tab === "login" ? "Welcome back" : "Create account"}
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            {tab === "login" ? "Sign in to your account" : "Join Snippo Entertainment today"}
          </div>
        </div>
        <div className="tabs">
          <div
            className={`tab ${tab === "login" ? "act" : ""}`}
            onClick={() => {
              setTab("login");
              setErr("");
            }}
          >
            Login
          </div>
          <div
            className={`tab ${tab === "register" ? "act" : ""}`}
            onClick={() => {
              setTab("register");
              setErr("");
            }}
          >
            Register
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {tab === "register" && (
            <input
              className="inp"
              placeholder="Full Name"
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
            />
          )}
          <input
            className="inp"
            type="email"
            placeholder="Email address"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
          />
          <div style={{ position: "relative" }}>
            <input
              className="inp"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={f.pass}
              onChange={(e) => setF({ ...f, pass: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              style={{ width: "100%", paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted)",
                opacity: 0.7
              }}
              title={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
          {tab === "register" && (
            <input
              className="inp"
              type="tel"
              placeholder="Phone number (optional)"
              value={f.phone}
              onChange={(e) => setF({ ...f, phone: e.target.value })}
            />
          )}
        </div>
        {err && (
          <div
            style={{
              color: "var(--red)",
              fontSize: 12,
              marginTop: 9,
              padding: "9px 11px",
              background: "rgba(230,57,70,.08)",
              borderRadius: 8,
              whiteSpace: "pre-line",
            }}
          >
            ⚠ {err}
          </div>
        )}
        <div style={{ textAlign: "center", margin: "5px 0", fontSize: 13, color: "var(--muted)" }}>
          {tab === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="ata" onClick={() => setTab(tab === "login" ? "register" : "login")}>
            {tab === "login" ? "Register here" : "Login here"}
          </span>
          .
        </div>
        <button
          className="btn btn-p"
          style={{ width: "100%", marginTop: 15, padding: 13 }}
          onClick={submit}
          disabled={loading}
        >
          {loading ? (
            <span className="ld">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </span>
          ) : tab === "login" ? (
            "Sign In →"
          ) : (
            "Create Account →"
          )}
        </button>
      </div>
    </div>
  );
}
