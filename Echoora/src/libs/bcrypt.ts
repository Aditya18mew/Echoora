import { FindOne, User } from "@/db"
import bcrypt from "bcrypt"

import { SignupMailotp } from "./nodemailer"
import { randomInt } from "crypto"
import { generatejwtToken } from "./jwttokens"








type formData={
     Fullname:string
    Email:string,
    Password:string
}

type MailtopResponse={
    success:boolean,
    response:string,
} | undefined

export async function bcryptData(formData:formData){
       try{
       const hashPassword=await bcrypt.hash(formData.Password,10)
       const otp=randomInt(100000,999999).toString()

        const newUser=new User({
        Authdetails:{
            Email:formData.Email,
            username:formData.Email.slice(0,6) + randomInt(100,999).toString(),
            Password:hashPassword,
            Otp:otp
        },
        Biodetails:{
           name:formData.Fullname
        }
       })
        await newUser.save()
        const res:MailtopResponse= await SignupMailotp(formData.Email,otp)
         if(typeof res !=="undefined"){
            return   {success:res.success}
         }
       }catch(err){
        console.log(err)
       }
}


export async function ComparePassword(formData:formData){
    try{
    const Currentuser=await FindOne(formData.Email)
    if(!Currentuser) return {what:"EmailError",Email:{isError:true,Errmessage:"no account with this email"}}
    if(Currentuser.Authdetails.isVerified===false) return {what:"unverified",Email:{isError:true,Errmessage:"sign-up first"}}
    const passwordMatch:boolean=await bcrypt.compare(formData.Password,Currentuser.Authdetails.Password)
    if(passwordMatch){
    const {AccessToken,RefreshToken}= await generatejwtToken(formData.Email)
      return {what:"Tokens",AccessToken:AccessToken,RefreshToken:RefreshToken}
    }else{
        return {what:"PasswordError",Password:{isError:true,Errmessage:"incorrect password"}}
    }
    }catch(err){
        console.log(err)
         return {what:"Error",Password:{isError:true,Errmessage:"incorrect password"}}
    }
}

export async function bcryptResetpassword(Email:string,Password:string){
       try{
         const Currentuser=await FindOne(Email)
         if(!Currentuser) return {success:false}
     const hashPassword=await bcrypt.hash(Password,10)
   Currentuser.Authdetails.Password=hashPassword
    await Currentuser.save()
    return {success:true}
   
      }catch(err){
   console.log(err)
   return {success:false}
      }
}




