import React from "react";
import "../css/home.css";
import Footer from "../Components/layout/Footer";

export default function HomePage() {
  return (
    <div className="home-page-v2">
      <div className="hero-v2">
        <div className="hero-content-v2">
          <h1>Discover, Borrow, Learn</h1>
          <p>Your digital gateway to an organized and smarter library experience.</p>
          <div className="cta-buttons">
            <a href="/register" className="primary-btn">Join Now</a>
            <a href="/guest" className="secondary-btn">Browse as Guest</a>
          </div>
        </div>
        {/* <div className="hero-img-v2">
          <img src={heroImage} alt="library-illustration" />
        </div> */}
      </div>

      <div className="features-v2">
        <div className="feature-box">
          <h3>Smart Search</h3>
          <p>Find any book in seconds using advanced search filters.</p>
        </div>
        <div className="feature-box">
          <h3>Track Borrowing</h3>
          <p>See your borrowed books, history, and return dates in one place.</p>
        </div>
        <div className="feature-box">
          <h3>Guest Access</h3>
          <p>Browse collections even before signing up.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
