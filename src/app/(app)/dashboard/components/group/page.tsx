'use client'
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import React, { useEffect, useRef, useState } from "react"
import '../../../globals.css'
import { Header } from "../header/header"
import { state } from "@/store/poxy"
import { Loader } from "@/components/custom/loader"
import socketServer from "@/helpers/socket"



function GroupChats({ chatsArray, identifier }: any) {
    const [activeUser, setActiveuser] = useState(1);
    let [chats, setChats]: any = useState(chatsArray);
    const [msgSending, setMsgSending] = useState(false);
    const socket = socketServer();
    let scrollDiv: any = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        socket.emit('join-group', identifier);
    }, [])
    useEffect(() => {
        socket.on('new-user-added', (data) => {
            setActiveuser(data?.activeUsers)
        })
    }, [])
    useEffect(() => {
        socket.on('error-msg', (data) => {
            const { msg } = data;
            alert(msg)
        })
    }, [])
    useEffect(() => {
        socket.on('new-msg', (msg) => {
            setMsgSending(false)
            setChats((e: []) => [...e, msg])
        })
        return () => {
            if (socket)
                socket.off('new-msg');
        }
    }, [])


    if (chats?.length <= 0) chats = [];
    const [userID, setuserID] = useState(null);
    useEffect(() => {
        setuserID(state.loggedUser._id);
    }, []);

    const sendText = async (e: any) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const text = form.get('message') as string;
        if (text?.length <= 0)
            return
        setMsgSending(true)
        socket.emit('group-msg', { msg: text, identifier: identifier })
        e.target.reset();
    }

    useEffect(() => {
        if (scrollDiv.current)
            scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
    }, [chats])
    let chatDate: any = '';

    return (
        <div className="h-full flex flex-col ">
            <div className='h-16'>
                <Header name={identifier} activeUser={activeUser} />
            </div>
            <div className="h-full flex flex-col p-2">
                <div
                    ref={scrollDiv} id="scrollDiv" className="fields flex flex-col  flex-grow h-[50vh]
                 hiddren-scroll overflow-y-auto 
                 transition-all duration-1000 ease-linear
                 ">
                    {
                        chats &&
                            chats?.length <= 0 ?
                            <div>

                                <h1 className="text-3xl h-full opacity-35 font-extrabold align-middle">
                                    <center>
                                        Not Chats Till Now
                                    </center>
                                </h1>
                            </div> :
                            chats && chats?.map((e: any, i: number) => (
                                <div key={i} className="w-full">
                                    {
                                        chatDate === new Date(e?.createdAt).toDateString() ? '' :
                                            (() => {
                                                //New Day Chats
                                                chatDate = (new Date(e?.createdAt).toDateString());
                                                return (
                                                    <div className={`w-full text-center py-5 text-white text-opacity-30`}>
                                                        <div className="flex justify-center">
                                                            <p className="w-fit p-2 rounded-full bg-white bg-opacity-10">
                                                                <span>
                                                                    {new Date(e.createdAt).toDateString()}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })()
                                    }
                                    <div className={`w-full my-2  group
                            flex message
                            ${(e.senderID == userID) || ((e?.TempID == userID)) ? `justify-end ` : `justify-start`}
                        `}>
                                        <div className="relative flex flex-row gap-2 ">
                                            <div className={`p-3 phone:p-1 rounded-md bg-white 
                         text-white bg-opacity-25 w-fit my-1 max-w-[60%]
                         ${e.senderID == userID ? 'bg-white border-[1px] border-white' : 'bg-blue-500 bg-opacity-50'}`}>
                                                <p className="phone:text-[15px]">
                                                    {e.msg}
                                                </p>
                                            </div>
                                            <div className="">
                                                <p className="text-xs phone:text-[0.5rem] h-full flex items-end text-opacity-50 text-white">
                                                    {
                                                        new Date(e.updatedAt).toLocaleTimeString('en-US', { hour12: true, minute: '2-digit', hour: 'numeric' })
                                                    }
                                                </p>
                                            </div>
                                            <div className="hidden z-10  bg-white text-black rounded-md px-4 py-2
                                        top-8 left-12 group-hover:absolute group-hover:flex flex-col gap-2">
                                                <div className="flex p-1 hover:bg-black rounded-md
                             hover:bg-opacity-10 w-full flex-row gap-1 items-center">
                                                    Delete
                                                </div>
                                                <div className="flex p-1 hover:bg-black rounded-md
                             hover:bg-opacity-10 w-full flex-row gap-1 items-center">
                                                    Reply
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                <div className="input bg-[#052043]">
                    <form onSubmit={sendText} action="" className="flex w-full flex-row gap-2 py-1">
                        <Input name="message" className="w-full flex-grow" placeholder="Message"></Input>
                        <Button disabled={msgSending} className="!w-28 !bg-black hover:!bg-black hover:!text-white !text-white" type='submit' text={msgSending ? <Loader /> : 'Send'}></Button>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default GroupChats;