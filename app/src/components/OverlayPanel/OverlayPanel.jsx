import React from 'react'
import './styles.css';

function OverlayPanel({ children, className, onClick }) {
  return (
      <div className={`overlay-panel ${className}`}>
          {children}
          <button className="ghost" onClick={onClick}>{className.includes("right") ? "Sign Up" : "Sign In"}</button>
      </div>
  );
}

export default OverlayPanel;
