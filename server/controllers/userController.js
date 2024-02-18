const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

const followOrUnfollowUserController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const curUserId = req._id;

    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);

    if (curUserId === userIdToFollow) {
      return res.send(error(409, "Cannot follow yourself"));
    }

    if (!userToFollow) {
      return res.send(error(404, "user to follow not found"));
    }

    if (curUser.followings.includes(userIdToFollow)) {
      //already followed
      const followingIndex = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(curUser);
      userToFollow.followers.splice(followerIndex, 1);

      await userToFollow.save();
      await curUser.save();

      return res.send(success(200, "User Unfollowed"));
    } else {
      userToFollow.followers.push(curUserId);
      curUser.followings.push(userIdToFollow);

      await userToFollow.save();
      await curUser.save();

      return res.send(success(200, "User Followed"));
    }
  } catch (e) {
    console.log(e);
    return res.send(error(500, e.message));
  }
};

const getPostsOfFOllowing = async (req, res) => {
  try {
    const curUserId = req._id;

    const curUser = await User.findById(curUserId);

    const posts = await Post.find({
      owner: {
        $in: curUser.followings,
      },
    });

    return res.send(success(200, posts));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyPost = async (req, res) => {
  try {
    const curUserId = req._id;
    const allUserPosts = await Post.find({
      owner: curUserId,
    }).populate("likes");
    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserPost = async (req, res) => {
  try {
    const userId = req._id;

    if (!userId) {
      return res.send(error(400, "User id Required"));
    }

    const allUserPosts = await Post.find({
      owner: userId,
    }).populate("likes");

    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deleteMyProfile = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);

    //Delete all post
    await Post.deleteMany({
      owner: curUserId,
    });

    //Remove Myself from followers followings
    curUser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);
      const index = follower.followings.indexOf(curUserId);

      follower.followings.splice(index, 1);
      follower.save();
    });

    //Remove Myself from followings followers
    curUser.followings.forEach(async (followingId) => {
      const following = await User.findOneAndUpdate(followingId);
      const index = following.followers.indexOf(curUserId);
      following.followers.splice(index, 1);
      await following.save();
    });

    //Remove Myself from Likes
    const allPosts = await Post.find();
    allPosts.forEach(async (post) => {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
      await post.save();
    });

    //Delete User
    await curUser.deleteOne();

    res.clearCookie("jwt", {
      httpsOnly: true,
      secure: true,
    });

    return res.send(success(200, "User deleted"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req._id);

    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  followOrUnfollowUserController,
  getPostsOfFOllowing,
  getMyPost,
  getUserPost,
  deleteMyProfile,
  getMyInfo,
};
