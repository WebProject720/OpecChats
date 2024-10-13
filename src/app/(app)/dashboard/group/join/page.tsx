'use client'
import Layout from "@/app/(app)/auth/AuthLayout";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/custom/input";
import { LinkButton } from "@/components/custom/LinkButton";
import { Loader } from "@/components/custom/loader";
import { JoinPrivateGroup } from "@/schemas/createG";
import { state } from "@/store/poxy";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { useForm } from "react-hook-form";


function Join() {
    const params = useSearchParams();
    const router = useRouter()
    const identifier = params.get('i');
    if (!identifier) {
        router.push('/dashboard/group/search')
    }
    const [submiting, setSubmiting] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors }
    } = useForm({
        defaultValues: {
            code: ''
        },
        resolver: zodResolver(JoinPrivateGroup)
    })
    const Back = () => {
        router.back()
    }
    const submit = async (data: any) => {
        setError('')
        data.identifier = identifier;

        try {
            setSubmiting(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/guest/JoinPrivateGroup`, data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the content type is correct
                    }
                });
            if (res) {
                console.log(res);
                router.back();
            }
            setError(res?.data?.message || 'Sign In failled')
            setSubmiting(false)
        } catch (error: any) {
            setSubmiting(false)
            console.log(error)
            setError(error?.response?.data?.message || 'Sign In failled')
        }
    }
    return (
        <Layout widthClass="">
            <div className="min-w-full min-h-full">
                <h1 className="text-white mb-5 text-2xl font-serif font-bold">
                    <center>
                        Private Group
                    </center>
                </h1>
                <form action="" onSubmit={handleSubmit(submit)}>
                    {
                        error ?
                            <p className={error == 'User Added To group' ? '!text-green-500 text-center' : 'authErrorslabel text-center'}>{error}</p> : null
                    }
                    <Input {...register('code')} placeholder="Enter Code to Join"></Input>
                    {errors.code &&
                        <p className="authErrorslabel">{errors.code.message}</p>
                    }
                    <Button className={submiting ? 'disabled:bg-black' : ''} disabled={submiting} type='submit' text={submiting ? <Loader /> : 'Save'}></Button>
                </form>
            </div>
            <div className="mt-9">
                {
                    state?.isActive ?
                        <LinkButton url={'/dashboard'} text={'Dashboard'}></LinkButton>
                        :
                        <Button onClick={Back} text="Go Back"></Button>
                }
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