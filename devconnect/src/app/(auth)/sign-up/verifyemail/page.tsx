

export default async function VerifyEmail({searchParams}:{
    searchParams:Promise<{email?:string}>
}){
    const {email}=await searchParams
    return <h1>{email}</h1>
}