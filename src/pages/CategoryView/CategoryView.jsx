import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Button } from "../../components/Button/Button";
import { useCatalogue } from "../../lib/store";

export const CategoryView = () => {
  const catalogue = useCatalogue();

  return (
    <section>
      <div className="category-view-container align-center-content">
        <div className="category-view-text">
          <h2>ARE YOU READY FOR THE NEXT STEP?</h2>
          <p>
            Explore the categories below and start choosing clothes that not
            only look good, but also help our planet. Thanks for being a part
            and we hope you enjoy the offer.
          </p>
        </div>

        {catalogue && (
          <ul className="category-view-photos">
            {Object.keys(catalogue).map((categoryId) => (
              <li
                key={categoryId}
                className="category-image"
                style={{
                  backgroundImage: `url(/img/categories/${categoryId}.jpg)`,
                }}
              >
                <Link key={categoryId} to={`/category/${categoryId}`}>
                  <h3>{catalogue[categoryId].title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
