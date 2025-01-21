const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const teachersSchema = new mongoose.Schema(
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
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: ObjectId,
      ref: "Subject",
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "teacher",
    },
  },
  {
    timestamps: true,
  }
);

const teachersModel = mongoose.model("Teacher", teachersSchema, "teachers");
module.exports = teachersModel;
