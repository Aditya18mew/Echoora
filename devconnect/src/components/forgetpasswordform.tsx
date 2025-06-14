"use client"

import { useState } from "react"
import { validatemail } from "./regex"
import { ForgetPasswordaction } from "./Serveraction"

type Error={
  isError:boolean,
  Errmessage:string
}



export function ForgetpasswordForm(){
  const [email,setemail]=useState("")
  const [error,seterror]=useState({
    isError:false,
    Errmessage:"Email is required"
  })
 
  function handlechange(e){
    const {value}=e.target
    seterror(prev=>({...prev,isError:false}))
    setemail(value)
  }
  async function handlesubmit(e){
     e.preventDefault()

     const newerror:Error={
          isError:email.trim()==="" || !(validatemail(email)),
          Errmessage:!validatemail(email) ? "invalid Email": "Email is required"
     }

     seterror(newerror)
     if(error.isError){
      setemail("")
      return;
     }

     try{
    const res=await ForgetPasswordaction(email)
     }catch(err){
      console.log(err)
     }
  }




return (
    <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className={error.isError? "forminput forminput-error":"forminput forminput-noerror"} type="text" placeholder={error.isError? error.Errmessage:"Email"} name="Email" value={email} onChange={handlechange} />
       </div>
       <div><button type="submit"  className="formbutton">Continue</button></div>
    </form>
)
}

