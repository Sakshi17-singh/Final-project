import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="main">
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <h1>Welcome to Roamio-Wanderly</h1>
        <p>Explore our Nepal with us!</p>
        <Link to="/signup" className="cta-btn">
          Get Started
        </Link>
      </section>

      {/* Events Section */}
      <section id="event" className="event-section">
        <h2>Events</h2>
        <p>
          Check out exciting events happening in popular destinations near you.
        </p>
        <Link to="/signup" className="event-cta-btn">
          Join Now
        </Link>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="about-section framed-section">
        <h2>About Us</h2>
        <p>
         Roamio-Wanderly is your ultimate travel companion. Discover amazing
          destinations, plan trips, and experience the world like never before.
        </p>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="contact-section framed-section">
        <h2>Contact Us</h2>
        <p>Email: info@ramiowanderlytravel.com</p>
        <p>Phone: 9861402251</p>
        <p>Address: Kathmandu, Nepal</p>
      </section>
    </div>
  );
}

export default Home;
