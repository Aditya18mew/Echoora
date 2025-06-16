
import nodemailer from "nodemailer"





export async function SignupMailotp(email:string,otp:string){
    try {
        const transporter=nodemailer.createTransport({
         service:"gmail",
         auth:{
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_APP_PASS
         }
        })
        
        

    const message={
        from:process.env.ADMIN_EMAIL,
        to:email,
        subject:"Sign up OTP",
        html:`${otp}`,
        text:"OTP WILL EXPIRE IN 10MIN"
    } 
    
     const info=transporter.sendMail(message)
     return {success:true,response:(await info).response}

    }catch(err){
        console.log(err)
    }
}
export async function ForgetpasswordMailotp(email:string,otp:string){
    try {
        const transporter=nodemailer.createTransport({
         service:"gmail",
         auth:{
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_APP_PASS
         }
        })
        
        

    const message={
        from:process.env.ADMIN_EMAIL,
        to:email,
        subject:"Sign up OTP",
        html:`${otp}`,
        text:"OTP WILL EXPIRE IN 10MIN"
    } 
    
     const info=transporter.sendMail(message)
     return {success:true,response:(await info).response}

    }catch(err){
        console.log(err)
    }
}