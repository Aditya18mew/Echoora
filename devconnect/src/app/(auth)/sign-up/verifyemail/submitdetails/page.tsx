"use client"

import { useState } from "react"


export default function BioDetails(){
    const [role,setrole]=useState("")





    return <>
    { role==="candidate" ? 
         <form className="flex flex-col gap-2">
            <label className="flex flex-row gap-2 items-center">
         <p>Location:</p>
          <input className="forminput" type="text" />
        </label>
            <label className="flex flex-row items-center gap-2">
         <p>Education:</p>
          <input  className="forminput" type="text" />
        </label>
        </form> 
        :
        role==="recruter" ?
         <form className="flex flex-col gap-2">
            <label className="flex flex-row gap-2 items-center">
         <p>Location:</p>
          <input className="forminput" type="text" />
        </label>
            <label className="flex flex-row items-center gap-2">
         <p>WorkPlace:</p>
          <input  className="forminput" type="text" />
        </label>
        </form> 
        :
        <div className="h-[200px] basediv">
             <h1 className="font-semibold text-xl">Sign up as:</h1>
             <button onClick={()=>{setrole("candidate")}} className="formbutton">Candidate</button>
             <button onClick={()=>{setrole("recruter")}} className="formbutton">Recruter</button>
            </div>
    }
    </>
    
}