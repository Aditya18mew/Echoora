"use server"

type formData={
    Email:string,
    Password:string
}


export async function Signupaction(formData:formData){
console.log(formData)
}