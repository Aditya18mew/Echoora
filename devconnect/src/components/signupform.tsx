"use client"
import { Signupaction } from "@/Serveractions/signupaction"
import { useState } from "react"




export function SignupForm(){

const [formData,setformData]=useState({
  Email:"",
  Password:""
})
/* const [error,seterror]=useState({
  isError:false,
  Errormessage:""
}) */

 function handlechange(e){
     const {name,value}=e.target
     setformData({...formData,[name]:value})
 }

async function handlesubmit(e){
    e.preventDefault()
try{
 await Signupaction(formData)
}catch(err){
  console.log(err)
}
}



return (
 
    <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className="forminput" type="text" placeholder="Email" name="Email"  value={formData.Email} onChange={handlechange}/>
        <input className="forminput" type="password" placeholder="Password" name="Password" value={formData.Password} onChange={handlechange} />
       </div>
       <div><button type="submit" className="formbutton">Continue</button></div>
    </form>
)
    
}