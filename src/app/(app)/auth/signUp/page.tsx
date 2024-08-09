'use client'

import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts';
import Layout from "../AuthLayout"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import '../../globals.css'
import { signUpSchema } from "@/schemas/authZOD"
import { Loader } from "@/components/custom/loader";
import axios, { AxiosResponse } from 'axios'
import { useRouter } from "next/navigation";




export default function signUp() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            username: '',
            password: '',
            email: ''
        },
        resolver: zodResolver(signUpSchema),
    });
    const route = useRouter()
    const [debounceUsername, setDebounce] = useDebounceValue('', 500);
    const [isCheckingUsername, setCheckingUsername] = useState(false);
    const [usernameMsg, setusernameMsg] = useState('');
    const [emailErr, setEmailErr] = useState('')
    const [submiting, setSubmiting] = useState(false)
    useEffect(() => {
        setDebounce(watch('username'))
    }, [watch('username')])


    const submitForm = async (e: any) => {
        try {
            if (usernameMsg != 'username is unique') return;
            setSubmiting(true)
            const { response }: any = await axios.post('/api/auth/signUp', e)
            console.log(response);
            setSubmiting(false)
            route.replace(`/auth/verify?email=${e.email}`);
        } catch ({ response }: any) {
            console.log(response)
            setSubmiting(false)
            setEmailErr(response?.data.message || 'Try again');
        }
    }

    useEffect(() => {
        const checkUsername = async () => {
            if (debounceUsername) {
                setusernameMsg('')
                setCheckingUsername(true)
                const response = await axios.post('/api/auth/checkUsername', {
                    username: debounceUsername.trim()
                });
                if (response) {
                    setusernameMsg(response.data.message);
                }
                setCheckingUsername(false);
            }
        }
        checkUsername();
    }, [debounceUsername])
    return (
        <Layout>
            <div>
                <div className="">
                    <div>
                        <h1 className="text-center text-4xl text-white font-bold mb-5">
                            Sign Up
                        </h1>
                    </div>
                    <form action="" className="flex gap-6 flex-col"
                        onSubmit={handleSubmit(submitForm)}>
                        <div className="space-y-1">
                            <input className="authInput"
                                {...register('username')}
                                placeholder="Username" type="text" />
                            {errors.username && (
                                <p className="authErrorslabel">
                                    {errors.username.message}
                                </p>
                            )}
                            {isCheckingUsername && !errors.username &&
                                <div className="flex flex-row gap-2 items-center authErrorslabel">
                                    <Loader className="authErrorslabel" />
                                    <span className="authErrorslabel !text-white">
                                        Checking...
                                    </span>
                                </div>
                            }
                            {
                                usernameMsg && !isCheckingUsername && !errors.username &&
                                (<p
                                    className={usernameMsg == 'username is unique' ? 'text-green-600 text-xs' : 'authErrorslabel'}
                                >{usernameMsg}</p>)
                            }
                        </div>
                        <div className="space-y-1">
                            <input className="authInput" {...register('email')}
                                placeholder="Email" type="email" />
                            {errors.email && (<p className="authErrorslabel">
                                {errors.email.message}
                            </p>)}
                            {
                                <p className="authErrorslabel">
                                    {emailErr && emailErr}
                                </p>
                            }
                        </div>
                        <div className="space-y-1">
                            <input className="authInput" {...register('password')} placeholder="Password" type="password" />
                            {errors.password && (<p className="authErrorslabel">
                                {errors.password.message}
                            </p>)}
                        </div>
                        <Button className={`${submiting ? 'disabled:' : ''}  text-center flex justify-center`} type="submit">
                            {submiting ? <Loader></Loader> : 'save'}
                        </Button>
                    </form>
                </div>
                <div >
                    <hr className="mt-3 mb-3" />
                    <div>
                        <Button className="w-full">Continue with Google</Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}