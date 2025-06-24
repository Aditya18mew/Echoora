import { Card } from "./card"
import { MiniProfile } from "./miniprofile"






const random=[{
    name:"product 1",
    username:"dragon"
},
{
    name:"product 2",
    username:"dragonff"
},
{
    name:"product 3",
    username:"dragonczvz"
},
]


export default function Leftdashboard(){
    return (
        <>
        <MiniProfile></MiniProfile>
        <Card peoples={random}></Card> 
        </>
    )
}