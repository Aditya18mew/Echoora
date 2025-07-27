

import { VerifyAccessToken } from "@/libs/jwttokens"
import { connectdb, FindOne } from "@/db"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

type info={
    profileimg:string,
    Email:string,
    Name:string,
    Experience:string,
    Education:string,
    Location:string,
    WorkPlace:string,
    About:string,
      Instagram:string,
        Github:string,
        Linkedin:string,
}

export async function GET(){
    await connectdb()
     const cookiestore=await cookies()
     const AccessToken=cookiestore.get("AccessToken")?.value || ""
     const email=await VerifyAccessToken(AccessToken)
     const Currentuser=await FindOne(email)
     const info:info={
       profileimg:Currentuser.Biodetails.Image,
       Email:Currentuser.Authdetails.Email,
       Name:Currentuser.Biodetails.name,
       Experience:Currentuser.Biodetails.Experience,
       Education:Currentuser.Biodetails.Education,
       Location:Currentuser.Biodetails.Location,
       WorkPlace:Currentuser.Biodetails.WorkPlace,
       About:Currentuser.Biodetails.About,
       Instagram:Currentuser.Biodetails.sociallinks.Instagram,
       Github:Currentuser.Biodetails.sociallinks.Github,
       Linkedin:Currentuser.Biodetails.sociallinks.Linkedin
     }

    return NextResponse.json({success:true,info:info})
}