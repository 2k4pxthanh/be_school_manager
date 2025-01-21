const responseStatus = require("../../handlers/responseStatus");

const {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  editTeacherByIdService,
  deleteTeacherByIdService,
} = require("../../services/staff/teachersService");

exports.getAllTeachersController = async (req, res) => {
  try {
    await getAllTeachersService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.getTeacherByIdController = async (req, res) => {
  try {
    await getTeacherByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.createTeacherController = async (req, res) => {
  try {
    await createTeacherService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.editTeacherByIdController = async (req, res) => {
  try {
    await editTeacherByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.deleteTeacherByIdController = async (req, res) => {
  try {
    await deleteTeacherByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
