import React, { useState } from 'react';
import './DispatchButton.css';

interface DispatchButtonProps {
  onClick: () => void;
  className?: string;
  idleText?: string;
  doneText?: string;
}

export function DispatchButton({ 
  onClick, 
  className = '', 
  idleText = "Buy It Now", 
  doneText = "Order Placed" 
}: DispatchButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onClick();
    setTimeout(() => {
      setIsAnimating(false);
    }, 10000); // The animation duration is 10s based on CSS
  };

  return (
    <button 
      className={`ship-btn ${isAnimating ? 'go' : ''} ${className}`} 
      onClick={handleClick}
      type="button"
    >
      <div className="ship-btn-anim-container">
        <span className="lbl idle">{idleText}</span>
        <span className="lbl done">
          {doneText}
          <svg viewBox="0 0 12 10"><polyline points="1.5 6 4.5 9 10.5 1"/></svg>
        </span>
        <div className="cargo"></div>
        <div className="vehicle">
          <div className="cab-back"></div>
          <div className="cab-front">
            <div className="windshield"></div>
          </div>
          <div className="headlight top"></div>
          <div className="headlight bottom"></div>
        </div>
        <div className="rail"></div>
      </div>
    </button>
  );
}
