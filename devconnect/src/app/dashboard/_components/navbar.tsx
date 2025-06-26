
import Image from "next/image"
import defaultuser from "@/components/icons/defaultuser.svg"

type data={
  Name:string,
  image:string
}

export function Navbar({Name,image}:data){
    return     <div className="w-full flex items-center justify-between h-16 px-6 bg-[#1a1d21] text-white shadow-md">
  <h1 className="text-xl font-bold tracking-wide">DevConnect</h1>
  <input
    type="text"
    placeholder="Search..."
    className=" w-96 dashboardnavbarinput placeholder:text-gray-400"
  />
  <div className="flex items-center gap-4">
    <div className="hover:bg-[#2a2d31] px-3 py-2 rounded-lg cursor-pointer transition">
      mess
    </div>
    <div className="hover:bg-[#2a2d31] px-3 py-2 rounded-lg cursor-pointer transition">
      noti
    </div>
    <div className="flex items-center p-1 justify-between gap-2 w-auto h-10 rounded-3xl border border-gray-500 bg-[#1f242f] hover:border-purple-500 cursor-pointer transition">
      <Image src={image || defaultuser} className="w-8 h-8 rounded-full " alt="profile img"></Image>
      <h1>{Name}</h1>
    </div>
    </div>
</div>
}