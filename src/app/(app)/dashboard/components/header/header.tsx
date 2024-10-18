'use client'
import { Search } from "@/components/custom/search"
import { Button } from "@/components/custom/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { LetterImage } from "@/components/custom/LetterImage"
import { ThreeDOT } from "@/components/custom/ThreeDOT"

interface headerProps {
    searchQuery: string,
    setSearchQuery: (query: string) => void,
    name: string,
    activeUsers: number | 0
}

export const Header = ({ name, activeUsers, searchQuery, setSearchQuery }: headerProps) => {
    const router = useRouter();
    const [search, setSearch] = useState(false);
    const [user, setuser] = useState(1);

    useEffect(() => {
        setuser(activeUsers);
    }, [activeUsers])

    return (
        <header className="w-full h-full bg-opacity-15 gap-2 bg-white  p-2 flex items-center">
            <Button onClick={() => router.back()} text='<-' className="!p-0 !w-fit font-extrabold bg-white bg-opacity-10 rounded-full !px-2 text-white text-3xl"></Button>
            {search ? null : <Link href='' className="w-full gap-2  h-14 p-2 flex items-center">
                <div>
                    <LetterImage letter={name}></LetterImage>
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
            }
            <div className={`flex flex-row gap-2 items-center ${search ? 'w-full' : ''}`}>

                <Search onChange={(e) => {
                    setSearchQuery(e.target.value);
                }} placeholder="Search" className={`phone:${search ? '!auto w-full' : '!hidden'}`}></Search>

                <div className="group">
                    <div className="hidden z-10  bg-white text-black rounded-md px-4 py-2
                                        top-8 right-8 group-hover:absolute group-hover:flex flex-col gap-2">
                        <Link href={`/dashboard/group/details?identifier=${name}`} className="flex p-1 hover:bg-black rounded-md
                             hover:bg-opacity-10 w-full flex-row gap-1 items-center">
                            Details
                            <Image src={'https://img.icons8.com/?size=100&id=eHsuACNd0CuI&format=png&color=000000'}
                                alt="i icon"
                                width={30}
                                height={30}
                            ></Image>
                        </Link>
                        <div className="hidden phone:flex">
                            <Button text='Search' onClick={() => { setSearch(!search) }}>
                                Search
                            </Button>
                        </div>
                    </div>
                    {search ?
                        <button className="bg-transparent bottom-0 border-0 " onClick={() => { setSearch(!search); setSearchQuery('') }}>
                            <Image width={30} height={30} alt="Cancel" src='https://img.icons8.com/?size=100&id=3062&format=png&color=FFFFFF'></Image>
                        </button>
                        :
                        <ThreeDOT className="" />
                    }
                </div>
            </div>
        </header>
    )
}