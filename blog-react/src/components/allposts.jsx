import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import allpost from "../../public/test";
import axios from "axios";


export default function Allposts(){

            const [getdata, setGetdata ] = useState([])

            useEffect(()=>{
                                        const getsData = async () => {
                        try {
                        const resp = await axios.get("http://localhost:3000/allposts");
                        setGetdata(resp.data);
                        } catch (err) {
                        console.error(err);
                        }
                    };

                    getsData();
                    }, []);

    return(
        <>
                {
                    getdata.map((val)=>(
                     <div key={val.id} className="shadow-lg text-start grid grid-cols-1 ">
                        <div className="rounded mx-w-xs  shadow-none">
                            <img src={`http://localhost:3000/uploads/${val.img}`} alt="pic" className="w-full h-50 object-cover rounded" />
                        </div>
                        <header className="text-center">
                           <h1 className="font-bold text-2xl ">{val.p_name}</h1>
                        </header>
                        <div className="shadow-none text-center ">
                            <b><p>{val.p_desc}</p></b>
                        </div>
                        <div className="flex flex-row flex-wrap font-bold gap-3">
                            <h1>{val.create_at}</h1>
                            <h1>Author : {val.name}</h1>
                        </div>
                        <div className="font-bold text-end hover:underline ">
                        <Link to={`/post/${val.id}`} >view post</Link>
                        </div>
                     </div>
                    ))
                }
          

        </>
    )
}