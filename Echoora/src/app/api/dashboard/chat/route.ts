import { VerifyAccessToken } from "@/libs/jwttokens";
import { connectdb, StartChat } from "@/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";





export async function POST(req:Request){
    await connectdb()
    const {username}=await req.json()
 const cookiestore=await cookies()
 const AccessToken=cookiestore.get("AccessToken")?.value || ""
 const email=await VerifyAccessToken(AccessToken) 
if(!email) return NextResponse.json({success:false}) 

   await StartChat(email,username)
    return NextResponse.json({success:true})

}