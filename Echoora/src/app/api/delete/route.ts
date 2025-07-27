import { VerifyAccessToken } from "@/libs/jwttokens";
import { connectdb, deleteaccount } from "@/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET(){
     await connectdb()
    const cookiesstore=await cookies()
    const AccessToken=cookiesstore.get("AccessToken")?.value || ""
       const email=await VerifyAccessToken(AccessToken)
  const success=await deleteaccount(email)
  return NextResponse.json({success:success})
}