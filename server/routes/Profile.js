const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middlewares/auth")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard
  } = require("../controllers/Profile")



//************************************************* */
//              Profile routes
//************************************************* */
router.delete("/deleteProfile" ,auth ,  deleteAccount );
router.put("/updateProfile" , auth , updateProfile);
router.get("/getUserDetails" ,auth , getAllUserDetails);
router.get("/instructorDashboard" , auth ,isInstructor , instructorDashboard)

// getEnrolledCourses
router.get("/getEnrolledCourses" , auth ,getEnrolledCourses);
router.put("/updateProfilePicture" , auth , updateDisplayPicture);





module.exports = router;