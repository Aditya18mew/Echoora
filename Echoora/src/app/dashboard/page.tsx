import { cookies } from "next/headers"
import Feed from "./_components/feed"
import { Navbar } from "./_components/navbar"
import { Rightdashboard } from "./_components/Right"
import { Getdata } from "@/libs/jwttokens"
import { notFound } from "next/navigation"
import { MiniProfile } from "./_components/miniprofile"










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


return    <div className="flex flex-col bg-[var(--Modern)] min-h-screen relative">
         <Navbar Name={userdata?.name} image={userdata?.Image} username={userdata?.username}></Navbar>
        <div className="flex text-white flex-1 absolute top-16">
         <aside className="hidden lg:basis-[25%] lg:flex lg:flex-col p-3"> 
                 <MiniProfile peoples={userdata?.followers.Arr} Name={userdata?.name} image={userdata?.Image} followercount={userdata?.followers.count} followingcount={userdata?.following.count} username={userdata?.username}></MiniProfile>
                 </aside>
        <div className="w-full px-4 lg:px-0 lg:basis-[50%] lg:m-0"><Feed></Feed></div>
         <aside className="hidden lg:basis-[25%] lg:block p-3 "><Rightdashboard></Rightdashboard></aside>
        </div> 
    </div>
}