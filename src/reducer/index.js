import React from "react";
import {combineReducers} from "@reduxjs/toolkit"
import profileReducer from "../slices/profileSlice";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourse from "../slices/viewCourseSlice"
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourse
})

export default rootReducer