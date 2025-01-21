const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adminsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const adminsModel = mongoose.model("Admin", adminsSchema, "admins");
module.exports = adminsModel;
