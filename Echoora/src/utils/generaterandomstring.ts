

export function Randomstring(){

    const length=Math.floor(Math.random()*3)+14
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*"
    let result=""
    for(let i=0;i<length;i++){
       result+=chars[Math.floor(Math.random()*chars.length)]
    }
     return result
}