'use client'
import Layout from "@/app/(app)/auth/AuthLayout";
import { Button } from "@/components/custom/button";
import { LetterImage } from "@/components/custom/LetterImage";
import { LinkButton } from "@/components/custom/LinkButton";
import { Loader } from "@/components/custom/loader";
import { Search } from "@/components/custom/search";
import { state } from "@/store/poxy";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";



export default function Page() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bounce, setBounce] = useDebounceValue('', 800)
    const router = useRouter()
    const Back = (para: any) => {
        if (para) router.push(para)
        else
            router.back()
    }


    useEffect(() => {
        const search = async () => {
            if (!bounce) { setGroups([]); return };
            try {
                setLoading(true);
                const { data }: any = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/group/search`, { q: bounce })
                setGroups(data.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setGroups([])
            }
        }
        search();
    }, [bounce])
    return (
        <Layout widthClass="!w-full m-2">
            <div className="bg-white space-y-9  w-3/4 phone:w-full flex flex-col justify-center items-center py-9 bg-opacity-0 rounded-md p-1">
                <div className=" w-full">
                    <form action="">
                        <Search onChange={(e) => {
                            setBounce(e.target.value);
                        }} className="p-3" placeholder="Group name"></Search>
                    </form>
                </div>
                <div className="gap-2 w-full rounded-md bg-opacity-10 p-3 flex flex-col justify-center items-center min-h-28">
                    {
                        loading ?
                            <Loader></Loader> :
                            groups && groups.length > 0 ?
                                groups.map((e: any, i) => (
                                    <Link href={`/dashboard/group?id=${e?.groupName}&u=${state.isGuest ? 'g' : 'u'}`}
                                     key={e._id}
                                     className="flex items-center w-full text-white flex-row justify-between p-2 bg-white bg-opacity-5 rounded-md
                                     hover:border-[1px] border-white border-0">
                                        <div className={`p-[1px]  rounded-full ${e?.isGroupPrivate ? 'bg-red-500' : 'bg-green-500'}`}>
                                            {
                                                e?.profileImage ?
                                                    <Image alt='Logo' width={30} height={30} src={e?.profileImage}
                                                        className='rounded-full size-16 phone:size-8' unoptimized
                                                    ></Image>
                                                    :
                                                    <LetterImage className="size-16 phone:size-8" letter={e?.groupName}></LetterImage>
                                            }
                                        </div>
                                        <div>
                                            <p className="text-xl">
                                                {e?.groupName}
                                                <span>
                                                    <sup>
                                                        {
                                                            e?.isGroupPrivate ? <span className="bg-red-500 p-1 rounded-md bg-opacity-70 ml-2 phone:text-xs">Private</span> : <span
                                                                className="bg-green-500 ml-2 p-1 bg-opacity-70 rounded-md phone:text-xs">Public</span>
                                                        }
                                                    </sup>
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs"> Created At <span> </span>
                                                {
                                                    new Date(e?.createdAt).toLocaleDateString()
                                                }
                                            </p>
                                        </div>
                                        <div className="hidden">
                                            {
                                                // e?.isGroupPrivate ? <LinkButton className="!p-1" url={`/dashboard/group/join?i=${e?.groupName}`}></LinkButton> :
                                                <LinkButton className="!p-2" text='Join Chats' url={`/dashboard/group?id=${e?.groupName}&u=${state.isGuest ? 'g' : 'u'}`}></LinkButton>
                                            }
                                        </div>
                                    </Link>
                                ))
                                :
                                <div>
                                    <h1 className="font-bold">
                                        <center className="text-opacity-50 text-white">
                                            No Group Found
                                        </center>
                                    </h1>
                                </div>
                    }
                </div>
            </div>
            <div className="mt-9">
                {
                    state &&
                    <Button onClick={() => { state?.isActive ? Back('/dashboard') : Back(null) }} text={"Go Back"}></Button>
                }
            </div>
        </Layout>
    )
}