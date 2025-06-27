"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import github from "@/components/icons/github2.svg"
import instagram from "@/components/icons/instagram.svg"
import linkedin from "@/components/icons/linkedin.svg"
import defaultuser from "@/components/icons/defaultuser.svg"
import { UpdateBioinfo, UpdateSocialLinks } from "@/components/Serveraction";
import axios from "axios";



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

   function handlechange(e){
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
   async function handlesubmitBio(e){
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
     const res=await axios.post("http://localhost:3000/api/dashboard/follow",{Email:info.Email,isFollowed:info.isFollowed})
     console.log(res.data)
    }catch(err){
      console.log(err)
    }
   }




  return (
    <div className="w-full bg-[#1A1A1A] border-2 border-[#2e2e2e]">
     <div className=" pl-15 pr-15 mt-4">
      <h1 className="text-white text-3xl mb-1">Profile</h1>
      <p className="text-[#777777] text-xs mt-0.5">view your all profile details here</p>
      <div className="border-t-2 border-dashed border-[#444] mt-2 mb-4"></div>
     </div>
      {/* user profile section */}
      <div className="flex flex-row h-[450px] pl-15 pr-15 gap-10">
       <div className="flex flex-col h-[400px] items-center w-[500px]  border-2 rounded-2xl border-[#2e2e2e] pb-4">
                <Image src={info.profileimg || defaultuser} alt="Profile image" className="w-50 h-50 rounded-full mt-10"></Image>
          <h2 className="mt-6 mb-4 text-white">{info.username}</h2>
          <div className="flex gap-2">
            <Link href="#" className="text-[#777777] text-[15px] flex gap-1">followers:<span>{info.followercount}</span></Link>
            <Link href="#" className="text-[#777777] text-[15px] flex gap-1">following:<span>{info.followingcount}</span></Link>
          </div> 
          {!isOwner && <button onClick={follow} className="button w-[120px] mt-2.5 mb-2.5">{info.isFollowed ? "following":"follow"}</button>}
       </div>
       {/* user info section */}
        <div className="h-[400px] w-[800px] rounded-2xl border-[#2e2e2e] border-2">
              <h3 className="text-lg font-semibold ml-4 mt-4 text-white">Bio and other details</h3>
            {isOwner ? <form onSubmit={handlesubmitBio} className="flex flex-col">
             <div className="ml-4 mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
               <div className="ml-4 mt-2">
                <p className="text-[#888]">Name</p>
                <input type="text" className="profileforminput" value={info.Name} name="Name" onChange={handlechange} />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Email</p>
                <p className="text-white">{info.Email}</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">location</p>
                <input type="text" className="profileforminput" value={info.Location} name="Location" onChange={handlechange} />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Education</p>
                <input type="text" className="profileforminput" value={info.Education} onChange={handlechange} name="Education" />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Experience</p>
                <input type="text" className="profileforminput" value={info.Experience} name="Experience" onChange={handlechange} />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">WorkPlace</p>
                <input type="text" className="profileforminput" value={info.WorkPlace} onChange={handlechange} name="WorkPlace" />
              </div>
             </div>
              <button type="submit" className="button mr-5 mt-5 w-20 self-end">save</button>
                </form> 
                : 
                <div className="ml-4 mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
              {info.Name && <div className="ml-4 mt-2">
                <p className="text-[#888]">Name</p>
                <p className="text-white">{info.Name}</p>
              </div>}
              {info.Location && <div className="ml-4 mt-2">
                <p className="text-[#888]">Location</p>
                <p className="text-white">{info.Location}</p>
              </div>}
              {info.Education && <div className="ml-4 mt-2">
                <p className="text-[#888]">Education</p>
                <p className="text-white">{info.Education}</p>
              </div>}
             {info.Experience &&  <div className="ml-4 mt-2">
                <p className="text-[#888]">Experience</p>
                <p className="text-white">{info.Experience}</p>
              </div>}
            </div> }
          </div> 
      </div>
      {/* social links section */}
      <div className="mt-4 pl-15 pr-15">
        <div className=" border-2 rounded-2xl h-20 border-[#2e2e2e] flex flex-row items-center gap-4 pl-4">
          {isOwner ? <> <>
    {user?.Biodetails.sociallinks.Instagram ? <Link className="mt-6 mb-4 text-white" href={user.Biodetails.sociallinks.Instagram}><Image src={instagram} alt="Instagram Link"></Image></Link> : <>
      <h1 className="mt-6 mb-4 text-white"  onClick={()=>setshowpopup(prev=>({...prev,Instagram:!prev.Instagram}))} >
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
    {user?.Biodetails.sociallinks.Github ? <Link className="mt-6 mb-4 text-white" href={user.Biodetails.sociallinks.Github}><Image src={github} alt="Github Link"></Image></Link> : <>
      <h1 className="mt-6 mb-4 text-white" onClick={()=>setshowpopup(prev=>({...prev,github:!prev.github}))} >
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
    {user?.Biodetails.sociallinks.Linkedin ? <Link className="mt-6 mb-4 text-white" href={user.Biodetails.sociallinks.Linkedin}><Image src={linkedin} alt="Linkedin Link"></Image></Link> : <>
      <h1 className="mt-6 mb-4 text-white" onClick={()=>setshowpopup(prev=>({...prev,Linkedin:!prev.Linkedin}))} >
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
      {info.Instagram && <Link className="mt-6 mb-4 text-white" href={info.Instagram}><Image src={instagram} alt="Instagram Link"></Image></Link>}
      {info.Github && <Link className="mt-6 mb-4 text-white" href={info.Github}><Image src={github} alt="Github Link"></Image></Link>}
      {info.Linkedin && <Link className="mt-6 mb-4 text-white" href={info.Linkedin}><Image src={linkedin} alt="Linkedin Link"></Image></Link>}
    </>}
        </div>
      </div>
      {/* about section */}
      <div className="mt-4 pl-15 pr-15 mb-4">
        <div className=" border-2 rounded-2xl min-h-20 h-auto border-[#2e2e2e] flex flex-col  gap-4 pl-4">
          <div className="flex flex-col gap-2 m-2">
            <h1 className="text-white">About</h1>
            {isOwner ? <div><textarea className="Abouttextarea w-full h-auto" value={info.About} onChange={handlechange} name="About"></textarea></div>:
            <p className="text-white">{info.About}</p>} 
          </div>
        </div>
      </div>
     </div>

  ) 
}