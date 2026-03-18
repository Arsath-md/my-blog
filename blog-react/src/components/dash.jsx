import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import {  HiViewGridAdd } from "react-icons/hi"
import allpost from "../../public/test"
import { MdLogout } from "react-icons/md"

export default function Dash() {

  const [dtm, setDtm] = useState([])
  const navi = useNavigate()

  // fetch all posts
  useEffect(() => {
    const getter = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/dash", {
          withCredentials: true
        })

        if (resp.data) {
          console.log("data are done")
          setDtm(Array.isArray(resp.data) ? resp.data : [])
        }

      } catch (e) {
        navi("/login")
         }
    }

    getter()
  }, [])


  // delete post
  const dltpost = async (id) => {
    try {

      const dltposts = await axios.delete(
        `http://localhost:3000/deletepost/${id}`,
        { withCredentials: true }
      )

      if (dltposts.status === 200) {
        console.log(dltposts.data)

        setDtm(prev =>
          prev.filter(post => post.id !== id)
        )

        toast.error("deleted successfully")
      }

    } catch (e) {
      console.log("error in delete post " + e)
    }
  }

//   logout the session
  const logout =async()=>{
     try{
        const out = await axios.post("http://localhost:3000/logout",{
            withCredentials:true
        }
)
        navi("/login")

     }catch(e){
        console.log("there is a error in logout");
        
     }
  }

  return (
    <>
      <div className="flex flex-col gap-3 relative">

        {/* header */}
        <div className="font-bold text-center text-4xl flex flex-row justify-between p-1 fixed bg-blue-100 w-full ">

          <h1 className="text-xl rounded border p-1 text-center">
            <button type="button" onClick={() => navi("/")}>
              Back
            </button>
          </h1>

          <h1>Your posts</h1>
        <button type="button" onClick={logout}><MdLogout/></button>
        </div>


        <Toaster />


        {/* add post button */}
        <div className="border-4 rounded-full w-12 h-12 shadow-lg active:shadow-inner active:shadow-black fixed right-5 p-7 bottom-10 flex justify-center items-center">

          <button
            type="button"
            onClick={() => navi("/addpost")}
          >
            <HiViewGridAdd size={40} color="green" />
          </button>

        </div>


        {/* posts grid */}
        <div className="grid mt-12 md:grid-cols-3 ">

          {dtm.map((val) => (

            <div
              key={val.id}
              className="shadow-lg text-start p-3 grid grid-cols-1 rounded"
            >

              {/* image */}
              <div className="rounded mx-w-xs shadow-none">

                {allpost.map((values, ko) => (
                  <img
                    key={ko}
                    src={`http://localhost:3000/uploads/${val.img}`}
                    alt="pic"
                    className="w-full h-50 object-cover rounded active:bg-green-600"

                  />
                ))}

              </div>


              {/* title */}
              <header className="text-center">
                <h1 className="font-bold text-2xl">
                  {val.p_name}
                </h1>
              </header>


              {/* description */}
              <div className="shadow-none font-semibold text-center">
                <p>description: {val.p_desc}</p>
              </div>


              {/* content */}
              <div className="flex flex-row flex-wrap justify-around font-bold gap-1">
                <h1>content : {val.p_content}</h1>
                <h1>{val.create_at}</h1>
              </div>


              {/* actions */}
              <div className="flex flex-row justify-around font-bold my-3 btn-posts">

                <button>
                  <Link to={`/postbyid/${val.id}`}>
                    Edit
                  </Link>
                </button>

                <button
                  type="button"
                  onClick={() => dltpost(val.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  )
}