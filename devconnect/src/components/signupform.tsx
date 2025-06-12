


export function SignupForm(){




return (
    <form className="flex flex-col items-center self-center w-[350px] gap-1">
       <div className="flex flex-col mt-2 mb-2.5 items-center gap-5">
         <input className="forminput" type="text" placeholder="Email" name="Email" />
        <input className="forminput" type="text" placeholder="Password" name="Password" />
       </div>
       <div><button className="formbutton">Continue</button></div>
    </form>
)
    
}