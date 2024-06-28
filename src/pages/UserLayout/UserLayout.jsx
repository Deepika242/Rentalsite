import React, { useEffect } from "react";
import "./style.css";
import { Link, Outlet } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { motion } from "framer-motion";
import { useSession } from "../../lib/store";
import { BsPerson } from "react-icons/bs";
import { TiShoppingBag } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { auth } from "../../Firebase/FireBaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const UserLayout = () => {
  const { session, sessionLoading, login, logout } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGitHubLogin = () => login("github");
  const handleGmailLogin = () => login();
  // const handleGmailLogin = () => login("google");
  // const handleFacebookLogin = () => login('facebook');
  const Login = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const signedInUser = result.user;
      console.log(signedInUser);
      navigate("/howItWorks");
      // setUser(signedInUser);
    } catch (error) {
      console.error("Google Sign-In Failed:", error.message);
    }
  };
  if (sessionLoading) {
    return <Loading />;
  }

  if (session === null) {
    return (
      <div className="login-container">
        <div className="login-section">
          <h2>login</h2>
          <motion.button
            className="google"
            onClick={Login}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiFillGoogleCircle />
            Sign Up With Google
          </motion.button>
          {/* <motion.button
            className="github"
            // onClick={handleGitHubLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          > */}
          {/* <AiFillGithub />
            Continue With GitHub
          </motion.button> */}
          {/* <button className="github" onClick={handleFacebookLogin}>
          Přihlásit se před Facebook
        </button> */}
        </div>
      </div>
    );
  }

  return (
    <section className="user-page-section">
      <div className="user-detail-container">
        <h2 className="name">{session.user.user_metadata.full_name}</h2>
      </div>
      <div className="information-container">
        <div className="section-list">
          <ul>
            <li>
              <Link to="/My account">
                <BsPerson /> Profile
              </Link>
            </li>
            <li>
              <Link to="/My account/orders">
                <TiShoppingBag /> Orders
              </Link>
            </li>
            <li onClick={() => logout()}>
              <FiLogOut /> Log out
            </li>
          </ul>
        </div>
        <div className="detail-information-container">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
