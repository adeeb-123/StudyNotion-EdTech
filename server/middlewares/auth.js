const jwt = require("jsonwebtoken");
const user = require("../models/User");
require("dotenv").config();



// auth 
exports.auth =  async(req,res,next) => {
   
    try{

        // extract token 
        const token = req.cookies.token
                                      || req.body.token
                                      || req.header("Authorization").replace("Bearer ", "");

         if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is not Available"
            });
         }

        //  verify token 
        try{
           const decode  = await jwt.verify(token , process.env.JWT_SECRET);
           console.log("Decode is : " , decode);
           req.user = decode;
        }catch(error){
                // verification isssue 
                return res.status(401).json({
                    success:false,
                    message:"Token is Invalid"
                });
        }
        next();

    }catch(error){
        console.log("Error occured while Authentication is : " , error);
        return res.status(500).json({
            success:false,
            message:"Authentication Failed"
        });
    }
}

// isStudent
exports.isStudent = async (req,res,next) => {
    try{
           if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is Secured Route for Students Only",
            });
           }
           next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role can't be verified , Please try Again",
        });
    }
};

// isInstructor 
exports.isInstructor = async (req,res,next) => {
    try{
           if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is Secured Route for Instructors  Only",
            });
           }
           next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role can't be verified , Please try Again",
        });
    }
};

// isAdmin 
exports.isAdmin = async (req,res,next) => {
    try{
           if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is Secured Route for Admin Only",
            });
           }
           next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role can't be verified , Please try Again",
        });
    }
};

 