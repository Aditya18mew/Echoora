import Image from "next/image";
import backgroundimg from "@/components/icons/𝑴𝒂𝒌𝒊𝒎𝒂.jpg"
import defaultuser from "@/components/icons/defaultuser.svg"
import axios from "axios";

type data={
    Name:string,
    image:string,
    username:string,
    followingcount:number,
    followercount:number

}

export async function MiniProfile({Name,image,username,followingcount,followercount}:data){


    return <div className="flex flex-col items-center bg-[#152433] rounded-2xl m-2">
        <div className="imagecontainer">
             <Image src={backgroundimg} alt="background image" className="w-full h-24 rounded-t-2xl"></Image>
        <Image src={image || defaultuser} className="ogimage" alt="profile img"></Image>
        </div>
        <div className="flex flex-col items-center gap-0.5"><h1>{Name}</h1>
             <p className="font-extralight text-gray-300">@{username}</p>
              <p>hello i am king of ichenon</p>
        </div>
        <div className="flex justify-evenly w-full mt-2">
        <div>
              <p>following</p>
            <p>{followingcount}</p>
        </div>
        <div>
             <p>followers</p>
            <p>{followercount}</p>
        </div>
        </div>    
    </div>
}