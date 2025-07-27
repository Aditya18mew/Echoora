import { ForgetpasswordMailotp} from "@/libs/nodemailer";
import { validatemail } from "@/utils/regex";
import { FindOne ,connectdb} from "@/db";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";




type MailtopResponse={
    success:boolean,
    response:string,
} | undefined



export async function POST(req:Request){
   await connectdb()
   const {Email}=await req.json()
  try{
    if(validatemail(Email)){
       const Currentuser=await FindOne(Email)
       if(!Currentuser) return NextResponse.json({success:false,Error:{isError:true,Errmessage:"NO such Account exists"}})
      const otp=randomInt(100000,999999).toString()
      Currentuser.Authdetails.Otp=otp
      await Currentuser.save()
       const res:MailtopResponse= await ForgetpasswordMailotp(Email,otp)
               if(typeof res !=="undefined"){
                  return NextResponse.json({success:true,message:"otp sent to gmail"})
               }
      Currentuser.Authdetails.Otp=otp
      await Currentuser.save()
      return NextResponse.json({success:false,Error:{isError:true,Errmessage:"error try again"}})
   }else{
      return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Invalid email"}})
   }
  }catch(err){
   console.log(err)
  }
   
   
}