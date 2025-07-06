"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import github from "@/components/icons/github2.svg"
import instagram from "@/components/icons/instagram.svg"
import linkedin from "@/components/icons/linkedin.svg"
import defaultuser from "@/components/icons/defaultuser.svg"
import { UpdateBioinfo, UpdateSocialLinks } from "@/components/Serveraction";
import axios from "axios";
import { useRouter } from "next/navigation";




type prop={
  isOwner:boolean,
  user:{
    Email:string,
    username:string,
    Biodetails:{
      name:string,
      Experience:string,
      Image:string,
      Education:string,
      Location:string,
      WorkPlace:string,
      About:string
      skills:[],
      sociallinks:{
        Instagram:string,
        Github:string,
        Linkedin:string
      }
    },
    isFollowed:boolean
    followers:{
      count:number,
    },
    following:{
      count:number,
    }
  } | undefined
}


export default function Profile({isOwner,user}:prop) {
  const router=useRouter()
   const [showpopup,setshowpopup]=useState({
    Instagram:false,
    github:false,
    Linkedin:false
   })

   const [info,setinfo]=useState({
    username:user?.username,
    Email:user?.Email,
    profileimg:user?.Biodetails.Image,
    Name:user?.Biodetails.name,
    Experience:user?.Biodetails.Experience,
    Location:user?.Biodetails.Location,
    Education:user?.Biodetails.Education,
    WorkPlace:user?.Biodetails.WorkPlace,
    About:user?.Biodetails.About,
    skills:user?.Biodetails.skills,
    Instagram:user?.Biodetails.sociallinks.Instagram,
    Github:user?.Biodetails.sociallinks.Github,
    Linkedin:user?.Biodetails.sociallinks.Linkedin,
    followercount:user?.followers.count || 0,
    followingcount:user?.following.count || 0,
    isFollowed:user?.isFollowed
   })

   function handlechange(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
    const {name,value}=e.target
    setinfo({...info,[name]:value})
   }

   async function handlesubmitSocialLink(e){
    e.preventDefault()
    const {name}=e.target
    try{
     const res=await UpdateSocialLinks(info.Email,info.Instagram,info.Github,info.Linkedin)
     setshowpopup(prev=>({...prev,[name]:false}))
     if(res.success){
      /*  */
     }
    }catch(err){
      console.log(err)
    }
   }
   async function handlesubmitBio(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try{
     const res=await UpdateBioinfo({
      Email:info.Email,
      Name:info.Name,
      Education:info.Education,
      Experience:info.Experience,
      Location:info.Location,
      WorkPlace:info.WorkPlace,
      About:info.About,
      skills:info.skills
    })
   if(res) {
    /*  */
   }
    }catch(err){
      console.log(err)
    }
   }

   async function follow(){
    try{
     const res=await axios.post("http://localhost:3000/api/dashboard/follow",{username:info.username,isFollowed:info.isFollowed})
    if(res.data.success){
      if(res.data.task==='unfollowed'){
         setinfo({...info,isFollowed:false,followercount:info.followercount-1})
      }
      if(res.data.task==="followed"){
        setinfo({...info,isFollowed:true,followercount:info.followercount+1})
      }
    }
    }catch(err){
      console.log(err)
    }
   }


   async function StartChat(){
    try{
    const res=await axios.post("http://localhost:3000/api/dashboard/chat",{username:info.username})
     if(res.data.success){
      router.push("/dashboard/chat")
     }
    }catch(err){
      console.log(err)
    }
   }




  return  <div className="w-full bg-[var(--Modern)] border-profile p-6">
         <div className="mb-6">
    <div className="flex flex-row justify-between">
       <div>
      <h1 className="text-[var(--primary)] text-3xl">Profile</h1>
    <p className="text-[#777777] text-xs mt-1">View your profile details here</p>
     </div>
     <div>
       <button onClick={StartChat} className="hover:bg-[#c5cad1] flex items-center justify-center rounded-lg w-auto h-8 bg-white  cursor-pointer transition">
            <span className="text-gray-700 hidden md:block m-2">Direct Message</span>
            <span className="text-gray-700 md:hidden m-2">DM</span>
    </button>
     </div>
    </div>
    <div className="border-t-2 border-dashed border-[#444] mt-3"></div>
  </div>
   <div className="flex flex-col lg:flex-row gap-6">
    {/* Profile Card */}
    <div className="flex flex-col items-center border-profile rounded-2xl w-full lg:w-[400px] py-6">
      <Image
        src={info.profileimg || defaultuser}
        alt="Profile image"
        className="w-32 h-32 rounded-full"
      />
      <h2 className="mt-4 text-[var(--primary)] text-xl font-semibold">{info.username}</h2>
      <div className="flex gap-4 mt-2 text-sm text-[#777777]">
        <Link href="#">Followers: <span>{info.followercount}</span></Link>
        <Link href="#">Following: <span>{info.followingcount}</span></Link>
      </div>
      {!isOwner && (
        <button
          onClick={follow}
          className="button"
        >
          {info.isFollowed ? "Following" : "Follow"}
        </button>
      )}
    </div>

    {/* Bio & Details */}
    <div className="w-full border-profile rounded-2xl p-4">
      <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">Bio and Other Details</h3>
      {isOwner ? (
        <form onSubmit={handlesubmitBio} className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <p className="text-[#888]">Name</p>
                <input type="text" className="profileforminput" value={info.Name} name="Name" onChange={handlechange} />
              </div>
              <div>
                <p className="text-[#888]">Email</p>
                <p className="text-[var(--primary)]">{info.Email}</p>
              </div>
              <div>
                <p className="text-[#888]">location</p>
                <input type="text" className="profileforminput" value={info.Location} name="Location" onChange={handlechange} />
              </div>
              <div>
                <p className="text-[#888]">Education</p>
                <input type="text" className="profileforminput" value={info.Education} onChange={handlechange} name="Education" />
              </div>
              <div>
                <p className="text-[#888]">Experience</p>
                <input type="text" className="profileforminput" value={info.Experience} name="Experience" onChange={handlechange} />
              </div>
              <div>
                <p className="text-[#888]">WorkPlace</p>
                <input type="text" className="profileforminput" value={info.WorkPlace} onChange={handlechange} name="WorkPlace" />
              </div>
          </div>
              
            <button type="submit" className="button w-24 mt-4 ml-auto">
            Save
          </button>

        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {info.Name && (
            <div>
              <p className="text-[#888]">Name</p>
              <p className="text-[var(--primary)]">{info.Name}</p>
            </div>
          )}
          {info.Location && (
            <div>
              <p className="text-[#888]">Location</p>
              <p className="text-[var(--primary)]">{info.Location}</p>
            </div>
          )}
          {info.Education && (
            <div>
              <p className="text-[#888]">Education</p>
              <p className="text-[var(--primary)]">{info.Education}</p>
            </div>
          )}
          {info.Experience && (
            <div>
              <p className="text-[#888]">Experience</p>
              <p className="text-[var(--primary)]">{info.Experience}</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
   <div className="mt-6">
        <div className="border-profile rounded-2xl flex items-center gap-6">
          {isOwner ? <> <>
    {user?.Biodetails.sociallinks.Instagram ? <Link className="mt-2 mb-2 text-[var(--primary)]" href={user.Biodetails.sociallinks.Instagram}><Image src={instagram} alt="Instagram Link"></Image></Link> : <>
      <h1 className="mt-2 mb-2 text-[var(--primary)]"  onClick={()=>setshowpopup(prev=>({...prev,Instagram:!prev.Instagram}))} >
       <Image src={instagram} alt="Instagram Link" ></Image>
        </h1>
        {showpopup.Instagram && <div className="popupdiv">
              <form name="Instagram" onSubmit={handlesubmitSocialLink}>
                <label>Instagram link:
                  <input type="text" name="Instagram" onChange={handlechange} value={info.Instagram} />
                  <button type="submit">save </button>
                </label>
                </form></div>}
      </>
     }
    </>
         <>
    {user?.Biodetails.sociallinks.Github ? <Link className="mt-2 mb-2 text-[var(--primary)]" href={user.Biodetails.sociallinks.Github}><Image src={github} alt="Github Link"></Image></Link> : <>
      <h1 className="mt-2 mb-2 text-[var(--primary)]" onClick={()=>setshowpopup(prev=>({...prev,github:!prev.github}))} >
       <Image src={github} alt="Github Link" ></Image>
        </h1>
        {showpopup.github && <div className="popupdiv">
              <form name="github" onSubmit={handlesubmitSocialLink}>
                <label>Github link:
                  <input type="text" value={info.Github} name="Github" onChange={handlechange}  />
                  <button  type="submit">save </button>
                </label>
                </form></div>}
      </>
     }
    </>
         <>
    {user?.Biodetails.sociallinks.Linkedin ? <Link className="mt-2 mb-2 text-[var(--primary)]" href={user.Biodetails.sociallinks.Linkedin}><Image src={linkedin} alt="Linkedin Link"></Image></Link> : <>
      <h1 className="mt-2 mb-2 text-[var(--primary)]" onClick={()=>setshowpopup(prev=>({...prev,Linkedin:!prev.Linkedin}))} >
       <Image src={linkedin} alt="Linkedin Link" ></Image>
        </h1>
        {showpopup.Linkedin && <div className="popupdiv">
              <form onSubmit={handlesubmitSocialLink}>
                <label>Linkedin link:
                  <input type="text" value={info.Linkedin} name="Linkedin" onChange={handlechange} />
                  <button type="submit">save</button>
                </label>
                </form></div>}
      </>
     }
    </></>: <>
      {info.Instagram && <Link className="mt-6 mb-4 text-[var(--primary)]" href={info.Instagram}><Image src={instagram} alt="Instagram Link"></Image></Link>}
      {info.Github && <Link className="mt-6 mb-4 text-[var(--primary)]" href={info.Github}><Image src={github} alt="Github Link"></Image></Link>}
      {info.Linkedin && <Link className="mt-6 mb-4 text-[var(--primary)]" href={info.Linkedin}><Image src={linkedin} alt="Linkedin Link"></Image></Link>}
    </>}
        </div>
      </div>


 <div className="mt-6">
    <div className="border-profile rounded-2xl p-4">
      <h1 className="text-white text-lg mb-2">About</h1>
      {isOwner ? (
        <textarea
          className="Abouttextarea w-full min-h-[200px]"
          value={info.About}
          onChange={handlechange}
          name="About"
        />
      ) : (
        <p className="text-[var(--primary)]">{info.About}</p>
      )}
    </div>
    </div>
</div>
}