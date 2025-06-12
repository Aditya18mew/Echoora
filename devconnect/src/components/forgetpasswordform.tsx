"use client"

import { redirect } from "next/navigation"





export function ForgetpasswordForm(){




return (
    <form className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className="forminput" type="text" placeholder="Email" name="Email" />
       </div>
       <div><button className="formbutton">Continue</button></div>
    </form>
)
    
}

export function BacktoHomebutton(){
 return  <div  className="BacktoHomediv"><button onClick={()=>redirect("/")}>Back to Home</button></div>
}