'use client'
import Link from "next/link";
import React, { forwardRef } from "react";

interface ButtonProps {
    className?: string,
    url?: any,
    text?: any,
    children?: any,
    onClick?: () => void
}
export const TextButton = forwardRef<HTMLButtonElement, ButtonProps>((
    { className, url, children, onClick, text, ...props }, ref: any) => {
    return (
        <button
            className={`
            bg-transparent border-0 
             ${className}`}
            onClick={onClick}
            {...props}
            ref={ref}
        >
            {children}
        </button>
    )
})

