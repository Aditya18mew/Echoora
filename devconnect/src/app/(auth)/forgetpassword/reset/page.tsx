import { OtpForm } from "@/components/Auth/otpresetpasswordform"
import { ResetPasswordForm } from "@/components/Auth/resetpasswordform"






export  default async function ResetPassword({
    searchParams
}:{
    searchParams:Promise<{step?:string,email?:string}>
}){
    const {step,email}=await searchParams

    return  <>
    {step ?  <div className="forgetpassworddiv basediv">
               <div className="flex flex-col mt-4 mb-10 gap-3 items-center w-[350px]">
                   <h1 className="font-bold text-xl">Reset Password</h1>
               </div>
               <ResetPasswordForm Email={email} ></ResetPasswordForm>
            </div>
             :
              <div className="forgetpassworddiv basediv">
               <div className="flex flex-col mt-4 mb-10 gap-3 items-center w-[350px]">
                   <h1 className="font-bold text-xl">Reset Password</h1>
                   <p className="font-extralight pl-18">Enter OTP send to your Gmail {email}</p>
               </div>
               <OtpForm Email={email}></OtpForm>
            </div>}
    </>
}