import React from "react";
import { Link } from "react-router-dom";
import "../css/not-found-page.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <main className="main-content">
        <h2>404 - Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="home-link">
          Go back to the homepage
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;
