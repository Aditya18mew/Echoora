"use client"
import google from "@/components/icons/google.svg"
import github from "@/components/icons/github.svg"
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import "../app/globals.css"
import { signIn} from "next-auth/react";




export function GithubButton(){
    return       <button className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image className="w-5 h-5" src={github} alt="google"></Image>Github</button>
}

export function GoogleButton(){
    async function handlesignin(){
     await signIn("google")
    }
    return <button onClick={handlesignin} className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image className="w-5 h-5" src={google} alt="google"></Image>Google</button>
}


export function BacktoHomebutton(){
 return  <div  className="BacktoHomediv"><button onClick={()=>redirect("/")}>Back to Home</button></div>
}


export function Spinnerinsidebutton(){
    return <div className="spinner"></div>
}

export function BackfromChat(){
    const router=useRouter()
     function back(){
        router.back()
    }
    return <button onClick={back}>{`<-`}</button>
}




 