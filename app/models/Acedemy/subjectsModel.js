const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const subjectsModel = mongoose.model("Subject", subjectSchema, "subjects");
module.exports = subjectsModel;
