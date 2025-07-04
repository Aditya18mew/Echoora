import { connectdb, Search } from "@/db"
import { NextResponse } from "next/server"



export async function POST(req:Request){
    const {search}=await req.json()
   if(search.trim()===""){
    return NextResponse.json({success:true,Arr:[]})
   }
   await connectdb()
  const Arr=await Search(search)
    return NextResponse.json({success:true,Arr:Arr})
}