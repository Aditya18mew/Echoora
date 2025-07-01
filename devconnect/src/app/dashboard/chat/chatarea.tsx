"use client"
import socket from "@/utils/socket";
import {useEffect, useState } from "react";
import { Chat } from "./chattwo";

 


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



export function ChatArea({fetchChats,selfusername}:{fetchChats:fetchChats,selfusername:string}){

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
  const [show,setshow]=useState(false)

 function handlechat(user:user){
   setSelectedUser(user)
   setshow(true)
 }


useEffect(()=>{
 socket.connect()
 return ()=> {
  socket.disconnect()
 }
},[])




 return  (
  <div className="h-screen flex bg-[#1a1d21]">
      <div className="w-72 border-r-2 border-[#2e2e2e] p-4 hidden md:block">
        <h2 className="text-xl text-white font-semibold mb-4">Chats</h2>
        <ul className="space-y-2">
            {chats?.map((user) => (
            <li
              key={user._id}
              className={`p-2 rounded cursor-pointer text-white ${
                selectedUser.anotheruser.username === user.anotheruser.username ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={()=>handlechat(user)}
            >
              {user.anotheruser.Name}
            </li> 
          ))}
        </ul>
      </div>

      
       { show ? <Chat user={selectedUser}></Chat>  : <div className="flex-1 flex flex-col justify-center bg-[#1a1d21]">  <div className="text-white text-2xl self-center">start a convo</div></div>}

   
    </div>
 )
 
}