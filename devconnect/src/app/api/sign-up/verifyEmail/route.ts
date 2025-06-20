import { generatejwtToken } from "@/components/Auth/jwttokens"
import { connectdb, FindOne } from "@/db"
import { NextResponse } from "next/server"





export async function POST(req:Request){
  await connectdb()
  const {Email,otp}=await req.json()
try {
      const Toverifyuser=await FindOne(Email)
    if(Toverifyuser.Authdetails.Otp===otp){
  const {AccessToken,RefreshToken}= await generatejwtToken(Email)
       Toverifyuser.Authdetails.Otp=null
       Toverifyuser.Biodetails.name=""
       Toverifyuser.Biodetails.Experience=""
       Toverifyuser.Biodetails.Education=""
       Toverifyuser.Biodetails.Location=""
       Toverifyuser.Biodetails.WorkPlace=""
       Toverifyuser.Biodetails.sociallinks.Instagram=""
       Toverifyuser.Biodetails.sociallinks.Github=""
       Toverifyuser.Biodetails.sociallinks.Linkedin=""
       await Toverifyuser.save()
       const isProd=process.env.NODE_ENV==="production"
    const response= NextResponse.json({success:true})
     response.cookies.set(`AccessToken`,AccessToken,{
            httpOnly:true,
            secure:isProd,
            sameSite:"strict",
            maxAge:60*15,
            path:"/"
           })
    response.cookies.set(`RefreshToken`,RefreshToken,{
      httpOnly:true,
      secure:isProd,
      sameSite:"strict",
      maxAge:60*60*24*7,
      path:"/"
    })
    return response
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
