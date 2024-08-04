import React from 'react'
import '../../app/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-gray-500 bg-gradient-to-tl from-blue-400 to-[#d04dd6] min-h-screen'>
            <div
                className=" min-h-screen min-w-full 
    flex justify-center items-center
    "
            >
                <div className="text-white w-[30%] phone:w-[50%]">
                    <div className="flex justify-center items-center phone:gap-10   gap-20 min-h-screen flex-col">
                        <h1 className="text-center text-5xl font-bold">OpecChats</h1>
                        <div
                            className="box bg-white rounded-lg text-black p-5 px-10
          flex flex-col justify-center items-center gap-5
          "
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}