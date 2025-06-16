"use client"

import { useState } from "react"
import { validateotp } from "../regex"
import { useRouter } from "next/navigation"
import { Logoutaction } from "../Serveraction"
import { VerifyEmailaction } from "@/components/Serveraction"
import { Spinnerinsidebutton } from "../Buttons"



type ApiResponse={
  success:true,
  data:{
    AccessToken:string,
    RefreshToken:string
  } } | {
   success:false,
  Error:{
    isError:boolean,
    Errmessage:string
  }
}





export function OtpForm({Email}:{Email:string | undefined}){
  const router=useRouter()
 const [otp,setotp]=useState("")
 const [error,seterror]=useState({
    isError:false,
    Errmessage:"Enter otp"
 })
   const [isloading,setisloading]=useState(false)

 function handlechange(e){
   const {value}=e.target
   seterror({
    isError:false,
    Errmessage:"Enter otp"
 })
   setotp(value)
 }

 async function handlesubmit(e){
    e.preventDefault()
     setisloading(true)
    const newerror={
        isError:!validateotp(otp),
        Errmessage:!validateotp(otp) ? "Incorrect OTP" : "Enter 6-digit"
    }

    seterror(newerror)
    if(newerror.isError){
        setotp("")
        setisloading(false)
        return;
    }

    try{
    const res:ApiResponse=await VerifyEmailaction(Email,otp)
    setotp("")
    if(!res.success){
    seterror(res.Error)
    setisloading(false)
    }
     await Logoutaction(Email)
      {/* do something later*/}
    }catch(err){
        console.log(err)
    }finally{
      setisloading(false)
    }
    
 }


return <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
    <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className={error.isError ? "forminput forminput-error":"forminput forminput-noerror"} type="text" inputMode="numeric" maxLength={6} name="otp" value={otp} onChange={handlechange} placeholder={error.isError ? error.Errmessage:"Enter 6-digit"} />
       </div>
     <div><button type="submit"  className="formbutton">{isloading? <Spinnerinsidebutton></Spinnerinsidebutton>:"Continue"}</button></div>
</form>
}