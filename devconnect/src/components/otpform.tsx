"use client"

import { useState } from "react"
import { validateotp } from "./regex"
import { VerifyEmail } from "./Serveraction"

export function OtpForm({Email}:{Email:string | undefined}){
 const [otp,setotp]=useState("")
 const [error,seterror]=useState({
    isError:false,
    Errmessage:"Enter otp"
 })

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

    const newerror={
        isError:!validateotp(otp),
        Errmessage:!validateotp(otp) ? "Incorrect OTP" : "Enter 6-digit"
    }

    seterror(newerror)
    if(newerror.isError){
        setotp("")
        return;
    }

    try{
    const res=await VerifyEmail(Email,otp)
    if(res.success){
      setotp("")
    }
    }catch(err){
        console.log(err)
    }
    
 }


return <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
    <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className={error.isError ? "forminput forminput-error":"forminput forminput-noerror"} type="text" inputMode="numeric" maxLength={6} name="otp" value={otp} onChange={handlechange} placeholder={error.isError ? error.Errmessage:"Enter 6-digit"} />
       </div>
     <div><button type="submit"  className="formbutton">Continue</button></div>
</form>
}