import Image from "next/image";
import profile from "@/components/icons/profile1.svg"
import backgroundimg from "@/components/icons/𝑴𝒂𝒌𝒊𝒎𝒂.jpg"


export function MiniProfile(){
    return <div className="flex flex-col items-center bg-[#152433] rounded-2xl m-2">
     {/*     <Image src={backgroundimg} alt="background image" className="w-full h-24 rounded-t-2xl"></Image>
        <Image src={profile} className="w-18 h-18 rounded-full  flex-1 mt-[-25px]" alt="profile img"></Image> */}
        <div className="imagecontainer">
             <Image src={backgroundimg} alt="background image" className="w-full h-24 rounded-t-2xl"></Image>
        <Image src={profile} className="ogimage" alt="profile img"></Image>
        </div>
        <div className="flex flex-col items-center gap-0.5"><h1>Aditya parmar</h1>
             <p className="font-extralight text-gray-300">@parmar332</p>
              <p>hello i am king of ichenon</p>
        </div>
        <div className="flex justify-evenly w-full mt-2">
        <div>
            <p>463</p>
            <p>following</p>
        </div>
        <div>
            <p>463</p>
            <p>followers</p>
        </div>
        </div>   
    </div>
}