
import { VerifyAccessToken } from "@/libs/jwttokens";
import { connectdb, Followuser, unFollowuser } from "@/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";




export async function POST(req:Request){
    await connectdb()
    const {username,isFollowed}=await req.json()
  const cookiestore=await cookies()
const AccessToken=cookiestore.get("AccessToken")?.value || ""
 const email=await VerifyAccessToken(AccessToken)

 if(isFollowed){
    await unFollowuser(username,email)
   return NextResponse.json({success:true,task:"unfollowed"})
  } else{
    await Followuser(username,email)
    return NextResponse.json({success:true,task:"followed"})
  }
 
}



