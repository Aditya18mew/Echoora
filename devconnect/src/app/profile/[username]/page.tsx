import { cookies } from "next/headers"
import "../../globals.css"
import Profile from "../profile"
import { Sidebar } from "../sidebar"
import { VerifyToken } from "@/components/Auth/jwttokens"
import { redirect } from "next/navigation"
import { Getuserbyusername } from "@/db"






export  default async function ProfilePage({
    params
}:{
    params:Promise<{username:string}>
}){
  const {username}=await params
  const cookiestore=await cookies()
  const AccessToken=cookiestore.get("AccessToken")?.value
   let isowner:boolean=false
   let user;

  if(AccessToken){
    try{
    const currentuser=await VerifyToken(AccessToken)
    const getuser=await Getuserbyusername(username)
    if(!getuser?.success){
      return <div className="flex">
  <Sidebar></Sidebar>
  <div className="w-full bg-[#1A1A1A] border-2 border-[#2e2e2e] flex items-center justify-center">
    <h1 className="text-white text-2xl">user not found</h1>
  </div>
  </div>
    }
     user=getuser?.user
    isowner=username===currentuser?.username
    }catch(err){
      console.log(err)
     redirect("/sign-in")
    }
  }
         return <div className="flex">
  <Sidebar></Sidebar>
  <Profile isOwner={isowner} user={user} ></Profile>
  </div>

}