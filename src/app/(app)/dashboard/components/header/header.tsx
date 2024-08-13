import { Search } from "@/components/custom/search"
import Image from "next/image"
import Link from "next/link"
import React from "react"


export const Header = () => {
    return (
        <header className="w-full h-full bg-opacity-15 gap-2 bg-white  p-2 flex items-center">
            <Link href='' className="w-full gap-2  h-14 p-2 flex items-center">
                <div>
                    <Image alt='Logo' width={40} height={40} src='/logo-black.svg'
                        className='rounded-full'
                    ></Image>
                </div>
                <div>
                    <h1 className="text-xl">
                        Group Name
                    </h1>
                </div>
            </Link>
            <div>
                {/* <button className="bg-transparent border-0">
                    <Image alt='Logo' width={40} height={40} src={process.env.i_icon || ''}
                        className='rounded-full'
                    ></Image>
                </button> */}
                <Search placeholder="Search"></Search>
            </div>
        </header>
    )
}