import React, { useEffect } from "react";
import heroImg from "../assets/hero.png"; // 👈 assets folder me hero.png rakho

function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const onScroll = () => {
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero reveal">
        <div className="hero-content">

          <div className="hero-text">
            <h1>We Build Powerful Digital Products</h1>
            <p>
              CRAFTIX Global helps startups, businesses, and students grow with
              secure, scalable and modern websites & applications.
            </p>
            <div className="hero-actions">
              <a href="/projects" className="hero-btn">View Our Work</a>
              <a href="/contact" className="hero-btn outline">Contact Us</a>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Hero" />
          </div>

        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="hero-trust reveal">
        <p>Trusted by students & small businesses</p>
        <div className="trust-logos">
          <span>React</span>
          <span>Node</span>
          <span>MySQL</span>
          <span>Firebase</span>
          <span>Android</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section reveal">
        <h2 className="section-title">What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Modern Design</h3>
            <p>Clean and professional UI/UX for your brand.</p>
          </div>
          <div className="feature-card">
            <h3>Fast Performance</h3>
            <p>Optimized code for speed and reliability.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Systems</h3>
            <p>Secure backend with authentication and database.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="home-services reveal">
        <h2 className="section-title">Our Services</h2>
        <div className="home-services-grid">
          <div className="home-service">Website Development</div>
          <div className="home-service">Web Applications</div>
          <div className="home-service">Student Projects</div>
          <div className="home-service">Mobile Applications</div>
        </div>
        <a href="/services" className="hero-btn">View All Services</a>
      </section>

      {/* STATS */}
      <section className="home-stats reveal">
        <div className="stat-box">
          <h2>5+</h2>
          <p>Projects</p>
        </div>
        <div className="stat-box">
          <h2>5+</h2>
          <p>Clients</p>
        </div>
        <div className="stat-box">
          <h2>1</h2>
          <p>Countries</p>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta reveal">
        <h2>Ready to start your project?</h2>
        <p>Let’s build something powerful together.</p>
        <a href="/contact" className="hero-btn">Get Started</a>
      </section>

      {/* WHATSAPP FLOAT BUTTON */}
      <a
        href="https://wa.me/917383330196?text=Hi%20I%20am%20interested%20in%20your%20services"
        className="whatsapp-widget"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="whatsapp-popup">
          Chat with us on WhatsApp
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>

    </div>
  );
}

export default Home;
