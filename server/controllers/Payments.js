const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");
const crypto = require("crypto")
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const CourseProgress = require("../models/CourseProgress");


exports.capturePayment = async(req,res)=>{

  const {courses} = req.body;
  console.log("CourseID - "  , courses)
  const userId  = req.user.id;

  if(courses.length === 0){
    return res.status(404).json({success:false , message:"Please enter the CourseId"})
  }

    let totalAmount = 0;
    for(const course_id of courses){
      let course;
      try{
        course = await Course.findById(course_id.courseId || course_id);
        if(!course){
          return res.status(200).json({success:false , message:"Could not finnd the course"})
        }
        const uid = new mongoose.Types.ObjectId(userId)
        if(course?.studentsEnrolled.includes(uid)){
          return res.status(200).json({success:false , message:"Course already Purchased"})
        }

        totalAmount += course.price;
      }catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:error.message})
      }
    }
    console.log("Total Amount - " , totalAmount)
    
    
    const options = {
      amount: totalAmount * 100,
      currency:"INR",
      receipt: Math.random(Date.now()).toString()
    }

    console.log("Options - " , options)
    try{
            const  paymentResponse =await instance.orders.create(options)
            console.log("Payment Response - ", paymentResponse)
            res.json({
              success:true,
              message:paymentResponse      
                  })
    }catch(error){
            console.log(error)
            res.status(500).json({success:false , message:"Could not Initiate Order"})
 }
  
}

// verify the Payment 
exports.verifySignature = async(req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body.courses;
  const userId = req.user.id;
  console.log(razorpay_order_id , razorpay_payment_id  , razorpay_signature , courses , userId)
  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId ){
    return res.status(200).json({success:false , message:"Payment Failed"})
  }

  let  body = razorpay_order_id + "|" + razorpay_payment_id ; 
  let expectedSignature = crypto.createHmac(
    "sha256" , process.env.RAZORPAY_SECRET
  )
  .update(body.toString())
  .digest("hex");

  if(expectedSignature  === razorpay_signature){
    // enroll krwao students  ko 
  await enrollStudents(courses , userId , res)
    // return res 
    return res.status(200).json({success:true , message:"Payment Verified"} )
  }
  return res.status(200).json({success:false , message:"Payment Verification Failed"})

}

const enrollStudents = async(courses , userId , res) => {
     if(!courses || !userId){
      return res.status(200).json({success:false , message:"Please provide Data for Courses and UserId"})
     }

     for(const courseID of courses){
       try{
         console.log("This is courseId" , courseID.courseId)
         const courseId  = courseID.courseId || courseID
        const enrolledCourse = await Course.findByIdAndUpdate(
          courseId,
          {$push:{studentsEnrolled : userId}},
          {new:true},)
          if(!enrolledCourse){
            return res.status(200).json({success:false , message:"Could not find Course"})
          }
  
          const courseProgress = await CourseProgress.create({
            courseID:courseId,
            useId:userId,
            completedVideos:[]
          })
          //find  use andd add courseId
          const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {$push:{courses:courseId , courseProgress:courseProgress._id}},
            {new:true}
            )
  
            // const emailResponse = await mailSender(
            //   enrolledStudent.email,
            //   `Successfully Enrolled into ${enrolledCourse.courseName}`,
            //   courseEnrollmentEmail(enrolledCourse.courseName , `${enrolledStudent.firstName + enrolledStudent.lastName}` )
            // )
  
            // console.log("Email Sent Successfully", emailResponse.response)
       }catch(error){
        // console.log("error in sending mail", error)
        // return res.status(500).json({success:false, message:"Could not send email"})
       }
     }


}

exports.sendPaymentSuccessEmail = async(req,res)=>{
  const {orderId , paymentId , amount} = req.body;

  const userId = req.user.id;

  if(!userId || !paymentId || !amount){
          return res.status(404).json({success:false , message:"Please Enter all Fields"})
  }

  try{
    const enrolledStudent = await User.findById(userId)
    await mailSender(
      enrolledStudent.email,
      `Payment Recieved`,
       paymentSuccessEmail(`${enrolledStudent.firstName}`,
       amount/100,orderId, paymentId)
  )
  }catch(error){
  }
}

// //capture payment and initiate razorpay order
// exports.capturePayment = async (req, res) => {
//   try {
//     //   get courseId and userId
//     const { course_id } = req.body;
//     const { user_id } = req.user.id;
//     //validation
//     // valid courseId
//     if (!course_id) {
//       return res.json({
//         success: false,
//         message: "Please enter a valid CourseId",
//       });
//     }

//     // valid userId
//     let course;
//     try {
//       course = await Course.findById(course_id);
//       if (!course) {
//         return res.json({
//           success: false,
//           message: "Cannot find the Course",
//         });
//       }
//       // user if user already paid for course already
//       const uid = new mongoose.Types.ObjectId(user_id);
//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(200).json({
//           success: false,
//           message: "USer Already bought the Course",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//     //create order
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: Math.random(Date.now()).toString(),
//       notes: {
//         courseId: course_id,
//         user_id,
//       },
//     };

//     try {
//       //    initiate payment usinng Razorpay
//       const paymentResponse = await instance.orders.create(options);
//       console.log("Payment Response is : ", paymentResponse);

//       // return res
//       return res.status(200).json({
//         success: true,
//         message: "Order created successfully",
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         thumbnail: course.thumbnail,
//         orderID: paymentResponse.id,
//         currency: paymentResponse.currency,
//         amount: paymentResponse.amount,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Coudn't Initiate Order",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Coudn't Initiate Order",
//     });
//   }
// };

// // Verify Signature of Razorpay and Server
// exports.verifySignature = async (req, res) => {
//   const webhookSecret = "123456";

//   const signature = req.headers["x-razorpay-signature"];

//   // HW: What is checkSum ?
//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     console.log("Payment is Authorized");
//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       // find course and enroll student
//       const enrolledCourses = await Course.findOneAndUpdate(
//         { _id: courseId },
//         {
//           $push: {
//             studentsEnrolled: userId,
//           },
//         },
//         { new: true }
//       );

//       if (!enrolledCourses) {
//         return res.status(500).json({
//           success: false,
//           message: error.message,
//         });
//       }

//       console.log(enrolledCourses);

//       //   find student and add courseId in Enrolled courses
//       const enrolledStudent = await User.findOneAndUpdate(
//         { _id: userId },
//         {
//           $push: {
//             courses:courseId,
//           },
//         },
//         { new: true }
//       );

//       if (!enrolledStudent) {
//         return res.status(500).json({
//           success: false,
//           message: error.message,
//         });
//       }

//     //   mail send of course purchase successfull 
//     const emailResponse = await mailSender(
//                                               enrolledStudent.email,
//                                               "Congratulation !!! You are onboarded in New StudyNotion Course",
//                                               "Congratulation !!! You are onboarded in New StudyNotion Course",
//     );

//     console.log(emailResponse);
//     return res.status(200).json({
//         success:true,
//         message:"Signature Verified successfully and Course Added"
//     });


//     } catch (error) {
//         console.log(error);
//                return res.status(500).json({
//                         success: false,
//                        message: "Coudn't Verify Signature",
//                 });
//     }
//   }

//   else{
//     return res.status(400).json({
//         success: false,
//        message: "Invalid request",
// });
//   }
// };
