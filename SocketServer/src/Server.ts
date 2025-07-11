import mongoose from "mongoose";
import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import { Chat,Message, connectdb,Deletemessage } from "./mongoosedb"


type sendmesagedata={
    selfusername:string,
    username:string,
    sender:{
      username:string,
      message:string,
      time:string
    }
}

const app=express()
const server=http.createServer(app)
app.use(cors())
 

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",async (socket)=>{
    await connectdb()
    console.log("User connected")


  socket.on("join-chat",async ({selfusername,username}:{selfusername:string,username:string})=>{
      const willchat=await Chat.findOne({$and:[{"participants.username":{$all:[selfusername,username]}},{"participants":{$size:2}}]})
      const roomId=willchat._id.toString()
    socket.join(roomId)
  
  })

  socket.on("delete-message",async ({roomId,deleteId}:{roomId:string,deleteId:string})=>{
     await Deletemessage(deleteId)
     io.to(roomId).except(socket.id).emit("messageDeleted",deleteId)
  })

  socket.on("send-message",async ({selfusername,username,sender}:sendmesagedata)=>{
     const willchat=await Chat.findOne({$and:[{"participants.username":{$all:[selfusername,username]}},{"participants":{$size:2}}]})
     const roomId=willchat._id.toString()
     willchat.latestcontent=sender.message
     willchat.upDatedAt=Date.now()
     await willchat.save()
     
     const newMessage=await Message.create({
      ChatId:willchat._id,
      sender:{
        username:sender.username,
        message:sender.message,
        time:sender.time
      }
     })
    io.to(roomId).emit("receive-message",{roomId:roomId,newMessage:newMessage})
  }) 

  socket.on("disconnect",()=>{
    console.log("disconnected")
  })

})

server.listen(5000,()=>{
    console.log("server is listening")
})