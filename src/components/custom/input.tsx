'use client'
import React, { forwardRef } from "react";

export interface inputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: any
}

export const Input = forwardRef<HTMLDivElement, inputProps>((
    { label, className = '', placeholder, type, ...props }, ref: any) => {
    return (
        <div className="space-y-1 w-full">
            <label className="text-white">
                {label}
            </label>
            <input type={type || "text"}
                className={`p-3 bg-white bg-opacity-15 text-white rounded outline-none
                placeholder-white placeholder-opacity-60 disabled:hover:cursor-no-drop disabled:bg-black disabled:bg-opacity-15
                ${className} 
                `}
                placeholder={placeholder}
                ref={ref || null}
                {...props}
            />
        </div>
    )
})

