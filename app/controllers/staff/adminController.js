const responseStatus = require("../../handlers/responseStatus");

const { checkAdminService } = require("../../services/staff/adminsServices");

exports.checkAdminController = async (req, res) => {
  try {
    await checkAdminService(req, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
