
import "../../globals.css"
import Link from "next/link";
import { GithubButton,GoogleButton } from "@/components/Buttons";
import { SignupForm } from "@/components/Auth/signupform";







export default async function Signup(){

    
 return <div className="signupdiv basediv">
       <div className="flex flex-col mt-4 gap-1 items-center w-[350px]">
           <h1 className="font-bold text-xl">Sign up to Echoora</h1>
           <p className="font-extralight">Welcome! please fill in the details to get started</p>
       </div>
       <div className="flex w-[350px] justify-evenly mt-6 p-2">
       <GithubButton></GithubButton>
       <GoogleButton></GoogleButton>
       </div>
       <p className="self-center mt-4 mb-4">or</p>
        <SignupForm></SignupForm>
        <p className="font-light self-center">Already have an account? <Link className="font-semibold hover:text-neutral-700" href="/sign-in">Sign in</Link></p>
    </div>
}