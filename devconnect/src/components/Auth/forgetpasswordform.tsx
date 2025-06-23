"use client"

import { useState } from "react"
import { validatemail } from "../regex"
import { ForgetPasswordaction } from "../Serveraction"
import { useRouter } from "next/navigation"
import { Spinnerinsidebutton } from "../Buttons"






type Error={
  isError:boolean,
  Errmessage:string
}
type Apiresponse={
  success:true,
  message:string
} | {
  success:false,
  Error:{
    isError:boolean,
    Errmessage:string
  }
}



export function ForgetpasswordForm(){
  const router=useRouter()
 
  const [email,setemail]=useState("")
  const [error,seterror]=useState({
    isError:false,
    Errmessage:"Email is required"
  })
  const [isloading,setisloading]=useState(false)
 
  function handlechange(e:React.ChangeEvent<HTMLInputElement>){
    const {value}=e.target
    seterror(prev=>({...prev,isError:false}))
    setemail(value)
  }
  async function handlesubmit(e:React.FormEvent<HTMLFormElement>){
     e.preventDefault()
      setisloading(true)
     const newerror:Error={
          isError:email.trim()==="" || !(validatemail(email)),
          Errmessage:!validatemail(email) ? "invalid Email": "Email is required"
     }

     seterror(newerror)
     if(error.isError){
      setemail("")
       setisloading(false)
      return;
     }

     try{
    const res:Apiresponse=await ForgetPasswordaction(email)
    if(!res.success){
      seterror(res.Error)
        setemail("")
       setisloading(false)
    }
     router.push(`/forgetpassword/reset?email=${encodeURIComponent(email)}`)
  
     }catch(err){
      console.log(err)
     }finally{
       setisloading(false)
     }
  }




return (
    <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className={error.isError? "forminput forminput-error":"forminput forminput-noerror"} type="text" placeholder={error.isError? error.Errmessage:"Email"} name="Email" value={email} onChange={handlechange} />
       </div>
       <div><button type="submit"  className="formbutton">{isloading? <Spinnerinsidebutton></Spinnerinsidebutton>:"Continue"}</button></div>
    </form>
)
}

