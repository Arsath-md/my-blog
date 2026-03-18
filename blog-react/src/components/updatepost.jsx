import axios from "axios"
import { useEffect,useState } from "react"
import toast,{Toaster} from "react-hot-toast"
import { useNavigate,useParams } from "react-router-dom"

export default function Updatepost(){

const {ids} = useParams()
const navi = useNavigate()

const [post,setPost] = useState({
    p_name:"",
    p_desc:"",
    p_content:""
})

const hdle=(e)=>{
    const {name,value} = e.target
    setPost(prev=>({
        ...prev,
        [name]:value
    }))
}

useEffect(()=>{

const getPost = async ()=>{
    try{
        const res = await axios.get(`http://localhost:3000/postbyid/${ids}`,{
            withCredentials:true
        })

        setPost(res.data)

    }catch(e){
        console.log(e)
    }
}

getPost()

},[ids])

//  updating the post function

const updating = async(e)=>{
    e.preventDefault()

    try{

        const res = await axios.put(
            `http://localhost:3000/updatepost/${ids}`,
            post,
            {withCredentials:true}
        )

        if(res.status === 200){
            toast.success("Post updated")
            navi("/dashboard")
        }

    }catch(e){
        console.log("erro in he update funtion"+e)
    }
}

return(
<>
<div className="min-h-screen bg-gray-50 flex justify-center p-6">

<div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">

<Toaster/>

<h1 className="text-3xl font-bold mb-6 text-center">
Update Blog Post
</h1>

<form className="flex flex-col gap-6" onSubmit={updating}>

<div className="grid md:grid-cols-2 gap-6">

<label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl h-40 cursor-pointer hover:bg-gray-100 transition">
<span className="text-gray-600 font-medium">
Change image
</span>
<input type="file" className="hidden" accept="image/*"/>
</label>

<div className="flex flex-col gap-4">

<div>
<label className="font-semibold">Blog Name</label>

<input
type="text"
name="p_name"
className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
value={post.p_name}
onChange={hdle}
/>

</div>

<div>
<label className="font-semibold">Description</label>

<input
type="text"
name="p_desc"
className="w-full ring-1 ring-gray-300 rounded p-2 mt-1"
value={post.p_desc}
onChange={hdle}
/>

</div>

</div>
</div>

<div className="flex flex-col gap-2">

<label className="font-semibold">Post Content</label>

<textarea
name="p_content"
className="w-full min-h-[350px] ring-1 ring-gray-300 rounded p-4"
value={post.p_content}
onChange={hdle}
/>

</div>

<div className="flex justify-between mt-4">

<button
type="button"
onClick={()=>navi("/dashboard")}
className="px-6 py-3 bg-gray-800 text-white rounded-lg"
>
Back
</button>

<button
type="submit"
className="px-6 py-3 bg-blue-600 text-white rounded-lg"
>
Update Post
</button>

</div>

</form>

</div>
</div>
</>
)
}