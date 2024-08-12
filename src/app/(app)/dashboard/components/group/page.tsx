import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import React from "react"


export function Group() {
    const chats = [
        {
            msg: "HELLO",
            sender: '',
            sendBy: true
        },
    ]
    return (
        <div className="h-full flex flex-col">
            <div className="fields flex-grow bg-[#052043]">

            </div>
            <div className="input bg-[#052043]">
                <form action="" className="flex w-full flex-row gap-2 p-2 px-3">
                    <Input className="w-full flex-grow" placeholder="Message"></Input>
                    <Button className="w-28" type='submit' text='Send'></Button>
                </form>
            </div>
        </div>
    )
}