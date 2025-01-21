const fs = require("fs");
const path = require("path");
const teacherModel = require("../../models/Staff/teachersModel");
const classModel = require("../../models/Acedemy/classesModel");
const responseStatus = require("../../handlers/responseStatus");
const { hashPass, comparePass } = require("../../handlers/passHash");

exports.getAllTeachersService = async (req, res) => {
  try {
    const { limit, page, ...sortWithData } = req.query;
    const limitNumber = Number(limit);
    const pageNumber = Number(page);

    const skip = (pageNumber - 1) * limitNumber;

    const cleanSortWithData = (sortWithData) => {
      return Object.keys(sortWithData).reduce((acc, key) => {
        if (sortWithData[key] !== "" && sortWithData[key] !== undefined) {
          acc[key] = sortWithData[key];
        }
        return acc;
      }, {});
    };

    const cleanedSortWithData = cleanSortWithData(sortWithData);
    const total = await teacherModel.countDocuments(cleanedSortWithData);

    const teachers = await teacherModel
      .find(cleanedSortWithData)
      .lean()
      .populate("subject")
      .select("-password -role -email -avatar -phoneNumber")
      .skip(skip)
      .limit(limitNumber)
      .exec();
    const totalPages = Math.ceil(total / limitNumber);

    return res.status(200).json({
      success: true,
      message: "success",
      data: teachers,
      total,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getTeacherByIdService = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await teacherModel.findById(id);

    if (!teacher) {
      return responseStatus(res, 404, "failed", "Teacher not found!");
    }

    const teacherData = {
      fullName: teacher.fullName,
      gender: teacher.gender,
      birthday: teacher.birthday,
      email: teacher.email,
      address: teacher.address,
      avatar: teacher.avatar,
      phoneNumber: teacher.phoneNumber,
      status: teacher.status,
      subject: teacher.subject,
    };

    return responseStatus(res, 200, "success", teacherData);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.createTeacherService = async (req, res) => {
  const { fullName, gender, birthday, email, address, avatar, password, phoneNumber, status, subject } = req.body;

  if (req.file) {
    const emailTeacher = await teacherModel.findOne({ email });
    if (emailTeacher) {
      return responseStatus(res, 402, "failed", "Email already exists!");
    } else {
      fs.renameSync(req.file.path, path.resolve("app/assets/images/avatars/teachers", req.file.originalname));

      const hashPassword = hashPass(password);

      const createdTeacher = await teacherModel.create({
        fullName,
        gender,
        birthday,
        email,
        address,
        avatar: req.file.originalname,
        password: hashPassword,
        phoneNumber,
        status,
        subject,
      });

      return responseStatus(res, 200, "success", createdTeacher);
    }
  } else return responseStatus(res, 402, "failed", "Upload file not complete!");
};

exports.editTeacherByIdService = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) {
      fs.renameSync(req.file.path, path.resolve("app/assets/images/avatars/teachers", req.file.originalname));
      data.avatar = req.file.originalname;
    }

    const updatedTeacher = await teacherModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedTeacher) {
      return responseStatus(res, 404, "failed", "Teacher not found!");
    }

    return responseStatus(res, 200, "success", updatedTeacher);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.deleteTeacherByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await teacherModel.findByIdAndDelete(id);

    const deleteTeacherInClass = await classModel.findOneAndUpdate(
      { mainTeacher: id },
      { $set: { mainTeacher: null } }
    );

    if (!teacher) {
      return responseStatus(res, 404, "failed", "Teacher not found!");
    }

    return responseStatus(res, 200, "success", "Delete teacher complete!");
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};
