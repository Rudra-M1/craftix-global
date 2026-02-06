import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from "../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <nav className="glass-nav">
      <div className="logo-box">
        <Link to="/">
          <img src={logo} alt="Craftix Global Logo" className="logo-img" />
        </Link>
      </div>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="/services" onClick={() => setOpen(false)}>Services</NavLink>
        <NavLink to="/projects" onClick={() => setOpen(false)}>Projects</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

        {!user ? (
          <>
            <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
            <NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink>
          </>
        ) : (
          <NavLink to="/profile" className="profile-icon">👤</NavLink>
        )}
      </div>

      <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>
    </nav>
  );
}

export default Navbar;
