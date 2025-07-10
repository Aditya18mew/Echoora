import { FetchPosts } from "@/db";
import { NextResponse } from "next/server";




export async function GET(){  
const PostArr=await FetchPosts()
return NextResponse.json({success:true,PostArr:PostArr})
}