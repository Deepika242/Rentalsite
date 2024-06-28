import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logoSW from "../../img/logoSW.png";
import { BsPerson } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { HamburgerMenu } from "../HamburgerMenu/HamburgerMenu";
import { useShoppingCart } from "../../lib/store";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [badgeIsAnimated, setBadgeIsAnimated] = useState(false);
  const totalAmount = useShoppingCart(
    (shoppingCart) => shoppingCart.cartItems.length
  );

  useEffect(() => {
    if (totalAmount === 0) {
      return;
    }
    setBadgeIsAnimated(true);
    const timer = setTimeout(() => {
      setBadgeIsAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  const handleMenuToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isMenuOpen) {
      window.addEventListener("click", () => setIsMenuOpen(false), {
        once: true,
      });
    }

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header-container">
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={logoSW} alt="logo" />
            </Link>
          </div>
          <ul className="menu">
            <li>
              <Link to="/My account" className="registration-container">
                <BsPerson />
              </Link>
            </li>
            <li>
              <Link to="/basket" className={`cart-container `}>
                <HiOutlineShoppingBag />
                {totalAmount > 0 && badgeIsAnimated ? (
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: [1, 1.3, 1.6, 1.4, 1.3, 1],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="badge"
                  >
                    {totalAmount}
                  </motion.div>
                ) : (
                  totalAmount > 0 && <div className="badge">{totalAmount}</div>
                )}
              </Link>
            </li>
            <li className={`hamburger-menu`} onClick={handleMenuToggle}>
              {isMenuOpen ? <RxCross1 /> : <AiOutlineMenu />}
            </li>
          </ul>
        </div>
        {isMenuOpen && <HamburgerMenu />}
      </header>
    </>
  );
};
