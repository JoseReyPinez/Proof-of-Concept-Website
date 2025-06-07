import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Login({ auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect after login success
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />
      <button onClick={handleLogin}>Login</button>
      <p style={{ marginTop: 10 }}>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
            padding: 0,
            fontSize: "inherit",
          }}
        >
          Register here
        </button>
      </p>
    </div>
  );
}
