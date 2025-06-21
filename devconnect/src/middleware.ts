import { NextRequest ,NextResponse} from "next/server";

export const config={
    matcher:["/dashboard:path*","/dashboard/profile:path*"]
}




export async function middleware(req:NextRequest){
    const AccessToken= req.cookies.get("AccessToken")?.value
    const RefreshToken=req.cookies.get("RefreshToken")?.value

    if(!AccessToken && RefreshToken){
        const res=await fetch(`${process.env.NEXTAUTH_URL}/api/auth/refresh`,{
          headers:{
            Cookie:`RefreshToken=${RefreshToken}`
          }
        })

        const data=await res.json()


         if(data.AccessToken){
            const isProd=process.env.NODE_ENV==="production"
            const response=NextResponse.next()
             response.cookies.set(`AccessToken`,data.AccessToken,{
            httpOnly:true,
            secure:isProd,
            sameSite:"strict",
            maxAge:60*15,
            path:"/"
           })
           return response
        } 
        return NextResponse.redirect(new URL("/sign-in",req.url))
    }
    return NextResponse.next()
}