import { cookies } from "next/headers"
import Feed from "./_components/feed"
import { Navbar } from "./_components/navbar"
import { Rightdashboard } from "./_components/Right"
import { Getdata } from "@/components/Auth/jwttokens"
import { notFound } from "next/navigation"
import { MiniProfile } from "./_components/miniprofile"
/* import { Card } from "./_components/card" */










export  default async function Dashboard(){
  const cookiestore=await cookies()
const AccessToken=cookiestore.get("AccessToken")?.value
let userdata;

if(AccessToken){
    const user=await Getdata(AccessToken)
    if(!user?.success){
     notFound()
    }
    userdata=user.data  
}


return    <div className="flex flex-col bg-[#1a1d21] min-h-screen">
         <Navbar Name={userdata?.name} image={userdata?.Image} username={userdata?.username}></Navbar>
        <div className="flex text-white flex-1">
         <aside className="hidden lg:basis-[25%] lg:flex lg:flex-col p-3"> 
                 <MiniProfile peoples={userdata?.followers.Arr} Name={userdata?.name} image={userdata?.Image} followercount={userdata?.followers.count} followingcount={userdata?.following.count} username={userdata?.username}></MiniProfile>
                {/*  <Card peoples={userdata?.followers.Arr}></Card> */}
                 </aside>
        <div className="w-full m-3 lg:basis-[50%] lg:m-0 pt-3"><Feed></Feed></div>
         <aside className="hidden lg:basis-[25%] lg:block p-3 "><Rightdashboard></Rightdashboard></aside>
        </div> 
    </div>
}