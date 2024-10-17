'use client'

import { RandomColor } from "@/helpers/RandomColor"
import React, { forwardRef } from "react"

interface Option {
    className?: string,
    letter: string,
}
export const LetterImage = forwardRef<HTMLDivElement, Option>(({ letter, className }, ref: any) => {
    return (
        <div ref={ref}
            className={`p-2 cursor-pointer border-[2px] border-transparent hover:border-white bg-white bg-opacity-20 transition-all duration-100 ease-in-out hover:bg-opacity-15
             rounded-full size-12 flex justify-center items-center ${className}`}
            style={{ background: RandomColor() }}>
            <span className="text-white text-xl font-extrabold">
                {
                    letter && letter?.at(0)?.toUpperCase() || 'G'
                }
            </span>
        </div >
    )
})