const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const studentsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    bornAt: {
      type: String,
      required: true,
    },
    currentClassLevel: {
      type: ObjectId,
      ref: "Class",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

const studentsModel = mongoose.model("Student", studentsSchema, "students");
module.exports = studentsModel;
