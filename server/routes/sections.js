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

router.get('/:sectionName', async (req, res) => {
    try {
        const themes = await Section.findOne({ routeName: req.params.sectionName}, 'themes');
        if (!themes) return res.status(400).send({ message: "Invalid link" });
        
        res.json(themes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;