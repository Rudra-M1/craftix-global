import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Contact() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = auth.currentUser;
    if (!user) {
      return alert("Please login first");
    }

    if (!message.trim()) {
      return setError("Message cannot be empty");
    }

    try {
      await addDoc(collection(db, "messages"), {
        userId: user.uid,
        email: user.email,
        message: message,
        created_at: serverTimestamp()
      });

      alert("Message sent successfully");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Failed to send message");
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero reveal">
        <h1>Contact <span>CRAFTIX Global</span></h1>
        <p>
          Get in touch with CRAFTIX Global for professional web development,
          software solutions, and student project services.
        </p>
      </section>

      {/* FORM */}
      <section className="contact-section">
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>

          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

          <textarea
            rows="5"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>

    </div>
  );
}

export default Contact;
