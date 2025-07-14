"use client"
import socket from "@/utils/socket";
import {useEffect, useState } from "react";
import { ChatArea } from "./chatarea";
import defaultuserimg from "@/components/icons/defaultuser.svg"
import Image from "next/image";
import { BackfromChat } from "@/components/Buttons"
 


type fetchChats={
    selfusername:string,
  anotheruser:{
    username:string,
    Name:string,
    profileimg:string
  },
  latestcontent:string,
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
  latestcontent:string,
  upDatedAt:string,
  _id:string
}



export function ChatSidebar({fetchChats}:{fetchChats:fetchChats}){

  const [selectedUser, setSelectedUser] = useState<user>({
     selfusername:"",
  anotheruser:{
    username:"",
    Name:"",
    profileimg:""
  },
  latestcontent:"",
    upDatedAt:"",
    _id:""
  });
   
  const [chats,setchats]=useState(fetchChats?.sort((a,b)=>new Date(b.upDatedAt).getTime()-new Date(a.upDatedAt).getTime()))
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


useEffect(()=>{
  socket.on("newmessage",(newMessage)=>{
      setchats(chats?.map((chat)=>chat._id===newMessage.ChatId ?  {...chat, latestcontent:newMessage.sender.message,upDatedAt:newMessage.sender.createdAt
}:chat))
        })
        return ()=>{
             socket.off("newmessage")
          }
})

 return  (
  <div className="h-screen flex bg-[var(--Modern)]">
      <div className={`w-84 border-r-2 border-[#2e2e2e] flex-1 md:flex-none p-4 ${toggle ? "hidden":"block"} md:block`}>
        <div className="flex flex-row text-white items-center gap-2"><BackfromChat></BackfromChat>
        <h2 className="text-xl text-white font-semibold mb-4">Chats</h2></div>
        <ul className="space-y-2">
            {chats?.map((user:user) => (
            <li
              key={user._id}
              className={`p-2 rounded cursor-pointer bg-gr text-white ${
                selectedUser.anotheruser.username === user.anotheruser.username ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={()=>handlechat(user)}
            >
              <div className="flex flex-row items-start">
                <Image src={user.anotheruser.profileimg || defaultuserimg} className="w-7 h-7 mr-2 mt-2 rounded-full" alt="profileimg"></Image>
                  <h2 className={`flex flex-col px-4 rounded-lg w-full`}>{user.anotheruser.Name}
                    <p className="text-sm opacity-70 flex w-full justify-between font-extralight">
                      <span >{user.latestcontent}</span><span>{new Date(user.upDatedAt).toTimeString().slice(0,5)}</span></p>
                  </h2>
                 </div>
            </li> 
          ))}
        </ul>
      </div>

      
       { toggle ? <ChatArea user={selectedUser}></ChatArea>  : <div className="flex-1 md:flex flex-col hidden  justify-center bg-[#171616]">  <div className="text-white text-2xl self-center">start a convo</div></div>}

   
    </div>
 )
 
}