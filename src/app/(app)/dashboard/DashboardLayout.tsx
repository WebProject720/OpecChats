'use client'
import { BgText } from '@/components/custom/bgText';
import '../globals.css'
import { Aside } from './components/aside/aside';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { store } from '@/store/poxy';
import { useSnapshot } from 'valtio';

export default function DashboardLayout({ children }: any) {
  const path = usePathname();
  const proxy = useSnapshot(store);
  console.log(proxy.user, proxy);

  const [screen, setScreen] = useState(false);
  useEffect(() => {
    setScreen(path.includes('group'));
  }, [path])

  return (
    <div className="h-screen flex flex-row bg-[#052043] text-white">
      {/* phone:!bg-[#3d4876] phone:!bg-[#052043] phone:!bg-[#3d4876] */}
      <div className={`w-1/5 bg-[#032f6e]  p-3 
      phoneTheme:w-1/2 phone:!w-full 
      phone:bg-gradient-to-t from-[#e68220] to-[#dc3ea39e] 
      border-[0px] border-white 
      phoneTheme:${screen && screen ? 'hidden' : 'auto'}
      `}>
        <Aside />
      </div>
      <BgText className={`phoneTheme:w-1/2 laptopTheme:!hidden  phoneTheme:${screen && screen ? 'hidden' : 'auto'} phone:!hidden`} />
      <main className={`phoneTheme:${screen && screen ? '' : 'hidden'}   w-full bg-[#052043] p-0 flex h-screen flex-col  flex-grow`}>
        <section className='bg-[#052043] flex-grow'>
          {children}
        </section>
      </main>
    </div>
  );
}

