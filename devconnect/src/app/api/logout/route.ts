import { removejwtToken } from "@/components/jwttokens";
import { NextResponse } from "next/server";


type removejwtTokenResponse={
    success:boolean,
    message:string
} | undefined

export async function POST(req:Request){
const {Email}=await req.json()
const response:removejwtTokenResponse=await removejwtToken(Email)

if(typeof response !== 'undefined'){
    return NextResponse.json({success:true,data:response})
}



}