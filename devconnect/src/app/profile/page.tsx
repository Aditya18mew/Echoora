"use client"
import { signOut } from "next-auth/react";


export default function ProfilePage(){
    return <button className="border-2 text-red-500" onClick={()=>signOut()}>click me</button>
}