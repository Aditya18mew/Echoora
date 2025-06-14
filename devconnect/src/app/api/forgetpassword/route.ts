import { NextResponse } from "next/server";





export async function POST(req:Request){
   const {Email}=await req.json()
   
   return NextResponse.json({success:true,message:"happy"})
}