
export function validatemail(email:string){
const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
return emailregex.test(email)
}

export function validatepassword(password:string){
    const passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$!%*?&]{8,}$/
    return passwordregex.test(password)
}

export function validateotp(otp:string){
    const otpregex=/^\d{6}$/
    return otpregex.test(otp)
}