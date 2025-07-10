
import mongoose from "mongoose";



  const ChatSchema=new mongoose.Schema({
            participants:[{ 
                username:{type:String,required:true},
                Name:String,
                profileimg:String
            }],
            latestcontent:String,
            upDatedAt:{type:Date,default:Date.now()}
        })

       const MessageSchema= new mongoose.Schema({
            ChatId:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
            sender:{
                username:String,
                message:String,
                createdAt:{type:Date,default:Date.now()}
            }
        })


 export const Chat=mongoose.models.Chat || mongoose.model("Chat",ChatSchema)
 export const Message=mongoose.models.Message || mongoose.model("Message",MessageSchema)


export async function connectdb(){
try{
    await mongoose.connect("mongodb://localhost:27017/devConnect")
}catch(err){
    console.log(err)
    process.exit(1)
}
}

export async function Deletemessage(deleteId:string){
    const Id=new mongoose.Types.ObjectId(deleteId)
    try{
    await Message.findByIdAndDelete(Id)
    }catch(err){
       console.log(err)
    }

}