'use client'
import { Loader } from "@/components/custom/loader"
import { useEffect } from "react"
import Layout from "../AuthLayout";
import axios from "axios";
import { state } from "@/store/poxy";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter()
    useEffect(() => {
        try {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/guest`, {}, { withCredentials: true }).then((res) => {
                state.loggedUser = res?.data?.data
                state.isActive = false;
                state.isGuest = true;
                router.push('/dashboard/group/join')
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    
    return (
        <Layout>
            <div className="w-full h-full flex justify-center items-center">
                <Loader />
                <br />
                <p className="text-white p-3">
                    Wait a minute...
                </p>
            </div>
        </Layout>
    )
}