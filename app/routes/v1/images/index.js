const express = require("express");
const path = require("path");
const fs = require("fs");

const imageRouter = express.Router();

imageRouter.route("/image/:imageName").get((req, res) => {
  const { imageName } = req.params;

  const filePath = path.join(`${__dirname}/../../../assets/images/avatars/teachers`, imageName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error while sending file:", err);
        return res.status(500).send({ error: "Error sending image" });
      }
    });
  } else {
    console.log("File does not exist:", filePath);
    return res.status(404).send({ error: "Image not found" });
  }
});

module.exports = imageRouter;
