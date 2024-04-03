require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRotes = require("./routes/users");
const authRotes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const sectionsRoutes = require("./routes/sections");
const testsRoutes = require("./routes/tests");
const testExplanation = require("./routes/testExplanation");

// DB connection
connection();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRotes);
app.use("/api/auth", authRotes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/sections", sectionsRoutes);
app.use("/api/tests", testsRoutes);
app.use("/api/test-explanation", testExplanation);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
