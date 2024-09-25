// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import renderEmailTemplate from "./mailTemplate";
// import { OtpModel } from "@/models/OTP.model";
// import DBconnect from "@/lib/DBconnect";


// const genOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000);
// };

// export const sendMail = async (tagertEmail: any) => {
//   await DBconnect();
//   const OTP = genOTP();

//   try {
//     const transport = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       service: "gmail",
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_SENDER,
//         pass: process.env.EMAIL_SENDER_PASSWORD,
//       },
//     });
//     const mailOptions = {
//       from: process.env.EMAIL_SENDER,
//       to: tagertEmail,
//       subject: "OpecChats || One Time Password",
//       html: renderEmailTemplate(OTP, tagertEmail),
//     };

//     const email = await transport.sendMail(mailOptions);
//     if (!email) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Mail not send !",
//           OTP: null,
//         },
//         { status: 400 }
//       );
//     }
//     const del = await OtpModel.deleteOne({ email: tagertEmail });
//     const OTPdoc = new OtpModel({
//       email: tagertEmail,
//       OTP,
//     });
//     await OTPdoc.save();
//     return NextResponse.json(
//       {
//         success: true,
//         message: `Email send to ${tagertEmail} successfully`,
//         OTP,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "email not send !",
//       },
//       { status: 400 }
//     );
//   }
// };
