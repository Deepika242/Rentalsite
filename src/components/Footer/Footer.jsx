import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logoSW from "../../img/logoSW.png";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { useSession } from "../../lib/store";

export const Footer = () => {
  const { session } = useSession();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/">
            <img src={logoSW} alt="logo" />
          </Link>
        </div>
        <ul className="footer-text">
          <li>
            {" "}
            <Link to="/about us">About Us</Link>
          </li>
          <li>
            <Link to="/My account" className="categories-menu">
              {!session ? "Log In" : " My account"}
            </Link>
          </li>
          <div className="social-media">
            <a href="https://www.instagram.com/kristynan/" target="_blank">
              <BsInstagram />
            </a>
            <a
              href="https://www.facebook.com/kristyna.novakova.754/"
              target="_blank"
            >
              <BsFacebook />
            </a>
          </div>
        </ul>
      </div>
      <div className="footer-divider">
        <p>&copy; Slow Wear, Inc. 2024. We love our users.</p>
      </div>
    </footer>
  );
};
