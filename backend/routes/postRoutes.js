const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Create Post
router.post("/", auth, async (req, res) => {
  try {
    const { image, video, caption } = req.body;
    if (!image && !video) return res.status(400).json({ message: "Provide image or video URL" });

    const post = await Post.create({
      user: req.user.id,
      image,
      video,
      caption,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Posts (for Home feed)
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "username profilePic")
      .populate("comments.user", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Feed (posts by following users)
router.get("/feed", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await Post.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 })
      .populate("user", "username profilePic")
      .populate("comments.user", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Like a Post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();
      return res.json(post);
    }
    res.status(400).json({ message: "Already liked" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Unlike a Post
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes = post.likes.filter((l) => l.toString() !== req.user.id);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Comment on a Post
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

