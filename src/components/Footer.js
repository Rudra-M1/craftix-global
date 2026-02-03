import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-pro">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-col">
          <h3>CRAFTIX Global</h3>
          <p>
            We build modern websites and applications using the latest
            technologies to help businesses and students succeed.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: rudraprajapati494@gmail.com</p>
          <p>Phone: +91 7383330196</p>
          <p>Location: India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CRAFTIX Global. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
