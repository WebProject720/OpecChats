'use client'
import { Button } from "@/components/custom/button"
import { LinkButton } from "@/components/custom/LinkButton"
import { Loader } from "@/components/custom/loader"
import { Search } from "@/components/custom/search"
import { UserLogout } from "@/helpers/UserLogout"
import { state } from "@/store/poxy"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"


export const Aside = ({ props }: any) => {
    const [deleting, setDeleting] = useState(false);
    const [user, setUser]: any = useState(null);
    const router = useRouter()
    useEffect(() => {
        const { isActive, loggedUser } = state;
        setUser(loggedUser)
    }, [])
    const logout = async () => {
        try {
            await UserLogout().then(() => {
                router.push('/')
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteGroup = async (identifier: string) => {
        try {
            setDeleting(true)
            const response: any = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/group/delete`, { identifier }, { withCredentials: true });
            setDeleting(false)
            if (response) {
                const newArray = state.loggedUser.adminOfGroups.filter((e: any) => e.groupName !== identifier)
                state.loggedUser.adminOfGroups = newArray;
            }
        } catch (error) {
            console.log(error);
            setDeleting(false)
        }
    }

    return (
        <aside className="w-full relative h-screen hiddren-scroll overflow-y-auto 
                 transition-all duration-1000 ease-linear" {...props}>
            <div className="flex flex-col w-full h-full items-center justify-between">
                <div className="top w-full h-5/6 flex flex-col gap-2">
                    <div className="flex flex-nowrap text-xl items-center gap-2 bg-white bg-opacity-15 rounded p-2">
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
                    <section className="flex pb-3 flex-col gap-2 mt-2 overflow-y-auto hiddren-scroll">
                        {user &&
                            user.adminOfGroups.map((e: any, i: number) => (
                                <div className="flex flex-row justify-between gap-4 items-center 
                                bg-white rounded-md bg-opacity-10 p-1
                                border-white hover:border-[1px]" key={i} >
                                    <Link href={`/dashboard/group?id=${e?.groupName}`} className="flex border-[0px] border-white border-opacity-55
                                     flex-row 
                                     rounded p-2 gap-1 justify-start items-center">
                                        <div>
                                            <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                                                className='rounded-full'
                                            ></Image>
                                        </div>
                                        <div className="pl-2 ">
                                            <h1 className="font-bold space-y-0 leading-tight">
                                                {e.groupName} <br />
                                            </h1>
                                            <span className="text-xs   pr-2 font-light">
                                                {e.isGroupPrivate ? 'Private Group' : 'Public Group'}
                                            </span>
                                            <span className="text-xs  pr-2  font-light">
                                                You'r Admin
                                            </span>
                                        </div>
                                    </Link>
                                    <div>
                                        {deleting ? <Loader /> : <button onClick={() => deleteGroup(e.groupName)}>
                                            <Image
                                                width={30}
                                                height={30}
                                                alt="Delete"
                                                className="hover:bg-white hover:bg-opacity-10 rounded-md p-1"
                                                src='https://img.icons8.com/?size=100&id=gcAI6NWASwgB&format=png&color=000000'></Image>
                                        </button>}
                                    </div>
                                </div>
                            ))
                        }
                        {user &&
                            user.JoinedGroup.map((e: any, i: number) => (
                                <Link className="flex flex-row justify-between gap-4 items-center 
                                bg-white rounded-md bg-opacity-10 p-1
                                border-white hover:border-[1px]" key={i} href={`/dashboard/group?id=${e?.groupName}`}>
                                    <div className="flex border-[0px] border-white border-opacity-55
                                     flex-row 
                                     rounded p-2 gap-1 justify-start items-center">
                                        <div>
                                            <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                                                className='rounded-full'
                                            ></Image>
                                        </div>
                                        <div className="pl-2 ">
                                            <h1 className="font-bold space-y-0 leading-tight">
                                                {e.groupName} <br />
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
                phone:flex-row phone:items-end phone:absolute top-[90%] ">
                    <LinkButton className="w-full" url={'/dashboard/group/create'} text='Create Group'></LinkButton>
                    <LinkButton className="w-full" url={'/dashboard/group/search'} text='Join Group'></LinkButton>
                    <Button onClick={logout} className="w-full rounded-full p-3 font-normal text-base" text='Logout'></Button>
                </div>
            </div>
        </aside>
    )
}