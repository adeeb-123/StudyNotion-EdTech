const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");

require("dotenv").config();

// create sub Section
exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req body
    const { sectionId, title, description, courseId } = req.body;
    //extraxt file / video
    const video = req.files.video;
    let timeDuration;
    //validation
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All Properties are Required",
      });
    }
    //upload video to clouidnary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    //create subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // update section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSections: subSectionDetails._id } },
      { new: true }
    ).populate("subSections");

    const updatedCourse = await Course.findOne(
      { _id: { $eq: courseId } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "SubSection Created Successfully",
      data: { updatedCourse },
    });
  } catch (error) {
    console.log("Unable to create SubSection : ", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create SubSection , Please Try again",
      error: error.message,
    });
  }
};

// update subSection
exports.updateSubSection = async (req, res) => {
  try {
    // datea fetch
    const { title, description, subSectionId, sectionId, courseId } = req.body;

    //validate
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // if (subSection.title !== undefined) {
    //   subSection.title = title;
    // }

    // if (subSection.description !== undefined) {
    //   subSection.description = description;
    // }

    // if (req.files && req.files.video !== undefined) {
    //   const video = req.files.video;
    //   const uploadDetails = await uploadImageToCloudinary(
    //     video,
    //     process.env.FOLDER_NAME
    //   );
    //   subSection.videoUrl = uploadDetails.secure_url;
    //   subSection.timeDuration = `${uploadDetails.duration}`;
    // }

    // await subSection.save();

    const updateFields = {};

    if (title !== undefined) {
      updateFields.title = title;
    }

    if (description !== undefined) {
      updateFields.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      updateFields.videoUrl = uploadDetails.secure_url;
      updateFields.timeDuration = `${uploadDetails.duration}`;
    }

    // Use findByIdAndUpdate to update only specified fields
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updateFields,
      { new: true } // to return the updated document
    );

    const updatedCourse = await Course.findOne({ _id: { $eq: courseId } })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    //return res
    return res.status(200).json({
      success: true,
      data: { updatedCourse },
      message: "SubSection Updated Successfully",
    });
  } catch (error) {
    console.log("Unable to update SubSection : ", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update SubSection , Please Try again",
      error: error.message,
    });
  }
};

// delete SubSection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId, courseId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSections: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedCourse = await Course.findOne({ _id: { $eq: courseId } })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    return res.json({
      success: true,
      data: { updatedCourse },
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.log("Unable to delete SubSection : ", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete SubSection , Please Try again",
      error: error.message,
    });
  }
};
