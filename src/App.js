import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";
import Navbar from "./components/core/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import OpenRoute from "./components/core/Auth/OpenRoute";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import { Catalog } from "./pages/Catalog";
import { ViewCourse } from "./pages/ViewCourse";
import { WatchCourse } from "./pages/WatchCourse";
import { VideoDetails } from "./components/core/WatchCourse/VideoDetails";
import { InstructorDashboard } from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";

function App() {
   // delete after replacing this code 
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const{user} = useSelector((state) => state.profile)
  
  return(
 <div className="w-screen min-h-screen h-fit  bg-richblack-900 flex flex-col">
 <Navbar isLoggedIn={isLoggedIn}  setIsLoggedIn ={setIsLoggedIn}  />

<Routes>

<Route path="/" element = {<Home/>} />
<Route path="/catalog/:catalogName" element = {<Catalog/>} />
<Route path="/courses/:courseId" element = {<ViewCourse/>} />
<Route path="/login" 
element = {
    <OpenRoute>
        <Login setIsLoggedIn={setIsLoggedIn}/>
    </OpenRoute>  } />

<Route path="/signup" 
element = {
   <OpenRoute>
          <Signup setIsLoggedIn={setIsLoggedIn}/>
   </OpenRoute>
} />



<Route path="/forgot-password"
 element = {
     <OpenRoute>
           <ForgotPassword/>
     </OpenRoute>
 } />

<Route path="/update-password/:id"
 element = {
     <OpenRoute>
           <UpdatePassword/>
     </OpenRoute>
 } />
 
<Route path="/verify-email"
 element = {
     <OpenRoute>
         <VerifyEmail/>
     </OpenRoute>
 } />


<Route path="/about"
 element = {
     <OpenRoute>
        <AboutUs/>
     </OpenRoute>
 } />

<Route path="/contact"
 element = {
     <OpenRoute>
        <ContactUs/>
     </OpenRoute>
 } />


<Route path="/dashboard" element = {
   <PrivateRoute >
      <Dashboard/>
   </PrivateRoute>
} >

<Route path="/dashboard/my-profile" element={<MyProfile/>} />
<Route path="/dashboard/settings" element = {<Settings/>} /> 


{
    user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
         <Route path="/dashboard/wishlist" element = {<Cart/>} /> 
         <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
        </>
    )
}
{
    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <>
          <Route path="/dashboard/my-courses" element={<MyCourses/>} />
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
          <Route path="/dashboard/add-course" element={<AddCourse/>} />
          <Route path="/dashboard/instructor" element={<InstructorDashboard/>} />
        </>
    )
}
</Route>

<Route element={
    <PrivateRoute>
        <WatchCourse/>
    </PrivateRoute>
}>

 {
     user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
        <Route path="watch-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>} />
        </>
    )
 }
</Route>


<Route path="*" element={<Error/>} />
</Routes>

 </div>
   
  )
}

export default App;
