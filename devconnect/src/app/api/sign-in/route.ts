

import { ComparePassword } from "@/components/Auth/bcrypt";
import { validatemail,validatepassword } from "@/components/regex";
import { connectdb } from "@/db";
import { NextResponse } from "next/server";

type ComparePasswordResponse=
{  
  what:"Tokens"
  AccessToken:string,
  RefreshToken:string
} | {
  what:"EmailError"
  Email:{ 
    isError:boolean,
  Errmessage:string
}
} | {
  what:"PasswordError"
  Password:{ 
    isError:boolean,
  Errmessage:string
} 
} | {what:"Error",Errmessage:string} | undefined




export async function POST(req:Request){
   await connectdb()
   const {Authdetails}=await req.json()
   if(validatemail(Authdetails.Email)){
     if(validatepassword(Authdetails.Password)){
          const response:ComparePasswordResponse=await ComparePassword(Authdetails)
          if(typeof response!=="undefined"){
          if(response.what==="Tokens"){
            const isProd=process.env.NODE_ENV==="production"
           const res=NextResponse.json({success:true})
           res.cookies.set(`AccessToken`,response.AccessToken,{
            httpOnly:true,
            secure:isProd,
            sameSite:"strict",
            maxAge:60*15,
            path:"/"
           })
           res.cookies.set(`RefreshToken`,response.RefreshToken,{
            httpOnly:true,
            secure:isProd,
            sameSite:"strict",
            maxAge:60*60*24*7,
            path:"/"
           })
             return res
          }
          if(response.what==="PasswordError") return NextResponse.json({success:false,Error:response})
          if(response.what==="EmailError") return NextResponse.json({success:false,Error:response})
          if(response.what==="Error") return NextResponse.json({success:false,Error:response})
        
     }else{
       return NextResponse.json({success:false,error:{Password:{iSError:true,Errmessage:"Enter a valid password"}}})
     }
   }else{
      return NextResponse.json({success:false,error:{Email:{iSError:true,Errmessage:"Enter a valid Email"}}})
   }
}
}