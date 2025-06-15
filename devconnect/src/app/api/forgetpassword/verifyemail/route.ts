


import { connectdb,FindOne } from "@/db";
import { NextResponse } from "next/server";




export async function POST(req:Request){
  await connectdb()
  const {Email,otp}=await req.json()
try {
      const Toverifyuser=await FindOne(Email)
    if(Toverifyuser.Authdetails.Otp===otp){
       Toverifyuser.Authdetails.Otp=null
       await Toverifyuser.save()
    return NextResponse.json({success:true})
    }else{
     Toverifyuser.Authdetails.Otp=null
       await Toverifyuser.save()
        return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Incorrect Otp"}})
    }
   }catch(err){
    console.log(err)
     return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Server error"}})
   }
}