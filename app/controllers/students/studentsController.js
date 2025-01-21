const responseStatus = require("../../handlers/responseStatus");

const {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  editStudentByIdService,
  deleteStudentByIdService,
} = require("../../services/students/studentsService");

exports.getAllStudentsController = async (req, res) => {
  try {
    await getAllStudentsService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.getStudentByIdController = async (req, res) => {
  try {
    await getStudentByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.createStudentController = async (req, res) => {
  try {
    await createStudentService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.editStudentByIdController = async (req, res) => {
  try {
    await editStudentByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.deleteStudentByIdController = async (req, res) => {
  try {
    await deleteStudentByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
