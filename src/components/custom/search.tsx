'use client'
import React, { forwardRef } from "react";

export interface inputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const Search = forwardRef<HTMLDivElement, inputProps>((
    { className = '', placeholder, type, ...props }, ref: any) => {
    return (
        <input type={type || "text"}
            className={`p-1 bg-white w-full bg-opacity-0 text-white rounded outline-none
                placeholder-slate-100 placeholder-opacity-60  
                border-2 hover:border-slate-200 hover:
                ${className} 
                `}
            placeholder={placeholder}
            ref={ref || null}
            {...props}
        />
    )
})

