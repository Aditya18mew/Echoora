import { bcryptData } from "@/components/bcrypt";
import { validatemail,validatepassword } from "@/components/regex";
import { connectdb, FindOne } from "@/db";
import { NextResponse } from "next/server";


 type bcryptDataResponse={
     success:boolean,
} | undefined

 

export async function POST(req:Request){
  await connectdb()
  const {Authdetails}=await req.json()
  if(validatemail(Authdetails.Email)){
    if(validatepassword(Authdetails.Password)){
      const Olduser=await FindOne(Authdetails.Email)
      if(Olduser) return NextResponse.json({success:false,error:{isError:true,Errmessage:"Account with this email already exist"}})
         const response:bcryptDataResponse=await bcryptData(Authdetails)
         if(typeof response !=="undefined"){
              return NextResponse.json({success:true})
          }
    else{
      return NextResponse.json({success:false,error:{Password:{iSError:true,Errmessage:"Enter a valid Email"}}})
    }
  }else{
     return NextResponse.json({success:false,error:{Email:{iSError:true,Errmessage:"Enter a valid Email"}}})
  }
}
}