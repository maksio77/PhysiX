const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema= new Schema ({
    sectionName: {
        type: String,
        required: true,
        unique: true
    },
    themes: {
        type: [{ name: String, info: String}],
        required: true,
    },
});

module.exports = mongoose.model("section", sectionSchema);