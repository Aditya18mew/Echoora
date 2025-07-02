
import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import { Chat,Message, connectdb } from "./mongoosedb"
import { Client } from "socket.io/dist/client"

type sendmesagedata={
    selfusername:string,
    username:string,
    message:string
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

  socket.on("send-message",async ({selfusername,username,message}:sendmesagedata)=>{
     const willchat=await Chat.findOne({$and:[{"participants.username":{$all:[selfusername,username]}},{"participants":{$size:2}}]})
     const roomId=willchat._id.toString()
    io.to(roomId).except(socket.id).emit("receive-message",message)
  }) 

  socket.on("disconnect",()=>{
    console.log("disconnected")
  })

})

server.listen(5000,()=>{
    console.log("server is listening")
})