import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token:", token);

    //check if token
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpire: { $gt: Date.now() },
    });
    
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // set new password
    const newPassword = reqBody.newPassword;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpire = undefined;
    await user.save();

    

    
    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
