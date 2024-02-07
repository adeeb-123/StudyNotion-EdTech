const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress")

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();

// createCourse handler func
exports.createCourse = async (req, res) => {
  try {
    // fetch data
    let { courseName, courseDescription, whatYouWillLearn, price, category , tags , status ,instructions } =
      req.body;

    // fetch file
    const thumbnail = req.files.thumbnail;

    const tag = JSON.parse(tags)
    const instruction = JSON.parse(instructions)
    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tags ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    if (!status || status === undefined) {
			status = "Draft";
		}
    // get instructor from db (yha ek baar check krna hai baad mein !!!!)
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details : ", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Not Found",
      });
    }

    // Tag validation -> tag is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Pleaase Enter a Valid Category",
      });
    }

    // Upload image to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create course in DB
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      tags:tag,
      price,
      status: status,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      instructions:instruction
    });

    // add new course to User Schema
    await User.findOneAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // add new course to Tag Schema
    await Category.findOneAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "New Course Created Successfully",
      data:{newCourse}
    });
  } catch (error) {
    console.log("Error occured while Creatinng New Course : ", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while Creatinng New Course",
    });
  }
};

// getAllCourses handler func
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: " All Courses Fetched Successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log("Error occured while Fetching all Courses : ", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while Fetching all Courses",
    });
  }
};

// getCourse Details
exports.getCourseDetails = async (req, res) => {
  try {
    // getID
    const  {courseId} = req.body;
    // console.log(courseId)
    // find course details
    const courseDetails = await Course.findById( courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    //  validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Coudn't find any course with this courseId :  ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      courseDetails,
    });
  } catch (error) {
    console.log("Error occured while fetching  Course Details : ", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while Fetching Course Details",
    });
  }
};


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
     const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

  
    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

exports.editCourse =async (req, res) => {
  try{
     const courseId = req.body.courseId ;
     const updates = req.body;
     const course = await Course.findById(courseId);


    //  if thumbnail present ,update it 
    if(req.files){
      console.log("Thumbnail update")
      const thumbnail = req.files.thumbnail
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // update only fields present in updates 
    for(const key in updates){
      if(updates.hasOwnProperty(key)){
        if(key === "tag" || key=== "instructions"){
          course[key] = JSON.parse(updates[key])
        }else{
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id:courseId ,
    }).populate({
      path:"instructor",
      populate:{
        path:"additionalDetails",
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path:"courseContent",
      populate:{
        path:"subSections",
      },
    })
    .exec();

    res.json({
      success:true,
      message:"Course Updated Successfully",
      data:updatedCourse
    })
  }catch(error){
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.deleteCourse = async(req , res) => {
  try{
    const courseId = req.body.courseId;

    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({message:"Course not Found"})
    }

    //Unenroll students
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId , {
        $pull: {courses:courseId},
      })
    }

    // Delete sections and sub sections 
    const courseSections = course.courseContent;
    for(const sectionId of courseSections){
      const section = await Section.findById(sectionId);
      if(section){
        const subSections = section.subSections;
        for(const subSectionId of subSections){
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      await Section.findByIdAndDelete(sectionId);
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success:true,
      message:"Course Deleted Successfully"
    });

  }catch(error){
     console.log(error)
     return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getFullCourseDetails = async(req , res)=>{
  try{
    const courseId = req.body.courseId.courseId || req.body.courseId;
    const userId  = req.user.id;
    
    const courseDetails = await Course.findOne({
      _id: courseId
    })
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSections",
      },
    })
    .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID:courseId,
      useId:userId
    })

    console.log("CourseProgressCount - " , courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }
    
    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
    }
    catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
