"use client"
import socket from "@/utils/socket"
import axios from "axios"
import Image from "next/image"
import {useEffect, useRef, useState } from "react"
import defaultuserimg from "@/components/icons/defaultuser.svg"
import { Randomstring } from "@/utils/generaterandomstring"





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

type Message={
  _id:string,
  ChatId:string,
  sender:{
       username:string,
      message:string,
      time:string
  }
}


export function ChatArea({user}:{user:user}){
  const [Messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const hasdone=useRef(false)
  const bottomRef=useRef<HTMLHeadingElement | null>(null)



  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
   const {value}=e.target
   setNewMsg(value)
  }



  useEffect(()=>{
     async function fetchmessage(selfusername:string,username:string){
    try{
      const res=await axios.post("http://localhost:3000/api/dashboard/chat/message",{selfusername:selfusername,username:username})
      if(res.data.success){
         setMessages(res.data.Messages)
      }
    }catch(err){
      console.log(err)
    }
  }
   fetchmessage(user.selfusername,user.anotheruser.username)
  },[user.selfusername,user.anotheruser.username])

  useEffect(()=>{
   if(!hasdone.current){
     socket.emit("join-chat",{selfusername:user.selfusername,username:user.anotheruser.username})
   }
   hasdone.current=true
        socket.on("receive-message",(newMessage)=>{
           
      setMessages(prev=>([...prev,newMessage]))
   })
   return ()=>{
    socket.off("receive-message")
   }
  },[user.selfusername,user.anotheruser.username])

  useEffect(()=>{
   bottomRef.current?.scrollIntoView({
    behavior:"smooth"
   })
  },[Messages])

 


  function sendmessage(){
    socket.emit("send-message",{
    selfusername:user.selfusername,
    username:user.anotheruser.username,
    sender:{
      username:user.selfusername,
      message:newMsg,
      time:Date.now().toLocaleString()
    }
    })
     setMessages(prev=>[...prev,{
      _id:Randomstring() ,
      ChatId:"",
      sender:{
      username:user.selfusername,
      message:newMsg,
      time:Date.now().toLocaleString()
    }
     }])
     setNewMsg("")
  }

return  <div className="flex-1 flex flex-col bg-[#171616]">
        {/* Header */}
       <div className="border-b-2 border-[#2e2e2e] p-4 text-white flex items-center">
        <Image src={user.anotheruser.profileimg || defaultuserimg} className="w-8 h-8 mr-2 rounded-full" alt="profileimg"></Image>
            <div className="ml-1 flex flex-col items-center">
               <h2 className="font-medium">{user?.anotheruser.Name}</h2>
               <p className="text-sm font-light text-gray-300">{user.anotheruser.username}</p>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 flex justify-center overflow-y-auto p-4 space-y-3 text-white">
          <div className="flex-1 overflow-y-auto p-2 space-y-3 messages">
          {Messages.map(({_id,sender}) => (
            <div key={_id}>  
              <div className="flex flex-row">
                {sender.username!==user.selfusername && 
                <Image src={user.anotheruser.profileimg || defaultuserimg} className="w-7 h-7 mr-2 mt-2 rounded-full" alt="profileimg"></Image>}

              <h2 ref={bottomRef} className={`max-w-xs px-4 py-2 rounded-lg ${
                sender.username === user.selfusername
                  ? "bg-purple-500 text-white self-end ml-auto"
                  : "bg-gray-800 text-white self-start mr-auto"
              }`}>{sender.message}</h2></div>
            </div>
          ))}
        </div>

        </div>

        {/* Input */}
     <div className="p-4 border-t-2 border-[#2e2e2e] text-white flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg p-2 focus:outline-none"
            placeholder="Type a message"
            value={newMsg}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" &&  sendmessage()}
          />
          <button
             onClick={sendmessage} 
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
          </button>
        </div> 
      </div>
}