import Image from "next/image";
import profile from "@/components/icons/profile.svg"
import Link from "next/link";




export default function Profile() {
  return (
    <div className="w-full bg-[#1A1A1A] border-2 border-[#2e2e2e]">
     <div className=" pl-15 pr-15 mt-4">
      <h1 className="text-white text-3xl mb-1">Profile</h1>
      <p className="text-[#777777] text-xs mt-0.5">view your all profile details here</p>
      <div className="border-t-2 border-dashed border-[#444] mt-2 mb-4"></div>
     </div>

      <div className="flex flex-row h-[450px] pl-15 pr-15 gap-10">
       <div className="flex flex-col h-[400px] items-center w-[500px]  border-2 rounded-2xl border-[#2e2e2e] pb-4">
                <Image src={profile} alt="Profile image" className="w-65 h-65 rounded-full mt-4"></Image>
          <h2 className="mt-6 mb-4 text-white">Aditya Parmar</h2>
          <div className="flex gap-2">
            <Link href="#" className="text-[#777777] text-[15px]">followers:100</Link>
            <Link href="#" className="text-[#777777] text-[15px]">following:432</Link>
          </div> 
       </div>
        <div className="h-[400px] w-[800px] rounded-2xl border-[#2e2e2e] border-2">
            <h3 className="text-lg font-semibold ml-4 mt-4 text-white">Bio and other details</h3>
            <div className="ml-4 mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Name</p>
                <p className="text-white">Aditya Parmar</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Email</p>
                <p className="text-white">parmaraditya242@gmail.com</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">location</p>
                <p className="text-white">shujalpur,madhya pradesh</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Education</p>
                <p className="text-white">under-graduate</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Role</p>
                <p className="text-white">Candidate</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">Experience</p>
                <p className="text-white">Aditya</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">skills</p>
                <p className="text-white">Aditya</p>
              </div>
              <div className="ml-4 mt-2">
                <p className="text-[#888]">tags</p>
                <p className="text-white"></p>
              </div>
            </div>
          </div> 
      </div>
     </div>
  )
}