const router = require('express').Router();
const { User } = require('../models/user');
const Token = require('../models/token');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');
const deleteToken = require('../utils/deleteToken');

router.post('/', async (req, res) => { 
    try {
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email"),
        });
        const { error } = emailSchema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(409).send({ message: "Користувача з таким email не існує!" });

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()
        }
            
        const url = `Привіт, це твій помічник вивчення фізики, будь ласка, перейди за посилання щоб скинути пароль 🔧\n${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "PhysiX\nPassword Reset", url);

        res.status(200).send({ message: "посилання для скидання паролю надіслано на вашу електронну пошту" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });
        
        res.status(200).send({ message: "Valid Url" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post("/:id/:token", async (req, res) => {
    try {
        const passwordSchema = Joi.object({
            password: passwordComplexity().required().label("Password")
        });
        const { error } = passwordSchema.validate(req.body);
        
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });
    
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if (!token) return res.status(400).send({ message: "Invalid link" });
        
        if (!user.verified) user.verified = true;

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;
        await user.save();
        deleteToken(token);

        res.status(200).send({ message: "Пароль успішно скинуто" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;