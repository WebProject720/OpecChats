import React, { forwardRef } from "react";

interface Props extends React.AllHTMLAttributes<HTMLAllCollection> {

}

export const BgText = forwardRef<HTMLDivElement, Props>(({ className }, ref: any) => {
    return (
        <div className={`
       flex justify-center items-center  ${className}`}>
            <h1 className='text-wrap text-white text-opacity-25 text-center font-serif text-5xl font-bold'>
                Welcome To OpecChats
            </h1>
        </div>
    )
})
