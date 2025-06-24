import Link from "next/link"
import Image from "next/image"
import profile from "@/components/icons/profile1.svg"

type peoples=person[]

type person={
    name:string,
    username:string
}

export function Card({peoples}:{peoples:peoples}){
    return (
        <div className="flex flex-col bg-[#152433] p-2 rounded-2xl m-2">
        <h1 className="text-lg m-1">Who is to follow you</h1>
        <div className="flex flex-col gap-2">{peoples.map((person)=>{
            return <div className="flex justify-evenly items-center mt-1" key={person.username}>
                 <Image src={profile} className="w-12 h-12 rounded-full" alt="profile img"></Image>
                <Link  href={`/profile/${person.username}`}><h1 className="text-lg">{person.name}</h1>
                     <p className="font-extralight text-gray-300">{person.username}</p>
                </Link>
                <button className="bg-white w-16 h-8 rounded-2xl text-black">follow</button>
            </div>
        })}

        </div>
        <button className="text-blue-600 self-start m-2">show more</button>
        </div>
    )
} 