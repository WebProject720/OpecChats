'use client'
import Image from 'next/image';
import '../globals.css'
import { LinkButton } from '@/components/custom/LinkButton';
import { useEffect, useState } from 'react';
import { state } from '@/store/poxy';
import { useRouter } from 'next/navigation';
import { UserLogout } from '@/helpers/UserLogout';
import { GuestLogout } from '@/helpers/GuestLogout';


export default function Page() {

  const router = useRouter();

  useEffect(() => {
    if (state.isActive) {
      router.replace('/dashboard');
    } else {
      state.loggedUser = {}
      state.Chats = []
    }
  }, [])
  useEffect(() => {
    async function Logout() {
      await GuestLogout();
      await UserLogout();
    }
    Logout()
  }, [])
  return (
    <div className=" bg-slate-700 text-white
    w-full min-h-screen  bg-gradient-to-t from-[#969697] to-[#2e2c5c]
    p-3 flex justify-center flex-col items-center
    bg-radient 
    ">
      <div className='w-full h-full mt-7'>
        <div className='w-full h-3/4 
        flex justify-center flex-col gap-10 items-center'>
          <Image alt='Logo' width={200} height={200} src='/logo-black.svg'
            className='rounded-full'
          ></Image>
          <div>
            <h1 className='text-4xl font-bold font-serif hover:scale-110
            transition-all duration-700 phone:text-xl  animate-pulse  text-center
            '>
              Welcome
              <span className='text-[#1ef519] text-5xl'> To
              </span>
              <span>  OpecChats </span>
            </h1>
          </div>
          <div className='flex flex-row phone:flex-col gap-4 justify-center items-center w-3/4'>
            {/* <LinkButton className='w-52 font-bold' text='Login' url='/auth'></LinkButton> */}
            <LinkButton className='w-52 font-bold' text='Join Group as Guest' url='/auth/guest'></LinkButton>
            <LinkButton className='w-52 font-bold' url='/auth' text='Get Started ->'></LinkButton>
          </div>
        </div>
      </div>
      <div className='w-full laptop:w-2/3 p-4 bg-white bg-opacity-10 rounded mt-6'>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">OpecChats Documentation</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">1. Project Overview</h2>
            <p className="mb-4">
              OpecChats is a hobby project developed using the <strong>MERN stack</strong>, inspired by the WhatsApp chat app. While it shares some similarities with WhatsApp, OpecChats introduces unique features and functionalities. The project leverages the MERN stack:
            </p>
            <ul className="list-disc ml-8 mb-4">
              <li><strong>Backend</strong>: Built with Node.js for handling API requests and MongoDB as the database.</li>
              <li><strong>Frontend</strong>: Uses Next.js to create a fast, SEO-friendly web application.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">2. Deployment</h2>
            <p className="mb-4">
              OpecChats is deployed using two platforms, suitable for hobby projects and free to use:
            </p>
            <ul className="list-disc ml-8 mb-4">
              <li><strong>Server (Node.js)</strong>: Deployed on Render.</li>
              <li><strong>Client (Next.js)</strong>: Deployed on Vercel.</li>
            </ul>
            <p>
              To deploy the project, the server and client code are committed to the GitHub repository <a href="https://github.com/webproject720" className="text-blue-500 hover:underline">webproject720</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">3. Groups</h2>
            <p className="mb-4">
              OpecChats supports two types of groups:
            </p>
            <ul className="list-disc ml-8 mb-4">
              <li><strong>Public Groups</strong>: Accessible to all users without any restrictions or permissions.</li>
              <li><strong>Private Groups</strong>: Require a code or password to join. Users must provide this information to access the group and participate in the chat.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">4. User Roles</h2>
            <p className="mb-4">
              There are two types of users in OpecChats:
            </p>
            <ul className="list-disc ml-8 mb-4">
              <li>
                <strong>Guest Users</strong>: Can join public groups and, if they have the code, can access private groups. A temporary ID is created for guests to log in and join groups.
              </li>
              <li>
                <strong>Registered Users</strong>: Must sign up and verify their email to create an account. Registered users can create and delete public or private groups, join groups, and have their chat history recorded.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">App Routes</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Route <code>/</code> (Home Route)</h3>
              <p>
                The homepage provides options to get started as a guest or registered user, view documentation, or connect via social media links. Upon landing, two requests are made to the server to log out any existing session, whether guest or logged in.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Route <code>/auth</code> (Authentication Route)</h3>
              <p>
                This route enables users to sign up or sign in. Email verification is required upon registration. Users can also choose to log in via Google authentication. The app utilizes server-side APIs to authenticate users and create cookies for session management.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Route <code>/dashboard</code> (User Dashboard Route)</h3>
              <p>
                After logging in, users can access the dashboard to view their joined private groups, created groups, and account details. The dashboard allows users to create new groups, join additional groups, or log out.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Route <code>/dashboard/group</code> (Group Route)</h3>
              <p>
                This route is accessible to both guests and verified users. It includes a search functionality to find and join groups. For private groups, users need to enter the group code to gain access. Public groups are open to all users.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Additional Information</h2>
            <p className="mb-4">
              <strong>GitHub Repositories</strong>:
              <a href="https://github.com/webproject720/OpecChats" className="text-blue-500 hover:underline">OpecChats (Frontend)</a> |
              <a href="https://github.com/webproject720/OpecChatsServer" className="text-blue-500 hover:underline">OpecChatsServer (Backend)</a>
            </p>
            <p>
              <strong>Contact</strong>:
              <a href="mailto:webproject720@gmail.com" className="text-blue-500 hover:underline">webproject720@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

