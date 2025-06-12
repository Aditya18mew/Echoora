import { BacktoHomebutton, ForgetpasswordForm } from "@/components/forgetpasswordform"



export default function ForgetPassword(){
 return <div className="forgetpassworddiv basediv">
       <div className="flex flex-col mt-4 mb-10 gap-3 items-center w-[350px]">
           <h1 className="font-bold text-xl">Forget Password</h1>
           <p className="font-extralight">Enter the email associated with your account</p>
       </div>
       <ForgetpasswordForm></ForgetpasswordForm>
       <BacktoHomebutton></BacktoHomebutton>
    </div>
}