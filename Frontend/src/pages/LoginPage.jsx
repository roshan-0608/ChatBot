import { useState } from "react";
import "./LoginPage.css";

// Simple inline icon components (no external image files needed)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const EyeIcon = ({ visible }) =>
  visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

// const AppleIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M16.365 1.43c0 1.14-.463 2.075-1.14 2.795-.727.778-1.94 1.386-2.933 1.31-.124-1.084.42-2.234 1.096-2.943.735-.79 2.02-1.386 2.977-1.162zM20.94 17.19c-.402.926-.883 1.815-1.5 2.653-.884 1.207-1.61 2.045-2.51 2.05-.87.006-1.16-.564-2.42-.564-1.26 0-1.598.552-2.42.582-.87.032-1.53-.9-2.42-2.1-1.83-2.505-3.15-7.09-1.32-10.2.912-1.55 2.55-2.53 4.34-2.556 1.05-.02 2.04.71 2.68.71.64 0 1.83-.878 3.084-.75.525.022 2.002.213 2.95 1.6-.077.048-1.762 1.032-1.744 3.075.02 2.437 2.145 3.25 2.28 3.3z" />
//   </svg>
// );

// const GoogleIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24">
//     <path fill="#4285F4" d="M23.52 12.27c0-.85-.07-1.65-.2-2.43H12v4.6h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.1 3.58-5.18 3.58-8.79z" />
//     <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1C3.24 21.3 7.29 24 12 24z" />
//     <path fill="#FBBC05" d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.27a12 12 0 0 0 0 10.8z" />
//     <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.29 0 3.24 2.7 1.27 6.6l4 3.1C6.22 6.86 8.87 4.75 12 4.75z" />
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
//     <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
//   </svg>
// );

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your auth logic
    console.log({ email, password, remember });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form-panel">
          <div className="login-form-inner">
            <div className="login-brand-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#141522" strokeWidth="1.8">
                <path d="M3 11.5L12 4l9 7.5" />
                <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
              </svg>
            </div>

            <h1 className="login-title">Welcome Back!!</h1>
            <p className="login-subtitle">Sign in to continue your conversations.</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="input-icon"><MailIcon /></span>
              </div>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-icon input-icon-button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>

              <div className="login-row">
                <label className="remember-check">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember</span>
                </label>
                <a href="#forgot" className="forgot-link">Forgot password</a>
              </div>

              <button type="submit" className="login-button">Login</button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            {/* <div className="social-row">
              <button type="button" className="social-button" aria-label="Continue with Apple">
                <AppleIcon />
              </button>
              <button type="button" className="social-button" aria-label="Continue with Google">
                <GoogleIcon />
              </button>
              <button type="button" className="social-button" aria-label="Continue with Facebook">
                <FacebookIcon />
              </button>
            </div> */}
            <p className="register-text">
                Don't have an account? <a href="#register" className="register-link">Create account</a>
            </p>
          </div>
        </div>

        <div className="login-visual-panel">
          <div className="blob blob-one"></div>
          <div className="blob blob-two"></div>
          <div className="blob blob-three"></div>
        </div>
      </div>
    </div>
  );
}