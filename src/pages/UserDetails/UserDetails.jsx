import React from "react";
import "./style.css";
import { useSession } from "../../lib/store";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

export const UserDetail = () => {
  const { session } = useSession();

  console.log(session);
  return (
    <div className="user-details">
      <div className="user-title">
        <h2>Profile</h2>
      </div>
      <div className="user-detail">
        <div className="user-name">
          <h3>
            <BsPerson /> Name
          </h3>
          <p>{session.user.user_metadata.full_name}</p>
        </div>
        <div className="user-email">
          <h3>
            <MdOutlineEmail /> E-mail
          </h3>
          <p>{session.user.email}</p>
        </div>
        <div className="user-phone-number">
          <h3>
            <BsTelephone /> Telephone number
          </h3>
          {session.user.phone === "" ? (
            <p className="italic">Not listed</p>
          ) : (
            session.user.phone
          )}
        </div>
      </div>
    </div>
  );
};
