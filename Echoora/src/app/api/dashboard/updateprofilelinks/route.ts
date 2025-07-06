import { connectdb, FindOne } from "@/db"
import { NextResponse } from "next/server"




export async function POST(req:Request){
    await connectdb()
const {Email,Instagram,Github,Linkedin}=await req.json()
console.log(Email)
const Currentuser=await FindOne(Email)
if(Currentuser){
    if(Instagram){
    Currentuser.Biodetails.sociallinks.Instagram=Instagram
}
if(Github){
    Currentuser.Biodetails.sociallinks.Github=Github
}
if(Linkedin){
    Currentuser.Biodetails.sociallinks.Linkedin=Linkedin
}
  await Currentuser.save()
return NextResponse.json({success:true})
}
return NextResponse.json({success:false})
}