'use client'
import { BgText } from '@/components/custom/bgText';
import '../globals.css'
import { Aside } from './components/aside/aside';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { state } from '@/store/poxy';
import { useRouter } from 'next/navigation';


export default function DashboardLayout({ children }: any) {
  const path = usePathname();
  const router = useRouter()
  const [groupPath, setGroupPath] = useState(false);
  // const socket = io();
  // socket.on('chats', () => {

  // })
  useEffect(() => {
    const { isActive } = state;
    if (!isActive)
      router.replace('/auth')
  }, [state])
  useEffect(() => {
    setGroupPath(path.includes('group'));
  }, [path])

  return (
    <div className="h-screen flex flex-row bg-[#052043] text-white
    ">
      {/* phone:!bg-[#3d4876] phone:!bg-[#052043] phone:!bg-[#3d4876] */}
      <div className={`w-1/5   p-3 
      phoneTheme:w-1/2 phone:!w-full 
      border-[0px] border-white  bg-radient  laptop:!bg-[#032f6e]
      phone:${groupPath ? '!hidden' : ''} 
      `}>
        <Aside />
      </div>
      <BgText className={`phoneTheme:w-1/2 laptopTheme:!hidden
         phone:!hidden ${groupPath ? '!hidden' : ''}`} />
      <main className={`${groupPath ? 'flex' : '!hidden'}
         w-full bg-[#052043] p-0  h-screen flex-col  flex-grow`}>
        <section className='bg-[#052043] flex-grow'>
          {children}
        </section>
      </main>
    </div>
  );
}

