import { connectdb, Fetchmessage } from "@/db"
import { NextResponse } from "next/server"



export async function POST(req:Request){
    await connectdb()
    const {selfusername,username}=await req.json()


    const Messages=await Fetchmessage(selfusername,username)
    return NextResponse.json({success:true,Messages:Messages})
   
}