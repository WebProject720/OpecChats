'use client'
import { Button } from "@/components/custom/button";
import { Input } from "@/components/custom/input";
import { Options } from "@/components/custom/InputOptions";
import { Loader } from "@/components/custom/loader";
import { UploadFile } from "@/helpers/files/getFile";
import { CreateGroupSchema } from "@/schemas/createG";
import { state } from "@/store/poxy";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function Page() {
    const [submiting, setSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [uploadedImage, setUploadedImage] = useState();
    const [uploading, setUploading] = useState(false);
    const [file, setFile]: any = useState({
        preview: null,
        data: null
    })
    const router = useRouter()
    const [disabled, setDisabled] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            code: '',
            type: ''
        },
        resolver: zodResolver(CreateGroupSchema)
    });

    const Back = () => {
        router.back()
    }

    const submit = async (data: any) => {
        setErrMsg('')
        setSubmit(true)
        if (!data.code) data.type = "public"
        else data.type = "private"
        if (file.data) {
            data.profileImage = uploadedImage;
        }
        if (!disabled) {

            if (!data.code) {
                setErrMsg('Code Required for Private Group')
                setSubmit(false)
                return
            }
        }
        try {
            const response: any = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/group/create`, data, { withCredentials: true });
            const newG = response.data.data;
            state.loggedUser.adminOfGroups.push(newG)

            setSubmit(false)
            router.back()
        } catch (error: any) {
            setSubmit(false)
            const errorMsg: any = error?.response?.data?.message;
            setErrMsg(errorMsg);
        }
    }

    const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile({ Preview: URL.createObjectURL(event.target.files[0]), data: event.target.files[0] })
        }
    }

    const upload = async () => {
        if (file.data) {
            setUploading(true)
            const res: any = await UploadFile(file.data)

            if (!res.success) {
                alert('Image not upload')
                setUploading(false)
                return
            }
            setUploading(false)
            setUploadedImage(res?.data)
        } else {
            alert('Select Image')
            return
        }
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
                            Create Group
                        </center>
                    </h1>
                </div>
                <form onSubmit={handleSubmit(submit)} action="" className="flex flex-col gap-4 z-10">
                    <div className="">
                        <label htmlFor="file" className="flex gap-1 w-full flex-col justify-start bg-white bg-opacity-15 rounded-md p-2 items-center hover:cursor-pointer">
                            <Image width="100" height="100" className="bg-white object-cover rounded-full p-0"
                                src={file.Preview ? file.Preview : `https://img.icons8.com/external-outline-black-m-oki-orlando/32/external-upload-image-photography-outline-outline-black-m-oki-orlando.png`}
                                alt="external-upload-image-photography-outline-outline-black-m-oki-orlando" />
                            <Button className="disabled:hover:!bg-black" onClick={upload} disabled={uploading} text={uploading ? <Loader /> : file.data ? 'Change' : `Upload `}></Button>
                        </label>
                        <input accept=".png, .jpg, .jpeg" disabled={uploading} onChange={(e: any) => { getImage(e) }} className="hidden" type="file" name="file" id="file" />
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
                    {
                        errMsg &&
                        <p className="authErrorslabel">{errMsg}</p>
                    }
                    <Button className={submiting ? 'disabled:bg-black' : ''} disabled={submiting || uploading} type='submit' text={submiting ? <Loader /> : 'Create'}></Button>
                </form>
            </div>
            <div className="mt-9">
                <Button onClick={Back} text="Go Back"></Button>
            </div>
        </div>
    )
}