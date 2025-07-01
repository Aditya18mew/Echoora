
import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import { Chat,Message, connectdb } from "./mongoosedb"

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
      let willchat=await Chat.findOne({$and:[{"participants.username":{$all:[selfusername,username]}},{"participants":{$size:2}}]})
      console.log("joined")
    socket.join(willchat._id)
  })

  socket.on("send-message",async ({selfusername,username,message}:sendmesagedata)=>{
     let willchat=await Chat.findOne({$and:[{"participants.username":{$all:[selfusername,username]}},{"participants":{$size:2}}]})
     console.log(message)
    io.to(willchat._id).emit("receive-message",{message:message})
  })

  socket.on("disconnect",()=>{
    console.log("disconnected")
  })

})

server.listen(5000,()=>{
    console.log("server is listening")
})