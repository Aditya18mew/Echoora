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
            About:String,
            skills:[],
            sociallinks:{
                Instagram:String,
                Github:String,
                Linkedin:String
            }
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

export async function Getuserbyusername(username:string){
    try{
        const getUser=await User.findOne({"Authdetails.username":username})
        if(!getUser){
            return {success:false}
        }
       const user={
     Email:getUser.Authdetails.Email,
     username:getUser.Authdetails.username,
     Biodetails:{
            name:getUser.Biodetails.name,
            Experience:getUser.Biodetails.Experience,
            Education:getUser.Biodetails.Education,
            Location:getUser.Biodetails.Location,
            WorkPlace:getUser.Biodetails.WorkPlace,
            About:getUser.Biodetails.About,
            skills:getUser.Biodetails.skills,
            sociallinks:{
                Instagram:getUser.Biodetails.sociallinks.Instagram,
                Github:getUser.Biodetails.sociallinks.Github,
                Linkedin:getUser.Biodetails.sociallinks.Linkedin
            }
        }
    }
    return {success:true,user:user}
    }catch(err){
        console.log(err)
    }

}




