
import SessionWrapper from "@/components/ClientWrapper"



export default function layout({
    children
}:{
    children:React.ReactNode
}){
    return (
<SessionWrapper>{children}</SessionWrapper>
    )
}