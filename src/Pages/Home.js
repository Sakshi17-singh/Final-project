import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // make sure you have styling

function Home() {
  return (
    <div className="main">
      {/* Hero / Welcome Section */}
      <section id="hero" className="hero-section">
        <h1>Welcome to TravelApp</h1>
        <p>Explore the world with us!</p>
        <Link to="/signup" className="cta-btn">
          Get Started
        </Link>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="about-section">
        <h2>About Us</h2>
        <p>
          TravelApp is your ultimate travel companion. Discover amazing
          destinations, plan trips, and experience the world like never before.
        </p>
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

      {/* Contact Us Section */}
      <section id="contact-us" className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: info@travelapp.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Travel Street, Adventure City</p>
      </section>
    </div>
  );
}

export default Home;
