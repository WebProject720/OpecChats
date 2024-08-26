'use client'
import React, { useState } from "react";
import Layout from "../AuthLayout";
import { Input } from "@/components/custom/input";
import { Button } from "@/components/custom/button";
import { GoogleButton } from "@/components/custom/googleButton";
import { LinkButton } from "@/components/custom/LinkButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/authZOD";
import '../../globals.css'
import { Loader } from "@/components/custom/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { state } from "@/store/poxy";



export default function Page() {
    const [submiting, setSubmiting] = useState(false);
    const route = useRouter();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors }
    } = useForm({
        defaultValues: {
            identifier: '',
            password: ''
        },
        resolver: zodResolver(signInSchema)
    })


    const submit = async (data: any) => {
        setError('')
        try {
            setSubmiting(true)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/auth/login`, data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',  // Ensure the content type is correct
                    }
                });
            if (res) {
                state.loggedUser = res?.data?.data.user || {};
                state.isActive=true;
                route.push('/dashboard');
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
        <Layout>
            <div>
                <p className="text-white text-4xl font-bold">
                    Sign In
                </p>
            </div>
            <div>
                <div className="form">
                    <form action="" onSubmit={handleSubmit(submit)}
                        className="flex flex-col gap-2"
                    >
                        <Input {...register('identifier')} placeholder="Username or Email" />
                        {errors.identifier &&
                            <p className="authErrorslabel">{errors.identifier.message}</p>
                        }
                        <Input {...register('password')} placeholder="Password" type="password" />
                        {errors.password &&
                            <p className="authErrorslabel">{errors.password.message}</p>
                        }
                        {
                            error &&
                            <p className={`authErrorslabel text-center w-full
                                ${error == ('login successfully') ? '!text-green-500' : ''}
                                `}>{error}</p>
                        }
                        <Button disabled={submiting} type='submit' text={submiting ? <Loader /> : 'Save'}></Button>
                    </form>
                </div>
                <div>
                    <hr className="mt-5 mb-5" />
                    <GoogleButton></GoogleButton>
                </div>
                <div className="actions flex justify-between mt-7">
                    <div></div>
                    <div>
                        <LinkButton
                            url={'/auth/signUp'}
                            text={'Register'}
                        ></LinkButton>
                    </div>
                </div>
            </div>
        </Layout>
    )
}