


export default function Authlayout({
    children
}:{
    children:React.ReactNode
}){
    return (
        <div className="min-h-screen flex flex-col items-center bg-[#f3f4f6]">
            <div className="w-full text-start pl-4 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-3xl shadow-md">
                Echoora
            </div>
            <div className="authbaselayout shadow-lg">
                {children}
            </div>
        </div>
    )
}