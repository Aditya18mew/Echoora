import { Navbar } from "./navbar"



export default function Dashboardlayout({
   children,
   left,
   right
}:{
   children:React.ReactNode,
   left:React.ReactNode,
   right:React.ReactNode
}){
 return (
    <div className="flex flex-col bg-[#1a1d21] min-h-screen">
         <Navbar></Navbar>
        <div className="flex text-white flex-1">
         <aside className="hidden lg:basis-[25%] lg:flex lg:flex-col p-3">{left}</aside>
        <div className="w-full lg:basis-[50%] pt-3">{children}</div>
         <aside className="hidden lg:basis-[25%] lg:block p-3 ">{right}</aside>
        </div> 
    </div>
 )
}