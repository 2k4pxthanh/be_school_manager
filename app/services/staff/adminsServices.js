const responseStatus = require("../../handlers/responseStatus");
const adminsModel = require("../../models/Staff/adminsModel");

exports.checkAdminService = () => async (req, res) => {
  try {
    const { data } = req.body;
    const { username, password } = req.body;

    const checkAdmin = await adminsModel.findOne({ username, password });
    if (checkAdmin) {
      responseStatus(req, 200, "success", "ok");
    } else {
      responseStatus(req, 404, "failed", "Login not complete!");
    }
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};
