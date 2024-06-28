import React from "react";
import "./style.css";
import step1 from "./img/step1.png";
import step2 from "./img/step2.png";
import step3 from "./img/step3.png";

export const HowItWorks = ({ sectionRef }) => {
  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section align-center-content"
    >
      <div>
        <h2 className="section-title">HOW DOES IT WORK</h2>
        <p className="section-description">
          Imagine your wardrobe full of stylish and modern pieces of clothing
          that you can change every month without having to buy new ones. This
          is exactly what Slow Wear clothing rental offers!
        </p>
        <div className="image-container">
          <div className="image">
            <img src={step1} alt="Picture 1" />
            <h3>Choose</h3>
            <p className="image-caption">
              Four tops and the same dress in two sizes? Six pairs of jeans? A
              piece of everything? It's up to you.
            </p>
          </div>
          <div className="image">
            <img src={step2} alt="Picture 2" />
            <h3>The nose is repeated</h3>
            <p className="image-caption">
              The selected pieces are yours for the entire next month after
              ordering. You don't have to worry about washing and repairs before
              returning.
            </p>
          </div>
          <div className="image">
            <img src={step3} alt="Picture 3" />
            <h3>Buy, return, repeat</h3>
            <p className="image-caption">
              If you fall in love with something, buy it. Send the rest back to
              the reservation date and repeat the whole process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
