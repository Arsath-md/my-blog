import axios from "axios"
import { useEffect,useState } from "react"
import toast,{Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function Addpost(){

const navi = useNavigate()

const [ addposts , setAddposts ] = useState({
    p_name : "",
    p_desc :"",
    p_content :"",
    p_img:null
})

const hdle=(e)=>{
    e.preventDefault();
    const { name, value ,files } = e.target;
    if(name === "p_img"){
        setAddposts((prev)=>({
            ...prev, p_img:files[0]
        }))
    }
    else{
    setAddposts((prev)=>({
        ...prev,[name]:value
    }))}
}

const adding = async (e)=>{
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("p_name",addposts.p_name)
    formdata.append("p_desc",addposts.p_desc)
    formdata.append("p_content",addposts.p_content)
    formdata.append("p_img",addposts.p_img)


    try{

        const responses = await axios.post(
        "http://localhost:3000/addposts",
            formdata
        ,
        { withCredentials:true })

        if (responses.status === 200) {
            toast.success("submitted")
            setAddposts({ p_name:"",p_desc:"",p_content:"",p_img:null })
            window.scrollTo({ top:0, behavior:'smooth' })
        }

    }catch(e){
        console.error("error in react addpost "+e)
    }
}

return(
<>
<div className="min-h-screen bg-gray-50 flex justify-center p-6">

<div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">

<Toaster/>

<h1 className="text-3xl font-bold mb-6 text-center">
Create Blog Post
</h1>

<form className="flex flex-col gap-6" onSubmit={adding}>

{/* IMAGE + TITLE */}
<div className="grid md:grid-cols-2 gap-6">

{/* Image upload */}
<label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl h-40 cursor-pointer hover:bg-gray-100 transition">
<span className="text-gray-600 font-medium">
Click to upload image
</span>
<input
type="file"
className="hidden"
accept="image/*"
name="p_img"
onChange={hdle}
/>
</label>

{/* Title + Description */}
<div className="flex flex-col gap-4">

<div>
<label className="font-semibold">
Blog Name
</label>
<input
type="text"
name="p_name"
className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
placeholder="Enter blog title"
value={addposts.p_name}
onChange={hdle}
/>
</div>

<div>
<label className="font-semibold">
Blog Description
</label>
<input
type="text"
name="p_desc"
className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
placeholder="Short description"
value={addposts.p_desc}
onChange={hdle}
/>
</div>

</div>
</div>

{/* CONTENT */}
<div className="flex flex-col gap-2">
<label className="font-semibold">
Post Content
</label>

<textarea
name="p_content"
placeholder="Write your post here..."
className="w-full min-h-[350px] ring-1 ring-gray-300 rounded p-4"
value={addposts.p_content}
onChange={hdle}
/>

</div>

{/* BUTTONS */}
<div className="flex justify-between mt-4">

<button
type="button"
onClick={()=>navi("/dashboard")}
className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
>
Back
</button>

<button
type="submit"
className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
>
Publish Post
</button>

</div>

</form>

</div>
</div>
</>
)
}