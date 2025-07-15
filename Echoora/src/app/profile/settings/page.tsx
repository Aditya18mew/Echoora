"use client"
import back from "@/components/icons/back.png"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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



export default function Settings(){
   const router=useRouter()
    const [selectedTab,setselectedTab]=useState("Profile")

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
            <h1 className="text-white text-2xl">Settings</h1>
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
 </div>
    </div>
}