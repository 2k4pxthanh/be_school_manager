const express = require("express");
const cors = require("cors");
const path = require("path");

const routeSync = require("./handlers/routeSync");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "assets/images/avatars/teachers")));
app.use(cors());

routeSync(app, "acedemy");
routeSync(app, "staff");
routeSync(app, "students");
routeSync(app, "images");

// Default route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.all("*", (req, res) => {
  res.send("Invalid Route!");
});

module.exports = app;
