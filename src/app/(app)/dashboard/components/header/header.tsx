import Image from "next/image"
import React from "react"


export const Header = () => {
    return (
        <header className="w-full bg-opacity-15 bg-white h-14 p-2 flex items-center">
            <div>
                <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                    className='rounded-full'
                ></Image>
            </div>
            <div>
                
            </div>
        </header>
    )
}