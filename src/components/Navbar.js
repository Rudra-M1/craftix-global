import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="glass-nav">
      {/* LOGO */}
      <div className="logo-box">
        <Link to="/">
          <img src={logo} alt="CRAFTIX Global" className="logo-img" />
        </Link>
      </div>

      {/* LINKS */}
      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
        <Link to="/projects" onClick={() => setOpen(false)}>Projects</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

        {/* AUTH LINKS */}
        {!user ? (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          </>
        ) : (
          <>
            {/* PROFILE ICON */}
            <Link to="/profile" className="profile-icon" onClick={() => setOpen(false)}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="26" 
                height="26" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 21c0-4-4-7-8-7s-8 3-8 7"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            <span
              style={{ cursor: "pointer", color: "#674188", fontSize: "14px" }}
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
