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
    <div className="h-screen flex bg-[#1a1d21]">

      <div className="w-72 border-r-2 border-[#2e2e2e] p-4 hidden md:block">
        <h2 className="text-xl text-white font-semibold mb-4">Chats</h2>
        <ul className="space-y-2">
            {fetchChats?.map((user) => (
           /*  <li
              key={user}
              className={`p-2 rounded cursor-pointer ${
                selectedUser === user ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user}
           
            </li> */
               <h1 key={user.upDatedAt} className="p-2 text-white bg-gray-700 rounded cursor-pointer">{user.__v}</h1>
          ))}
        </ul>
      </div>

      <ChatArea></ChatArea>
    </div>
  );
}