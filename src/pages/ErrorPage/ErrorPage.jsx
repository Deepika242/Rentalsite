import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Comment } from "react-loader-spinner";

export const ErrorPage = () => {
  return (
    <div className="error-container">
      <Comment
        visible={true}
        height="60"
        width="60"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#868686"
      />
      <h2 className="error-title">Oops! Something went wrong..</h2>
      <p className="error-description">
        Unfortunately, we could not find the page you requested. Please come
        back to<Link to="/">Home Page</Link> and try again
      </p>
    </div>
  );
};
