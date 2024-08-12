'use client'
import '../globals.css'
import { Aside } from './components/aside/aside';
import { Header } from './components/header/header';


export default function DashboardLayout({ children }: any) {
  return (
    <div className="min-h-screen flex bg-slate-700 text-white">
      <div className='w-1/5 bg-gray-700 p-1'>
        <Aside />
      </div>
      <main className='w-full bg-red-300 p-0'>
        <Header />
        <section>
          <h1>
            <center>
              {children}
            </center>
          </h1>
        </section>
      </main>
    </div>
  );
}

