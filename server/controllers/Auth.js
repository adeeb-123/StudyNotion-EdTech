const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
require("dotenv").config();
const passwordUpdated  = require("../mail/templates/passwordUpdate")
// sendOTP
exports.sendotp = async (req, res) => {
  try {
    //   fetch email from req body
    const { email } = req.body;

    // check if user exists
    const checkUserPresent = await User.findOne({ email });

    // if user  exists
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // now generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP genrated is : ", otp);

    // check unique  or not
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    // create payload
    const otpPayload = { email, otp };
    // enter it in body
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Entry in Body : ", otpBody);

    // send res
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log("Error while making OTP is : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signup
exports.signup = async (req, res) => {
  try {
    // fetch data from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    // validate data
    if (!firstName || !lastName || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    //match password and Confirm Password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password And ConfirmPasssword does not match , Please try again",
      });
    }
    //check if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is Already Registered",
      });
    }

    //find most recentr OTP stored for user (here -> ".sort({createdAt:-1})"   will sort from latest to last & " .limit(1) " will store only  one value first one)
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("Most recent OTP is :", recentOtp);

    //validate OTP
    if (recentOtp.length == 0) {
      // OTP not Found
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    } else if (otp !== recentOtp[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //Hash Password
    const hasPassword = await bcrypt.hash(password, 10);
    //Create Entry in DB
    // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    console.log("profileDetails: " , profileDetails)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hasPassword,
      accountType,
      contactNumber,
      approved:approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    //return res
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log("Error While creating User : ", error);
    return res.status(500).json({
      success: false,
      message: "User Cannot be Registered , Please Try Again",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // fetch data from req body
    const { email, password } = req.body;
    // validate data /
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required , Please try again",
      });
    }
    //user check if exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered , Please Sign Up first",
      });
    }
    // after pass matchimng ,gr=nerate JWT
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
       // httpOnly: true,
        sameSite: 'None', // Set SameSite attribute to 'None'
        secure: true,
      };

      // create cookie and send res
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Is Incorrect",
      });
    }
  } catch (error) {
    console.log("Error while logging in is : ", error);
    return res.status(500).json({
      success: false,
      message: "Login Failure ,Pleaase Try Again",
    });
  }
};

// changePassword
exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id)
    // fetch data from req body
    const { oldPassword, newPassword } = req.body;
    // get oldPass , NewPass , ConfirmPass
    if ( !oldPassword || !newPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required to fill ,Please try Again",
      });
    }
      
    if (await bcrypt.compare(oldPassword, userDetails.password)) {
      //hash pwd
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update password in DB
      await User.findByIdAndUpdate(
        req.user.id,
        { password: hashedPassword },
        { new: true }
      );
      
      //send mail of updation
      await mailSender(
        userDetails.email,
        "Passsword Changed Successfully",
        "Your Password has been changed"
      );
      console.log("Password changed ")
      //return res
      return res.status(200).json({
        success: true,
        message: "Password Changed Succesfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Password dosen't match while changing Password",
      });
    }
  } catch (error) {
    console.log("Error occured while changing password : ", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while changing password ",
    });
  }
};
