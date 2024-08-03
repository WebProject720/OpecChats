import { sendMail } from "@/helpers/sendEmail";
import DBconnect from "@/lib/DBconnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await DBconnect();

  try {
    const { email } = await request.json();
    const response = await sendMail(email);
    console.log(response);

    if (response) {
      return NextResponse.json({
        success: true,
        message: "Email Send Successfully !!",
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
