'use client'
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: any,
    text?: any,
    label?: string
}
export const Button = forwardRef<HTMLDivElement, ButtonProps>((
    { className, text, type ,...props}, ref: any) => {
    return (
        <button
            type={type || "submit"}
            className={`p-2 bg-black text-white rounded outline-none
  placeholder-white placeholder-opacity-60 mt-2 w-full text-center
  flex justify-center font-bold text-xl 
  hover:bg-white hover:text-black transition-all duration-500
                ${className} 
                `}
            ref={ref || null}
            {...props}
        >{text}</button>
    )
})

