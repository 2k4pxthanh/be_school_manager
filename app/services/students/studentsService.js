const studentsModel = require("../../models/Students/studentsModel");
const responseStatus = require("../../handlers/responseStatus");
const { hashPass, comparePass } = require("../../handlers/passHash");

exports.getAllStudentsService = async (req, res) => {
  try {
    const { limit = 10, page = 1, ...sortWithData } = req.query;
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
    const total = await studentsModel.countDocuments(cleanedSortWithData);

    const students = await studentsModel
      .find(cleanedSortWithData)
      .lean()
      .populate("currentClassLevel")
      .skip(skip)
      .limit(limitNumber)
      .exec();

    const totalPages = Math.ceil(total / limitNumber);

    return res.status(200).json({
      success: true,
      message: "success",
      data: students,
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

exports.getStudentByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentsModel.findById(id);

    if (!student) return responseStatus(res, 404, "failed", "Student not found!");

    const studentData = {
      fullName: student.fullName,
      gender: student.gender,
      birthday: student.birthday,
      email: student.email,
      bornAt: student.bornAt,
      currentClassLevel: student.currentClassLevel,
    };

    return responseStatus(res, 200, "success", studentData);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.createStudentService = async (req, res) => {
  try {
    const { fullName, gender, birthday, bornAt, currentClassLevel, email, password } = req.body;

    const student = await studentsModel.findOne({ email });
    if (student) return responseStatus(res, 402, "failed", "Email already exists!");

    const hashPassword = hashPass(password);

    const createdStudent = await studentsModel.create({
      fullName,
      gender,
      birthday,
      bornAt,
      currentClassLevel,
      email,
      password: hashPassword,
    });

    return responseStatus(res, 200, "success", createdStudent);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.editStudentByIdService = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedStudent = await studentsModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedStudent) {
      return responseStatus(res, 404, "failed", "Student not found!");
    }

    return responseStatus(res, 200, "success", updatedStudent);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.deleteStudentByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentsModel.findByIdAndDelete(id);

    if (!student) {
      return responseStatus(res, 404, "failed", "Student not found!");
    }

    return responseStatus(res, 200, "success", "Delete student complete!");
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};
