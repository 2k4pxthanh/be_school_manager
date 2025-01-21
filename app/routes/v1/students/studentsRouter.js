const express = require("express");
const studentsRouter = express.Router();

const {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  editStudentByIdController,
  deleteStudentByIdController,
} = require("../../../controllers/students/studentsController");
const upload = require("../../../middlewares/upload");

studentsRouter.route("/students").get(getAllStudentsController);
studentsRouter.route("/students/:id").get(getStudentByIdController);
studentsRouter.route("/student/create").post(upload.single("avatar"), createStudentController);
studentsRouter.route("/student/edit/:id").post(upload.single("avatar"), editStudentByIdController);
studentsRouter.route("/student/delete/:id").delete(deleteStudentByIdController);

module.exports = studentsRouter;
