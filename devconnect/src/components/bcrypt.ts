import { FindOne, User } from "@/db"
import bcrypt from "bcrypt"


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
            Password:hashPassword
        }
       })
        await newUser.save()

       }catch(err){
        console.log(err)
       }
}


export async function ComparePassword(formData:formData){
    try{
    const Currentuser=await FindOne(formData.Email)
    const passwordMatch:boolean=await bcrypt.compare(formData.Password,Currentuser.Authdetails.Password)
    return passwordMatch
    }catch(err){
        console.log(err)
    }
}