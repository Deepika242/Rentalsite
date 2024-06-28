import React, { useRef, useEffect } from 'react';
import './style.css';
import webCover from './img/web-cover.png';
import { SlArrowDown } from 'react-icons/sl';
import { HowItWorks } from './../HowItWorks/HowItWorks.jsx';
import { CategoryView } from './../CategoryView/CategoryView.jsx';

export const MainPage = () => {
  const sectionRef = useRef(null);

  const handleScrollToSection = () => {
    if (sectionRef.current) {
      const offsetTop = sectionRef.current.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <div className="main-section">
        <div className="background-image">
          <img src={webCover} alt="Background Image" />
        </div>
        <div className="content">
          <h1>Being naked is the #1 most sustainable option. We are #2.</h1>
          <a className="animation-up-down" onClick={handleScrollToSection}>
            <SlArrowDown className="image-icon" />
          </a>
        </div>
      </div>
      <HowItWorks sectionRef={sectionRef} />
      <CategoryView />
    </main>
  );
};
