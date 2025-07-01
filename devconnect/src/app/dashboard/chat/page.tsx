import { cookies } from "next/headers";
import { ChatArea } from "./chatarea";
import { VerifyAccessToken } from "@/components/Auth/jwttokens";
import { connectdb, FetchChat } from "@/db";

type user={
    participants:{username:string,Name:string,profileimg:string}[]
    upDatedAt:string
    _id:string
}



type participant={username:string,Name:string,profileimg:string}

export default async function ChatPage() {
  await connectdb()
 const cookiestore=await cookies()
 const AccessToken=cookiestore.get("AccessToken")?.value
 let selfuser;
 let fetchChats;

 if(AccessToken){
   const email=await VerifyAccessToken(AccessToken) 
   const {selfusername,findchats}=await FetchChat(email)
   selfuser=selfusername
   fetchChats=findchats.map((user:user)=>{
    const anotheruser=user.participants.find((participant:participant)=>participant.username!==selfusername)
    return {
      selfusername:selfusername,
      anotheruser:{
        username:anotheruser?.username,
        Name:anotheruser?.Name,
        profileimg:anotheruser?.profileimg
      },
      upDatedAt:user.upDatedAt,
      _id:user._id
    }
   })
 } 


  return (
    <ChatArea fetchChats={fetchChats} selfusername={selfuser}></ChatArea>
  );
}