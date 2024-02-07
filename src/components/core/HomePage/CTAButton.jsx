import React from 'react'
import { Link } from 'react-router-dom'
import "../../../App.css"

const CTAButton = ({children , active , linkedto}) => {
  return (
    <div>
       <Link to={linkedto}>

        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-semibold
        ${active ? "bg-yellow-50 text-black btnShadow1" : " bg-richblack-800 btnShadow2"}
        transiition-all duration-200 hover:scale-95 
        `}>
            {children}
        </div>
       </Link>
    </div>
  )
}

export default CTAButton