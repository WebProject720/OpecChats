import React from "react";
import ReactDOMServer from 'react-dom/server';

interface EmailTemplateProps {
    OTP: number;
    email: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ OTP, email }) => {
    return (
        <div>
            <p>Hello {email},</p>
            <p>Your OTP is: {OTP}</p>
            <p>Please use this OTP to proceed with your action.</p>
            <p>Thank you!</p>
        </div>
    );
};


function renderEmailTemplate(OTP: number, email: string) {
    const html = ReactDOMServer.renderToString(
        <EmailTemplate OTP={OTP} email={email} />
    )
    return html
}

export default renderEmailTemplate