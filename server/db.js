const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connect DB successfully");
  } catch (error) {
    console.log(error);
    console.log("Error connecting DB");
  }
};
