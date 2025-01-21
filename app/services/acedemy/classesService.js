const gradesModel = require("../../models/Acedemy/gradesModel");
const classModel = require("../../models/Acedemy/classesModel");
const teachersModel = require("../../models/Staff/teachersModel");
const studentsModel = require("../../models/Students/studentsModel");
const responseStatus = require("../../handlers/responseStatus");

exports.getAllClassesService = async (req, res) => {
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
    const total = await classModel.countDocuments(cleanedSortWithData);

    const classes = await classModel
      .find(cleanedSortWithData)
      .lean()
      .populate("mainTeacher")
      .populate("grade")
      .skip(skip)
      .limit(limitNumber)
      .exec();
    const totalPages = Math.ceil(total / limitNumber);

    return res.status(200).json({
      success: true,
      message: "success",
      data: classes,
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

exports.getClassByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const classCollection = await classModel.findById(id);
    if (!classCollection) responseStatus(res, 404, "failed", "Class not found");

    const dataClass = {
      name: classCollection.name,
      description: classCollection.description,
      mainTeacher: classCollection.mainTeacher,
      grade: classCollection.grade,
    };

    return responseStatus(res, 200, "success", dataClass);
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.createClassService = async (req, res) => {
  try {
    const { name, description, mainTeacher, grade } = req.body;

    const newDescription = description || null;

    const hasClass = await classModel.findOne({ name }).exec();
    if (hasClass) {
      return responseStatus(res, 402, "failed", "Class already exists!");
    }

    let createdClass;

    if (grade !== "") {
      createdClass = await classModel.create({
        name,
        description: newDescription,
        mainTeacher,
        grade,
        hasGrade: 1,
      });

      await gradesModel.updateMany({ _id: grade }, { $push: { classes: createdClass._id } });
    } else {
      createdClass = await classModel.create({
        name,
        description: newDescription,
        mainTeacher,
      });
    }

    return responseStatus(res, 200, "success", createdClass);
  } catch (error) {
    return responseStatus(res, 402, "failed", "Create class not complete!");
  }
};

exports.editClassByIdService = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateData = { ...data };
    console.log(updateData);

    let updatedClass;
    if (updateData.grade) {
      updatedClass = await classModel.findByIdAndUpdate(
        id,
        { ...updateData, grade: updateData.grade, hasGrade: 1 },
        { new: true }
      );

      const grade = await gradesModel.findOne({ _id: updateData.grade, classes: { $ne: id } });
      if (grade) {
        await gradesModel.updateOne({ _id: updateData.grade }, { $push: { classes: id } });
      }

      await gradesModel.updateMany({ classes: id, _id: { $ne: updateData.grade } }, { $pull: { classes: id } });
    } else {
      updatedClass = await classModel.findByIdAndUpdate(id, { ...updateData, grade: null, hasGrade: 0 }, { new: true });

      await gradesModel.updateMany({ classes: id }, { $pull: { classes: id } });
    }

    if (!updatedClass) {
      return responseStatus(res, 404, "failed", "Class not found!");
    }

    return responseStatus(res, 200, "success", updatedClass);
  } catch (error) {
    console.error(error);
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};

exports.deleteClassByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const classCollection = await classModel.findByIdAndDelete(id);

    const deleteClassInGrade = await gradesModel.updateMany({ classes: id }, { $pull: { classes: id } });
    const deleteClassInStudent = await studentsModel.findOneAndUpdate(
      { currentClassLevel: id },
      { $set: { currentClassLevel: null } }
    );

    if (!classCollection) {
      return responseStatus(res, 404, "failed", "Class not found!");
    }

    return responseStatus(res, 200, "success", "Class delete complete!");
  } catch (error) {
    return responseStatus(res, 500, "failed", "Internal server error");
  }
};
