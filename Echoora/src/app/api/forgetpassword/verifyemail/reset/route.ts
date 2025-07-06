import { bcryptResetpassword } from "@/components/Auth/bcrypt";
import { connectdb } from "@/db";
import { NextResponse } from "next/server";




export async function POST(req:Request){
  await  connectdb()
  const {Email,Newpassword}=await req.json()
try {
    const res=await bcryptResetpassword(Email,Newpassword.newpass)
      if(typeof res !=="undefined"){
         if(res.success){
          return NextResponse.json({success:true,message:"password reset complete"})
         }else{
           return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Server error try again" }})
         }
      }else{
        return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Server error try again" }})
      } 
}catch(err){
  console.log(err)
   return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Server error" }})
}
}