const mongoose = require("mongoose");
const {string} = require("joi");
const Schema = mongoose.Schema;

const sectionSchema= new Schema ({
    sectionName: {
        type: String,
        required: true,
        unique: true
    },
    themes: {
        type: [{ themeName: String, info: [{text: String, formulas: [String] }], }],
        required: true,
    },
});

module.exports = mongoose.model("section", sectionSchema);