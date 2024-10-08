"use client"
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import Layout from "../AuthLayout";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "@/components/custom/loader";

function Verify() {
    const search = useSearchParams();
    const route = useRouter()
    const [status, setStatus]: any = useState();
    const [digit1, setDigit1]: any = useState(null);
    const [digit2, setDigit2]: any = useState(null);
    const [digit3, setDigit3]: any = useState(null);
    const [digit4, setDigit4]: any = useState(null);
    const [error, setError] = useState('');
    const [submiting, setSubmiting] = useState(false);
    const idArray = [setDigit1, setDigit2, setDigit3, setDigit4];
    const email = search.get('email');
    if (!email) {
        route.replace('/auth')
    }
    const SubmitForm = async (e: any) => {
        setError('');
        e.preventDefault();
        if (!(digit1 || digit2 || digit3 || digit4)) {
            setStatus(false);
            return;
        }
        const OTP = Number(digit1 + digit2 + digit3 + digit4);
        try {
            setSubmiting(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/verify`, { email, OTP })
            if (response) {
                route.replace('/auth')
                setStatus(true)
            } else {
                setError('Try Again');
                setStatus(false)
            }
            setSubmiting(false);

        } catch ({ response }: any) {
            setError(response?.data.message || 'Try again')
            setSubmiting(false);
            setStatus(false);
        }
    };
    useEffect(() => {
        if (status == false)
            setTimeout(() => {
                setStatus(undefined);
                setError('')
            }, 2000);
    }, [status]);
    return (
        <Suspense fallback={<div>
            <p>
                Loading... <br />
            </p>
            <Loader />
        </div>
        }>

            <Layout>
                <h1 className="font-bold text-white text-xl text-center">
                    Email Verification
                </h1>
                <div>
                    <p className="text-wrap text-center text-[#BFBFBF]">
                        Enter the 4-digit verification code that was sent to your Email.
                    </p>
                </div>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-row flex-nowrap gap-3 justify-around">
                        {idArray && idArray.map((state, i) => (
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
                        <p className="authErrorslabel text-center">
                            {error && error}
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={SubmitForm}
                            type="submit"
                            className={`bg-[#112D4E] text-white flex justify-center rounded-md text-center p-2 w-full
                    ${status == undefined
                                    ? "bg-[#112D4E]"
                                    : status
                                        ? "bg-[#23CF9B]"
                                        : "bg-[#EB2D5B]"
                                }
                            ${submiting ? 'cursor-not-allowed' : ''
                                }
                    `}
                            disabled={submiting}
                        >
                            {status == undefined
                                ? (submiting ? <Loader /> : "Verify Account ")
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

        </Suspense>

    );
};

export default function Page() {
    return (<Suspense fallback={<div>loading...</div>}>
        <Verify />
    </Suspense>)
}