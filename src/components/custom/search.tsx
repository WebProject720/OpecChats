'use client'
import React, { forwardRef } from "react";

export interface inputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const Search = forwardRef<HTMLDivElement, inputProps>((
    { className = '', placeholder, type, ...props }, ref: any) => {
    return (
        <input type={type || "text"}
            className={`p-2 bg-white w-full bg-opacity-65 text-black rounded outline-none
                placeholder-gray-600 placeholder-opacity-60  
                border-2 hover:border-blue-600 hover:
                ${className} 
                `}
            placeholder={placeholder}
            ref={ref || null}
            {...props}
        />
    )
})

