import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();import React, { useState, useEffect } from "react";
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
    <nav className="glass-nav" aria-label="Main navigation">
      <div className="logo-box">
        <Link to="/">
          <img
            src={logo}
            alt="Craftix Global Logo"
            className="logo-img"
          />
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
          <NavLink
            to="/profile"
            className="profile-icon"
            onClick={() => setOpen(false)}
          >
            👤
          </NavLink>
        )}
      </div>

      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </nav>
  );
}

export default Navbar;


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
    <nav className="glass-nav" aria-label="Main navigation">
      {/* LOGO + BRAND NAME */}
      <div className="logo-box">
        <Link to="/" aria-label="Craftix Global Home">
          <img
            src={logo}
            alt="Craftix Global - Web Development Company Logo"
            className="logo-img"
          />
        </Link>
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/about" onClick={() => setOpen(false)}>
          About
        </NavLink>

        <NavLink to="/services" onClick={() => setOpen(false)}>
          Services
        </NavLink>

        <NavLink to="/projects" onClick={() => setOpen(false)}>
          Projects
        </NavLink>

        <NavLink to="/contact" onClick={() => setOpen(false)}>
          Contact
        </NavLink>

        {/* AUTH LINKS */}
        {!user ? (
          <>
            <NavLink to="/login" onClick={() => setOpen(false)}>
              Login
            </NavLink>
            <NavLink to="/register" onClick={() => setOpen(false)}>
              Register
            </NavLink>
          </>
        ) : (
          <>
            {/* PROFILE */}
            <NavLink
              to="/profile"
              className="profile-icon"
              aria-label="User Profile"
              onClick={() => setOpen(false)}
            >
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
                <path d="M20 21c0-4-4-7-8-7s-8 3-8 7" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </NavLink>

            <button
              onClick={handleLogout}
              className="logout-btn"
              aria-label="Logout"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#674188",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="menu-btn"
        aria-label="Toggle navigation menu"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
