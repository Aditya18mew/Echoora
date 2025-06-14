import mongoose from "mongoose";


        const UserSchema=new mongoose.Schema({
        Authdetails:{
        Email:String,
        Password:String,
        Otp:String,
        RefreshToken:String,
        RefreshtokencreateDate:Date,
        RefreshtokenexpiryDate:Date
        }
        })


 export const User=mongoose.models.User || mongoose.model("User",UserSchema)


export async function connectdb(){
try{
    await mongoose.connect("mongodb://localhost:27017/devConnect")
}catch(err){
    console.log(err)
    process.exit(1)
}
}

export async function FindOne(Email:string){
    try{
        const Currentuser=await User.findOne({"Authdetails.Email":Email})
        return Currentuser
    }catch(err){
        console.log(err)
    }
}