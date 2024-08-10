'use client'

import React, { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts';
import Layout from "../AuthLayout"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import '../../globals.css'
import { signUpSchema } from "@/schemas/authZOD"
import { Loader } from "@/components/custom/loader";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/custom/LinkButton";
import { Button } from "@/components/custom/button";
import { GoogleButton } from "@/components/custom/googleButton";
import { Input } from "@/components/custom/input";



export default function Page() {
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
                const username = debounceUsername.trim();
                if (username.length <= 0) {
                    return
                }
                setCheckingUsername(true)
                setusernameMsg('')
                const response = await axios.post('/api/auth/checkUsername', {
                    username
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
                    <form action="" className="flex gap-2 flex-col"
                        onSubmit={handleSubmit(submitForm)}>
                        <div className="space-y-1">
                            <Input className="authInput"
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
                                    className={usernameMsg == 'username is unique' ? 'text-[#30f578] text-xs' : 'authErrorslabel'}
                                >{usernameMsg}</p>)
                            }
                        </div>
                        <div className="space-y-1">
                            <Input className="authInput" {...register('email')}
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
                            <Input className="authInput" {...register('password')} placeholder="Password" type="password" />
                            {errors.password && (<p className="authErrorslabel">
                                {errors.password.message}
                            </p>)}
                        </div>
                        <Button className={`${submiting ? 'cursor-not-allowed' : ''}  text-center flex justify-center`}
                            disabled={submiting}
                            type="submit"
                            text={submiting ? <Loader></Loader> : 'save'}>
                        </Button>
                    </form>
                </div>
                <div >
                    <hr className="mt-3 mb-3" />
                    <div>
                        <GoogleButton />
                    </div>
                </div>
                <div className="flex justify-between mt-7">
                    <div></div>
                    <LinkButton
                        url={'/auth'}
                        text={'Login'}
                    ></LinkButton>
                </div>
            </div>
        </Layout>
    )
}