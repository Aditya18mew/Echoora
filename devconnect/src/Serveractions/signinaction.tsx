
"use server"

type formData={
    Email:string,
    Password:string
}


export async function Signinaction(formData:formData){
console.log(formData)
}