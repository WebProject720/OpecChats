'use client'
import React, { forwardRef } from "react";

export interface inputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: any,
    options: string[],
}

export const Options = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & inputProps>((
    { label, options, className = '', placeholder, ...props }, ref: any) => {

    return (
        <div className="space-y-1 w-full">
            <label className="text-white">
                {label}
            </label>
            <select name="" id="" className={`p-3 w-full bg-white bg-opacity-15 text-white rounded outline-none
                placeholder-white placeholder-opacity-60
                ${className}`} {...props} ref={ref || null}>
                {
                    options &&
                    options.map((e, i) => (
                        <option
                            className="bg-blue-400 hover:bg-slate-500"
                            key={i} value={e}>{e}</option>
                    ))
                }
            </select>
        </div>
    )
})

