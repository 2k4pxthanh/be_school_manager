const express = require("express");
const upload = require("../../../middlewares/upload");
const adminsRouter = express.Router();

const { checkAdminController } = require("../../../controllers/staff/adminController");

adminsRouter.route("/admin/check").post(checkAdminController);

module.exports = adminsRouter;
