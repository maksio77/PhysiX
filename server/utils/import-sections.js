require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Section = require("../models/section");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(`${process.env.DB}`, connectionParams)
  .then(() => console.log("DB connection successful!"));

const material = JSON.parse(fs.readFileSync("../data/material.json", "utf8"));

const importData = async (data) => {
  try {
    for (let section of data) {
      for (let theme of section.themes) {
        for (let article of theme.info) {
          if (article.image) {
            let imagePath = path.join(__dirname, "../data", article.image);
            let imageBuffer = fs.readFileSync(imagePath);
            let imageBase64 = imageBuffer.toString("base64");
            let imageTag = `<img src="data:image/png;base64,${imageBase64}" alt="Image" />`;
            article.image = imageTag;
          }
        }
      }
    }
    await Section.create(data);
    console.log("Data imported successfully");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

// const importData = async () => {
//   try {
//     await Section.create(material);
//     console.log("Data saved successfully");
//     process.exit();
//   } catch (e) {
//     console.log(e);
//   }
// };

const deleteData = async () => {
  try {
    await Section.deleteMany();
    console.log("Data deleted successfully");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === "--import") {
  importData(material);
} else if (process.argv[2] === "--delete") {
  deleteData();
}
