import React, { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // EMAIL/PASSWORD LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          last_login: serverTimestamp()
        },
        { merge: true }
      );

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  // GOOGLE LOGIN
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          last_login: serverTimestamp()
        },
        { merge: true }
      );

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="premium-login">

        <img src={logo} alt="CRAFTIX Global" className="login-logo" />

        <h2>Welcome Back</h2>
        <p className="login-sub">Sign in to your account</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <button style={{ marginTop: "12px" }} onClick={loginWithGoogle}>
          Continue with Google
        </button>

        <p className="login-register-text">
          Not registered yet? <Link to="/register">Create an account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
