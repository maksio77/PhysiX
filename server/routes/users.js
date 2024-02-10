const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const deleteToken = require("../utils/deleteToken");
const bcrypt = require("bcrypt");
const verifyToken = require("../utils/verifyToken");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `Hello, please follow the link to confirm your email 🔧\n${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "PhysiX\nVerify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Internal Server Error${error}` });
  }
});

router.get("/:id/verify/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await user.updateOne({ verified: true });
    deleteToken(token);

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: `Internal Server Error${error}` });
  }
});

router.post("/addPoints", verifyToken, async (req, res) => {
  {
    try {
      const { points } = req.body;

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $inc: { points: points } },
        { new: true }
      );

      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
});

router.post("/addFavoriteTest", verifyToken, async (req, res) => {
  {
    try {
      const { test } = req.body;

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { favoriteTests: test } },
        { new: true }
      );

      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    } catch (error) {
      {
        return res.status(500).send(error);
      }
    }
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
        return res.status(500).send(error);
      }
    }
  }
});

module.exports = router;
