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
            text-white bg-black hover:bg-white hover:text-black 
                            p-3 rounded-full transition-all duration-500

             ${className}`}
             ref={ref}
        >{text || '-->'}</Link>
    )
})

