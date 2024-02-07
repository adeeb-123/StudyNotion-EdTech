const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// resetPasswordToken -> send front end UI link
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from req body
    const { email } = req.body;
    // check user for email existrs ?
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "Your Email is not Registered",
      });
    }
    // generate token
    const token = crypto.randomUUID();
    //update yser by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    //create url
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail containing url
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link - ${url}`
    );
    //return res
    return res.json({
      success: true,
      message: "Email Sent Successfully , Please check",
    });
  } catch (error) {
    console.log("Error occured while reseting Password : ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wronng while reseting pwd",
    });
  }
};

// resetPassword
exports.resetPassword = async (req, res) => {
  try {
    // data fetch
    const { password, confirmPassword, token } = req.body;
    // validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwrod and confirm Password doesn't match",
      });
    }
    //get user details from db using token
    const user = await User.findOne({ token: token });
    //if no entry found in DB
    if (!user) {
      return res.json({
        success: false,
        message: "Token is Invalid , No such User is Found",
      });
    }
    //  token time expires
    if (user.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is Expired , Please Try Again",
      });
    }
    //hash pwd
    const hashedPassword = await bcrypt.hash(password, 10);
    // update pwd
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    //  return res
    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log("Error occured while reseting Password : ", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while reseting pwd",
    });
  }
};
