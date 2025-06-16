"use client"
import google from "@/components/icons/google.svg"
import github from "@/components/icons/github.svg"
import Image from "next/image";
import { redirect } from "next/navigation";
import "../app/globals.css"
import { signIn,signOut,useSession} from "next-auth/react";
import { SigninthroughGoogle } from "./Serveraction";


export function GithubButton(){
    return       <button className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image src={github} alt="google" width={20} height={20}></Image>Github</button>
}

export function GoogleButton(){
          const { data: session } = useSession();


    async function handlesubmit(){
     await signIn("google")
     try{
   /*   if(!session) return
     if(!session?.user) return
     const details={
        Email:session.user.email,
        name:session.user.name,
        Image:session.user.image
     }
  const res=await SigninthroughGoogle(details)
       await signOut()
      console.log(res) */
     }catch(err){
       console.log(err)
     }
    }

    return <button onClick={handlesubmit} className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image src={google} alt="google" width={20} height={20}></Image>Google</button>
}


export function BacktoHomebutton(){
 return  <div  className="BacktoHomediv"><button onClick={()=>redirect("/")}>Back to Home</button></div>
}


export function Spinnerinsidebutton(){
    return <div className="spinner"></div>
}