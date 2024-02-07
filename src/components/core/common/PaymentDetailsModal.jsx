import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../../../services/operations/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiClock } from "react-icons/fi";
import { PiCursor } from "react-icons/pi";
import { IoIosPhonePortrait } from "react-icons/io";
import { TbCertificate2 } from "react-icons/tb";
import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";

export const PaymentDetailsModal = ({ courseData }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseId = useParams();


  const handleBuyCourse = async () => {
    if (token) {
      buyCourse(token, [courseId], user, dispatch, navigate);
      return;
    } else {
      toast.error("Please Login First");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Check out this link!',
          url: window.location.href,
        });
        console.log('Link shared successfully');
      } catch (error) {
        console.error('Error sharing link:', error.message);
      }
    } else {
      console.log('Web Share API not supported');

      // Fallback for desktop browsers or browsers without Web Share API support
      // You can implement a custom share modal or other sharing options here
      alert('Share functionality not supported on this browser. You can manually copy the link.');

      // Alternatively, you can implement your own custom share modal
      // or use a third-party library for sharing on desktop browsers
    }
  };
  return (
    <div className="z-10   ">
      <div className="w-[60%] min-w-[307px] ml-auto rounded-lg overflow-hidden bg-richblack-600">
        <img src={courseData?.thumbnail} alt="" className="w-full" />

        <div>
          <p className="text-2xl text-white font-semibold my-3 pl-5">
            Rs.{courseData?.price}
          </p>
          <div className="w-[85%] mx-auto">
            <button className="bg-richblack-700 mb-3 text-white hover:bg-richblack-800 font-semibold rounded-lg py-3 w-full" onClick={() => {
              if(user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR ){
                dispatch(addToCart(courseData))
              }else{
                toast.error("You cannot buy course")
              }
            }}>
              Add to Cart
            </button>
            <button
              className="bg-yellow-50  text-black font-semibold rounded-lg py-3 w-full"
              onClick={() => handleBuyCourse()}
            >
              Buy Now
            </button>
          </div>
          <p className="w-[75%] mx-auto text-richblack-100 text-center text-xs my-1 font-semibold">
            30 Day Money Back Gaurantee
          </p>

          <div className="w-[85%] mx-auto mb-2">
            <p className="text-white font-semibold ">
              This course includes :
            </p>
            <ul className=" text-caribbeangreen-400 text-sm font-semibold">
              <li className="flex items-center gap-x-2">
              <FiClock />
                <p>100 hours of Content</p>
              </li>
              <li className="flex items-center gap-x-2">
              <PiCursor />
                <p>Full time access</p>
              </li>
              <li className="flex items-center gap-x-2">
              <IoIosPhonePortrait />
                <p>Access on Mobile and TV</p>
              </li>

              <li className="flex items-center gap-x-2">
                 <TbCertificate2 />
                <p>Certificate of completion</p>
              </li>
            </ul>
          </div>

          <p className="text-yellow-50 font-semibold cursor-pointer text-center mb-4" onClick={handleShare}>Share</p>
        </div>
      </div>
    </div>
  );
};
