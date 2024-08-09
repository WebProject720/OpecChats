import { sendMail } from "@/helpers/sendEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const { email } = await request.json();
    const response = await sendMail(email);

    if (response) {
      return NextResponse.json({
        success: true,
        message: "Email Send Successfully !!",
        data:response
      },{status:200});
    } else {
      return NextResponse.json({
        success: false,
        message: "Email Not Send !!",
      },{status:400});
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Email Not Send !!",
    },{status:400});
  }
}
