import { LinkButton } from "@/components/custom/LinkButton"
import { Search } from "@/components/custom/search"
import Image from "next/image"
import Link from "next/link"
import React from "react"


export const Header = ({name}:any) => {
    return (
        <header className="w-full h-full bg-opacity-15 gap-2 bg-white  p-2 flex items-center">
            <LinkButton url='/dashboard' text='<-' className="!p-0 font-extrabold !bg-transparent text-white text-3xl"></LinkButton>
            <Link href='' className="w-full gap-2  h-14 p-2 flex items-center">
                <div>
                    <Image alt='Logo' width={40} height={40} src='/logo-black.svg'
                        className='rounded-full'
                    ></Image>
                </div>
                <div>
                    <h1 className="text-xl">
                       {name|| "Group Name"}
                    </h1>
                </div>
            </Link>
            <div>
                <Search placeholder="Search"></Search>
            </div>
        </header>
    )
}