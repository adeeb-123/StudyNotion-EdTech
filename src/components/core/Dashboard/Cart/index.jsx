import { useSelector } from "react-redux";
import { RenderCartCourses } from "./RenderCartCourses";
import { RenderTotalAmount } from "./RenderTotalAmount";
export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  return (
    <div className="text-white w-[90%] mx-auto">
      <p className="text-3xl text-white font-semibold ">My Wishlist</p>
      <p className="w-full border-b-2 border-b-richblack-700 mt-10 py-2 text-richblack-100">{totalItems} Courses in Wishlist</p>

      {total > 0 ? (
        <div className="flex items-start py-8 w-full">
          <RenderCartCourses  />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart is Empty!</p>
      )}
    </div>
  );
}
