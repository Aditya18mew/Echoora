

import { FindOne } from "@/db"
import jwt from "jsonwebtoken"






const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET


export async function generatejwtToken(email:string){
  const Currentuser=await FindOne(email)

  if(typeof ACCESS_TOKEN_SECRET!=="string"){
    throw new Error("Access token must be defined")
  }
  if(typeof REFRESH_TOKEN_SECRET!=="string"){
    throw new Error("Refresh token must be defined")
  }
 
    const AccessToken=jwt.sign({
        id:Currentuser._id,
        Email:Currentuser.Authdetails.Email
      },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
 
    const RefreshToken=jwt.sign({
        id:Currentuser._id,
        Email:Currentuser.Authdetails.Email
      },REFRESH_TOKEN_SECRET,{expiresIn:"7d"})

     Currentuser.Authdetails.RefreshToken=RefreshToken
     Currentuser.Authdetails.RefreshtokencreateDate=Date.now()
     Currentuser.Authdetails.RefreshtokenexpiryDate=Date.now() + 7*24*60*60*1000
     await Currentuser.save()
    return {AccessToken:AccessToken,RefreshToken:RefreshToken}  

}

export async function removejwtToken(email:string){
  const Currentuser=await FindOne(email)
 if(!Currentuser) return {success:false,message:"unable to logout try again"}
 try{
    Currentuser.Authdetails.RefreshToken=null
     Currentuser.Authdetails.RefreshtokencreateDate=null
     Currentuser.Authdetails.RefreshtokenexpiryDate=null
     await Currentuser.save()
     return {success:true,message:"logout successful"}
 }catch(err){
  console.log(err)
 }
}

export async function GetjwtTokens(email:string,name:string,image:string){
       const Currentuser=await FindOne(email)

  if(typeof ACCESS_TOKEN_SECRET!=="string"){
    throw new Error("Access token must be defined")
  }
  if(typeof REFRESH_TOKEN_SECRET!=="string"){
    throw new Error("Refresh token must be defined")
  }

   const AccessToken=jwt.sign({
        id:Currentuser._id,
        Email:Currentuser.Authdetails.Email
      },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
 
    const RefreshToken=jwt.sign({
        id:Currentuser._id,
        Email:Currentuser.Authdetails.Email
      },REFRESH_TOKEN_SECRET,{expiresIn:"7d"})


    Currentuser.Authdetails.RefreshToken=RefreshToken
    Currentuser.Authdetails.RefreshtokencreateDate=Date.now()
    Currentuser.Authdetails.RefreshtokenexpiryDate=Date.now() + 7*24*60*60*1000
    Currentuser.Authdetails.googleAuthDetails.ProviderId="google"
    Currentuser.Authdetails.googleAuthDetails.name=name
    Currentuser.Authdetails.googleAuthDetails.Image=image
    await Currentuser.save()
     
   
       return {success:true,AccessToken:AccessToken,RefreshToken:RefreshToken}  
}

export async function VerifyToken(AccessToken:string){
    try{
        if(typeof ACCESS_TOKEN_SECRET!=="string"){
    throw new Error("Access token must be defined")
  }
    const decodedemail=jwt.verify(AccessToken,ACCESS_TOKEN_SECRET).Email
    const Currenuser=await FindOne(decodedemail)
    const user={
     Email: Currenuser.Authdetails.Email,
     username:Currenuser.Authdetails.username,
     Biodetails:{
            name:Currenuser.Biodetails.name,
            Experience:Currenuser.Biodetails.Experience,
            Education:Currenuser.Biodetails.Education,
            Location:Currenuser.Biodetails.Location,
            WorkPlace:Currenuser.Biodetails.WorkPlace,
            skills:Currenuser.Biodetails.skills,
            sociallinks:{
                Instagram:Currenuser.Biodetails.sociallinks.Instagram,
                Github:Currenuser.Biodetails.sociallinks.Github,
                Linkedin:Currenuser.Biodetails.sociallinks.Linkedin
            }
        }
    }
    return user
    }catch(err){
      console.log(err)
    }
}


export async function VerifyRefreshToken(RefreshToken:string){
    try{
      if(typeof REFRESH_TOKEN_SECRET!=="string"){
    throw new Error("Refresh token must be defined")
  }

    const {Email}=jwt.verify(RefreshToken,REFRESH_TOKEN_SECRET)
    return Email
    }catch(err){
      console.log(err)
    }
}

