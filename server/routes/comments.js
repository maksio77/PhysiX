const router = require("express").Router();
const Comment = require("../models/comment");
const moment = require("moment");

router.post("/", async (req, res) => {
  try {
    const { text, username, testId } = req.body;
    if (!text || !username || !testId) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const comment = new Comment({ text, username, testId });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const { testId } = req.query;
    let comments;
    if (testId) {
      comments = await Comment.find({ testId }).sort({ createdAt: 1 });
    } else {
      comments = await Comment.find().sort({ createdAt: 1 });
    }
    const formattedComments = comments.map((comment) => {
      return {
        ...comment._doc,
        createdAt: moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
    res.json(formattedComments);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid test ID." });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
