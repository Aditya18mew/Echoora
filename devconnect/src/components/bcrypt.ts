import { FindOne, User } from "@/db"
import bcrypt from "bcrypt"
import { generatejwtToken } from "./jwttokens"




type formData={
    Email:string,
    Password:string
}

export async function bcryptData(formData:formData){
       try{
       const hashPassword=await bcrypt.hash(formData.Password,10)
        const newUser=new User({
        Authdetails:{
            Email:formData.Email,
            Password:hashPassword,
        }
       })
        await newUser.save()
     const {AccessToken,RefreshToken}= await generatejwtToken(formData.Email)
           return {AccessToken:AccessToken,RefreshToken:RefreshToken}
       }catch(err){
        console.log(err)
       }
}


export async function ComparePassword(formData:formData){
    try{
    const Currentuser=await FindOne(formData.Email)
    if(!Currentuser) return {type:"EmailError",Email:{isError:true,Errmessage:"no account with this email"}}
    const passwordMatch:boolean=await bcrypt.compare(formData.Password,Currentuser.Authdetails.Password)
    if(passwordMatch){
    const {AccessToken,RefreshToken}= await generatejwtToken(formData.Email)
      return {type:"Tokens",AccessToken:AccessToken,RefreshToken:RefreshToken}
    }else{
        return {type:"PasswordError",Password:{isError:true,Errmessage:"incorrect password"}}
    }
    }catch(err){
        console.log(err)
    }
}

