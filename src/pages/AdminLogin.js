import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function AdminLogin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginAsAdmin = async () => {
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔍 Check admins collection (doc id = email)
      const adminRef = doc(db, "admins", user.email);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists() || adminSnap.data().role !== "admin") {
        setError("You are not admin");
        await signOut(auth);   // ❌ logout non-admin
        navigate("/login");
        return;
      }

      // ✅ Admin verified
      navigate("/admin-dashboard");

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <p className="admin-sub">CRAFTIX Global Admin Panel</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={loginAsAdmin}>
          Continue with Google (Admin)
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
