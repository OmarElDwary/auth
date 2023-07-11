import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";

connect()
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email});

        //check if user
        if (!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user)

        
        // send reset password email
        await sendMail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "Reset password email sent successfully",
            success: true
        })
        

 

    } catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}