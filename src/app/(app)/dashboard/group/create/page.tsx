'use clinet'
import { Button } from "@/components/custom/button";
import { Input } from "@/components/custom/input";
import { Options } from "@/components/custom/InputOptions";
import { LinkButton } from "@/components/custom/LinkButton";
import React from "react";


export default function Page() {
    return (
        <div className="min-w-full  flex flex-col gap-2 justify-center items-center bg-gray-500 bg-gradient-to-tl from-blue-400 to-[#d04dd6] min-h-screen text-white
    bg-radient">
            <div className="">
                <h1 className="text-4xl font-bold mb-6">
                    <center>
                        New Group
                    </center>
                </h1>
            </div>
            <div className="bg-white  py-9 bg-opacity-15 rounded-md p-5">
                <form action="" className="flex flex-col gap-4 z-10">
                    <Input placeholder="Group Name"></Input>
                    <Options options={['Group Type', 'Public', 'Private']}></Options>
                    <Input disabled placeholder="Unique Code"></Input>
                    <Button type='submit' text='Create'></Button>
                </form>
            </div>
            <div className="mt-9">
                <LinkButton url={'/dashboard'} text={'Go To Home'}></LinkButton>
            </div>
        </div>
    )
}