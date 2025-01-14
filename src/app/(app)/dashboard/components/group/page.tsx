'use client'
import { Button } from "@/components/custom/button"
import { Input } from "@/components/custom/input"
import React, { useEffect, useRef, useState } from "react"
import '../../../globals.css'
import { Header } from "../header/header"
import { state } from "@/store/poxy"
import { Loader } from "@/components/custom/loader"
import socketServer from "@/helpers/socket"
import { TextButton } from "@/components/custom/TextButton"
import Image from "next/image"



function GroupChats({ image, identifier }: any) {
    const [activeUser, setActiveuser] = useState(1);
    let [chats, setChats]: any = useState([]);
    const [msgSending, setMsgSending] = useState(false);
    const [query, setQuery] = useState('');
    const [replyID, setReplyID]: any = useState(null)

    useEffect(() => {
        setChats(state.Chats)
    }, [state, state.Chats])




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
            setMsgSending(false)
            alert(msg)
        })
    }, [])

    useEffect(() => {
        socket.on('deleted-msg', (data) => {
            if (data?.deleted) {
                let newChats = state.Chats?.filter((e: any) => e._id != data.id);
                state.Chats = newChats
                setChats(newChats)
            } else {
                alert('Error in deleting')
            }
        })
    }, [])
    useEffect(() => {
        socket.on('new-msg', (msg) => {
            setMsgSending(false)
            state.Chats = (state.Chats).concat(msg);
            setChats(state.Chats)
        })
        return () => {
            if (socket)
                socket.off('new-msg');
        }
    }, [])


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
        setReplyID(null)
        socket.emit('group-msg', { msg: text, identifier: identifier, replyTo: replyID })
        e.target.reset();
    }

    const deleteChatIn = async (id: string) => {
        socket.emit('delete-msg', { identifier: id, room: identifier })
    }


    useEffect(() => {
        if (scrollDiv.current)
            scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
    }, [chats])

    let chatDate: any = '';



    useEffect(() => {
        if (query.length > 0) {
            const filterChats = state.Chats?.filter((e: any) => e.msg.includes(query.toLowerCase()))
            setChats(filterChats);
        } else {
            setChats(state.Chats)
        }
    }, [query, setQuery])



    return (
        <div className="h-full flex flex-col ">
            <div className='h-16'>
                <Header profileImage={image || null} searchQuery={query} setSearchQuery={setQuery} name={identifier || ''} activeUsers={activeUser || 0} />
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
                                    <div className={`w-full my-2  
                            flex message
                            ${(e.senderID == userID) || ((e?.TempID == userID)) ? `justify-end ` : `justify-start`}
                        `}>
                                        <div className={`relative flex flex-row gap-2 
                                        ${(e.senderID == userID) || ((e?.TempID == userID)) ? `justify-end ` : `justify-start`}
                                            `}>
                                            <div className={` bg-white 
                         text-white bg-opacity-15 w-fit my-1 max-w-[60%] group rounded-md
                         ${e.senderID == userID ? 'bg-white border-[0px] border-white' : 'bg-black bg-opacity-20 text-white'}`}>
                                                <p className="bg-opacity-10 bg-white rounded-t-md p-1 px-4">
                                                    {e?.senderID == null ? 'Guest' : e.senderID == userID ? 'You' : e?.sender?.username}
                                                </p>
                                                <div className="bg-white bg-opacity-10 rounded-sm m-1">
                                                    {
                                                        e?.replyTo ? <p className="text-opacity-70 text-gray-50 text-center phone:!text-[14px]">{e?.replyTo?.msg}</p> : ''
                                                    }
                                                </div>
                                                <p className="phone:!text-[17px] p-1 phone:p-2 px-4 text-center">
                                                    {e.msg}
                                                </p>
                                                <div className={`hidden z-10  bg-white text-black rounded-md px-4 py-2
                                        top-8  group-hover:absolute group-hover:flex flex-col gap-2 ${(e.senderID == userID) || ((e?.TempID == userID)) ? '-left-12' : 'left-12'}`}>
                                                    {e.senderID == userID || e.TempID == userID ?
                                                        <div className="flex p-1 hover:bg-black rounded-md
                             hover:bg-opacity-10 w-full flex-row gap-1 items-center">
                                                            {
                                                                <TextButton onClick={() => deleteChatIn(e?._id)}>
                                                                    Delete
                                                                </TextButton>
                                                            }
                                                        </div> : null}
                                                    <div className="flex p-1 hover:bg-black rounded-md
                             hover:bg-opacity-10 w-full flex-row gap-1 items-center">
                                                        {
                                                            <TextButton onClick={() => setReplyID(e?._id)}>
                                                                Reply
                                                            </TextButton>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <p className="text-xs phone:text-[0.7rem] h-full flex items-end text-opacity-50 text-white">
                                                    {
                                                        new Date(e.updatedAt).toLocaleTimeString('en-US', { hour12: true, minute: '2-digit', hour: 'numeric' })
                                                    }
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
                <div className="input bg-[#052043]">
                    {replyID ? <div className="flex justify-between items-center w-full flex-row gap-2 p-2 bg-white bg-opacity-10 rounded-md">
                        <p>
                            {
                                chats && replyID &&
                                (chats?.filter((e: any) => e._id == replyID))[0]?.msg
                            }
                        </p>
                        <button className="bg-transparent bottom-0 border-0 " onClick={() => setReplyID(null)}>
                            <Image width={30} height={30} alt="Cancel" src='https://img.icons8.com/?size=100&id=3062&format=png&color=FFFFFF'></Image>
                        </button>
                    </div> : null}
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