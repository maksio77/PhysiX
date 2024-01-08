const router = require('express').Router();
const Section = require('../models/section');

router.get('/', async (req, res) => {
    try {
        const sections = await Section.find({} , 'sectionName');
        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;