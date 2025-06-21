import axios from "axios"


type formData={
 Email:string,
  Password:string
}



export async function Signupaction(formData:formData){
    try{
    const response=await axios.post("http://localhost:3000/api/sign-up",{Authdetails:formData})
    return response.data
    }catch(err){
   console.log(err)
    }
}
export async function Signinaction(formData:formData){
    try{
    const response=await axios.post("http://localhost:3000/api/sign-in",{Authdetails:formData},{withCredentials:true})
    return response.data
    }catch(err){
   console.log(err)
    }
}
export async function ForgetPasswordaction(Email:string){
    try{
    const response=await axios.post("http://localhost:3000/api/forgetpassword",{Email:Email})
    return response.data
    }catch(err){
   console.log(err)
    }
}
export async function Logoutaction(Email:string | undefined){
    try{
    const response=await axios.post("http://localhost:3000/api/logout",{Email:Email})
    return response.data
    }catch(err){
   console.log(err)
    }
}

export async function VerifyEmailaction(Email:string | undefined,otp:string){
     try{
    const response=await axios.post("http://localhost:3000/api/sign-up/verifyemail",{Email:Email,otp:otp},{withCredentials:true})
       return response.data
    }catch(err){
   console.log(err)
    }
}

export async function VerifyforResetaction(Email:string | undefined,otp:string){
    try{
    const response=await axios.post("http://localhost:3000/api/forgetpassword/verifyemail",{Email:Email,otp:otp})
    return response.data
    }catch(err){
   console.log(err)
    }
}
export async function ResetPasswordaction(Email:string | undefined ,newpassword:{newpass:string,confirmnewpass:string}){
    try{
    const response=await axios.post("http://localhost:3000/api/forgetpassword/verifyemail/reset",{Email:Email,Newpassword:newpassword})
    return response.data
    }catch(err){
   console.log(err)
    }
}
type data=string | null | undefined

export async function SigninfromGoogle(Email:data,name:data,Image:data){
     try{
    const response=await axios.post("http://localhost:3000/api/auth/set-cookie",{Email:Email,Name:name,Image:Image})
    return response.data
    }catch(err){
   console.log(err)
    }
}

export async function UpdateSocialLinks(Email:string | undefined,Instagram:string | undefined,Github:string | undefined,Linkedin:string | undefined){
    try{
    const response=await axios.post("http://localhost:3000/api/dashboard/updateprofilelinks",{Email:Email,Instagram:Instagram,Github:Github,Linkedin:Linkedin})
    return response.data
    }catch(err){
        console.log(err)
    }
}

