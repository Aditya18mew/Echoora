import { OtpForm } from "@/components/otpform"


export default async function VerifyEmail({searchParams}:{
    searchParams:Promise<{email?:string}>
}){
    const {email}=await searchParams

    return <div className="forgetpassworddiv basediv">
           <div className="flex flex-col mt-4 mb-10 gap-3 items-center w-[350px]">
               <h1 className="font-bold text-xl">Sign up</h1>
               <p className="font-extralight pl-18">Enter OTP send to your Gmail {email}</p>
           </div>
           <OtpForm Email={email}></OtpForm>
        </div>
}