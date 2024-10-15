'use client'
import { BgText } from '@/components/custom/bgText';
import '../globals.css'
import { Aside } from './components/aside/aside';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { state } from '@/store/poxy';
import { useRouter } from 'next/navigation';


function Layout({ children }: any) {
  const path = usePathname();
  const router = useRouter()
  const params = useSearchParams();
  const [groupPath, setGroupPath] = useState(false);
  const user = params.get('u');

  useEffect(() => {
    const { isActive, isGuest } = state;
    if (!isActive && !isGuest)
      router?.replace('/auth')
  }, [state.isActive])
  useEffect(() => {
    setGroupPath(path.includes('group'));
  }, [path])

  return (
    <div className="h-screen flex flex-row bg-[#052043] text-white bg-radient
    ">
      {/* phone:!bg-[#3d4876] phone:!bg-[#052043] phone:!bg-[#3d4876] */}
      <div className={`w-2/5   hiddren-scroll overflow-y-auto 
                 transition-all duration-1000 ease-linear
      phoneTheme:w-1/2 phone:!w-full h-screen
      border-[0px] border-white    laptop:!bg-[#032f6e]
      phone:${groupPath ? '!hidden' : ''} ${user == 'g' ? 'hidden' : ''}
      `}>
        {
          user == 'g' ? '' :
            <Aside className={user == 'g' ? 'hidden' : ''} />
        }
      </div>
      <BgText className={`phoneTheme:w-1/2 laptopTheme:!hidden
         phone:!hidden ${groupPath ? '!hidden' : ''}`} />
      <main className={`${groupPath ? 'flex' : '!hidden'}
         w-full bg-[#052043] p-0  h-screen flex-col  flex-grow`}>
        <section className='bg-[#052043]  flex-grow'>
        {/* bg-[#052043] */}
          {children}
        </section>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: any) {
  return (<Suspense fallback={<div>loading...</div>}>
    <Layout>{children}</Layout>
  </Suspense>)
}
