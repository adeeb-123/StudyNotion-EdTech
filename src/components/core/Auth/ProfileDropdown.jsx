import React, { useState  ,useEffect , useRef} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";


const ProfileDropdown = () => {
  const {user}  = useSelector((state) => state.profile);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleOnClick = (e) => {
    dispatch(logout(navigate));
   }
    const menuRef = useRef()
    const profileRef = useRef()
    const [openNavbar ,setOpenNavbar] = useState(false);
    
    useEffect( () => {
      let handler =(e) => {
        if(!menuRef.current.contains(e.target) && !profileRef.current.contains(e.target)){
            setOpenNavbar(false);
        }
       
      };
          document.addEventListener("mousedown", handler);
          
          return () => {
            document.removeEventListener("mousedown" , handler)
           
          }
    })

    if (!user) return null
  
  return (
    <div className="ml-3">
      <div className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden hover:cursor-pointer"
      onClick={() => {setOpenNavbar(!openNavbar)}} ref={profileRef}>
              <img src={user?.image}
          alt={`profile-${user?.firstName}`} />
      </div>

      {/* side menu  */}
      <div className={`${openNavbar ? " opacity-100" : " opacity-0"} 
      absolute top-12 right-0 translate-x-[-800%] h-6 w-6 rotate-45 rounded bg-richblack-800 transition-all duration-200`}></div>
      <div className={`${openNavbar ? " opacity-100" : " opacity-0"}
      h-fit w-[20vw] flex flex-col gap-4 text-richblack-100 bg-richblack-800  z-[100] transition-all duration-200 py-4 rounded-md absolute top-14 right-0 translate-x-[-10%]`} ref={menuRef}>
        

        <NavLink to="/dashboard/my-profile">
          <div className="flex items-center gap-0 rounded-md hover:bg-richblue-900 py-2 hover:text-richblack-25">
            <VscDashboard className="mt-1  mx-3 text-[21px]" />
            <p className="">Dashboard</p>
          </div>
        </NavLink>

        <div onClick={handleOnClick}>
          <div className="flex items-center gap-0 rounded-md hover:bg-richblue-900 py-2 hover:text-richblack-25">
            <BsBoxArrowRight className="mt-1 mx-3  text-[19px]" />
            <p className="">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
