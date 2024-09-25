'use client'
import { useSearchParams } from "next/navigation";
import GroupChats from "../components/group/page";
import DashboardLayout from "../DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react";


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
                    loading ? <h1><center>Loading...</center></h1> :
                        error ? <h1><center>{error && error || 'Something Error'}</center></h1> :
                            <GroupChats chats={data || []} identifier={groupName || null} />
                }
            </div>
        </DashboardLayout>
    )
}
