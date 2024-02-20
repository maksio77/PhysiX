const router = require("express").Router();
const Section = require("../models/section");
const { User } = require("../models/user");
const verifyToken = require("../utils/verifyToken");

router.get("/", async (req, res) => {
  try {
    const sections = await Section.find({});
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/addFavoriteArticle", verifyToken, async (req, res) => {
  try {
    const { article } = req.body;

    const user = await User.findOne({
      _id: req.userId,
      "favoriteArticles._id": article._id,
    });

    if (user) {
      return res.send(user);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { favoriteArticles: article } },
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

router.post("/removeFavoriteArticle", verifyToken, async (req, res) => {
  {
    try {
      const { articleId } = req.body;

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { favoriteArticles: { _id: articleId } } },
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

router.get("/favoriteArticlesIDS", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("favoriteArticles");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favoriteArticles.map((article) => article._id));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Internal Server Error${error}` });
  }
});

// router.get('/:sectionName/:themeName?', async (req, res) => {
//     try {
//       const section = await Section.findOne({ routeName: req.params.sectionName }, 'themes');
//       if (!section) {
//         return res.status(400).send({ message: "Invalid link" });
//       }

//       const themes = req.params.themeName
//         ? section.themes.filter((theme) => theme.themeRoute === req.params.themeName)
//         : section;

//       res.json(themes);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;
