const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
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
  themes: {
    type: [
      {
        themeName: String,
        themeRoute: String,
        tests: [
          {
            title: String,
            image: String,
            alt: String,
            variants: [String],
            correct: Number,
          },
        ],
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("test", testSchema);
