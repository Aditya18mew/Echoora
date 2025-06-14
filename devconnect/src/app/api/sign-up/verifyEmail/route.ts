import { generatejwtToken } from "@/components/jwttokens"
import { connectdb, FindOne } from "@/db"
import { NextResponse } from "next/server"





export async function POST(req:Request){
  await connectdb()
  const {email,Otp}=await req.json()
try {
      const Toverifyuser=await FindOne(email)
    if(Toverifyuser.Authdetails.Otp===Otp){
  const {AccessToken,RefreshToken}= await generatejwtToken(email)
    return NextResponse.json({success:true,data:{AccessToken:AccessToken,RefreshToken:RefreshToken}})
    }else{
        return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Incorrect Otp"}})
    }
   }catch(err){
    console.log(err)
   }


}