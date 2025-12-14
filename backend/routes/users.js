const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Follow a user
router.put("/follow/:id", auth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow.followers.includes(currentUser._id)) {
      userToFollow.followers.push(currentUser._id);
      currentUser.following.push(userToFollow._id);
      await userToFollow.save();
      await currentUser.save();
      return res.json({ message: "User followed" });
    } else {
      return res.status(400).json({ message: "Already following" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Unfollow a user
router.put("/unfollow/:id", auth, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (userToUnfollow.followers.includes(currentUser._id)) {
      userToUnfollow.followers = userToUnfollow.followers.filter(f => f.toString() !== currentUser._id.toString());
      currentUser.following = currentUser.following.filter(f => f.toString() !== userToUnfollow._id.toString());
      await userToUnfollow.save();
      await currentUser.save();
      return res.json({ message: "User unfollowed" });
    } else {
      return res.status(400).json({ message: "Not following this user" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
