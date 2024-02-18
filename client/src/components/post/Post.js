import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import bgImg from "../../assets/back.jpg";
import { AiOutlineHeart } from "react-icons/ai";

function Post({ post }) {
  return (
    <div className="Post">
      <div className="heading">
        <Avatar />
        <h4>Vinay Sankhla</h4>
      </div>
      <div className="content">
        <img src={bgImg} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <AiOutlineHeart className="icon" />
          <h4>4 Likes</h4>
        </div>
        <p className="caption">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero,
          deleniti!
        </p>
        <h6 className="time-ago">4Hrs ago</h6>
      </div>
    </div>
  );
}

export default Post;
