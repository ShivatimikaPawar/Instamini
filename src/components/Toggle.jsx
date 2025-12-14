import { useState, useEffect } from 'react';
import './Toggle.css';

export default function Toggle() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('light-mode');
    const newIsLight = !isLightMode;
    setIsLightMode(newIsLight);
    localStorage.setItem('theme', newIsLight ? 'light' : 'dark');
  };

  return (
    <div className="Toggle">
      <div className="Togglecontainer">
        <button 
          id="themeToggle"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          {isLightMode ? '😎' : '🌚'}
        </button>
      </div>
    </div>
  );
}