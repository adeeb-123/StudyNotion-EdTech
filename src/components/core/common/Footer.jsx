import React from "react";
import StudyNotionLogo from "../../../assets/Logo/Logo-Full-Light.png";
import { PiFacebookLogoFill } from "react-icons/pi";
import {
  AiFillGoogleCircle,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";
import {FooterLink2} from "../../../data/footer-links";
import NavLinkSection from "./NavLinkSection";



const Footer = () => {
  return (
    <div className="bg-richblack-800 w-screen h-fit ">
      <div className="flex flex-col w-11/12 max-w-maxContent items-center gap-4 mx-auto pt-14">
        <div className="flex items-start  justify-between w-full text-richblack-300 mb-6">

                  {/* left part  */}
          <div className="w-50% flex items-start gap-12 ">
            {/* section-1  */}
            <div className="w-[174px] flex flex-col h-fit gap-2">
              <img src={StudyNotionLogo} alt="" />

              <div>
                <p className="font-semibold text-md text-richblack-25 mt-3">
                  Company
                </p>
                <ul className="text-base my-2 ">
                  <li>About</li>
                  <li className="mt-2">Career</li>
                  <li className="mt-2">Affiliates</li>
                </ul>
              </div>

              <div className="flex items-center w-full gap-3 text-richblack-300 text-[2rem]">
                <PiFacebookLogoFill />
                <AiFillGoogleCircle />
                <AiOutlineTwitter />
                <AiFillYoutube />
              </div>
            </div>

            {/* section-2  */}
            <div className="w-[172px] flex flex-col gap-4">
              <div>
                <p className="font-semibold text-md text-richblack-25 mt-2">
                  Resources
                </p>
                <ul className="text-base my-2 ">
                  <li className="mt-2">Articles</li>
                  <li className="mt-2">Blog</li>
                  <li className="mt-2">Chart Sheet</li>
                  <li className="mt-2">Code challenges</li>
                  <li className="mt-2">Docs</li>
                  <li className="mt-2">Projects</li>
                  <li className="mt-2">Videos</li>
                  <li className="mt-2">Workspaces</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-md text-richblack-25 mt-3">
                  Support
                </p>
                <ul className="text-base my-2 ">
                  <li>Help Center</li>
                </ul>
              </div>
            </div>

            {/* section-3 */}
            <div className="w-[172px] flex flex-col gap-4">
              <div>
                <p className="font-semibold text-md text-richblack-25 mt-2">
                Plans
                </p>
                <ul className="text-base my-2 ">
                  <li className="mt-2">Paid memberships</li>
                  <li className="mt-2">For students</li>
                  <li className="mt-2">Business solutions </li>
                  
                </ul>
              </div>

              <div>
                <p className="font-semibold text-md text-richblack-25 mt-3">
                Community
                </p>
                <ul className="text-base my-2 ">
                  <li className="mt-2">Forums </li>
                  <li className="mt-2">Chapters</li>
                  <li className="mt-2">Events</li>

                </ul>
              </div>
            </div>
          </div>

            {/* right part  */}
            <div className="w-50% h-fit flex items-start gap-12 pl-8 border-l border-l-richblack-700">
                  {
                   FooterLink2.map( (element , index) => {

                    return(
                      <NavLinkSection 
                      topic={element}
                      key={index}/>
                    )
                   })
                  }
            </div>

        </div>
 
             {/* bottom part  */}
        <div className="flex items-center justify-between w-full border-t border-t-richblack-700  py-2">
          <div className="flex items-center gap-2 text-base text-richblack-300">
            <p className="border-r border-r-richblack-700  pr-3">
              Privacy Policy
            </p>
            <p className="border-r border-r-richblack-700 px-3">
              Cookie Policy
            </p>
            <p className="pl-3">Terms</p>
          </div>

          <div className="text-base text-richblack-300">
            Made by Fuzail Ahmad @2023 StudyNotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
