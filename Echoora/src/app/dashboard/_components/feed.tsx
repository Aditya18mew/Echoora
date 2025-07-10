"use client"

import { data } from "@/components/fakedata"
import profile from "@/components/icons/profile1.svg"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

type Post={
  author:string,
  content:string,
  media:string[],
  likes:[],
  comments:[],
  isEdited:boolean,
  createdAt:Date
  updatedAt:Date          
}




export  default function Feed(){
  const [Posts,setPosts]=useState<Post[]>([])
 

async function fetchPost(){
  try{
    const res=await axios.get("http://localhost:3000/api/dashboard/post",{withCredentials:true})
    if(res.data.success){
      setPosts(res.data.PostArr)
    }
  }catch(err){
    console.log(err)
  }
}

/* useEffect(()=>{
  fetchPost()
  console.log(Posts)
},[])
 */


return <div className="feed">
        <div className="bg-[#121212] rounded-2xl mb-5 p-4 border border-zinc-800 shadow-md shadow-white/5 transition-shadow duration-300">
          
           <div className="flex flex-col gap-2 justify-between items-start">
             <div className="flex gap-4 w-full items-center">
               <Image
                src={profile}
                className="w-14 h-14 rounded-full object-cover"
                alt="profile img"
               />
               <input type="text" className="postinput" placeholder="whats happenning" />
             </div>
             <div className="flex gap-3 ml-18">
               <button className="w-24 border h-10 rounded-2xl border-gray-500 bg-[#101f2d]">Photo</button>
               <button className="w-24 border h-10 rounded-2xl border-gray-500 bg-[#101f2d]">Video</button>
             </div>
          </div>

       </div>

          {data.map((post)=>{
           return  <div key={post.id} className="bg-[#121212] border border-zinc-800 rounded-2xl mb-5 p-4 shadow-md shadow-white/5 transition-shadow duration-300">
          
           <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Image
            src={profile}
            className="w-14 h-14 rounded-full object-cover"
            alt="profile img"
          />
          <div className="flex flex-col">
            <div className="flex gap-2 items-center text-[var(--primary)]">
              <h1 className="font-semibold">Aditya Parmar</h1>
              <span className="text-sm text-gray-400">@parmar332</span>
            </div>
            <p className="text-xs text-gray-500">{`hello`}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white px-2">⋯</button>
      </div>
       <h2 className="text-lg text-[var(--primary)] font-medium mt-4 ml-2">{post.title}</h2>

      <p className="text-gray-300 mt-2 ml-2">{post.body}</p>

      <div className="mt-3 ml-2 text-sm text-gray-500">👀 {post.views} views</div>
           <div className="flex gap-4 justify-between mt-4 px-2">
        <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#293043] text-white hover:bg-[#39475f] transition">
          ❤ Like
          <span className="text-sm text-gray-300">{post.reactions.likes}</span>
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#293043] text-white hover:bg-[#39475f] transition">
          💬 Comment
          <span className="text-sm text-gray-300">{post.reactions.dislikes}</span>
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#293043] text-white hover:bg-[#39475f] transition">
          🔄 Share
        </button>
      </div>

      </div>
      })}
    </div>
}