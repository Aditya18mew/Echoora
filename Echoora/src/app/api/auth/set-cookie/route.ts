
import { GetjwtTokens } from "@/libs/jwttokens";
import { validatemail } from "@/utils/regex";
import { connectdb,CreateUser ,FindOne,} from "@/db";
import { NextResponse } from "next/server";




export async function POST(req:Request){
     await connectdb()
     const {Email,Name,Image}=await req.json()
     if(validatemail(Email)){
            const existinguser=await FindOne(Email)
     if(!existinguser) 
          {
           await CreateUser(Email)
          }
     const {AccessToken,RefreshToken}=await GetjwtTokens(Email,Name,Image) 
    return NextResponse.json({success:true,data:{AccessToken:AccessToken,RefreshToken:RefreshToken}})
     }else{
          return NextResponse.json({success:false})
     } 
}