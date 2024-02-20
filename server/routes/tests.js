const router = require("express").Router();
const Test = require("../models/test");
const { User } = require("../models/user");
const verifyToken = require("../utils/verifyToken");

router.get("/", async (req, res) => {
  try {
    const tests = await Test.find({});
    if (tests) {
      res.json(tests);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/addFavoriteTest", verifyToken, async (req, res) => {
  try {
    const { test } = req.body;

    const user = await User.findOne({
      _id: req.userId,
      "favoriteTests._id": test._id,
    });

    if (user) {
      return res.send(user);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { favoriteTests: test } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: `Internal Server Error${error}` });
  }
});

router.post("/removeFavoriteTest", verifyToken, async (req, res) => {
  {
    try {
      const { testId } = req.body;

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { favoriteTests: { _id: testId } } },
        { new: true }
      );

      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    } catch (error) {
      {
        res.status(500).send({ message: `Internal Server Error${error}` });
      }
    }
  }
});

router.get("/favoriteTestsIDS", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("favoriteTests");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favoriteTests.map((test) => test._id));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Internal Server Error${error}` });
  }
});

module.exports = router;
