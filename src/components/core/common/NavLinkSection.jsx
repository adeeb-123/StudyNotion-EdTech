import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinkSection = ({topic}) => {
  return (
    <div className='w-[174px] flex flex-col h-fit gap-2'>
           <p className="font-semibold text-md text-richblack-25 mt-2">{topic.title}</p>

           <div>
            {
                topic.links.map((element , index) => {

                    return(
                        <NavLink to={element.link} > 
                            <p className="mt-2 text-richblack-300 ">{element.title}</p>
                        </NavLink>
                    )
                })
            }
           </div>
    </div>
  )
}

export default NavLinkSection