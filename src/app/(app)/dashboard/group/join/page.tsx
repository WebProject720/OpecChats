'use client'
import { LinkButton } from "@/components/custom/LinkButton";
import { Loader } from "@/components/custom/loader";
import { Search } from "@/components/custom/search";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";


export default function Page() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bounce, setBounce] = useDebounceValue('', 800)

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
        <div className="min-w-full  flex flex-col gap-2 justify-center items-center bg-gray-500 bg-gradient-to-tl from-blue-400 to-[#d04dd6] min-h-screen text-white
    bg-radient">
            <div className="">
                <h1 className="text-4xl font-bold mb-6">
                    <center>
                        OpecChats
                    </center>
                </h1>
            </div>
            <div className="bg-white space-y-9  w-screen flex flex-col justify-center items-center py-9 bg-opacity-0 rounded-md p-5">
                <div className="laptopTheme:w-1/2 phoneTheme:w-full">
                    <form action="">
                        <Search onChange={(e) => {
                            setBounce(e.target.value);
                        }} className="p-3" placeholder="Search Group"></Search>
                    </form>
                </div>
                <div className="bg-white gap-2 rounded-md bg-opacity-20 p-3 flex flex-col justify-center items-center min-h-28 laptopTheme:w-1/2 phoneTheme:w-full">
                    {
                        loading ?
                            <Loader></Loader> :
                            groups && groups.length > 0 ?
                                groups.map((e: any, i) => (
                                    <div key={e._id} className="flex items-center w-full flex-row justify-between p-2 bg-white bg-opacity-10 rounded-md">
                                        <div>
                                            <p>
                                                {e?.groupName}
                                                <span>
                                                    <sup>
                                                        {
                                                            e?.isGroupPrivate ? <span className="bg-red-500 p-1 rounded-md bg-opacity-70 ml-2">Private</span> : <span
                                                                className="bg-green-500 ml-2 p-1 bg-opacity-70 rounded-md">Public</span>
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
                                        <div>
                                            {e?.isGroupPrivate ? <LinkButton className="!p-1" url={`/dashboard/group?id=${e?.groupName}&u=g`}></LinkButton>:
                                                <LinkButton className="!p-1" url={`/dashboard/group?id=${e?.groupName}&u=g`}></LinkButton>}
                                        </div>
                                    </div>
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
                <LinkButton url={'/'} text={'Go To Home'}></LinkButton>
            </div>
        </div>
    )
}