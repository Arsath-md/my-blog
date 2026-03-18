import { useState } from "react";
import { FaUserAstronaut, FaUserCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { HiMenu, HiUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";


export default function Navigates({setShow, show}){
    

    return(

        <>
         <nav className="flex flex-row justify-between p-2 m-1 rounded shadow-lg">
                    
                     <div className="hidden md:flex list-arng  nav-item md:justify-start">
                            <li><HiUserGroup size={30} className="text-yellow-600 hover:text-white"/><Link to={"/allusers"}>Bloggers</Link></li>
                            <li></li>
                        </div>
                        <button onClick={()=>setShow((prev)=>!prev)} className="text-3xl md:hidden">
                                {show ? <FiX/> : <HiMenu/>}
                          </button>
                  

                         <h1 className="font-bold text-2xl md:text-center mx-auto">My blogs </h1>

                           <div className="text-center ">
                            <div className="rounded-full ring w-11 h-11 flex items-center justify-center">
                                <Link to="/dashboard">
                                <FaUserCircle size={30} />
                                </Link>
                            </div>
                            </div>
                       
               </nav>
        </>
    )
}