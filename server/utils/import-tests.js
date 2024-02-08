require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Test = require("../models/test");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(`${process.env.DB}`, connectionParams)
  .then(() => console.log("DB connection successful!"));

const tests = JSON.parse(fs.readFileSync("../data/tests.json", "utf8"));

const importData = async (data) => {
  try {
    for (let section of data) {
      for (let theme of section.themes) {
        for (let test of theme.tests) {
          if (test.image) {
            let imagePath = path.join(__dirname, "../data", test.image);
            let imageBuffer = fs.readFileSync(imagePath);
            let imageBase64 = imageBuffer.toString("base64");
            let imageTag = `<img src="data:image/png;base64,${imageBase64}" alt="Image" />`;
            test.image = imageTag;
          }
        }
      }
    }
    await Test.create(data);
    console.log("Data imported successfully");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

const deleteData = async () => {
  try {
    await Test.deleteMany();
    console.log("Data deleted successfully");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === "--import") {
  importData(tests);
} else if (process.argv[2] === "--delete") {
  deleteData();
}
