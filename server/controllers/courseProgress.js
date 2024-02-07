const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async(req ,res) => {
    const {courseId , subSectionId} = req.body;
    const userId = req.user.id;
    console.log(courseId ,subSectionId , userId);

    try{
        const subSection = await SubSection.findById(subSectionId)

        if(!subSection){
            return res.status(404).json({success:false , message:"SubSection Not found"})
        }

        const courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            useId:userId
        });
        console.log(courseProgress)
        if(!courseProgress){
            return res.status(404).json({success:false , message:"CourseProgress Not Found"})
        }else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.json({success:false , message:"Lecture Already Completed"})
            }

            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({success:true , message:"Mark as completed"})
    }catch(error){
        console.log(error);
        res.status(500).json({success:false , message:"Internal Server Error"})
    }
}