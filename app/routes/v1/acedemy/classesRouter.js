const express = require("express");
const classesRouter = express.Router();

const {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  editClassByIdController,
  deleteClassByIdController,
} = require("../../../controllers/acedemy/classesController");
const upload = require("../../../middlewares/upload");

classesRouter.route("/classes").get(getAllClassesController);
classesRouter.route("/classes/:id").get(getClassByIdController);
classesRouter.route("/class/create").post(upload.single("avatar"), createClassController);
classesRouter.route("/class/edit/:id").post(upload.single("avatar"), editClassByIdController);
classesRouter.route("/class/delete/:id").delete(deleteClassByIdController);

module.exports = classesRouter;
