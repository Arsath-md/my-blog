import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast,Toaster} from "react-hot-toast";

export default function Auth() {

const navig = useNavigate();

const [isLogin,setIsLogin] = useState(true)

const [forms , setForms] = useState({
names:"",
email:"",
password:""
})

const [errors , setErrors] = useState({})

const hdle = (e)=>{
const {name,value} = e.target

setForms((prev)=>({
...prev,
[name]:value
}))
}


// validation
const validate = () => {

const newErrors = {}

if(!isLogin){
if(!forms.names.trim()){
newErrors.names = "Name is required"
}
}

if(!forms.email.trim()){
newErrors.email = "Email is required"
}
else if(!/\S+@\S+\.\S+/.test(forms.email)){
newErrors.email = "Enter valid email"
}

if(!forms.password){
newErrors.password = "Password required"
}
else if(!isLogin && forms.password.length < 6){
newErrors.password = "Minimum 6 characters"
}

setErrors(newErrors)

return Object.keys(newErrors).length === 0
}



const frmsbt = async(e)=>{
e.preventDefault()

if(!validate()) return

try{

const url = isLogin
? "http://localhost:3000/login"
: "http://localhost:3000/signup"

const reqs = await axios.post(url,{
names:forms.names,
email:forms.email,
password:forms.password
},{
withCredentials:true
})

if(reqs.data.msg){
navig("/dashboard")
}
if(reqs.data.msgs3){
    toast.success("account created")
    navig("/dashboard")
}

}
catch(err){
console.log(err)
}
}


return(
<div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-900 px-4">
    <Toaster/>

<h1 className="text-white text-3xl font-bold mb-6">
{isLogin ? "Login" : "Sign Up"}
</h1>


{/* toggle buttons */}

<div className="flex bg-white/20 rounded-lg mb-6 overflow-hidden">

<button
onClick={()=>setIsLogin(true)}
className={`px-6 py-2 font-semibold transition ${
isLogin ? "bg-white text-black" : "text-white"
}`}
>
Login
</button>

<button
onClick={()=>setIsLogin(false)}
className={`px-6 py-2 font-semibold transition ${
!isLogin ? "bg-white text-black" : "text-white"
}`}
>
Signup
</button>

</div>



<div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-5xl">

{/* image */}

<div className="hidden md:flex">
<img src="/Sign-up.png" className="w-80" alt="auth"/>
</div>



{/* form */}

<form onSubmit={frmsbt} className="flex flex-col gap-6 p-8 rounded-lg bg-white/20 backdrop-blur-md shadow-xl w-full max-w-md"
>

{/* name */}

{!isLogin && (
<div>
<input
type="text"
placeholder="Name"
name="names"
value={forms.names}
onChange={hdle}
className="p-2 rounded w-full"
/>

{errors.names && <p className="text-red-300 text-sm">{errors.names}</p>}
</div>
)}



{/* email */}

<div>
<input
type="email"
placeholder="Email"
name="email"
value={forms.email}
onChange={hdle}
className="p-2 rounded w-full"
/>

{errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
</div>



{/* password */}

<div>
<input
type="password"
placeholder="Password"
name="password"
value={forms.password}
onChange={hdle}
className="p-2 rounded w-full"
/>

{errors.password && <p className="text-red-300 text-sm">{errors.password}</p>}
</div>


{isLogin && (
<div className="text-center">
<span className="text-white font-semibold">
Forgot password
</span>
</div>
)}



<button
type="submit"
className="bg-white font-bold rounded-lg p-2 hover:bg-gray-200"
>
{isLogin ? "Login" : "Create Account"}
</button>

</form>

</div>

</div>
)
}