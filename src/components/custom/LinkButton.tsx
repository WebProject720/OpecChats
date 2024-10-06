'use client'
import Link from "next/link";
import React, { forwardRef } from "react";

interface ButtonProps {
    className?: string,
    url?:any,
    text?:any
}
export const LinkButton = forwardRef<HTMLDivElement, ButtonProps>((
    { className, url,text }, ref: any) => {
    return (
        <Link href={url}
        className={`
            text-black bg-white hover:bg-black hover:text-white 
                            p-3 rounded-full transition-all duration-500
                             text-center align-middle flex justify-center items-center
             ${className}`}
             ref={ref}
        >{text || '-->'}</Link>
    )
})

