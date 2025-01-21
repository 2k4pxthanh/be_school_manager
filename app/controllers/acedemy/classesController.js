const responseStatus = require("../../handlers/responseStatus");
const {
  getAllClassesService,
  getClassByIdService,
  createClassService,
  editClassByIdService,
  deleteClassByIdService,
} = require("../../services/acedemy/classesService");

exports.getAllClassesController = async (req, res) => {
  try {
    await getAllClassesService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.getClassByIdController = async (req, res) => {
  try {
    await getClassByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.createClassController = async (req, res) => {
  try {
    await createClassService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.editClassByIdController = async (req, res) => {
  try {
    await editClassByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.deleteClassByIdController = async (req, res) => {
  try {
    await deleteClassByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
