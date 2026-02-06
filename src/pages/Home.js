import React, { useEffect } from "react";
import heroImg from "../assets/hero.png";

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".reveal")
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
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
            <img
              src={heroImg}
              alt="Craftix Global hero"
              loading="eager"
              fetchpriority="high"
            />
          </div>

        </div>
      </section>

      {/* TRUST */}
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

    </div>
  );
}

export default Home;
