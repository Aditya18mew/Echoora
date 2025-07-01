"use client"
import axios from "axios";
import { useEffect, useState } from "react";
 import { io } from "socket.io-client";

/* const socket=io('http://localhost:5000')  */


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
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [show,setshow]=useState(false)


  async function fetchmessage(selfusername:string,username:string,user:user){
     setSelectedUser(user)
    try{
      const res=await axios.post("http://localhost:3000/api/dashboard/chat/message",{selfusername:selfusername,username:username})
      if(res.data.success){
        setMessages(res.data.Messages)
        setshow(true)
      }
    }catch(err){
      console.log(err)
    }
  }


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
              onClick={() => fetchmessage(user.selfusername,user.anotheruser.username,user)}
            >
              {user.anotheruser.Name}
            </li> 
          ))}
        </ul>
      </div>


        <div className="flex-1 flex flex-col bg-[#1a1d21]">
        {/* Header */}
       {show && <div className="border-b-2 border-[#2e2e2e] p-4 text-white flex items-center">
          <h2 className="text-lg font-medium">{selectedUser?.anotheruser.Name}</h2>
        </div>}

        {/* Messages */}
        <div className="flex-1 flex justify-center overflow-y-auto p-4 space-y-3 text-white">
          {show ? <div>
           {messages.map((mess)=>{
           return <h1 key={mess}>hello</h1>
           })}
          </div> : <div className="text-white text-2xl self-center">start a convo</div>}
        </div>

        {/* Input */}
       {show &&  <div className="p-4 border-t-2 border-[#2e2e2e] text-white flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg p-2 focus:outline-none"
            placeholder="Type a message"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter"/*  && handleSend() */}
          />
          <button
            /* onClick={handleSend} */
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
          </button>
        </div>}
      </div>
    </div>
 )
 
}