"use client"
import Link from "next/link"






export function SigninForm(){





return (
    <form className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className="forminput" type="text" placeholder="Email" name="Email"  />
        <input className="forminput" type="password" placeholder="Password" name="Password" />
       </div>
       <Link className="formlink" href="/forgetpassword">Forget password?</Link>
       <div><button type="submit" className="formbutton">Continue</button></div>
    </form>
)
    
}