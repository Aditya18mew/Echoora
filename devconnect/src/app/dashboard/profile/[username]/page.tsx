import "../../../globals.css"
import Profile from "../profile"
import { Sidebar } from "../sidebar"

export  default async function ProfilePage({
    params
}:{
    params:Promise<{username:string}>
}){
  const {username}=await params

  return <div className="flex">
  <Sidebar></Sidebar>
  <Profile></Profile>
  </div>
}