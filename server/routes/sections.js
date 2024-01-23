const router = require('express').Router();
const Section = require('../models/section');

router.get('/', async (req, res) => {
    try {
        const sections = await Section.find({} , 'sectionName routeName');
        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:sectionName/:themeName?', async (req, res) => {
    try {
      const section = await Section.findOne({ routeName: req.params.sectionName });
      if (!section) {
        return res.status(400).send({ message: "Invalid link" });
      }

      const themes = req.params.themeName
        ? section.themes.filter((theme) => theme.themeRoute === req.params.themeName)
        : section.themes;

      res.json(themes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;