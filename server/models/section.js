const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true,
    unique: true,
  },
  routeName: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  img_alt: {
    type: String,
    required: true,
    unique: true,
  },
  themes: {
    type: [
      {
        themeName: String,
        themeRoute: String,
        info: [
          { text: String, formulas: [String], image: String, alt: String },
        ],
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("section", sectionSchema);
