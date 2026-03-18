import axios from "axios"
import { useState , useEffect} from "react" 
import { useParams ,useNavigate} from "react-router-dom"

export default function Singlepost(){
    const navi = useNavigate();
    const {id} = useParams();
    const [singleposts , setSinglepost] = useState({})

    useEffect(()=>{
        const sglpost =async()=>{
            try{
            const responses = await axios.get(`http://localhost:3000/post/${id}`,{
                withCredentials:true
            })
            if(responses.status === 200){
                console.log(responses.data)
                console.log("have a break");
                setSinglepost(responses.data)
            }
        }
        catch(e){
             console.error("there is a error in the post..."+e)}
        }
           sglpost();
    },[id])

    return(
        <>
        <div className="min-h-screen bg-gray-50 flex justify-center p-4">

            <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-6 md:p-10 flex flex-col gap-6">
                <div className="w-fit ">
            <h1 className="text-xl rounded ring-2 p-1 my-1 text-center"><button type="button" onClick={()=>navi("/")}className="font-bold text-lg">Back</button></h1>
                </div>
                {/* Blog Title */}
                <h1 className="text-center font-bold text-3xl md:text-5xl leading-tight">
                    {singleposts.p_name}
                </h1>

                {/* Blog Description */}
                <h2 className="text-center text-gray-600 text-lg md:text-xl">
                    {singleposts.p_desc}
                </h2>

                {/* Image */}
                <div className="flex justify-center">
                    <img
                    src={`http://localhost:3000/uploads/${singleposts.img}`}
                    alt="a genx"
                    className="rounded-lg w-full max-h-[420px] object-cover shadow-md"
                    />
                </div>

                {/* Blog Content */}
                <div className="text-gray-800 text-lg leading-relaxed space-y-4 text-justify">

                    <p>
                        {singleposts.p_content}
                    </p>

                 

                </div>

            </div>

        </div>
        </>
    )
}