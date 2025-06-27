
import mongoose from "mongoose";

type follower={
    username:string,
    profileimg:string,
    followedAt:Date,
    name:string,
    isFollowedBack:boolean
            }

            


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
            Image:String,
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
        },
        followers:{
            count:Number,
            Arr:[{
                username:String,
                profileimg:String,
                followedAt:Date,
                name:String,
                isFollowedBack:Boolean
            }]
        },
        following:{
            count:Number,
            Arr:[{
                username:String,
                profileimg:String,
                followedAt:Date,
                name:String
            }]
        },
        posts:[]
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

export async function Getuserbyusername(username:string,curruser:string){
    try{
        const getUser=await User.findOne({"Authdetails.username":username})/* .lean<Userlean>() */
        if(!getUser){
            return {success:false}
        }
        const isFollowed=getUser.followers.Arr.some((follower:follower)=>follower.username===curruser) 

       const user={
     Email:getUser.Authdetails.Email,
     username:getUser.Authdetails.username,
     Biodetails:{
            name:getUser.Biodetails.name,
            Image:getUser.Biodetails.Image,
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
        },
        isFollowed:isFollowed,
        followers:{
            count:getUser.followers.count,
        },
        following:{
            count:getUser.following.count,
        },
    }
    return {success:true,user:user}
    }catch(err){
        console.log(err)
    }

}



export async function getdatabyEmail(Email:string){
    try{
        const getUser=await User.findOne({"Authdetails.Email":Email})
        if(!getUser){
            return {success:false}
        }

       const data={
     username:getUser.Authdetails.username,
     name:getUser.Biodetails.name,
     Image:getUser.Biodetails.Image,
      About:getUser.Biodetails.About,
        followers:{
            count:getUser.followers.count,
            Arr:getUser.followers.Arr
        },
        following:{
            count:getUser.following.count,
            Arr:getUser.following.Arr
        },
        posts:getUser.posts
    }
    return {success:true,data:data}
    }catch(err){
        console.log(err)
    }

} 