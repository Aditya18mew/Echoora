import { cookies } from "next/headers";
import { ChatArea } from "./chatarea";
import { VerifyAccessToken } from "@/components/Auth/jwttokens";
import { connectdb, FetchChat } from "@/db";



export default async function ChatPage() {
  await connectdb()
 const cookiestore=await cookies()
 const AccessToken=cookiestore.get("AccessToken")?.value
 let fetchChats;

 if(AccessToken){
   const email=await VerifyAccessToken(AccessToken) 
    fetchChats=await FetchChat(email)
 } 


  return (
    <ChatArea fetchChats={fetchChats}></ChatArea>
  );
}