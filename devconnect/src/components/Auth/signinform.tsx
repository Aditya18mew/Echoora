"use client"
import Link from "next/link"
import { useState } from "react"
import {Signinaction, SigninfromGoogle } from "../Serveraction"
import { validatemail,validatepassword } from "../regex"
import { Spinnerinsidebutton } from "../Buttons"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"







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
  const router=useRouter()
  const {data:session}=useSession()
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
   const [isloading,setisloading]=useState(false)
  
  
  
   function handlechange(e:React.ChangeEvent<HTMLInputElement>){
       const {name,value}=e.target
       seterrors(prev=>({...prev,[name]:{isError:false}}))
       setformData({...formData,[name]:value})
   }

    if(session){
         googlesignup()
      }
      async function googlesignup(){
        try{
          const res=await SigninfromGoogle(session?.user?.email,session?.user?.name,session?.user?.image)
          if(res.success){
            router.push("/dashboard")
          }
        }catch(err){
           console.log(err)
        }
      }
  
  async function handlesubmit(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      setisloading(true)
       const newerror:Errors={
            Email:{
              isError:formData.Email.trim()==="" || !(validatemail(formData.Email)),
              Errmessage:!validatemail(formData.Email) ? "invalid Email" : "Email is required"
            },
            Password:{
              isError:formData.Password.trim()==="" || !(validatepassword(formData.Password)),
              Errmessage:!validatepassword(formData.Password) ? "" : "Password is required"
            }}
        seterrors(newerror)
       if(newerror.Email.isError || newerror.Password.isError){
      if(newerror.Email.isError)  setformData(prev=>({...prev,Email:""}))
      if(newerror.Password.isError)  setformData(prev=>({...prev,Password:""}))
      setisloading(false)
      return;
    }
  try{
   const res=await Signinaction(formData)
  if(!res.success){
    if(res.Error && (res.Error.type==="PasswordError" || res.Error.type==="Error") ) {
     seterrors(prev=>({...prev,Password:res.Error.Password}))
     setformData(prev=>({...prev,Password:""}))}
    if(res.Error && res.Error.type==="EmailError"){ 
      seterrors(prev=>({...prev,Email:res.Error.Email}))
       setformData(prev=>({...prev,Email:""}))
    }
    setisloading(false)
    return
  }
  if(res.success)
    router.push("/dashboard")
  }catch(err){
    console.log(err)
  }finally{
    setisloading(false)
  }
  }
  





return (
    <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
      <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
        <input className={errors.Email.isError? "forminput forminput-error":"forminput forminput-noerror"} type="text" placeholder={errors.Email.isError? errors.Email.Errmessage:"Email"} name="Email"  value={formData.Email} onChange={handlechange}/>
        <input className={errors.Password.isError? "forminput forminput-error":"forminput forminput-noerror"} autoComplete="false" type="password" placeholder={errors.Password.isError? errors.Password.Errmessage:"Password"} name="Password" value={formData.Password} onChange={handlechange} />
      </div>
        <Link className="formlink" href="/forgetpassword">Forget password?</Link>
        <div><button type="submit" className="formbutton">{isloading? <Spinnerinsidebutton></Spinnerinsidebutton>:"Continue"}</button></div>
    </form>
)
    
}