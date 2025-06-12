import { SignupForm } from "@/components/signupform";
import "../../globals.css"
import google from "@/components/icons/google.svg"
import github from "@/components/icons/github.svg"
import Image from "next/image";
import Link from "next/link";







export default function Signup(){

    
 return <div className="signupdiv basediv">
       <div className="flex flex-col mt-4 gap-1 items-center w-[350px]">
           <h1 className="font-bold text-xl">Sign up to devConnect</h1>
           <p className="font-extralight">Welcome! please fill in the details to get started</p>
       </div>
       <div className="flex w-[350px] justify-evenly mt-6 p-2">
        <button className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image src={github} alt="google" width={20} height={20}></Image>Github</button>
        <button className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image src={google} alt="google" width={20} height={20}></Image>Google</button>
       </div>
       <p className="self-center mt-4 mb-4">or</p>
        <SignupForm></SignupForm>
        <p className="font-light self-center">Already have an account? <Link className="font-semibold hover:text-neutral-700" href="/sign-in">Sign in</Link></p>
    </div>
}