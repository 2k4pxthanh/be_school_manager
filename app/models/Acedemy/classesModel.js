const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const classesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    mainTeacher: {
      type: ObjectId,
      ref: "Teacher",
    },
    grade: {
      type: ObjectId,
      ref: "Grade",
    },
    hasGrade: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const studentsModel = mongoose.model("Class", classesSchema, "classes");
module.exports = studentsModel;
