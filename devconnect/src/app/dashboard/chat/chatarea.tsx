"use client"
import { useState } from "react";



const dummyMessages = [
  { from: "Alice", text: "Hey there!" },
  { from: "me", text: "Hello! How are you?" },
  { from: "Alice", text: "All good. You?" },
];

type fetchChats={
    participants:{username:string,Name:string,profileimg:string}[]
    upDatedAt:string
    _id:string
}[] | undefined


export function ChatArea({fetchChats}:{fetchChats:fetchChats}){

  const [selectedUser, setSelectedUser] = useState("Alice");
  const [messages, setMessages] = useState(dummyMessages);
  const [newMsg, setNewMsg] = useState("");


 return  (
  <div className="h-screen flex bg-[#1a1d21]">

      <div className="w-72 border-r-2 border-[#2e2e2e] p-4 hidden md:block">
        <h2 className="text-xl text-white font-semibold mb-4">Chats</h2>
        <ul className="space-y-2">
            {fetchChats?.map((user) => (
            <li
              key={user._id}
              className={`p-2 rounded cursor-pointer text-white ${
                selectedUser === user.participants[1].username ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setSelectedUser(user.participants[1].Name)}
            >
              {user.participants[1].Name}
           
            </li> 
          ))}
        </ul>
      </div>
        <div className="flex-1 flex flex-col bg-[#1a1d21]">
        {/* Header */}
        <div className="border-b-2 border-[#2e2e2e] p-4 text-white flex items-center">
          <h2 className="text-lg font-medium">{selectedUser}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-white">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.from === "me"
                  ? "bg-gray-700 text-white self-end ml-auto"
                  : "bg-gray-700 text-white self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-[#2e2e2e] text-white flex items-center gap-2">
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
        </div>
      </div>
    </div>
 )
 
}