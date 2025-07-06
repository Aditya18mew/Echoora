import { VerifyRefreshToken } from "@/components/Auth/jwttokens";
import { connectdb, FindOne } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET




export  async function GET(req:NextRequest){
    await connectdb()
  const RefreshToken=req.cookies.get("RefreshToken")?.value
 if(!RefreshToken){
       return NextResponse.json({error:"No refresh Token"},{status:401})
  }
   try{
    const Email=await VerifyRefreshToken(RefreshToken)
     if(!Email){
        return NextResponse.json({error:"Invalid Token"},{status:403})
     }
     const Currentuser=await FindOne(Email)
     if(!Currentuser)  return NextResponse.json({error:"user not found"},{status:404})

        if(typeof ACCESS_TOKEN_SECRET!=="string"){
    throw new Error("Access token must be defined")
  }
     const AccessToken=jwt.sign({
            id:Currentuser._id,
            Email:Currentuser.Authdetails.Email
          },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

     const response=NextResponse.json({success:true,AccessToken:AccessToken})

 return response
 
   }catch(err){
    console.log(err)
   }
}