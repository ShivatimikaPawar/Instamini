const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Post = require("../models/Post");

/* ================= FOLLOW USER ================= */
router.put("/follow/:id", auth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) return res.status(404).json({ msg: "User not found" });
    if (userToFollow._id.equals(currentUser._id)) return res.status(400).json({ msg: "Cannot follow yourself" });

    if (!userToFollow.followers.includes(currentUser._id)) {
      userToFollow.followers.push(currentUser._id);
      currentUser.following.push(userToFollow._id);
      await userToFollow.save();
      await currentUser.save();
    }

    res.json({ msg: "Followed successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ================= UNFOLLOW USER ================= */
router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow) return res.status(404).json({ msg: "User not found" });

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => !id.equals(currentUser._id)
    );
    currentUser.following = currentUser.following.filter(
      (id) => !id.equals(userToUnfollow._id)
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.json({ msg: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ================= GET USER PROFILE ================= */
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const posts = await Post.find({ user: user._id });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ================= GET ALL USERS ================= */
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({}, "username profilePic _id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET single post by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "username profilePic")
      .populate("comments.user", "username");

    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Search users by name
router.get("/search", auth, async (req, res) => {
  try {
    const { name } = req.query;
    const regex = new RegExp(name, "i"); // case-insensitive search

    const users = await User.find({ username: regex }).select("username profilePic followers");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



module.exports = router;

