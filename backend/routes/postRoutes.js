const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Post = require("../models/Post");

// Like / Unlike a post
router.put("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add a comment
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const comment = {
      user: req.user.id,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    // Populate comments with user info
    await post.populate({ path: "comments.user", select: "username" });

    res.json({ comments: post.comments });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

