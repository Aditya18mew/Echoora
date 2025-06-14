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
    const response=await axios.post("http://localhost:3000/api/sign-in",{Authdetails:formData})
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
export async function Logoutaction(Email:string){
    try{
    const response=await axios.post("http://localhost:3000/api/logout",{Email:Email})
    return response.data
    }catch(err){
   console.log(err)
    }
}

