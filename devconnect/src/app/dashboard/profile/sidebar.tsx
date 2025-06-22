"use client"
import "../../globals.css"
import profile from "@/components/icons/profile.svg"
import home from "@/components/icons/home.svg"
import setting from "@/components/icons/settings.svg"
import logout from "@/components/icons/logout.svg"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"





export function Sidebar(){
   const [activelink,setactivelink]=useState({
      Home:false,
      profile:true,
      setting:false
   })
 return (
    <aside className="w-18 bg-[#121212] shadow-md  flex flex-col items-center justify-between min-h-screen">
      <div className="h-40 w-12 flex flex-col gap-2 items-center mt-6">
         <Link className={activelink.Home ? "activesidebarlink mt-2 mb-1": "sidebarlink mt-2 mb-1"} onClick={()=>setactivelink({Home:true,profile:false,setting:false})} href="/dashboard"><Image className={activelink.Home? "w-5 h-5":"w-6 h-6"} src={home} alt="home"></Image></Link>
         <Link className={activelink.profile ? "activesidebarlink mt-1 mb-1": "sidebarlink mb-1 mt-1"} onClick={()=>setactivelink({Home:false,profile:true,setting:false})} href="#"><Image className={activelink.profile? "w-4 h-4":"w-6 h-6"} src={profile} alt="profile"></Image></Link>
         <Link className={activelink.setting ? "activesidebarlink mt-1 mb-2": "sidebarlink mt-1 mb-2"} onClick={()=>setactivelink({Home:false,profile:false,setting:true})} href="#"><Image className={activelink.setting? "w-4 h-4":"w-6 h-6"} src={setting} alt="setting"></Image></Link>
      </div>
      <div>
         {/* later change it to button*/}
         <Link className="w-8 h-8 mt-2 mb-1 bg-white rounded shadow flex items-center justify-center" href="/sign-in"><Image className="w-6 h-6" src={logout} alt="logout"></Image></Link>
      </div>
    </aside>
 )
}