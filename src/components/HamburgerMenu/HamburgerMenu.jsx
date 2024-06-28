import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import { useCatalogue, useSession } from "../../lib/store";

export const HamburgerMenu = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const catalogue = useCatalogue();
  const { session } = useSession();

  const handleCategoriesList = (event) => {
    event.stopPropagation();
    setOpenCategories(!openCategories);
  };

  return (
    <div className="menu-items">
      <ul>
        <li
          onClick={handleCategoriesList}
          className={
            { openCategories } ? "categories-menu" : "categories-menu close"
          }
        >
          <a>
            Category <SlArrowDown className="arrow-icon" />
          </a>
        </li>
        {openCategories && catalogue && (
          <div className="categories-list">
            <ul>
              {Object.keys(catalogue).map((categoryId) => (
                <li key={categoryId}>
                  <Link to={`/category/${categoryId}`}>
                    {catalogue[categoryId].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <li>
          <Link to="/howItWorks" className="categories-menu">
            How does it work
          </Link>
        </li>
        <li>
          <Link to="/My account" className="categories-menu">
            {!session ? "Log In" : " My account"}
          </Link>
        </li>
        {session && (
          <li>
            <Link to="/My account/orders" className="categories-menu">
              My Orders
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
