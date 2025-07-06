"use client"
import Image from "next/image"
import defaultuser from "@/components/icons/defaultuser.svg"
import message from "@/components/icons/message.svg"
import notification from "@/components/icons/notification.svg"
import Link from "next/link"
import React, { useCallback, useEffect, useState } from "react"



type data={
  Name:string | undefined,
  username:string | undefined
  image:string | undefined
}

type searchuser={
  Authdetails:{
    username:string
  },
  Biodetails:{
    name:string,
    Image:string
  },
  _id:object
} 

export function Navbar({Name,username,image}:data){
  const [isSearching,setisSearching]=useState(false)
  const [query,setquery]=useState<string>("")
  const [Error,setError]=useState({
    isError:false,
    Errmessage:"error try again"
  })
  const [results,setresults]=useState<searchuser[]>([])

  const debounce=UseDebounce(query,500)

   const fetchsearch=useCallback(async (search:string)=>{
    if(search.trim()===""){
      setresults([])
      return
    }
         try{
        const res=await fetch("http://localhost:3000/api/dashboard/search",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({search:search})
        })
        if(!res.ok){
           setError(prev=>({...prev,isError:true}))
        }
        const {Arr}=await res.json()
        setresults(Arr)
        setisSearching(true)
         }catch(err){
          setError(prev=>({...prev,isError:true}))
          console.log(err)
         }
   },[])



  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    if(e.target.value===""){
       setisSearching(false)
    }
     setquery(e.target.value)
  }

  useEffect(()=>{
    if(debounce){
      fetchsearch(debounce)
    }
  },[debounce,fetchsearch])



    return   <>
     <div className="w-full flex items-center justify-between h-16 px-6 bg-transparent text-white shadow-md relative">
  <h1 className="hidden text-xl font-bold tracking-wide md:block">Echoora</h1>
   <input
    type="text"
    placeholder={Error.isError ? Error.Errmessage : "Search..."}
    name="Search"
    value={query}
    onChange={handleChange}
    className=" w-84 lg:w-96 dashboardnavbarinput sticky  placeholder:text-gray-400"
  />

  <div className="flex items-center gap-4">
    <Link href="/dashboard/chat" className="hover:bg-[#727881] flex items-center justify-center rounded-full w-8 h-8 bg-white  cursor-pointer transition">
     <Image src={message} alt="message" className="w-6 h-6"></Image>
    </Link>
    <div className="hover:bg-[#727881] flex items-center justify-center rounded-full w-8 h-8 bg-white cursor-pointer transition">
      <Image src={notification} alt="notification" className="w-6 h-6"></Image>
    </div>
    <Link href={`/profile/${username}`} className="flex items-center p-1 justify-between gap-2 w-10 md:w-auto h-10 rounded-3xl border border-gray-500 bg-[#1f242f] hover:border-purple-500 cursor-pointer transition">
      <Image src={image || defaultuser} className="w-8 h-8 rounded-full" alt="profile img"></Image>
      <h1 className="hidden md:block">{Name}</h1>
    </Link>
    </div>
</div>
 { isSearching && results.length &&  <div className="w-full md:w-148   md:p-0 flex px-3  self-start md:self-center h-auto z-10  text-white">
 <ul className="w-full bg-[#1a1d21] flex flex-col px-2 py-2 rounded-lg">
    {results.map((user:searchuser)=>{
      return <>
      {user.Authdetails.username!==username && <Link href={`/profile/${user.Authdetails.username}`} key={user.Authdetails.username}>
      <div className="flex flex-row m-1 p-1 gap-3 items-center">
          <Image src={user.Biodetails.Image || defaultuser} className="w-8 h-8 rounded-full" alt="profileimg"></Image>
           <h2>{user.Biodetails.name} - <span className="font-extralight text-sm text-gray-400">{user.Authdetails.username}</span></h2>
        </div></Link>}
      </>
    })}
 </ul>
  </div>} 
    </>
}




function UseDebounce(Search:string,delay:number){
  const [debounce,setdebounce]=useState<string>()

  useEffect(()=>{
   const timer=setTimeout(()=>{
     setdebounce(Search)
   },delay)

   return ()=>clearTimeout(timer)
  },[Search,delay])

return debounce
}