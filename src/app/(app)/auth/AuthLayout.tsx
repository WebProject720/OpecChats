'use client'

import Image from "next/image"
import Link from "next/link"
import React from "react"


export default function Layout({ children }: any) {
    return (
        <div className='bg-gray-500 bg-gradient-to-tl from-blue-400 to-[#d04dd6] min-h-screen
    bg-radient
    
    '>
            <div
                className=" min-h-screen min-w-full 
    flex justify-center items-center
    "
            >
                <div className="text-white w-[30%] phone:w-[50%]">
                    <div className="flex justify-center items-center phone:gap-10   gap-10 min-h-screen flex-col">
                        <Link href='/' className="w-full flex justify-center flex-col items-center gap-2">
                            <Image alt='Logo' width={100} height={100} src='/logo-black.svg'
                                className='rounded-full'
                            ></Image>
                            <h1 className="text-center text-5xl font-bold">
                                OpecChats</h1>
                        </Link>
                        <div
                            className="box bg-white bg-opacity-20 rounded-lg text-black p-5 px-10
                            flex flex-col justify-center items-center gap-5" >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}