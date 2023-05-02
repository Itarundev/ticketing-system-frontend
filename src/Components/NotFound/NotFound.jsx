import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Oops!</h1>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
        <a href="/">Go back to home</a>
      </div>
    </div>
  );
};

export default NotFound;
