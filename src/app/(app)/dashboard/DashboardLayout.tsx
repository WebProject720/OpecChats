'use client'
import '../globals.css'
import { Aside } from './components/aside/aside';
import { Header } from './components/header/header';


export default function DashboardLayout({ children }: any) {
  return (
    <div className="h-screen flex flex-row bg-slate-700 text-white">
      <div className='w-1/5 bg-[#1f2e43] p-3
      border-[0px] border-white'>
        <Aside />
      </div>
      <main className='w-full bg-[#052043] p-0 flex h-screen flex-col  flex-grow'>
        <div className='h-16'>
          <Header />
        </div>
        <section className='bg-slate-400 flex-grow'>
          {children}
        </section>
      </main>
    </div>
  );
}

