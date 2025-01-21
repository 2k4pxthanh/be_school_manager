const express = require("express");
const upload = require("../../../middlewares/upload");
const { checkAdminController } = require("../../../controllers/staff/adminController");
const adminsRouter = express.Router();

adminsRouter.route("/admin/check").post(upload.single("avatar"), checkAdminController);

module.exports = adminsRouter;
