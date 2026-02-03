import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("created_at", "desc")
        );

        const snapshot = await getDocs(q);

        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProjects(list);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="projects-page">

      {/* HERO */}
      <section className="projects-hero">
        <h1>
          Our <span>Projects</span>
        </h1>
        <p>
          Explore some of the web development and software projects built by
          CRAFTIX Global using modern technologies like React and Firebase.
        </p>
      </section>

      {/* GRID */}
      <section className="projects-section">
        <div className="projects-grid">

          {loading ? (
            <p style={{ color: "#6a4f8a" }}>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p style={{ color: "#6a4f8a" }}>
              No projects available at the moment. Please check back later.
            </p>
          ) : (
            projects.map((project) => (
              <div className="project-card" key={project.id}>
                <img
                  src={project.image}
                  alt={`CRAFTIX Global project - ${project.title}`}
                  loading="lazy"
                />

                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <p className="project-tech">
                    Technologies: {project.tech_stack}
                  </p>

                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Live Project
                  </a>
                </div>
              </div>
            ))
          )}

        </div>
      </section>

    </div>
  );
}

export default Projects;
