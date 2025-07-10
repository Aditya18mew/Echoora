import { cookies } from "next/headers"
import { VerifyAccessToken } from "@/components/Auth/jwttokens";
import { connectdb, FetchChat } from "@/db";
import { ChatSidebar } from "./chatSidebar";

type user={
    participants:{username:string,Name:string,profileimg:string}[]
    latestcontent:string
    upDatedAt:string
    _id:string
}



type participant={username:string,Name:string,profileimg:string}

export default async function ChatPage() {
  await connectdb()
 const cookiestore=await cookies()
 const AccessToken=cookiestore.get("AccessToken")?.value
 let fetchChats;

 if(AccessToken){
   const email=await VerifyAccessToken(AccessToken) 
   const {selfusername,findchats}=await FetchChat(email)
   fetchChats=findchats.map((user:user)=>{
    const anotheruser=user.participants.find((participant:participant)=>participant.username!==selfusername)
    return {
      selfusername:selfusername,
      anotheruser:{
        username:anotheruser?.username,
        Name:anotheruser?.Name,
        profileimg:anotheruser?.profileimg
      },
      latestcontent:user.latestcontent,
      upDatedAt:user.upDatedAt,
      _id:user._id
    }
   })
 } 


  return (
    <ChatSidebar fetchChats={fetchChats}></ChatSidebar>
  );
}