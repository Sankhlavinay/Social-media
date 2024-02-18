import React from "react";
import "./UpdateProfile.scss";
import userImg from "../../assets/user.png";
import { useSelector } from "react-redux";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          <img className="user-img" src={userImg} alt="" />
        </div>
        <div className="right-part">
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your Bio" />

            <input type="submit" className="btn-primary" />
          </form>
          <button className="dlt-account btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
