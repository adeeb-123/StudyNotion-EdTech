import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { setSignupData } from "../slices/authSlice";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { signUp, sentOtp } from "../services/operations/authAPI";
import Spinner from "../components/core/common/Spinner";
const VerifyEmail = () => {
  const { signupData, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      setSignupData(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
    // now  make signup API call
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="bg-richblack-900 h-fit min-h-screen w-full flex  items-center text-richblack-5 justify-center ">
      {loading ? (
        <Spinner/>
      ) : (
        <div className="max-w-[30vw] w-fit mx-auto ">
          <h1 className="font-semibold text-3xl mb-4">Verify Email</h1>
          <p className="text-lg font-[400] text-richblack-100 mb-4">
            A verification code has been sent to you. Enter the code below
          </p>

          <form onSubmit={handleOnSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span style={{ width: "30px"  }}></span>}
              renderInput={(props) => <input {...props} />}
             
              inputStyle={{
                borderRadius: "4px",
                width: "54px",
                height: "54px",
                fontSize: "20px",
                color: "#AFB2BF",
                fontWeight: "400",
                caretColor: "#AFB2BF",
                background: "#161D29",
              }}
              focusStyle={{
                border: "2px solid #FFE83D",
                outline: "none"
              }}
            />

            <button
              type="submit"
              className="text-center text-[13px] px-6 py-3 rounded-md font-semibold bg-yellow-50 text-black mt-6 w-full z-10"
            >
              Verify Email
            </button>
          </form>

          <div className="w-full flex items-center justify-between">
            <NavLink to={"/login"}>
              <div className="flex items-center gap-2 mt-4 text-richblack-5">
                <AiOutlineArrowLeft />
                <p>Back to Login</p>
              </div>
            </NavLink>

            <div
              className="flex items-center gap-2 text-blue-100 mt-4"
              onClick={() => sentOtp(signupData.email, navigate)}
            >
              <BiReset className="mt-1" />
              <p>Resend Email</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
