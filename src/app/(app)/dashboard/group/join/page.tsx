'use client'
import Layout from "@/app/(app)/auth/AuthLayout";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/custom/input";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"


function Join() {
    const params = useSearchParams();
    const router = useRouter()
    const identifier = params.get('i');
    if (!identifier) {
        router.push('/dashboard/group/search')
    }
    const Back=()=>{
        router.back()
    }
    return (
        <Layout widthClass="">
            <div className="min-w-full min-h-full">
                <h1 className="text-white mb-5 text-2xl font-serif font-bold">
                    <center>
                        Private Group
                    </center>
                </h1>
                <form action="">
                    <Input placeholder="Enter Code to Join"></Input>
                    <Button type='submit' text='Save'></Button>
                </form>
            </div>
            <div className="mt-9">
                <Button onClick={Back} text='Go Back'></Button>
            </div>
        </Layout>
    )
}
export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Join />
        </Suspense>
    )
}