import { Html, Text,render } from "@react-email/components";
import React from "react";

interface EmailTemplateProps {
    OTP: number;
    email: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ OTP, email }) => {
    return (
        <Html>
            <Text className="font-bold">Welcome {email},</Text>
            <Text>Your OTP is: {OTP}</Text>
            <Text>Please use this OTP to proceed with your action.</Text>
            <Text>Thank you!</Text>
        </Html>
    );
};


export function renderEmailTemplate(OTP: number, email: string): string {
    const html = render(<EmailTemplate OTP={OTP} email={email} />);
    return html;
}

export default renderEmailTemplate