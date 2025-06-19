import mongoose from "mongoose";



        const UserSchema=new mongoose.Schema({
        Authdetails:{
        Email:String,
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
        },
        Password:String,
        Otp:String,
        RefreshToken:String,
        RefreshtokencreateDate:Date,
        RefreshtokenexpiryDate:Date,
        googleAuthDetails:{
            ProviderId:String,
            name:String,
            Image:String,
        }
        },
        Biodetails:{
            name:String,
            Experience:String,
            Education:String,
            Location:String,
            WorkPlace:String,
            skills:[],
            sociallinks:[]
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




export async function CreateUser(Email:string){
    try{
         const newUser=await new User({
                Authdetails:{
                    Email:Email
                }
            })
            await newUser.save()
    }catch(err){
        console.log(err)
    }
}