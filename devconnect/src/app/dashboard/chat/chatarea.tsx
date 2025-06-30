"use client"
import { useState } from "react";



const dummyMessages = [
  { from: "Alice", text: "Hey there!" },
  { from: "me", text: "Hello! How are you?" },
  { from: "Alice", text: "All good. You?" },
];





export function ChatArea(){

  const [selectedUser, setSelectedUser] = useState("Alice");
  const [messages, setMessages] = useState(dummyMessages);
  const [newMsg, setNewMsg] = useState("");


 return   <div className="flex-1 flex flex-col bg-[#1a1d21]">
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
}