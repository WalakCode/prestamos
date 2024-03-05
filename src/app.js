const express = require("express");
const app = express();
const router = require("./routes/user");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/presentation/views"));

app.use("/", router);

module.exports = app