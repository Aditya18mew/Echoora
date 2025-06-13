import { bcryptData } from "@/components/bcrypt";
import { connectdb } from "@/db";
import { NextResponse } from "next/server";
import { validatemail,validatepassword } from "./regex"





export async function POST(req:Request){
  await connectdb()
  const {Authdetails}=await req.json()
  if(validatemail(Authdetails.Email)){
    if(validatepassword(Authdetails.Password)){
         const Tokens=await bcryptData(Authdetails)
   return NextResponse.json({success:true,message:"happy"})
    }else{
      return NextResponse.json({success:false,error:{Password:{iSError:true,Errmessage:"Enter a valid Email"}}})
    }
  }else{
     return NextResponse.json({success:false,error:{Email:{iSError:true,Errmessage:"Enter a valid Email"}}})
  }
}