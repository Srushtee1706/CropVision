"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState<string | null>(null);

  const router = useRouter();

  // Check if a user is already logged in
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (savedUser.email === email && savedUser.password === password) {
        setMessage("✅ Login Successful!");
        setTimeout(() => {
          localStorage.setItem("username", savedUser.name);
          setUsername(savedUser.name);
          router.push("/crop-prediction"); // redirect to prediction page
        }, 1000);
      } else {
        setMessage("❌ Invalid credentials. Please sign up first.");
      }
    } else {
      // SIGNUP
      if (name && email && password) {
        localStorage.setItem(
          "user",
          JSON.stringify({ name, email, password })
        );
        setMessage("✅ Account created! You can login now.");
        setIsLogin(true); // switch to login after signup
      } else {
        setMessage("❌ Please fill all fields.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    setMessage("🔒 Logged out successfully.");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          {username && (
            <div className="logout-section">
              <p>👋 Logged in as {username}</p>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {!username && (
            <>
              <h1>{isLogin ? "Login" : "Sign Up"}</h1>
              <p>
                {isLogin
                  ? "Sign in here if you already have an account."
                  : "Create your account to get started."}
              </p>

              <form className="login-form" onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <label htmlFor="name">NAME</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </>
                )}

                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />

                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />

                <button type="submit" className="login-button">
                  {isLogin ? "LOGIN" : "SIGN UP"}
                </button>
              </form>

              {message && <p className="login-message">{message}</p>}

              <div className="signup-link">
                <p>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    className="toggle-btn"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setMessage("");
                    }}
                  >
                    {isLogin ? "Sign up" : "Login"}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        <div className="login-right"></div>
      </div>
    </div>
  );
}









