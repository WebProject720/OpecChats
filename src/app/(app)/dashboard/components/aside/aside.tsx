'use client'
import { Button } from "@/components/custom/button"
import { LetterImage } from "@/components/custom/LetterImage"
import { LinkButton } from "@/components/custom/LinkButton"
import { Search } from "@/components/custom/search"
import { AsideGroup } from "@/components/Tools/groupSection"
import { UserLogout } from "@/helpers/UserLogout"
import { state } from "@/store/poxy"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"


export const Aside = ({ props }: any) => {
    const [user, setUser]: any = useState(null);
    const [ownedGroups, setOwnedGroups]: any = useState();
    const [joinGroups, setJoinGroups]: any = useState()
    const router = useRouter()

    useEffect(() => {
        setOwnedGroups(state.loggedUser.adminOfGroups)
        setJoinGroups(state.loggedUser.JoinedGroup)
    }, [state, state.loggedUser, state.loggedUser.adminOfGroups, state.loggedUser.JoinedGroup])

    useEffect(() => {
        const { isActive, loggedUser } = state;
        if (isActive) {
            setUser(loggedUser);
        }
    }, [state, user])


    const logout = async () => {
        try {
            await UserLogout().then(() => {
                router.push('/')
            })
        } catch (error) {
            console.log(error);
        }
    }

    const SearchGroups = (query: string) => {
        if (query.length > 0) {
            setOwnedGroups((pre: any) => pre?.filter((e: any) => e.groupName.toLowerCase().includes(query.toLowerCase())))
            setJoinGroups((pre: any) => pre?.filter((e: any) => e.groupName.toLowerCase().includes(query.toLowerCase())))
        } else {
            setOwnedGroups(state.loggedUser.adminOfGroups)
            setJoinGroups(state.loggedUser.JoinedGroup)
        }
    }



    return (
        <aside className="w-full p-2 relative h-screen hiddren-scroll phone:!overflow-y-hidden overflow-y-auto 
                 transition-all duration-1000 ease-linear" {...props}>
            <div className="flex flex-col phone:hiddren-scroll w-full h-full items-center justify-between">
                <div className="top w-full h-5/6 flex flex-col gap-2">
                    <div className="flex flex-col justify-center flex-nowrap text-xl items-center gap-5 bg-white bg-opacity-5 rounded p-2">
                        <div>
                            {
                                user &&
                                <LetterImage className="size-24 !text-4xl" letter={user?.username} />
                            }
                        </div>
                        <div className="flex flex-col items-center justify-center  gap-1">
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
                        <Search onChange={(e) => SearchGroups(e.target.value)} className="bg-transparent" placeholder="Search"></Search>
                    </div>
                    <section className="flex p-4 bg-white bg-opacity-5 rounded-md h-full pb-3 flex-col gap-2 mt-2 overflow-y-auto hiddren-scroll">
                        {ownedGroups &&
                            ownedGroups?.map((e: any, i: number) => (
                                <AsideGroup key={i} isOwner={true} e={e} i={i}></AsideGroup>
                            ))
                        }
                        {joinGroups &&
                            joinGroups?.map((e: any, i: number) => (
                                <AsideGroup key={i} isOwner={false} e={e} i={i} />
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
                    <Button onClick={logout} className="w-full rounded-full p-3 phone:p-3 font-normal text-base" text='Logout'></Button>
                </div>
            </div>
        </aside>
    )
}