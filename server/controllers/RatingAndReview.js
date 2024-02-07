const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// create Rating 
exports.createRating = async(req ,res) => {
    try{

        // get userID 
        const userId  =req.user.id;
        // fetch data from req body 
        const {rating ,review , courseId} = req.body;
        //check if user  enrolled
        const courseDetails = await Course.findOne(
                                                    {_id:courseId,
                                                    studentsEnrolled: {$elemMatch : {$eq : userId}},
                                                });
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"User dosen't Exist in Course"
            });
        }                                        
        //check if user has already reviewed
        const alreadyReviewed =  await RatingAndReview.findOne({
                                                                  user:userId,
                                                                  course:courseId, });
         if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"Course ALready Reviewd by User"
            });
         }
        //create Rating and Review 
        const ratingReview = await RatingAndReview.create({
                                                            rating ,review,
                                                            course:courseId,
                                                            user:userId, });
        //update course with rnr id
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId },
                                        {
                                            $push:{
                                                ratingAndReviews: ratingReview._id,
                                            }
                                        },
                                        {new:true});
        //return res
        console.log("updatedCourseDetails : ",updatedCourseDetails)
        return res.status(200).json({
            success:true,
            message:"Rating and review Created Successfully"
        });

    }catch(error){
 
        console.log("Error while creating Review is : ", error);
           return res.status(500).json({
                success: false,
                message: error.message,
             });
    }
};


// getAvgRating 
exports.getAvgRating = async(req ,res) => {
    try{

        // getcourse id 
        const courseId = req.body.courseId;
        //calculate avg rating 
        const result  = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                }, 
            },
            {
                $group :{ 
                    _id:null,
                    averageRating:{ $avg : "$rating"},
                }
            }
        ]);


        //return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                avgRating:result[0].averageRating,
            });
        } 

        // if no rating exist 
        return res.status(200).json({
            success:true,
            avgRating:0,
            message:"Average rating is zero : No Rating till now",
        });


    }catch(error){
 
        console.log("Error while creating Review is : ", error);
           return res.status(500).json({
                success: false,
                message: error.message,
             });
    }
};


//getAllRating 
exports.getAllRating = async(req ,res) => {
    try{
          const allReviews = await RatingAndReview.find({})
                                                           .sort({rating: "desc"})
                                                           .populate(
                                                            {
                                                                path:"user",
                                                                select:"firstName lastName email image"
                                                            }
                                                           )
                                                           .populate({
                                                            path:"course",
                                                            select:"courseName",
                                                           })
                                                           .exec();

            return res.status(200).json({
                success:true,
                message:"All rating fetched",
                allReviews,
            })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
           
        })
    }
}
// HW:Course specific rating 

// getCourse Specific Ratings 
exports.getCourseRating = async(req ,res) => {
    try{
        const {courseId} = req.body;

          const CourseReviews = await RatingAndReview.find({course:courseId})
                                                           .sort({rating: "desc"})
                                                           .populate(
                                                            {
                                                                path:"user",
                                                                select:"firstName lastName email image"
                                                            }
                                                           )
                                                           .populate({
                                                            path:"course",
                                                            select:"courseName",
                                                           })
                                                           .exec();

            return res.status(200).json({
                success:true,
                message:"Course rating fetched",
                allReviews,
            })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
           
        })
    }
}