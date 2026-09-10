import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <nav className="nav">
        <Link to="/" className="nav-brand">GiftNest</Link>
        <div className="nav-links">
          <Link to="/login">Log in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="hero-tag">A gift store for every occasion</div>
          <h1>Find the gift that actually fits</h1>
          <p className="tagline">
            GiftNest curates thoughtful presents by category, mood, and
            budget — so you spend less time scrolling and more time
            celebrating the people you care about.
          </p>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="ribbon"></div>
          <div className="ribbon-h"></div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
