const responseStatus = require("../../handlers/responseStatus");
const adminsModel = require("../../models/Staff/adminsModel");

exports.checkAdminService = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return responseStatus(res, 400, "failed", "Username and password are required.");
    }

    const checkAdmin = await adminsModel.findOne({ username });

    if (!checkAdmin) {
      return responseStatus(res, 404, "failed", "Admin not found.");
    }

    if (checkAdmin.password === password) {
      return responseStatus(res, 200, "success", "Login successful!");
    } else {
      return responseStatus(res, 401, "failed", "Incorrect password.");
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};
