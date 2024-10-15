'use client'
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import { ThreeDOT } from "../custom/ThreeDOT";
import { LetterImage } from "../custom/LetterImage";


interface Props extends React.AllHTMLAttributes<HTMLAllCollection> {
    className?: string,
    isOwner: boolean,
    e: any,
    i?: number
}

export const AsideGroup = forwardRef<HTMLDivElement, Props>(({ className, isOwner, e, i }, ref: any) => {
    return (
        <div className="flex relative flex-row justify-between gap-4 items-center 
                                bg-white rounded-md bg-opacity-10 p-1
                                border-transparent border-[1px] hover:border-white" key={i} >
            <Link href={`/dashboard/group?id=${e?.groupName}`} className="flex border-[0px] border-white border-opacity-55
                                     flex-row 
                                     rounded p-2 gap-1 justify-start items-center">
                <div>
                    {/* <Image alt='Logo' width={30} height={30} src='/logo-black.svg'
                                                className='rounded-full'
                                            ></Image> */}
                    {
                        <LetterImage letter={e?.groupName}></LetterImage>
                    }
                </div>
                <div className="pl-2 ">
                    <h1 className="font-bold space-y-0 leading-tight">
                        {e.groupName} <br />
                    </h1>
                    <span className="text-xs   pr-2 font-light">
                        {e.isGroupPrivate ? 'Private Group' : 'Public Group'}
                    </span>
                    {
                        isOwner ?
                            <span className="text-xs  pr-2  font-light">
                                You'r Admin
                            </span> : null
                    }
                </div>
            </Link>
            {
                // deleting && e.groupName == groupDeleting ? <Loader /> :
                <div className="group">
                    <div className="hidden z-10  bg-white text-black rounded-md px-4 py-2
                                        top-8 right-8 group-hover:absolute group-hover:flex flex-col gap-2">
                        <div>
                            {
                                isOwner ?
                                    <button
                                        className="flex p-1 hover:bg-black w-full rounded-md hover:bg-opacity-10 flex-row items-center"
                                    // onClick={() => deleteGroup(e.groupName)}
                                    >
                                        Delete
                                        <Image
                                            width={30}
                                            height={30}
                                            alt="Delete"
                                            className="hover:bg-white hover:bg-opacity-10 rounded-md p-1"
                                            src='https://img.icons8.com/?size=100&id=gcAI6NWASwgB&format=png&color=000000'></Image>
                                    </button> : null
                            }
                        </div>
                        <div>
                            <Link href='#' className="flex p-1 hover:bg-black rounded-md hover:bg-opacity-10 w-full flex-row gap-1 items-center">
                                Details
                                <Image src={'https://img.icons8.com/?size=100&id=eHsuACNd0CuI&format=png&color=000000'}
                                    alt="i icon"
                                    width={30}
                                    height={30}
                                ></Image>
                            </Link>
                        </div>
                    </div>
                    <ThreeDOT className="" />
                </div>
            }
        </div>
    )
})
