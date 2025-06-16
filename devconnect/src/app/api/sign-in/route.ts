

import { ComparePassword } from "@/components/Auth/bcrypt";
import { validatemail,validatepassword } from "@/components/regex";
import { connectdb } from "@/db";
import { NextResponse } from "next/server";

type ComparePasswordResponse=
{  
  type:string
  AccessToken:string,
  RefreshToken:string
} | {
  type:string
  Email:{ 
    isError:boolean,
  Errmessage:string
}
} | {
  type:string
  Password:{ 
    isError:boolean,
  Errmessage:string
} 
} | {type:string,Errmessage:string} | undefined




export async function POST(req:Request){
   await connectdb()
   const {Authdetails}=await req.json()
   if(validatemail(Authdetails.Email)){
     if(validatepassword(Authdetails.Password)){
          const response:ComparePasswordResponse=await ComparePassword(Authdetails)
          if(typeof response!=="undefined"){
          if(response.type==="Tokens") return NextResponse.json({success:true,data:response})
          if(response.type==="PasswordError") return NextResponse.json({success:false,Error:response})
          if(response.type==="EmailError") return NextResponse.json({success:false,Error:response})
          if(response.type==="Error") return NextResponse.json({success:false,Error:response})
          }
        
     }else{
       return NextResponse.json({success:false,error:{Password:{iSError:true,Errmessage:"Enter a valid Email"}}})
     }
   }else{
      return NextResponse.json({success:false,error:{Email:{iSError:true,Errmessage:"Enter a valid Email"}}})
   }
}