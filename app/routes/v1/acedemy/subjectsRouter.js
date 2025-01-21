const express = require("express");
const subjectsRouter = express.Router();

const { getAllSubjectsController } = require("../../../controllers/acedemy/subjectsController");

subjectsRouter.route("/subjects").get(getAllSubjectsController);

module.exports = subjectsRouter;
