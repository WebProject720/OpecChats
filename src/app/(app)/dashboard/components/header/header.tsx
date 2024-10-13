'use client'
import { Search } from "@/components/custom/search"
import { Button } from "@/components/custom/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"


export const Header = ({ name, activeUser }: any) => {
    const router = useRouter();
    const [user, setuser] = useState(1);
    useEffect(() => {
        setuser(activeUser);
    }, [activeUser])
    return (
        <header className="w-full h-full bg-opacity-15 gap-2 bg-white  p-2 flex items-center">
            <Button onClick={() => router.back()} text='<-' className="!p-0 !w-fit font-extrabold !bg-transparent text-white text-3xl"></Button>
            <Link href='' className="w-full gap-2  h-14 p-2 flex items-center">
                <div>
                    <Image alt='Logo' width={40} height={40} src='/logo-black.svg'
                        className='rounded-full'
                    ></Image>
                </div>
                <div>
                    <h1 className="text-xl leading-tight">
                        {name || "Group Name"}
                         <br />
                    </h1>
                    <p>
                        <span className="text-xs">
                            Active user : {user || 1}
                        </span>
                    </p>
                </div>
            </Link>
            <div>
                <Search placeholder="Search"></Search>
            </div>
        </header>
    )
}