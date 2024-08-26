'use client'
import { BgText } from '@/components/custom/bgText';
import '../globals.css'
import { Aside } from './components/aside/aside';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { state } from '@/store/poxy';
import { useSnapshot } from 'valtio';

export default function DashboardLayout({ children }: any) {
  const path = usePathname();
  const [groupPath, setGroupPath] = useState(false);
  const user = useSnapshot(state);

  useEffect(() => {
    setGroupPath(path.includes('group'));
  }, [path])

  return (
    <div className="h-screen flex flex-row bg-[#052043] text-white">
      {/* phone:!bg-[#3d4876] phone:!bg-[#052043] phone:!bg-[#3d4876] */}
      <div className={`w-1/5 bg-[#032f6e]  p-3 
      phoneTheme:w-1/2 phone:!w-full 
      phone:bg-gradient-to-t from-[#e68220] to-[#dc3ea39e] 
      border-[0px] border-white
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

