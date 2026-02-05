import React, { useEffect } from "react";
import aboutImg from "../assets/about.png";
import aboutImg1 from "../assets/about1.png";

function About() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const onScroll = () => {
      reveals.forEach((el) => {
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
    <main className="about-page">

      {/* HERO – SEO H1 */}
      <section className="about-hero reveal">
        <h1>
          About <span>Craftix Global</span>
        </h1>
        <p>
          Craftix Global is a professional web development and digital solutions
          company specializing in modern websites, scalable web applications,
          and secure software solutions for businesses, startups, and students.
        </p>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section">
        <div className="about-text reveal">
          <h2>Who We Are</h2>
          <p>
            Craftix Global is a technology-driven company delivering complete
            digital solutions including custom website development, web
            applications, UI/UX design, and backend system integration.
          </p>
          <p>
            Our team focuses on building fast, secure, and user-friendly digital
            products that help brands grow and succeed online.
          </p>
        </div>

        <div className="about-image reveal">
          <img
            src={aboutImg}
            alt="Craftix Global web development team"
          />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="about-section">
        <div className="about-image reveal">
          <img
            src={aboutImg1}
            alt="Craftix Global web development services"
          />
        </div>

        <div className="about-text reveal">
          <h2>What We Do</h2>
          <p>
            We provide end-to-end web development and software services designed
            to meet real-world business requirements.
          </p>
          <ul>
            <li>Custom Website & Web Application Development</li>
            <li>UI/UX Design & Frontend Development</li>
            <li>Secure Backend & Database Systems</li>
            <li>Admin Panels & Business Dashboards</li>
            <li>User Authentication & Management Systems</li>
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-section">
        <div className="about-text reveal">
          <h2>Why Choose Craftix Global</h2>
          <p>
            We focus on clean code, performance optimization, and SEO-friendly
            development. Every project is built with scalability and security in
            mind to ensure long-term success.
          </p>
          <p>
            Whether you are a business owner or a student, Craftix Global offers
            reliable and affordable solutions tailored to your goals.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stat reveal">
          <h3>7+</h3>
          <p>Projects Completed</p>
        </div>

        <div className="stat reveal">
          <h3>5+</h3>
          <p>Happy Clients</p>
        </div>

        <div className="stat reveal">
          <h3>1+</h3>
          <p>Countries Served</p>
        </div>
      </section>

    </main>
  );
}

export default About;
