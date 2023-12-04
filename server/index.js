require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRotes = require("./routes/users");
const authRotes = require("./routes/auth");

// DB connection
connection();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRotes);
app.use("/api/auth", authRotes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
