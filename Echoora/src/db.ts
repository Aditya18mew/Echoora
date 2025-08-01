
import mongoose from "mongoose";


/* const DatabaseURL=process.env.DATABASE_BASE_URL */


type follower={
        username:string,
        profileimg:string,
        followedAt:number,
        name:string,
        isFollowedBack:boolean
            }

type following={
        username:string,
        profileimg:string,
        followedAt:number,
        name:string,
            }


  interface User{
    Authdetails:{
        Email:string,
        username:string,
        Password:string,
        Otp:string,
        RefreshToken:string,
        RefreshtokencreateDate:Date,
        RefreshtokenexpiryDate:Date,
        googleAuthDetails:{
            ProviderId:string,
            name:string,
            Image:string,
        }
        },
        Biodetails:{
            name:string,
            Image:string,
            Experience:string,
            Education:string,
            Location:string,
            WorkPlace:string,
            About:string,
            sociallinks:{
                Instagram:string,
                Github:string,
                Linkedin:string
            }
        },
        followers:{
            count:number,
            Arr:follower[]
        },
        following:{
            count:number,
            Arr:following[]
        },
        posts:[]
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
        isVerified:{type:Boolean,default:false},
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
            Image:{type:String,default:""},
            Experience:{type:String,default:""},
            Education:{type:String,default:""},
            Location:{type:String,default:""},
            WorkPlace:{type:String,default:""},
            About:{type:String,default:""},
            sociallinks:{
                Instagram:{type:String,default:""},
                Github:{type:String,default:""},
                Linkedin:{type:String,default:""}
            }
        },
        followers:{
            count:{type:Number,default:0},
            Arr:[{
                username:String,
                profileimg:String,
                followedAt:Date,
                name:String,
                isFollowedBack:Boolean
            }]
        },
        following:{
            count:{type:Number,default:0},
            Arr:[{
                username:String,
                profileimg:String,
                followedAt:Date,
                name:String
            }]
        },
        posts:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Post"
        }]
        })

        const PostSchema=new mongoose.Schema({
          author:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            content:{
                type:String,
                required:true,
                trim:true
            },
            media:{
                type:[String],
                default:[]
            },
            likes:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }],
            comments:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }],
            isEdited:{
                type:Boolean,
                default:false
            },
            createdAt:{
                type:Date,
                default:Date.now()
            },
            updatedAt:Date
        })

        PostSchema.pre("save", function (next){
           if(this.isModified()){
          this.updatedAt=new Date()
          next()
           }
        })

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

 export const User=mongoose.models.User || mongoose.model("User",UserSchema)
 export const Chat=mongoose.models.Chat || mongoose.model("Chat",ChatSchema)
 export const Message=mongoose.models.Message || mongoose.model("Message",MessageSchema)
 export const Post=mongoose.models.Post || mongoose.model("Post",PostSchema)


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

export async function StartChat(Email:string,username:string){
     try{
       const self=await User.findOne({"Authdetails.Email":Email})
       const user=await User.findOne({"Authdetails.username":username})
       let willchat=await Chat.findOne({$and:[{"participants.username":{$all:[self.Authdetails.username,username]}},{"participants":{$size:2}}]})
       if(!willchat){
           willchat= await Chat.create({"participants":[{
            username:self.Authdetails.username,
            Name:self.Biodetails.name,
            profileimg:self.Biodetails.Image },
            {username:username,
             Name:user.Biodetails.name,
             profileimg:user.Biodetails.Image   
            }]})
       }
        return willchat
     }catch(err){
         console.log(err)
     }
}

export async function FetchChat(Email:string){
    try{
        const self=await User.findOne({"Authdetails.Email":Email})
      const findchats=await Chat.find({"participants.username":self.Authdetails.username}).lean()
 return {selfusername:self.Authdetails.username,findchats:JSON.parse(JSON.stringify(findchats))}
    }catch(err){
        console.log(err)
        return {selfusername:null,findchats:[]}
    }
}

export async function Fetchmessage(selfusername:string,username:string){
      try {
     const willchat=await Chat.findOne({$and:[{"participants.username":{$all:[selfusername,username]}},{"participants":{$size:2}}]})
       const Messages=await Message.find({"ChatId":willchat._id})
       return JSON.parse(JSON.stringify(Messages))
      } catch (error) {
        console.log(error)
      }
}



export async function Getuserbyusername(username:string,curruser:string){
    try{
        const getUser=await User.findOne({"Authdetails.username":username}).select("-Authdetails.Password -Authdetails.RefreshToken")    /* .lean<Userlean>() */
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



export async function Followuser(username:string,email:string){
    /* username of whom you want to follow and email of your */
    try{
      const self=await User.findOne({"Authdetails.Email":email})
      const isFollowed:boolean=self.followers.Arr.some((follower:follower)=>follower.username===username) 
      const followerdetails:follower={
    username:self.Authdetails.username,
    profileimg:"",
    followedAt:Date.now(),
    name:self.Biodetails.name,
    isFollowedBack:isFollowed
  }
      const Tofollow=await User.findOneAndUpdate({"Authdetails.username":username},{$push:{"followers.Arr":followerdetails},$inc:{"followers.count":1}},{new:true})
      const followingdetails:following={
     username:Tofollow.Authdetails.username,
    profileimg:"",
    followedAt:Date.now(),
    name:Tofollow.Biodetails.name,
   } 
    if(isFollowed)  await User.updateOne({"Authdetails.Email":email,"followers.Arr.username":username},{$set:{"followers.Arr.$.isFollowedBack":true}})  
    await User.updateOne({"Authdetails.Email":email},{$push:{"following.Arr":followingdetails},$inc:{"following.count":1}})
    return {success:true}
    }catch(err){
        console.log(err)
    }
}

export async function unFollowuser(username:string,email:string){
    try{
   const self=  await User.findOneAndUpdate({"Authdetails.Email":email},{$pull:{"following.Arr":{username:username}},$inc:{"following.count":-1}},{new:true})
   const selfusername=self.Authdetails.username
   const isFollowed:boolean=self.followers.Arr.some((follower:follower)=>follower.username===username) 
   if(isFollowed)  await User.updateOne({"Authdetails.Email":email,"followers.Arr.username":username},{$set:{"followers.Arr.$.isFollowedBack":false}})
     await User.updateOne({"Authdetails.username":username},{$pull:{"followers.Arr":{username:selfusername}},$inc:{"followers.count":-1}})
     return {success:true}
    }catch(err){
        console.log(err)
    }
}


export async function getdatabyEmail(Email:string){
    try{
        const getUser=await User.findOne({"Authdetails.Email":Email}).lean<User>()
        if(!getUser){
            return {success:false}
        }

        /* it is a nice work-around but will need different option way to do this */
    const convertedfollowerarr:follower[]= JSON.parse(JSON.stringify(getUser.followers.Arr))
   
    const convertedfollowingarr:following[]= JSON.parse(JSON.stringify(getUser.following.Arr))
   

    const data={
        username:getUser.Authdetails.username,
        name:getUser.Biodetails.name,
        Image:getUser.Biodetails.Image,
        About:getUser.Biodetails.About,
        followers:{
                    count:getUser.followers.count,
                    Arr:convertedfollowerarr
                  },
        following:{
                    count:getUser.following.count,
                    Arr:convertedfollowingarr
                  },
        posts:getUser.posts
    }
    return {success:true,data:data}
    }catch(err){
        console.log(err)
    }

} 

export async function Search(query:string){
      try{
      const Arr=await User.find({"Biodetails.name":{$regex:query,$options:"i"}}).limit(8).select("Authdetails.username Biodetails.name Biodetails.Image")
      return Arr
      }catch(err){
        console.log(err)
      }
}

export async function FetchPosts(){
    try{
        const PostArr=(await Post.find())
        return JSON.parse(JSON.stringify(PostArr))
    }catch(err){
        console.log(err)
    }
}

export async function deleteaccount(Email:string){
    try{
      await User.deleteOne({"Authdetails.Email":Email})
      return true
    }catch(err){
        console.log(err)
        return false
    }
}





