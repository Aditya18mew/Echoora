import { cookies } from "next/headers"
import "../../../globals.css"
import Profile from "../profile"
import { Sidebar } from "../sidebar"
import { VerifyToken } from "@/components/Auth/jwttokens"
import { redirect } from "next/navigation"





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
     user=currentuser
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