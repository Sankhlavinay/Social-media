const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");
const userController = require("../controllers/userController");

router.post(
  "/follow",
  requireUser,
  userController.followOrUnfollowUserController
);
router.get(
  "/getPostsOfFollowing",
  requireUser,
  userController.getPostsOfFOllowing
);

router.get("/getMyPost", requireUser, userController.getMyPost);
router.get("/getUserPost", requireUser, userController.getUserPost);
router.delete("/", requireUser, userController.deleteMyProfile);
router.get("/getMyInfo", requireUser, userController.getMyInfo);

module.exports = router;
