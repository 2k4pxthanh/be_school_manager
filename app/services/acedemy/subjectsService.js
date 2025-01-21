const subjectsModel = require("../../models/Acedemy/subjectsModel");
const responseStatus = require("../../handlers/responseStatus");

exports.getAllSubjects = async (req, res) => {
  const subjects = await subjectsModel.find({});
  return responseStatus(res, 200, "success", subjects);
};
