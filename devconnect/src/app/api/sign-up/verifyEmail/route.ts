import { generatejwtToken } from "@/components/jwttokens"
import { connectdb, FindOne } from "@/db"
import { NextResponse } from "next/server"





export async function POST(req:Request){
  await connectdb()
  const {Email,otp}=await req.json()
try {
      const Toverifyuser=await FindOne(Email)
    if(Toverifyuser.Authdetails.Otp===otp){
  const {AccessToken,RefreshToken}= await generatejwtToken(Email)
    return NextResponse.json({success:true,data:{AccessToken:AccessToken,RefreshToken:RefreshToken}})
    }else{
        return NextResponse.json({success:false,Error:{isError:true,Errmessage:"Incorrect Otp"}})
    }
   }catch(err){
    console.log(err)
   }
}