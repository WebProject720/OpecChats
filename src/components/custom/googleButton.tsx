'use client'
import Image from "next/image";
import React, { forwardRef } from "react";
const googleAuth = () => {
    console.log("Authentication with Google...")
}

interface ButtonProps {
    className?: string,
    type?: any,
    text?: string,
    label?: string
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
            onClick={googleAuth}
        >
            <Image width={40} height={40} src="/google.svg" alt="" />
            {text || 'Continue with Google'}</button>
    )
})

