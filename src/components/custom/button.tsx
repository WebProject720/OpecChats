'use client'
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: any,
    text?: any,
    label?: string
}
export const Button = forwardRef<HTMLDivElement, ButtonProps>((
    { className, text, type, ...props }, ref: any) => {
    return (
        <button
            type={type || "submit"}
            className={`p-2 bg-white text-black rounded outline-none
  placeholder-white placeholder-opacity-60 mt-2 w-full text-center
  flex justify-center font-bold text-xl 
  hover:bg-black hover:text-white transition-all duration-500 
  disabled:hover:bg-black  disabled:hover:text-white
                ${className} 
            `}
            ref={ref || null}
            {...props}
        >{text}</button>
    )
})

