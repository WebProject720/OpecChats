'use client'

import React, { forwardRef } from "react"
interface LoaderProps {
    className?: string,
}
export const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ className }, ref) => {
    return (
        <div className={`size-4 phone:size-8 bg-transparent border-t-0 border-[2px]
        animate-spin
         border-white p-1 phone:p-2 rounded-full ${className}`} ref={ref} >
            <div className="bg-transparent w-full h-full rounded-full">
            </div>
        </div>
    )
})