const express = require("express");
const gradesRouter = express.Router();

const {
  getAllGradesController,
  getGradeByIdController,
  createGradeController,
  editGradeByIdController,
  deleteGradeByIdController,
} = require("../../../controllers/acedemy/gradesController");
const upload = require("../../../middlewares/upload");
gradesRouter.route("/grades").get(getAllGradesController);
gradesRouter.route("/grade/:id").get(getGradeByIdController);
gradesRouter.route("/grade/create").post(upload.single("avatar"), createGradeController);
gradesRouter.route("/grade/edit/:id").post(upload.single("avatar"), editGradeByIdController);
gradesRouter.route("/grade/delete/:id").delete(deleteGradeByIdController);

module.exports = gradesRouter;
