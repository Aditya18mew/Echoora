"use client"

import React, { useState } from "react"
import { validatepassword } from "../regex"
import { ResetPasswordaction } from "../Serveraction"
import { useRouter } from "next/navigation"
import { Spinnerinsidebutton } from "../Buttons"




export  function ResetPasswordForm({Email}:{Email:string | undefined}){
    const router=useRouter()
 const [newpassword,setnewpassword]=useState({
    newpass:"",
    confirmnewpass:""
 })
 const [error,seterror]=useState({
    newpass:{
        isError:false,
        Errmessage:"Password is required"
    },
    confirmnewpass:{
        isError:false,
        Errmessage:"password is required"
    }
 })
  const [isloading,setisloading]=useState(false)

 function handlechange(e:React.ChangeEvent<HTMLInputElement>){
    const {name,value}=e.target
    seterror({
         newpass:{
        isError:false,
        Errmessage:"Password is required"
    },
    confirmnewpass:{
        isError:false,
        Errmessage:"password is required"
    }
    })
   setnewpassword({...newpassword,[name]:value})
 }

 async function handlesubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setisloading(true)
    const newerror={
        newpass:{
            isError:!validatepassword(newpassword.newpass) ,
            Errmessage: !validatepassword(newpassword.newpass) ? "8 characters with 1 alphabet and 1 digit" : "Password is required"
        },
        confirmnewpass:{
            isError:!validatepassword(newpassword.confirmnewpass) || newpassword.confirmnewpass!==newpassword.newpass,
            Errmessage: !validatepassword(newpassword.newpass) ? "8 characters with 1 alphabet and 1 digit" : newpassword.confirmnewpass!==newpassword.newpass ? "password did not match" : "Password is required"
        }
    }
    seterror(newerror)
    if(newerror.newpass.isError || newerror.confirmnewpass.isError){
      if(newerror.newpass.isError)  setnewpassword(prev=>({...prev,newpass:""}))
      if(newerror.confirmnewpass.isError)  setnewpassword(prev=>({...prev,confirmnewpass:""}))
        setisloading(false)
      return;
    }
    
    try{
   const res=await ResetPasswordaction(Email,newpassword)
     if(!res.success){
        seterror(prev=>({...prev,confirmnewpass:res.Error}))
         setnewpassword(prev=>({...prev,confirmnewpass:""}))
        setisloading(false)
     }
   router.replace("/sign-in")
    }catch(err){
        console.log(err)
    }finally{
        setisloading(false)
    }
 }

return (
    <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className={error.newpass.isError? "forminput forminput-error":"forminput forminput-noerror"} autoComplete="false" type="password" placeholder={error.newpass.isError? error.newpass.Errmessage:"new password"} name="newpass"  value={newpassword.newpass} onChange={handlechange}/>
        <input className={error.confirmnewpass.isError? "forminput forminput-error":"forminput forminput-noerror"} type="password" autoComplete="false" placeholder={error.confirmnewpass.isError? error.confirmnewpass.Errmessage:"Confirm new password"} name="confirmnewpass" value={newpassword.confirmnewpass} onChange={handlechange} />
       </div>
       <div><button type="submit" className="formbutton">{isloading? <Spinnerinsidebutton></Spinnerinsidebutton>:"Continue"}</button></div>
    </form>
)

}