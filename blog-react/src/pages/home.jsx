import { useState } from "react"
import { ReactTyped } from "react-typed"
import { Link } from "react-router-dom"
import Navigates from "../components/navigation"
import Allposts from "../components/allposts"
import { HiUserGroup } from "react-icons/hi"
import { FaUserEdit, FaUserNinja } from "react-icons/fa"

export default function Home(){

    const [show,setShow] = useState(false)                  
    return(
        <>
        <div className="w-full relative">

                                    {/* the burger window for mobile view */}
                            <div className={`absolute top-16 rounded left-0 h-full w-64 bg-black/80 backdrop-blur-md text-white shadow-2xl p-6 flex flex-col gap-6 transform transition-transform duration-500 md:hidden ${show ? "translate-x-0" : "-translate-x-full"}`}>                            
                                 <div className="flex flex-row justify-between items-center">
                                   <h1 className="font-bold text-2xl ">Dashboard</h1>
                                 </div>

                                <div className="flex flex-col justify-center m-5 gap-7 text-xl ">

                                  <li className="flex flex-row justify-center items-center gap-3"><FaUserEdit/><Link className="active:underline" to={"/dasboard"}>Account</Link></li>


                                   <li className="flex flex-row justify-center items-center gap-3"><HiUserGroup/><Link>Bloggers</Link></li>

                                  

                                </div>

                            </div>
                            {/* the burger window for mobile view */}

            <div>
                <Navigates setShow={setShow} show={show} />
            </div>

            {/* hero section */}
            <div className = " flex flex-col md:flex-row justify-evenly items-center p-4 gap-6 ">

                    <img src="genx.gif" alt="the genz style" className="w-60 sm:w-72 md:w-80 lg:w-96"/>

                    <div className="font-bold text-2xl sm:text-3xl flex flex-col gap-3">

                        <h1
                        className="text-center p-4 text-4xl sm:text-5xl font-bold"
                        style={{fontFamily:"cursive"}}
                        >
                        My Blogs
                        </h1>

                        <div className="p-1">
                            <h1 className="text-center">{""}</h1>

                            <div className="text-center">
                            <ReactTyped
                                strings={["Your's Own private space ","Your's Own Blog"]}
                                typeSpeed={70}
                                backSpeed={70}
                                loop
                            />
                            </div>
                        </div>

                        {/* search */}
                        <div className="flex justify-center">
                            <input
                            type="text"
                            placeholder="Search for Blogs"
                            className="my-3 p-3 border-b focus:outline-none w-64 sm:w-80 md:w-96"
                            />
                        </div>

                    </div>
            </div>

            {/* posts section */}
            <div>

                <h1 className="text-center p-6 text-3xl sm:text-4xl font-bold" style={{fontFamily:"revert"}}>
                Featured
                </h1>

                <div className="flex flex-wrap text-center gap-4 justify-center sm:justify-evenly m-2 post-custom">

                    <Allposts/>

                </div>

            </div>

        </div>
        </>
    )
}