const express = require("express");
const upload = require("../../../middlewares/upload");
const teachersRouter = express.Router();

const {
  getAllTeachersController,
  getTeacherByIdController,
  createTeacherController,
  editTeacherByIdController,
  deleteTeacherByIdController,
} = require("../../../controllers/staff/teacherController");

teachersRouter.route("/teachers").get(getAllTeachersController);
teachersRouter.route("/teachers/:id").get(getTeacherByIdController);
teachersRouter.route("/teacher/create").post(upload.single("avatar"), createTeacherController);
teachersRouter.route("/teacher/edit/:id").post(upload.single("avatar"), editTeacherByIdController);
teachersRouter.route("/teacher/delete/:id").delete(deleteTeacherByIdController);

module.exports = teachersRouter;
