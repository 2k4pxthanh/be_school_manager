const gradesModel = require("../../models/Acedemy/gradesModel");
const classModel = require("../../models/Acedemy/classesModel");
const responseStatus = require("../../handlers/responseStatus");

exports.getAllGradesService = async (req, res) => {
  try {
    const { limit, page, sort, classId, ...sortWithData } = req.query;
    const sortDirection = sort === "-1" ? -1 : 1;

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

    const total = await gradesModel.countDocuments(cleanedSortWithData);

    const grades = await gradesModel
      .find(cleanedSortWithData)
      .lean()
      .populate("classes")
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: sortDirection })
      .exec();

    if (classId) {
      const filteredGrades = grades.filter((grade) => grade.classes.some((cls) => cls._id.toString() === classId));
      return res.status(200).json({
        success: true,
        message: "success",
        data: filteredGrades,
        total: 1,
        totalPages: 1,
        currentPage: pageNumber,
      });
    }

    const totalPages = Math.ceil(total / limitNumber);

    return res.status(200).json({
      success: true,
      message: "success",
      data: grades, // Trả về các grade đã được lọc
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

exports.getGradeByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const grade = await gradesModel.findById(id);
    if (!grade) responseStatus(res, 404, "failed", "Grade not found");

    const dataGrade = {
      name: grade.name,
      classes: grade.classes,
    };

    return responseStatus(res, 200, "success", dataGrade);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.createGradeService = async (req, res) => {
  try {
    const { name, classes } = req.body;

    const hasGrade = await gradesModel.findOne({ name }).exec();
    if (hasGrade) return responseStatus(res, 402, "failed", "Grade already exists!");

    const createdGrade = await gradesModel.create({
      name,
      classes,
    });

    await classModel.updateMany({ _id: { $in: classes } }, { $set: { hasGrade: 1, grade: createdGrade._id } });

    return responseStatus(res, 200, "success", createdGrade);
  } catch (error) {
    return responseStatus(res, 402, "failed", "Create grade not complete!");
  }
};

exports.getGradeByIdService = async (req, res) => {
  try {
    const { id } = req.params;
    const grade = await gradesModel.findById(id);
    if (!grade) responseStatus(res, 404, "failed", "Grade not found");

    const dataGrade = {
      name: grade.name,
      classes: grade.classes,
    };

    return responseStatus(res, 200, "success", dataGrade);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.editGradeByIdService = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.classes && data.classes.length !== 0) {
      await gradesModel.updateMany({ classes: { $in: data.classes } }, { $pull: { classes: { $in: data.classes } } });

      await classModel.updateMany({ _id: { $in: data.classes } }, { $set: { hasGrade: 1, grade: id } });

      await gradesModel.updateOne({ _id: id }, { $addToSet: { classes: { $each: data.classes } } });
    }

    const updatedGrade = await gradesModel.findByIdAndUpdate(id, data, { new: true });

    if (!updatedGrade) {
      return responseStatus(res, 404, "failed", "Grade not found!");
    }

    return responseStatus(res, 200, "success", updatedGrade);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.deleteGradeByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const grade = await gradesModel.findByIdAndDelete(id);

    const deleteGradeInClassModel = await classModel.findOneAndUpdate(
      { grade: id },
      { $set: { grade: null, hasGrade: 0 } }
    );

    if (!grade) {
      return responseStatus(res, 404, "failed", "Class not found!");
    }

    return responseStatus(res, 200, "success", "Grade delete complete!");
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};
