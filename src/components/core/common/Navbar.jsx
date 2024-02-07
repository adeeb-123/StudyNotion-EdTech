import React, { useEffect, useState } from 'react';
import { Link , matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../../data/navbar-links';
import  logo from "../../../assets/Logo/Logo-Full-Light.png";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropdown from '../Auth/ProfileDropdown';
import { apiConnector } from '../../../services/apiconnector';

import { categories } from '../../../services/apis';
import {IoIosArrowDown} from "react-icons/io"

// const subLinks = [
//     {
//         title:"Python",
//         link:"/catalog/python"
//     },
//     {
//         title:"Web Development",
//         link:"/catalog/web-development"
//     },
// ];


function Navbar(props){

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
   
    const [subLinks , setsubLinks] =  useState([]);
    const fetchSubLinks =  async() => {
        try{
           const result = await apiConnector("GET" , categories.CATEGORIES_API);
           
           setsubLinks(result.data.allCategories);
           
        }catch(error){
            console.log("Cannot get Catalog list")
        }
    }
    useEffect( () => {
          fetchSubLinks();
    }, [])
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route} ,location.pathname);
    }

    return(
        <div className='flex h-14 items-center justify-center border-b border-b-richblack-700'>
        <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>

         <Link to="/">
            <img src={logo} alt="logo" height={32} width={160} loading='lazy' />
         </Link>

         <nav>
            <ul className='text-richblack-25  flex gap-x-6'>
               {
               
                NavbarLinks.map((link ,index) => {
                    return(
                    <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            
                            <div className='flex items-center gap-2 group relative cursor-pointer'>
                                    <p >{link.title}</p>
                            <IoIosArrowDown className='mt-1'/>

                            <div className='invisible absolute left-[50%]
                            translate-x-[-50%] translate-y-[20%] top-[50%] flex flex-col rounded-md bg-richblack-5 pt-6 pb-2 px-1 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-20 '>

                                <div className='absolute top-[0] left-[50%] h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-25%] z-10 '></div>


                                {
                                    subLinks.length ? (
                                        subLinks.map( (subLink ,index) => (
                                             <Link to={`/catalog/${subLink?.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                      <p className='w-[90%] text-richblack-500 font-semibold py-2  mx-auto rounded-lg pl-1 z-20 hover:bg-richblack-50'>{subLink.name}</p>  
                                             </Link>
                                        ))
                                    ) : 
                                     (<div></div>)
                                }

                            </div>
                            </div>
                        ) : 
                        (
                            <Link to={link?.path} >
                              <p className={` ${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                              {link.title}
                                </p> 
                            </Link>
                        )
                    }
                  </li>
                    )
                })
               }
            </ul>
         </nav>

         {/* Login-signup-sisignout-dashboard */}

         <div className='flex items-center gap-x-4'>
            {
                user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/wihlist" className='relative'>
                          <AiOutlineShoppingCart fontSize={24} className='
                           text-richblack-25'/>
                          {
                            totalItems > 0 && (
                                <span className='text-richblack-700 bg-yellow-25 h-[20px] w-[20px] rounded-full text-center absolute -top-2 -left-3 flex items-center justify-center'>
                                    {totalItems}
                                </span>
                            )
                          }
                    </Link>
                )
            }
            {  token === null && (
                <Link to="/login">
                    <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                       Log  in
                    </button>
                </Link>
            )
            }
               { token === null && (
                <Link to="/signup">
                   <button
                   className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>
                      Sign Up
                    </button>
                </Link>
               )
            }
            {
             token !== null && <ProfileDropdown />
            }
            
         </div>
        </div>

        </div>
    )
}

export default Navbar;