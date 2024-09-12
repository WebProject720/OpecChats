'use client'
import { Button } from "@/components/custom/button";
import { Input } from "@/components/custom/input";
import { Options } from "@/components/custom/InputOptions";
import { LinkButton } from "@/components/custom/LinkButton";
import { GroupSchema } from "@/models/group.model";
import { CreateGroupSchema } from "@/schemas/createG";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


export default function Page() {
    const [submiting, setSubmit] = useState(false);
    const [isErr, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [disabled, setDisabled] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            code: '',
            type: ''
        },
        resolver: zodResolver(CreateGroupSchema)
    });
    const submit = (data: any) => {
        console.log(data);
    }
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
            <div className="bg-white space-y-9  py-9 bg-opacity-15 rounded-md p-5">
                <div>
                    <h1>
                        <center>
                            New Group
                        </center>
                    </h1>
                </div>
                <form onSubmit={handleSubmit(submit)} action="" className="flex flex-col gap-4 z-10">
                    <div className="">
                        <label htmlFor="file" className="flex gap-1 w-full justify-start bg-white bg-opacity-15 rounded-md p-2 items-center hover:cursor-pointer">
                            <img width="50" height="50" className="bg-white rounded-full p-1" src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/external-upload-image-photography-outline-outline-black-m-oki-orlando.png" alt="external-upload-image-photography-outline-outline-black-m-oki-orlando" />
                            <span className="bg-transparent">Upload Image</span>
                        </label>
                        <input className="hidden" type="file" name="file" id="file" />
                    </div>
                    <Input className="w-full" {...register('name')} placeholder="Group Name"></Input>
                    {errors.name &&
                        <p className="authErrorslabel">{errors.name.message}</p>
                    }
                    <Options onChange={(e) => {
                        (e.target.value.toLowerCase() == 'private' ? setDisabled(false) : undefined);
                    }} options={['Group Type', 'Public', 'Private']}></Options>
                    <Input className="w-full" disabled={disabled} {...register('code')} placeholder="Unique Code"></Input>
                    {errors.code &&
                        <p className="authErrorslabel">{errors.code.message}</p>
                    }
                    <Button type='submit' text='Create'></Button>
                </form>
            </div>
            <div className="mt-9">
                <LinkButton url={'/dashboard'} text={'Go To Home'}></LinkButton>
            </div>
        </div>
    )
}