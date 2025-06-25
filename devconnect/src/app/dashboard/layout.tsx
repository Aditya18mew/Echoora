


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
       <div className="w-full h-16 text-start pl-4 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl shadow-md">
                dev Connect
            </div>
        <div className="flex text-white flex-1">
         <aside className="hidden lg:basis-[25%] lg:flex lg:flex-col p-3">{left}</aside>
        <div className="w-full lg:basis-[50%] pt-3">{children}</div>
         <aside className="hidden lg:basis-[25%] lg:block p-3 ">{right}</aside>
        </div> 
    </div>
 )
}