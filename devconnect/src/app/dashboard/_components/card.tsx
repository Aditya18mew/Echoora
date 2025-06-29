"use client"
import Link from "next/link"
import Image from "next/image"
import profile from "@/components/icons/profile1.svg"
import { useState } from "react"
import axios from "axios"

type peoples=person[]

type person={
     username:string,
     profileimg:string,
     followedAt:number,
     name:string,
     isFollowedBack:boolean
} 

export function Card({peoples}:{peoples:peoples | undefined}){
   const [twonumber,setTwonumber]=useState({
    A:0,
    B:3
   })

   const [list,setlist]=useState(peoples?.slice(twonumber.A,twonumber.B))

 
     async function follow(username:string,isFollowed:boolean){
    try{
     const res=await axios.post("http://localhost:3000/api/dashboard/follow",{username:username,isFollowed:isFollowed})
      if(res.data.success){
      if(res.data.task==='unfollowed'){
        setlist(prev=>prev?.map((person:person)=>person.username===username ? {...person,isFollowedBack:false}: person))
      }
      if(res.data.task==="followed"){
       setlist(prev=>prev?.map((person:person)=>person.username===username ? {...person,isFollowedBack:true}: person))
      }
    }
    }catch(err){
      console.log(err)
    }
   }


   function increase(){
    setTwonumber({A:twonumber.A+3,B:twonumber.B+3})
   }


    return (
        <div className="flex flex-col bg-[#152433] p-2 rounded-2xl m-2">
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
    )
} 