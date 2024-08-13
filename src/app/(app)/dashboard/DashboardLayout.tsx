'use client'
import { BgText } from '@/components/custom/bgText';
import '../globals.css'
import { Aside } from './components/aside/aside';


export default function DashboardLayout({ children }: any) {
  return (
    <div className="h-screen flex flex-row bg-[#052043] text-white">
      <div className='w-1/5 bg-[#032f6e] p-3 
      phoneTheme:w-1/2 phone:!w-full phone:!bg-[#052043]
      border-[0px] border-white '>
        <Aside />
      </div>
      <BgText className='phoneTheme:w-1/2 laptopTheme:!hidden phone:!hidden' />
      <main className='phoneTheme:hidden w-full bg-[#052043] p-0 flex h-screen flex-col  flex-grow'>
        <section className='bg-[#052043] flex-grow'>
          {children}
        </section>
      </main>
    </div>
  );
}

