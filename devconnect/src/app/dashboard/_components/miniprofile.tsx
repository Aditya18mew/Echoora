"use client"
import Link from "next/link"
import Image from "next/image"
import profile from "@/components/icons/profile1.svg"
import { useState } from "react"
import axios from "axios"
import backgroundimg from "@/components/icons/𝑴𝒂𝒌𝒊𝒎𝒂.jpg"
import defaultuser from "@/components/icons/defaultuser.svg"




type person={
     username:string,
     profileimg:string,
     followedAt:number,
     name:string,
     isFollowedBack:boolean
} 

type data={
    Name:string | undefined,
    image:string | undefined,
    username:string | undefined,
    followingcount:number | undefined,
    followercount:number | undefined
    peoples:person[] | undefined
}

export  function MiniProfile({Name,image,username,followingcount,followercount,peoples}:data){

       const [twonumber,setTwonumber]=useState({
        A:0,
        B:3
       })

       const [followingCount,setfollowingCount]=useState(followingcount || 0)
    
       const [list,setlist]=useState(peoples?.slice(twonumber.A,twonumber.B))
    
     
         async function follow(username:string,isFollowed:boolean){
        try{
         const res=await axios.post("http://localhost:3000/api/dashboard/follow",{username:username,isFollowed:isFollowed})
          if(res.data.success){
          if(res.data.task==='unfollowed'){
            setlist(prev=>prev?.map((person:person)=>person.username===username ? {...person,isFollowedBack:false}: person))
            setfollowingCount(prev=> prev-1)
          }
          if(res.data.task==="followed"){
           setlist(prev=>prev?.map((person:person)=>person.username===username ? {...person,isFollowedBack:true}: person))
            setfollowingCount(prev=> prev+1)
          }
        }
        }catch(err){
          console.log(err)
        }
       }
    
    
       function increase(){
        setTwonumber({A:twonumber.A+3,B:twonumber.B+3})
       }


    return <>
    {/* mini profile */}
    <div className="flex flex-col items-center bg-[#1e1e1e] border-1 border-[#333333] rounded-2xl m-2">
        <div className="imagecontainer">
             <Image src={backgroundimg} alt="background image" className="w-full h-24 rounded-t-2xl"></Image>
        <Image src={image || defaultuser} className="ogimage" alt="profile img"></Image>
        </div>
        <div className="flex flex-col items-center text-[#e0e0e0] gap-0.5"><h1>{Name}</h1>
             <p className="font-extralight text-gray-300">@{username}</p>
              <p>hello i am king of ichenon</p>
        </div>
        <div className="flex justify-evenly w-full mt-2">
        <div>
              <p>following</p>
            <p>{followingCount}</p>
        </div>
        <div>
             <p>followers</p>
            <p>{followercount}</p>
        </div>
        </div>    
    </div>
    {/* suggested user list */}
      <div className="flex flex-col bg-[#1e1e1e] border-1 border-[#333333] p-2 rounded-2xl m-2">
        <h1 className="text-lg m-1">Who is to follow you</h1>
        <div className="flex flex-col gap-2">{list?.slice(twonumber.A,twonumber.B).map((person)=>{
            return <div className="flex justify-evenly items-center mt-1" key={person.username}>
                 <Image src={profile} className="w-12 h-12 rounded-full" alt="profile img"></Image>
                <Link  href={`/profile/${person.username}`}><h1 className="text-lg">{person.name}</h1>
                     <p className="font-extralight text-gray-300">{person.username}</p>
                </Link>
                <button onClick={()=>follow(person.username,person.isFollowedBack)} className="bg-white w-16 h-8 rounded-2xl text-black">{person.isFollowedBack ? "unfollow":"follow"}</button>
            </div>
        })}

        </div>
        <button onClick={increase} className="text-blue-600 self-start m-2">show more</button>
        </div>
    </>
}