const router = require("express").Router();
const postController = require("../controllers/postController");
const requireUser = require("../middlewares/requireUser");

router.get("/all", requireUser, postController.getAllPostsController);

module.exports = router;
