import { connectdb,FindOne } from "@/db"
import { NextResponse } from "next/server"


export async function POST(req:Request){
    await connectdb()
const {Email,Name,Experience,Education,Location,WorkPlace,About}=await req.json()
const Currentuser=await FindOne(Email)
if(!Currentuser) return NextResponse.json({success:false})
if(Name)  Currentuser.Biodetails.name=Name
if(Experience) Currentuser.Biodetails.Experience=Experience
if(Education)   Currentuser.Biodetails.Education=Education
if(Location)  Currentuser.Biodetails.Location=Location
if(About)  Currentuser.Biodetails.About=About
if(WorkPlace)  Currentuser.Biodetails.WorkPlace=WorkPlace
await Currentuser.save() 
return NextResponse.json({success:true})
}