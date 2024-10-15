'use client'
import { Button } from "@/components/custom/button"
import { LetterImage } from "@/components/custom/LetterImage"
import { LinkButton } from "@/components/custom/LinkButton"
import { Loader } from "@/components/custom/loader"
import { Search } from "@/components/custom/search"
import { ThreeDOT } from "@/components/custom/ThreeDOT"
import { AsideGroup } from "@/components/Tools/groupSection"
import { UserLogout } from "@/helpers/UserLogout"
import { state } from "@/store/poxy"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"


export const Aside = ({ props }: any) => {
    const [deleting, setDeleting] = useState(false);
    const [user, setUser]: any = useState(null);
    const [groupDeleting, setgroupDeleting]: any = useState('');
    const router = useRouter()
    useEffect(() => {
        const { isActive, loggedUser } = state;
        if (isActive)
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
            setgroupDeleting(identifier)
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
        <aside className="w-full p-2 relative h-screen hiddren-scroll phone:!overflow-y-hidden overflow-y-auto 
                 transition-all duration-1000 ease-linear" {...props}>
            <div className="flex flex-col phone:hiddren-scroll w-full h-full items-center justify-between">
                <div className="top w-full h-5/6 flex flex-col gap-2">
                    <div className="flex flex-nowrap text-xl items-center gap-2 bg-white bg-opacity-15 rounded p-2">
                        <div>
                            {/* <Image alt='Logo' width={30} height={30} src={user && user.profileImage || `/logo-black.svg`}
                                className='rounded-full'
                            ></Image> */}
                            {
                                user &&
                                <LetterImage letter={user?.username} />
                            }
                        </div>
                        <div className="">
                            <h1 >
                                <b className="text-xl">
                                    {user && user?.username?.toUpperCase()}
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
                    <section className="flex h-full pb-3 flex-col gap-2 mt-2 overflow-y-auto hiddren-scroll">
                        {user &&
                            user.adminOfGroups.map((e: any, i: number) => (
                                <AsideGroup isOwner={true} e={e} i={i}></AsideGroup>
                            ))
                        }
                        {user &&
                            user.JoinedGroup.map((e: any, i: number) => (
                                <AsideGroup isOwner={false} e={e} i={i} />
                            ))
                        }
                    </section>
                </div>
                <div className="footer w-full flex   flex-col justify-end h-auto gap-1
                phone:flex-col phone:items-end phone:absolute top-[90%] phone:top-[85%]">
                    <div className="phone:flex-row gap-2 phone:w-full  flex">
                        <LinkButton className="w-full" url={'/dashboard/group/create'} text='Create Group'></LinkButton>
                        <LinkButton className="w-full" url={'/dashboard/group/search'} text='Join Group'></LinkButton>
                    </div>
                    <Button onClick={logout} className="w-full rounded-full p-3 phone:p-1 font-normal text-base" text='Logout'></Button>
                </div>
            </div>
        </aside>
    )
}