'use client'

import React, { forwardRef } from "react"
interface Option {
    className?: string,
}
export const ThreeDOT = forwardRef<HTMLAllCollection, Option>(({ className }, ref: any) => {
    return (
        <div ref={ref} className={`p-2 hover:cursor-pointer hover:bg-white transition-all duration-100 ease-in-out hover:bg-opacity-15 rounded-full size-10 flex justify-center items-center ${className}`}>
            <div className="box w-2 h-8 gap-1 bg-transparent flex flex-col justify-center items-center">
                <span className="1 size-1 bg-white rounded-full"></span>
                <span className="2 size-1 bg-white rounded-full"></span>
                <span className="3 size-1 bg-white rounded-full"></span>
            </div>
        </div>
    )
})