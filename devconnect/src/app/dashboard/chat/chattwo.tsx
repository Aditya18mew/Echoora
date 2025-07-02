"use client"
import socket from "@/utils/socket"
import axios from "axios"
import {useEffect, useRef, useState } from "react"



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
type message={
 sender:string,
      message:string,
      time:string
}


export function Chat({user}:{user:user}){
  const [messages, setMessages] = useState<message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const hasdone=useRef(false)



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
        socket.on("receive-message",(data)=>{
      setMessages(prev=>([...prev,data]))
   })
   return ()=>{
    socket.off("receive-message")
   }
  },[user.selfusername,user.anotheruser.username])

 


  function sendmessage(){
    socket.emit("send-message",{
    selfusername:user.selfusername,
    username:user.anotheruser.username,
    message:{
      sender:user.selfusername,
      message:newMsg,
      time:Date.now().toLocaleString()
    }
    })
     setMessages(prev=>[...prev,{
      sender:user.selfusername,
      message:newMsg,
      time:Date.now().toLocaleString()
    }])
     setNewMsg("")
  }

return  <div className="flex-1 flex flex-col bg-[#1a1d21]">
        {/* Header */}
       <div className="border-b-2 border-[#2e2e2e] p-4 text-white flex items-center">
          <h2 className="text-lg font-medium">{user?.anotheruser.Name}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 flex justify-center overflow-y-auto p-4 space-y-3 text-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.message}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === user.selfusername
                  ? "bg-purple-400 text-white self-end ml-auto"
                  : "bg-purple-400 text-white self-start mr-auto"
              }`}
            >
              {msg.message}
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