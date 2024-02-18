import React from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";

function Follower() {
  return (
    <div className="Follower">
      <div className="user-info">
        <Avatar />
        <h4 className="name">Robin</h4>
      </div>
      <h5 className="follow-link hover-link">Follow</h5>
    </div>
  );
}

export default Follower;
