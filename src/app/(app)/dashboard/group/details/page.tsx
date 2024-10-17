'use client'
import { Loader } from "@/components/custom/loader";
import { GroupInfo } from "@/helpers/groups/getInfo";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import { LetterImage } from '@/components/custom/LetterImage';
import Link from "next/link";
import { state } from "@/store/poxy";
import { Button } from "@/components/custom/button";



function Details() {
    const router: any = useRouter();
    const params = useSearchParams();
    const identifier: any = params.get('identifier');
    const [group, setGroup]: any = useState(null);
    const [loading, setloading] = useState(false);

    if (!identifier) {
        router.back()
    }
    const Back = (para: any) => {
        if (para) router.push(para)
        else
            router.back()
    }

    useEffect(() => {
        try {
            setloading(true);
            GroupInfo(identifier).then((res) => {
                if (res.success) {
                    setGroup(res?.data);
                    console.log(res?.data);
                    setloading(false)
                }
            }).catch((err) => {
                console.log(err);
                alert('something Error')
                setloading(false)
            })
        } catch (err) {
            console.log(err);
            alert('something Error')
            setloading(false)
        }
    }, [])

    return (
        <div className="min-h-screen text-white min-w-full bg-radient">
            <div>
                {
                    loading ?
                        <div className="w-full flex-col min-h-screen flex items-center justify-center">
                            <Loader></Loader>
                            <p className="">
                                <br />
                                Please wait...
                            </p>
                        </div>
                        :
                        group && <div className="flex items-center justify-center flex-col gap-4 p-2">
                            <Link href={`/dashboard/group?id=${group?.groupName}&u=${state.isGuest ? 'g' : 'u'}`} className="flex justify-center flex-col items-center">
                                <LetterImage className="size-20" letter={group?.groupName}></LetterImage>
                                <br />
                                <div>
                                    <p className="text-center text-3xl font-bold">
                                        {group.groupName}
                                    </p>
                                    <p className="text-center text-xs">
                                        <span>
                                            {group.isGroupPrivate ? 'Private' : 'Public'}
                                        </span>
                                    </p>
                                </div>
                            </Link>
                            <div className="bg-black phone:w-full flex flex-col gap-4 p-2 px-4 rounded-md bg-opacity-15">
                                <div className="flex flex-row items-center gap-2">
                                    <h1>
                                        Admin:
                                    </h1>
                                    <br />
                                    <div className="flex gap-2">
                                        <div>
                                            <LetterImage letter={group.admin.username}></LetterImage>
                                        </div>
                                        <div>
                                            <p>
                                                {
                                                    group.admin.username
                                                }
                                            </p>
                                            <p>
                                                {
                                                    group.admin.email
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        created at : {new Date(group.createdAt).toDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Temp Members : {group?.TempMembers?.length||0}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Permanent Members : {group?.memberLists?.length||0}
                                    </p>
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className="mt-9 w-full flex justify-center items-center">
            {   
                    state &&
                    <div className="w-fit">
                    <Button className="" onClick={() => { state?.isActive ? Back('/dashboard') : Back(null) }} text={"Go Back"}></Button>
                    </div>
            }
            </div>
        </div>
    )

}

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Details />
        </Suspense>
    )
}