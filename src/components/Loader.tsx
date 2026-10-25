import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onLoaded?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onLoaded }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      if (onLoaded) onLoaded();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-inner">
        <div className="loader-logo">RI</div>
        <div className="loader-bar">
          <div className="loader-fill"></div>
        </div>
        <div className="loader-text">
          Initializing Experience<span className="dots">...</span>
        </div>
      </div>
    </div>
  );
};
