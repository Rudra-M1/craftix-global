import React, { useEffect } from "react";

function Services() {

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
    <div className="services-page">

      {/* HERO */}
      <section className="services-hero reveal">
        <h1>Our Services</h1>
        <p className="services-subtitle">
          CRAFTIX Global provides professional web development and digital
          solutions for businesses, startups, and college students.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="services-section">
        <div className="services-grid">

          <div className="service-card reveal">
            <h3>Website Development</h3>
            <p>
              We design and develop modern, fast, and responsive websites using
              the latest technologies to help businesses build a strong online
              presence.
            </p>
          </div>

          <div className="service-card reveal">
            <h3>Web Application Development</h3>
            <p>
              Custom web applications built with React and Node.js, optimized for
              performance, scalability, and security.
            </p>
          </div>

          <div className="service-card reveal">
            <h3>Database Systems</h3>
            <p>
              Secure and scalable database systems using MySQL and cloud storage
              solutions to manage business data efficiently.
            </p>
          </div>

          <div className="service-card reveal">
            <h3>College Student Projects</h3>
            <p>
              Complete academic projects for college students including source
              code, documentation, and project reports in modern technologies.
            </p>
          </div>

          <div className="service-card reveal">
            <h3>Mobile Application Development</h3>
            <p>
              Android and cross-platform mobile applications for startups and
              businesses with smooth UI and high performance.
            </p>
          </div>

          <div className="service-card reveal">
            <h3>Hosting & Deployment</h3>
            <p>
              Website and application hosting on secure cloud servers with
              deployment, optimization, and maintenance support.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Services;
