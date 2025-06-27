
import { VerifyAccessToken } from "@/components/Auth/jwttokens";
import { connectdb, FindOne } from "@/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type follower={
        username:string,
        profileimg:string,
        followedAt:Date,
        name:string,
        isFollowedBack:boolean
            }

type following={
        username:string,
        profileimg:string,
        followedAt:Date,
        name:string,
            }


export async function POST(req:Request){
    await connectdb()
    const {Email,isFollowed}=await req.json()
  const cookiestore=await cookies()
const AccessToken=cookiestore.get("AccessToken")?.value || ""
  const profileuser=await FindOne(Email)

  const email=await VerifyAccessToken(AccessToken)
  const user=await FindOne(email)
  if(!user) return NextResponse.json({success:false})
    if(!profileuser)  return NextResponse.json({success:false})
 
  if(isFollowed){
    /* will do something */
  }

     profileuser.followers.count=profileuser.followers.count+1 
  profileuser.followers.Arr.push({
    username:"hello",
                profileimg:"",
                followedAt:Date.now(),
                name:user.Biodetails.name,
                isFollowedBack:false
  })
   user.following.count=user.following.count+1
  user.following.Arr.push({
        username:profileuser.Authdetails.username,
        profileimg:"",
        followedAt:Date.now(),
        name:profileuser.Biodetails.name,
  }) 
     await profileuser.save()
   await user.save() 
  return NextResponse.json({success:true})
  

}



