const responseStatus = require("../../handlers/responseStatus");
const { getAllSubjects } = require("../../services/acedemy/subjectsService");

exports.getAllSubjectsController = async (req, res) => {
  try {
    await getAllSubjects(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
