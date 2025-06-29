
import Image from "next/image"
import defaultuser from "@/components/icons/defaultuser.svg"
import message from "@/components/icons/message.svg"
import notification from "@/components/icons/notification.svg"
import Link from "next/link"

type data={
  Name:string | undefined,
  username:string | undefined
  image:string | undefined
}

export function Navbar({Name,username,image}:data){
    return     <div className="w-full flex items-center justify-between h-16 px-6 bg-[#1a1d21] text-white shadow-md">
  <h1 className="hidden text-xl font-bold tracking-wide md:block">DevConnect</h1>
  <input
    type="text"
    placeholder="Search..."
    className=" w-84 lg:w-96 dashboardnavbarinput placeholder:text-gray-400"
  />
  <div className="flex items-center gap-4">
    <div className="hover:bg-[#727881] flex items-center justify-center rounded-full w-8 h-8 bg-white  cursor-pointer transition">
     <Image src={message} alt="message" className="w-6 h-6"></Image>
    </div>
    <div className="hover:bg-[#727881] flex items-center justify-center rounded-full w-8 h-8 bg-white cursor-pointer transition">
      <Image src={notification} alt="notification" className="w-6 h-6"></Image>
    </div>
    <Link href={`/profile/${username}`} className="flex items-center p-1 justify-between gap-2 w-10 md:w-auto h-10 rounded-3xl border border-gray-500 bg-[#1f242f] hover:border-purple-500 cursor-pointer transition">
      <Image src={image || defaultuser} className="w-8 h-8 rounded-full" alt="profile img"></Image>
      <h1 className="hidden md:block">{Name}</h1>
    </Link>
    </div>
</div>
}