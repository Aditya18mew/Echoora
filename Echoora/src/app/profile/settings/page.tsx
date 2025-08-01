"use client"
import back from "@/components/icons/back.png"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import setting from "@/components/icons/settings.svg"
import Link from "next/link"


type info={
    profileimg:string,
    Email:string,
    Name:string,
    Experience:string,
    Education:string,
      Location:string,
      WorkPlace:string,
      About:string,
      Instagram:string,
        Github:string,
        Linkedin:string,
}

type passwords={
  oldpassword:string,
  newpassword:string,
  confirmnewpassword:string
}



export default function Settings(){
   const router=useRouter()
    const [selectedTab,setselectedTab]=useState("Profile")
    const [showchangepassword,setshowchangepassword]=useState(false)
    const [passwords,setpasswords]=useState<passwords>({
       oldpassword:"",
       newpassword:"",
       confirmnewpassword:""
    })

  

    const [info,setinfo]=useState<info>({
        profileimg:"",
        Email:"",
        Name:"",
        Experience:"",
        Location:"",
        Education:"",
        WorkPlace:"",
        About:"",
        Instagram:"",
        Github:"",
        Linkedin:"",
       })

         const handlechangeinpassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
         const {name,value}=e.target
         setpasswords(prev=>({...prev,[name]:value}))
         console.log(passwords)
    }

    async function fetchuserinfo(){
        try{
        const res=await axios.get("http://localhost:3000/api/dashboard/usersetting")
        if(res.data.success){
           setinfo(res.data.info)
        }
        }catch(err){
            console.log(err)
        }
    }  
    
    useEffect(()=>{
        fetchuserinfo()
    },[])

    async function deleteaccount(){
      try{
       const res=await axios.get("http://localhost:3000/api/delete",{withCredentials:true})
       if(res.data.success){
        router.push("/")
       }
      }catch(err){
        console.log(err)
      }
    }

     

    function handlechange(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        const {name,value}=e.target
        setinfo({...info,[name]:value})
       }


    async function handlesubmitBio(e){
    e.preventDefault()
    try{
    const response=await axios.post("http://localhost:3000/api/dashboard/updateprofilebio",{
      Email:info.Email,
      Name:info.Name,
      Experience:info.Experience,
      Education:info.Education,
      Location:info.Location,
      WorkPlace:info.WorkPlace,
      About:info.About},{withCredentials:true})
      if(response.data.success){
        /* do something */
      }
    }catch(err){
        console.log(err)
    }
   }




    return <div className="flex">
    <aside className="w-32 md:w-64 bg-[var(--Modern)] shadow-md  flex flex-col p-3 min-h-screen">
        <div className="flex gap-3 items-center">
            <button onClick={()=>router.back()}><Image className="w-6 h-6" src={back} alt="back"></Image></button>
            <h1 className="text-white hidden md:block text-2xl">Settings</h1>
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center md:hidden mt-1 mb-2"><Image className="w-6 h-6 " src={setting} alt="setting"></Image></div>
        </div>
      <div className="flex flex-col gap-1 ml-3 mt-6">
        <h1 onClick={()=>setselectedTab("Profile")} className={selectedTab==="Profile"? "text-white flex p-1 rounded-lg  items-center h-10 bg-gray-700":"text-white flex p-1 rounded-lg  items-center h-10 hover:bg-zinc-800"}>Profile</h1>
        <h1 onClick={()=>setselectedTab("Account")} className={selectedTab==="Account"? "text-white flex p-1 rounded-lg items-center h-10 bg-gray-700":"text-white flex p-1 rounded-lg  items-center h-10 hover:bg-zinc-800"}>Account</h1>
        <h1 onClick={()=>setselectedTab("Privacy")} className={selectedTab==="Privacy"? "text-white flex p-1 rounded-lg  items-center h-10 bg-gray-700":"text-white flex p-1 rounded-lg  items-center h-10 hover:bg-zinc-800"}>Privacy</h1>
        <h1 onClick={()=>setselectedTab("Connected accounts")} className={selectedTab==="Connected accounts"? "text-white flex p-1 rounded-lg items-center h-10 bg-gray-700":"text-white flex p-1 rounded-lg items-center h-10 hover:bg-zinc-800"}>Connected accounts</h1>
      </div>
    </aside>
        <div className="w-full bg-[var(--Modern)] border-profile p-6">
        {selectedTab==="Profile" &&  <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
      <div className="grid grid-cols-1 gap-4">
                <div>
                <p className="text-white mb-1">Name</p>
                <input type="text" className="profileforminput md:w-[300px]" value={info.Name} onChange={handlechange}  name="Name" />
              </div>
              <div>
                <div>
                <p className="text-white mb-1">Education</p>
                <input type="text" className="profileforminput md:w-[300px]" onChange={handlechange} value={info.Education}   name="Education" />
              </div>
              <div>
                <p className="text-white mb-1">location</p>
                <input type="text" className="profileforminput md:w-[300px]" onChange={handlechange} value={info.Location}  name="Location"  />
              </div>
             
                <p className="text-white mb-1">Experience</p>
                <input type="text" className="profileforminput md:w-[300px]" onChange={handlechange} value={info.Experience}  name="Experience"  />
              </div>
              <div>
                <p className="text-white mb-1">WorkPlace</p>
                <input type="text" className="profileforminput md:w-[300px]" onChange={handlechange} value={info.WorkPlace}  name="WorkPlace" />
              </div>
              <div>
        <label className="block text-white mb-1">About</label>
       <textarea
          className="Abouttextarea w-full h-30"
          name="About"
          onChange={handlechange}
          value={info.About}
        />
      </div>
          </div>

         <button type="button" onClick={handlesubmitBio} className="button w-24 mt-4 ml-auto">
            Save
          </button></div>}
        {selectedTab==="Account" && <div className="space-y-6 max-w-xl">
          <h2 className="text-2xl font-bold text-white">Account access</h2>
             <div className="flex flex-col items-start md:items-center md:flex-row gap-2">
                <p className="text-white text-sm md:text-lg">Email:</p>
                <p className="text-[#888] text-sm md:text-lg">{info.Email}</p>
              </div>
              <div role="button" onClick={()=>setshowchangepassword(!showchangepassword)} className="text-white hover:opacity-90 cursor-pointer">Change Password {`>`}</div>
                 {showchangepassword && <form className="flex flex-col">
                  <label className="mb-1 text-white">old password</label>
                  <input type="text" value={passwords.oldpassword} onChange={handlechangeinpassword} name="oldpassword" className="profileforminput md:w-[300px]" />
                  <label className="mb-1 text-white">new password</label>
                  <input type="text" value={passwords.newpassword} onChange={handlechangeinpassword} name="newpassword" className="profileforminput md:w-[300px]" />
                  <label className="mb-1 text-white">confirm new password</label>
                  <input type="text" value={passwords.confirmnewpassword} onChange={handlechangeinpassword} name="confirmnewpassword" className="profileforminput md:w-[300px]" />
                  <Link className="text-blue-600 hover:text-[#5747e3] hover:scale-y-105 active:scale-y-95" href="/forgetpassword">Forget password?</Link>
                   <button className="button w-24 mt-4">submit</button>
                 </form>}
              <button className="text-red-500">Delete Account</button>
          </div>}  
 </div>
    </div>
}