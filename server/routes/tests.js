const router = require("express").Router();
const Test = require("../models/test");

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

module.exports = router;
