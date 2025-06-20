"use client"
import Image from "next/image";
import profile from "@/components/icons/profile.svg"
import Link from "next/link";
import { useState } from "react";
import github from "@/components/icons/github.svg"
import instagram from "@/components/icons/instagram.svg"
import linkedin from "@/components/icons/linkedin.svg"


type prop={
  isOwner:boolean,
  user:{
    Email:string,
    username:string,
    Biodetails:{
      name:string
      skills:[],
      sociallinks:{
        Instagram:string,
        Github:string,
        Linkedin:string

      }
    }
  } | undefined
}


export default function Profile({isOwner,user}:prop) {
   const [SocialLink,setSocialLinks]=useState(user?.Biodetails.sociallinks)
   const [showpopup,setshowpopup]=useState({
    Instagram:false,
    github:false,
    Linkedin:false
   })



  return (
    <div className="w-full bg-[#1A1A1A] border-2 border-[#2e2e2e]">
     <div className=" pl-15 pr-15 mt-4">
      <h1 className="text-white text-3xl mb-1">Profile</h1>
      <p className="text-[#777777] text-xs mt-0.5">view your all profile details here</p>
      <div className="border-t-2 border-dashed border-[#444] mt-2 mb-4"></div>
     </div>

      <div className="flex flex-row h-[450px] pl-15 pr-15 gap-10">
       <div className="flex flex-col h-[400px] items-center w-[500px]  border-2 rounded-2xl border-[#2e2e2e] pb-4">
                <Image src={profile} alt="Profile image" className="w-65 h-65 rounded-full mt-4"></Image>
          <h2 className="mt-6 mb-4 text-white">Aditya Parmar</h2>
          <div className="flex gap-2">
            <Link href="#" className="text-[#777777] text-[15px]">followers:100</Link>
            <Link href="#" className="text-[#777777] text-[15px]">following:432</Link>
          </div> 
       </div>
        <div className="h-[400px] w-[800px] rounded-2xl border-[#2e2e2e] border-2">
            <h3 className="text-lg font-semibold ml-4 mt-4 text-white">Bio and other details</h3>
            {isOwner ? <form className="ml-4 mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Name</p>
                <input type="text" />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Email</p>
                <input type="text" />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">location</p>
                <input type="text" />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Education</p>
                <input type="text" />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Role</p>
                <input type="text" />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Experience</p>
                <input type="text" />
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">skills</p>
                <p className="text-white">Aditya</p>
              </div>
            </form> : <div className="ml-4 mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
              {user?.Biodetails.name && <div className="ml-4 mt-2">
                <p className="text-[#888]">Name</p>
                <p className="text-white">{user.Biodetails.name}</p>
              </div>}
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Email</p>
                <p className="text-white">parmaraditya242@gmail.com</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">location</p>
                <p className="text-white">shujalpur,madhya pradesh</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Education</p>
                <p className="text-white">under-graduate</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Role</p>
                <p className="text-white">Candidate</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Experience</p>
                <p className="text-white">Aditya</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">skills</p>
                <p className="text-white">Aditya</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">tags</p>
                <p className="text-white"></p>
              </div>
            </div> }
            
          </div> 
      </div>
      <div className="mt-4 pl-15 pr-15">
        <div className=" border-2 rounded-2xl h-20 border-[#2e2e2e] flex flex-row items-center gap-4 pl-4">
         <>
    {SocialLink?.Instagram ? <Link className="mt-6 mb-4 text-white" href={SocialLink.Instagram}><Image src={instagram} alt="Instagram Link"></Image></Link> : <>
      <h1 className="mt-6 mb-4 text-white" onClick={()=>setshowpopup(prev=>({...prev,Instagram:true}))} >
       <Image src={instagram} alt="Instagram Link" ></Image>
        </h1>
        {showpopup.Instagram && <div className="popupdiv">
              <form className="">
                <label>Instagram link:
                  <input type="text" className="ml-1.5 mr-0.5 border border-gray-700 rounded-[10px]" />
                  <button className="ml-2 rounded-[3px] bg-blue-500 text-white" onClick={()=>setshowpopup(prev=>({...prev,Instagram:false}))}>save </button>
                </label>
                </form></div>}
      </>
     }
    </>
         <>
    {SocialLink?.Github ? <Link className="mt-6 mb-4 text-white" href={SocialLink.Github}><Image src={instagram} alt="Github Link"></Image></Link> : <>
      <h1 className="mt-6 mb-4 text-white" onClick={()=>setshowpopup(prev=>({...prev,github:true}))} >
       <Image src={github} alt="Github Link" ></Image>
        </h1>
        {showpopup.github && <div className="popupdiv">
              <form className="">
                <label>Github link:
                  <input type="text" className="ml-1.5 mr-0.5 border border-gray-700 rounded-[10px]" />
                  <button className="ml-0.5" onClick={()=>setshowpopup(prev=>({...prev,github:false}))}>save </button>
                </label>
                </form></div>}
      </>
     }
    </>
         <>
    {SocialLink?.Linkedin ? <Link className="mt-6 mb-4 text-white" href={SocialLink.Linkedin}><Image src={linkedin} alt="Linkedin Link"></Image></Link> : <>
      <h1 className="mt-6 mb-4 text-white" onClick={()=>setshowpopup(prev=>({...prev,Linkedin:!prev.Linkedin}))} >
       <Image src={linkedin} alt="Linkedin Link" ></Image>
        </h1>
        {showpopup.Linkedin && <div className="popupdiv">
              <form className="">
                <label>Linkedin link:
                  <input type="text" className="ml-1.5 mr-0.5 border border-gray-700 rounded-[10px]" />
                  <button className="ml-0.5" onClick={()=>setshowpopup(prev=>({...prev,Linkedin:false}))}>save</button>
                </label>
                </form></div>}
      </>
     }
    </>
        </div>
      </div>
     </div>

  )
}