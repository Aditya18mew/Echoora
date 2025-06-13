"use client"
import Link from "next/link"
import { useState } from "react"
import { Signinaction } from "./Serveraction"

type Errors={
  Email:{
    isError:boolean,
    Errmessage:string
  },
  Password:{
    isError:boolean,
    Errmessage:string
  }
}






export function SigninForm(){

  const [formData,setformData]=useState({
    Email:"",
    Password:""
  })
   const [errors,seterrors]=useState({
      Email:{
      isError:false,
      Errmessage:"Email is required"
    },
    Password:{
      isError:false,
      Errmessage:"Password is required"
    }
   })
  
  
  
   function handlechange(e){
       const {name,value}=e.target
       seterrors(prev=>({...prev,[name]:{isError:false}}))
       setformData({...formData,[name]:value})
   }
  
  async function handlesubmit(e){
      e.preventDefault()
      const newerror:Errors={
        Email:{
          isError:formData.Email.trim()==="",
          Errmessage:"Email is required"
        },
        Password:{
          isError:formData.Password.trim()==="",
          Errmessage:"Password is required"
        }}
        seterrors(newerror)
       if(newerror.Email.isError || newerror.Password.isError) return
  try{
   const res=await Signinaction(formData)
    console.log(res)
  }catch(err){
    console.log(err)
  }
  }
  





return (
    <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
      <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
        <input className={errors.Email.isError? "forminput forminput-error":"forminput forminput-noerror"} type="text" placeholder={errors.Email.isError? errors.Email.Errmessage:"Email"} name="Email"  value={formData.Email} onChange={handlechange}/>
        <input className={errors.Password.isError? "forminput forminput-error":"forminput forminput-noerror"} type="password" placeholder={errors.Password.isError? errors.Password.Errmessage:"Password"} name="Password" value={formData.Password} onChange={handlechange} />
      </div>
        <Link className="formlink" href="/forgetpassword">Forget password?</Link>
        <div><button type="submit" className="formbutton">Continue</button></div>
    </form>
)
    
}