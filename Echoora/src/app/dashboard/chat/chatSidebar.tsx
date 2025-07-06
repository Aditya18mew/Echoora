"use client"
import socket from "@/utils/socket";
import {useEffect, useState } from "react";
import { ChatArea } from "./chatarea";
import defaultuserimg from "@/components/icons/defaultuser.svg"
import Image from "next/image";
 


type fetchChats={
    selfusername:string,
  anotheruser:{
    username:string,
    Name:string,
    profileimg:string
  },
  upDatedAt:string,
  _id:string
}[] | undefined

type user={
    selfusername:string,
  anotheruser:{
    username:string,
    Name:string,
    profileimg:string
  },
  upDatedAt:string,
  _id:string
}



export function ChatSidebar({fetchChats,selfusername}:{fetchChats:fetchChats,selfusername:string}){

  const [selectedUser, setSelectedUser] = useState<user>({
     selfusername:"",
  anotheruser:{
    username:"",
    Name:"",
    profileimg:""
  },
    upDatedAt:"",
    _id:""
  });

  const [chats,setchats]=useState(fetchChats)
  const [toggle,settoggle]=useState(false)

 function handlechat(user:user){
   setSelectedUser(user)
   settoggle(true)
 }


useEffect(()=>{
 socket.connect()
 return ()=> {
  socket.disconnect()
 }
},[])




 return  (
  <div className="h-screen flex bg-[var(--Modern)]">
      <div className={`w-84 border-r-2 border-[#2e2e2e] flex-1 md:flex-none p-4 ${toggle ? "hidden":"block"} md:block`}>
        <h2 className="text-xl text-white font-semibold mb-4">Chats</h2>
        <ul className="space-y-2">
            {chats?.map((user:user) => (
            <li
              key={user._id}
              className={`p-2 rounded cursor-pointer bg-gr text-white ${
                selectedUser.anotheruser.username === user.anotheruser.username ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={()=>handlechat(user)}
            >
              <div className="flex flex-row">
                <Image src={user.anotheruser.profileimg || defaultuserimg} className="w-7 h-7 mr-2 mt-2 rounded-full" alt="profileimg"></Image>
                 <h2  className={`px-2 py-2 rounded-lg`}>{user.anotheruser.Name}</h2></div>
            </li> 
          ))}
        </ul>
      </div>

      
       { toggle ? <ChatArea user={selectedUser}></ChatArea>  : <div className="flex-1 md:flex flex-col hidden  justify-center bg-[#171616]">  <div className="text-white text-2xl self-center">start a convo</div></div>}

   
    </div>
 )
 
}