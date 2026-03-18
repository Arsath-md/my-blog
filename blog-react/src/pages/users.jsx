import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FaRegUserCircle } from "react-icons/fa"

export default function Users(){
    const navi = useNavigate();
    const [users , setUsers] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(()=>{

        const usersdata = async () => {
            try{
                const response = await axios.get(
                    "http://localhost:3000/allusers",
                    { withCredentials:true }
                )

                if(response.status === 200){
                    setUsers(response.data)
                }

            }catch(e){
                console.log("error in users.jsx", e)
            }finally{
                setLoading(false)
            }
        }

        usersdata()

    },[])


    if(loading){
        return(
            <div className="flex justify-center items-center h-screen text-3xl font-bold">
                Loading users...
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <button className="text-start ring rounded bg-black/70 text-bold text-white text-xl p-2 shadow-lg active:shadow-inner"  onClick={()=>navi("/")}>Back</button>
            <h1 className="text-4xl font-bold text-center mb-10">
                Users List
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

                {users.length === 0 && (
                    <p className="text-center col-span-full text-xl">
                        No users found
                    </p>
                )}

                {users.map((val)=>(
                    <div 
                        key={val.id}
                        className= " bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 transition   transform hover:-translate-y-2 hover:shadow-xl ">

                        <FaRegUserCircle className=" text-6xl text-blue-500 "/>

                        <h2 className="text-xl font-bold ">
                             {val.name}
                        </h2>

                        <div className="flex gap-4 text-gray-600">
                            <span className="font-semibold">
                                Posts:
                            </span>
                            <span className="font-bold text-black">
                                {val.post_count}
                            </span>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}