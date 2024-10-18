'use client'
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect } from "react";




interface ButtonProps {
    className?: string,
    type?: any,
    text?: string,
    label?: string,
}

const google = async () => {
    alert('available soon...')
    // try {
    //     const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/google`, null,
    //         {
    //             withCredentials: true,
    //             headers: {
    //                 'Content-Type': 'application/json',  // Ensure the content type is correct
    //             }
    //         });
    //         console.log(res);

    //     return { data: res?.data?.data, success: true }

    // } catch (error) {
    //     console.log(error);
    //     return {
    //         success: false,
    //         data: error,
    //     }
    // }
}
export const GoogleButton = forwardRef<HTMLDivElement, ButtonProps>((
    { className, text, type }, ref: any) => {
    return (
        <button

            type={type || "submit"}
            className={`p-2 bg-white text-black rounded outline-none
  placeholder-white placeholder-opacity-60 mt-1 mb-1 w-full text-center
  flex justify-center items-center gap-2  text-xs transition-all duration-500
  hover:bg-black hover:text-white 
                ${className} 
                `}
            ref={ref || null}
            onClick={google}
        >
            <Image width={40} height={40} src="/google.svg" alt="" />
            {text || 'Continue with Google'}
        </button>
    )
})

