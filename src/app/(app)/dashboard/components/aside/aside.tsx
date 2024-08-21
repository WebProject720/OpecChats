import { Button } from "@/components/custom/button"
import { LinkButton } from "@/components/custom/LinkButton"
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
        <aside className="w-full relative h-full">
            <div className="flex flex-col w-full h-full items-center justify-between">
                <div className="top w-full h-5/6 flex flex-col gap-2">
                    <div className="flex flex-nowrap text-xl items-center gap-2 bg-white bg-opacity-45 rounded p-2">
                        <div>
                            <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                                className='rounded-full'
                            ></Image>
                        </div>
                        <div className="">
                            <h1>
                                <b>
                                    Username
                                </b>
                            </h1>
                        </div>
                    </div>
                    <div className="search">
                        <Search className="bg-transparent" placeholder="Search"></Search>
                    </div>
                    <hr />
                    <section className="flex flex-col gap-2 mt-2 overflow-y-auto hiddren-scroll">
                        {groups &&
                            groups.map((e: any, i: number) => (
                                <Link key={i} href='/dashboard/group'>
                                    <div className="flex border-[0px] border-white border-opacity-55
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
                                    <hr className="my-1" />
                                </Link>
                            ))
                        }
                    </section>
                </div>
                <div className="footer w-full flex   flex-col justify-end h-auto gap-1
                phone:flex-row phone:items-end phone:absolute top-[93%] ">
                    <LinkButton className="w-full" url={'/dashboard/group/create'} text='New Group'></LinkButton>
                    <LinkButton className="w-full" url={'/logout'} text='Logout'></LinkButton>
                </div>
            </div>
        </aside>
    )
}