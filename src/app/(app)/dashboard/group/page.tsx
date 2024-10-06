'use client'
import { useSearchParams } from "next/navigation";
import GroupChats from "../components/group/page";
import DashboardLayout from "../DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "@/components/custom/loader";


export default function Page() {
    const params = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [data, setData]: any = useState(null);
    const [error, setError] = useState(false);
    const id = params.get('id');

    const [groupName, setGroupName] = useState(id);

    useEffect(() => {
        setGroupName(id);
        setData([])
        setLoading(true);
        setError(false)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/group/details`, {
            identifier: id
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',  // Ensure the content type is correct
            }
        }).then((data) => {
            setData(data.data.data.chatID);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setError(error.response.data.message);
        })
    }, [id])
    return (
        <DashboardLayout>
            <div className="w-full h-full">
                {
                    loading ? <div className="p-5 flex  flex-col justify-center items-center">
                        <div className="my-6">
                            <Loader />
                        </div>
                        <center className="text-3xl text-white mb-5 text-opacity-55">Wait a minute...</center>
                    </div> :
                        error ? <h1><center>{error && error || 'Something Error'}</center></h1> :
                            <GroupChats chatsArray={data || []} identifier={groupName || null} />
                }
            </div>
        </DashboardLayout>
    )
}
