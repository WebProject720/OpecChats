'use client'
import { Button } from "@/components/custom/button"
import { LinkButton } from "@/components/custom/LinkButton"
import { Search } from "@/components/custom/search"
import { state } from "@/store/poxy"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export const Aside = () => {
    const route: any = useRouter()

    const [user, setUser]: any = useState(null);
    useEffect(() => {
        const { isActive, loggedUser } = state;
        setUser(loggedUser)
    }, [])
    const logout = async () => {

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/logout`, undefined,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the content type is correct
                    }
                });
            if (res) {
                state.loggedUser = null;
                state.isActive = false;
                route.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <aside className="w-full relative h-full">
            <div className="flex flex-col w-full h-full items-center justify-between">
                <div className="top w-full h-5/6 flex flex-col gap-2">
                    <div className="flex flex-nowrap text-xl items-center gap-2 bg-white bg-opacity-45 rounded p-2">
                        <div>
                            <Image alt='Logo' width={30} height={30} src={user && user.profileImage || `/logo-black.svg`}
                                className='rounded-full'
                            ></Image>
                        </div>
                        <div className="">
                            <h1 >
                                <b className="text-xl">
                                    {user && user?.username.toUpperCase()}
                                </b>
                            </h1>
                            <p className="text-xs">
                                {user && user?.email}
                            </p>
                        </div>
                    </div>
                    <div className="search">
                        <Search className="bg-transparent" placeholder="Search"></Search>
                    </div>
                    <hr />
                    <section className="flex flex-col gap-2 mt-2 overflow-y-auto hiddren-scroll">
                        {user &&
                            user.adminOfGroups.map((e: any, i: number) => (
                                <Link key={i} href={`/dashboard/group?id=${e?.groupName}`}>
                                    <div className="flex border-[0px] border-white border-opacity-55
                                     flex-row hover:bg-white hover:bg-opacity-50 
                                     rounded p-2 gap-1 justify-start items-center">
                                        <div>
                                            <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                                                className='rounded-full'
                                            ></Image>
                                        </div>
                                        <div>
                                            <h1 className="font-bold">
                                                {e.groupName}
                                            </h1>
                                            <span className="text-xs p-0 m-0 font-light">
                                                {e.isGroupPrivate ? 'Private' : 'Public'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </section>
                </div>
                <div className="footer w-full flex   flex-col justify-end h-auto gap-1
                phone:flex-row phone:items-end phone:absolute top-[93%] ">
                    <LinkButton className="w-full" url={'/dashboard/group/create'} text='Create Group'></LinkButton>
                    <LinkButton className="w-full" url={'/dashboard/group/join'} text='Join Group'></LinkButton>
                    <Button onClick={logout} className="w-full rounded-full p-3 font-normal text-base" text='Logout'></Button>
                </div>
            </div>
        </aside>
    )
}