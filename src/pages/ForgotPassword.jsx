import React, { useState } from "react";
import { IoMdPricetag } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getPasswordResetToken } from "../services/operations/authAPI";
import Spinner from "../components/core/common/Spinner";

const ForgotPassword = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setSentEmail));
  };

  return (
    <div className="bg-richblack-900 h-fit min-h-screen w-full flex  items-center text-richblack-5 justify-center ">
      {loading ? (
           <Spinner/>
       
      ) : (
        <div className="max-w-[30vw] w-fit mx-auto ">
          <h1 className="font-semibold text-3xl mb-4">
            {!sentEmail ? "Reset Your Password" : "Check Your Email"}
          </h1>

          <p className="text-lg font-[400] text-richblack-100 mb-4">
            {!sentEmail
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit} className="text-black">
            {!sentEmail && (
              <label>
                <p className="text-[0.875rem] text-richblack-5  mb-1 leading-[1.375rem]">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your email Here"
                  className='bg-richblack-800 text-richblack-5 rounded-[0.5rem] w-full p-[12px] my-1'
                />
              </label>
            )}

            <button type="submit" className="text-center text-[13px] px-6 py-3 rounded-md font-semibold bg-yellow-50 text-black mt-6 w-full">
              {!sentEmail ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <NavLink to={"/login"}>
            <div className="flex items-center gap-2 mt-4 text-richblack-5">
              <AiOutlineArrowLeft className="mt-1"/>
              <p>Back to Login</p>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
