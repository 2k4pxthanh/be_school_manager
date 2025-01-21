const responseStatus = require("../../handlers/responseStatus");
const {
  getAllGradesService,
  createGradeService,
  getGradeByIdService,
  deleteGradeByIdService,
  editGradeByIdService,
} = require("../../services/acedemy/gradesService");

exports.getAllGradesController = async (req, res) => {
  try {
    await getAllGradesService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.getGradeByIdController = async (req, res) => {
  try {
    await getGradeByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.createGradeController = async (req, res) => {
  try {
    await createGradeService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.editGradeByIdController = async (req, res) => {
  try {
    await editGradeByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

exports.deleteGradeByIdController = async (req, res) => {
  try {
    await deleteGradeByIdService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
