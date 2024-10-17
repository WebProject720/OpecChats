'use client'
import Image from "next/image";
import React, { forwardRef } from "react";


export interface inputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const Search = forwardRef<HTMLDivElement, inputProps>((
    { className = '', placeholder, type, ...props }, ref: any) => {
    return (
        <div className={`flex flex-row bg-white bg-opacity-15
         hover:border-[1px] hover:border-white border-[1px] border-transparent
         rounded-full items-center px-3 py-1 transition-all duration-500 ${className}`}>
            <div>
                <Image alt="Search" height={30} width={30} src='https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF'></Image>
            </div>
            <input type={type || "text"}
                className={` bg-white w-full bg-opacity-0 text-white  outline-none
                placeholder-slate-100 placeholder-opacity-60  
                border-0 hover:border-slate-200 rounded-full p-2
                ${className} 
                `}
                placeholder={placeholder}
                ref={ref || null}
                {...props}
            />
        </div>
    )
})

