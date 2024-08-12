import { Button } from "@/components/custom/button"
import { Search } from "@/components/custom/search"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export const Aside = () => {
    const groups = [
        {
            name: 'Group A',
            url: '',
            image: '/logo-black.svg'
        },
        {
            name: 'Group A',
            url: '',
            image: '/logo-black.svg'
        },
        {
            name: 'Group A',
            url: '',
            image: '/logo-black.svg'
        },
    ]
    return (
        <aside className="w-full h-full">
            <div className="flex flex-col w-full h-full items-center justify-center">
                <div className="top w-full h-4/5 ">
                    <div className="search">
                        <Search className="bg-transparent" placeholder="Search"></Search>
                    </div>
                    <section className="flex flex-col gap-2 mt-2">
                        {groups &&
                            groups.map((e: any,i:number) => (
                                <Link key={i} href={e.url}>
                                    <div  className="flex border-[1px] border-white border-opacity-55
                                     flex-row hover:bg-white hover:bg-opacity-50 
                                     rounded p-2 gap-1 justify-start items-center">
                                        <div>
                                            <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                                                className='rounded-full'
                                            ></Image>
                                        </div>
                                        <div>
                                            <h1>
                                                {e.name}
                                            </h1>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </section>
                </div>
                <div className="footer w-full flex  flex-col justify-end h-1/5 gap-1">
                    <div className="flex flex-nowrap items-center gap-2 bg-white bg-opacity-45 rounded p-2">
                        <div>
                            <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                                className='rounded-full'
                            ></Image>
                        </div>
                        <div>
                            <h1>
                                <b>
                                    Username
                                </b>
                            </h1>
                        </div>
                    </div>
                    <Button text='New Group'></Button>
                    <Button text='Logout'></Button>
                </div>
            </div>
        </aside>
    )
}