import Image from 'next/image';
import './globals.css'
import { LinkButton } from '@/components/custom/LinkButton';

export default function Home() {
  return (
    <div className=" bg-slate-700 text-white
    w-full min-h-screen  bg-gradient-to-t from-[#969697] to-[#2e2c5c]
    p-3
    ">
      <div className='w-full h-full mt-7'>
        <div className='w-full h-3/4 
        flex justify-center flex-col gap-10 items-center'>
          <Image alt='Logo' width={200} height={200} src='/favicon.ico'
            className='rounded'
          ></Image>
          <div>
            <h1 className='text-4xl font-bold'>
              Welcome To OpecChats
            </h1>
          </div>
          <div className='flex flex-row gap-4 justify-center w-3/4'>
            <LinkButton className='w-52 font-bold' text='Login' url='/auth'></LinkButton>
            <LinkButton className='w-52 font-bold' url='/dashboard' text='Get Started'></LinkButton>
          </div>
        </div>
      </div>
      <div className='w-full p-4 bg-white bg-opacity-10 rounded mt-6'>
        <div className="heading">
          <div>
            <h1 className='text-3xl font-bold '>
              Description
            </h1>
            <hr className='mt-2 mb-2' />
          </div>
          <div>
            <p className='font-light p-2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat aspernatur ad illo fuga, et cumque dolore ducimus deleniti libero voluptates quasi provident ab, sit quas quam consequatur alias laborum neque.
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat aspernatur ad illo fuga, et cumque dolore ducimus deleniti libero voluptates quasi provident ab, sit quas quam consequatur alias laborum neque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

