import React from 'react'
import signupImg from "../assets/Images/signup.webp"
import Template from '../components/core/Auth/Template'
function Signup({setIsLoggedIn}) {
  return (
    <Template
    title="Join the millions learning to code with StudyNotion for free"
    desc1="Build skills for today ,tommorrow and beyond"
    desc2="Education to future-proof your career"
    image={signupImg}
    formtype="signup"
    setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup