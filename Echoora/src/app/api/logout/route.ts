
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { FindOne } from "@/db";

const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET


export async function GET(req:Request){
const cookiestore=await cookies()
const AccessToken=cookiestore.get("AccessToken")?.value || ""

     if(typeof ACCESS_TOKEN_SECRET!=="string"){
    throw new Error("Access token must be defined")
  }

try{
   const decodedEmail=jwt.verify(AccessToken,ACCESS_TOKEN_SECRET).Email
   const user=await FindOne(decodedEmail)
    user.Authdetails.RefreshToken=null
     user.Authdetails.RefreshtokencreateDate=null
     user.Authdetails.RefreshtokenexpiryDate=null
     await user.save()
     
     const response=NextResponse.json({success:true,message:'logout successful'})
     response.cookies.delete("AccessToken")
     response.cookies.delete("RefreshToken")

     return response
}catch(err){
    return NextResponse.json({success:false,message:'logout unsuccesful',err:err})
}

}
