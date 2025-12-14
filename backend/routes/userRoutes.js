const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Follow
router.post("/follow/:id", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user, {
    $addToSet: { following: req.params.id }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $addToSet: { followers: req.user }
  });

  res.json({ msg: "Followed" });
});

// Unfollow
router.post("/unfollow/:id", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user, {
    $pull: { following: req.params.id }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user }
  });

  res.json({ msg: "Unfollowed" });
});

module.exports = router;
