"use client"
import { useState } from "react"
import { Signupaction } from "../../libs/Serveraction"
import { validatemail,validatepassword } from "../../utils/regex"
import { useRouter } from "next/navigation"
import { Spinnerinsidebutton } from "../Buttons"



type Errors={
  Fullname:{
    isError:boolean,
    Errmessage:string
  },
  Email:{
    isError:boolean,
    Errmessage:string
  },
  Password:{
    isError:boolean,
    Errmessage:string
  }
}
type Apiresponse={
  success:false,
  error:{
    isError:boolean,
    Errmessage:string}
  } | {
    success:true
  }


export function SignupForm(){
  const router=useRouter()

const [formData,setformData]=useState({
  Fullname:"",
  Email:"",
  Password:""
})
 const [errors,seterrors]=useState({
   Fullname:{
    isError:false,
    Errmessage:"Full Name is required"
  },
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

async function handlesubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
     setisloading(true)
    const newerror:Errors={
      Fullname:{
       isError:formData.Fullname.trim()==="",
       Errmessage:"Full Name is required"
      },
      Email:{
        isError:formData.Email.trim()==="" || !(validatemail(formData.Email)),
        Errmessage:!validatemail(formData.Email) ? "invalid Email" : "Email is required"
      },
      Password:{
        isError:formData.Password.trim()==="" || !(validatepassword(formData.Password)),
        Errmessage:!validatepassword(formData.Password) ? "8 characters with 1 alphabet and 1 digit" : "Password is required"
      }}
      seterrors(newerror)
    if(newerror.Email.isError || newerror.Password.isError || newerror.Fullname.isError){
      if(newerror.Email.isError)  setformData(prev=>({...prev,Email:""}))
      if(newerror.Password.isError)  setformData(prev=>({...prev,Password:""}))
      if(newerror.Fullname.isError)  setformData(prev=>({...prev,Fullname:""})) 
        setisloading(false)
      return;
    }

try{
  const res:Apiresponse= await Signupaction(formData)
  if(!res.success){
    seterrors(prev=>({...prev,Email:res.error}))
     setformData(prev=>({...prev,Email:""}))
     setisloading(false)
     return
  }
  router.push(`/sign-up/verifyemail?email=${encodeURIComponent(formData.Email)}`)
}catch(err){
  console.log(err)
}finally{
  setisloading(false)
}
}



return (
 
    <form onSubmit={handlesubmit} className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-4">
         <input type="text" className={errors.Fullname.isError ? "forminput forminput-error":"forminput forminput-noerror"} placeholder={errors.Fullname.isError ? errors.Fullname.Errmessage:"Full Name"} name="Fullname" value={formData.Fullname} onChange={handlechange} />
         <input className={errors.Email.isError? "forminput forminput-error":"forminput forminput-noerror"} type="email" placeholder={errors.Email.isError? errors.Email.Errmessage:"Email"} name="Email"  value={formData.Email} onChange={handlechange}/>
        <input className={errors.Password.isError? "forminput forminput-error":"forminput forminput-noerror"} autoComplete="false" type="password" placeholder={errors.Password.isError? errors.Password.Errmessage:"Create password"} name="Password" value={formData.Password} onChange={handlechange} />
       </div>
       <div><button type="submit" className="formbutton">{isloading? <Spinnerinsidebutton></Spinnerinsidebutton>:"Continue"}</button></div>
    </form>
)
}