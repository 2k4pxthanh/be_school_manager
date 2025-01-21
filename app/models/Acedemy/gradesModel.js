const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const gradesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    classes: [
      {
        type: ObjectId,
        ref: "Class",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const gradesModel = mongoose.model("Grade", gradesSchema, "grades");
module.exports = gradesModel;
