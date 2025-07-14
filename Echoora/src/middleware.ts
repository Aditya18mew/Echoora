import { NextRequest ,NextResponse} from "next/server";

export const config={
    matcher:["/","/dashboard/:path*",'/profile/:username*']
}




export async function middleware(req:NextRequest){
    const AccessToken= req.cookies.get("AccessToken")?.value
    const RefreshToken=req.cookies.get("RefreshToken")?.value

     if(req.nextUrl.pathname==="/" && AccessToken){
        return NextResponse.redirect(new URL("/dashboard",req.url))
      } 

    if(AccessToken){
       return NextResponse.next()
    }
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

           if(data.RefreshToken){
               response.cookies.set(`RefreshToken`,data.RefreshToken,{
            httpOnly:true,
            secure:isProd,
            sameSite:"strict",
            maxAge:60*60*24*7,
            path:"/"
           }) 
           }

           if(req.nextUrl.pathname==="/"){
            return NextResponse.redirect(new URL("/dashboard",req.url))
           }    

           return response
        } 
        return NextResponse.redirect(new URL("/sign-in",req.url))
    }
    return NextResponse.redirect(new URL("/sign-in",req.url))
}