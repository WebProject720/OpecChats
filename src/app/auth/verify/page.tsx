"use client"
import React from "react";
import Layout from "../../../components/appCom/layout";
import { useEffect, useState } from "react";
import { OTP } from "@/schemas/authZOD";

export default function page() {
    const [status, setStatus]: any = useState();
    const [digit1, setDigit1]: any = useState(null);
    const [digit2, setDigit2]: any = useState(null);
    const [digit3, setDigit3]: any = useState(null);
    const [digit4, setDigit4]: any = useState(null);

    const idArray = [setDigit1, setDigit2, setDigit3, setDigit4];
    const SubmitForm = (e: any) => {
        e.preventDefault();
        if (!(digit1 || digit2 || digit3 || digit4)) {
            setStatus(false);
            return;
        }
        const OTP = Number(digit1 + digit2 + digit3 + digit4);
        console.log(OTP);
        setStatus(true);
    };
    useEffect(() => {
        if (status == false)
            setTimeout(() => {
                setStatus(undefined);
            }, 2000);
    }, [status]);
    return (
        <Layout>
            <h1 className="font-bold text-black text-xl text-center">
                Email Verification
            </h1>
            <div>
                <p className="text-wrap text-center text-[#BFBFBF]">
                    Enter the 4-digit verification code that was sent to your Email.
                </p>
            </div>
            <form className="flex flex-col gap-4">
                <div className="flex flex-row flex-nowrap gap-3 justify-around">
                    {idArray.map((state, i) => (
                        <input
                            required
                            type="number"
                            key={i}
                            max={9}
                            min={0}
                            name=""
                            id={i.toString()}
                            className={`bg-[#DBE2EF] h-14 w-12
                p-1 outline-none   rounded-md text-center
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                text-2xl  caret-transparent focus:border-sky-400 border-[1px]
                
                ${status == undefined
                                    ? ""
                                    : status
                                        ? "border-[#23CF9B]"
                                        : "border-[#EB2D5B]"
                                }
                `}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value.length > 1) {
                                    e.target.value = e.target.value.slice(-1);
                                }
                                const nextElement = e.target.nextElementSibling as HTMLInputElement | null;
                                if (nextElement) {
                                    nextElement.focus();
                                }
                                state(e.target.value);
                            }}
                        />
                    ))}
                </div>
                <div>
                    <button
                        onClick={SubmitForm}
                        type="submit"
                        className={`bg-[#112D4E] text-white rounded-md text-center p-2 w-full
                    ${status == undefined
                                ? "bg-[#112D4E]"
                                : status
                                    ? "bg-[#23CF9B]"
                                    : "bg-[#EB2D5B]"
                            }
                    `}
                    >
                        {status == undefined
                            ? "Verify Account"
                            : status
                                ? "Verified"
                                : "Verification failed"}
                    </button>
                </div>
                <div>
                    <p className="text-center text-[#BFBFBF]">
                        Didn’t receive code?
                        <span className="text-black"> Resend</span>
                    </p>
                </div>
            </form>
        </Layout>
    );
};
