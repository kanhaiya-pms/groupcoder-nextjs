"use client"
import { Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {

    const router = useRouter()


  return (
    <header className="bg-black">
    <nav className="flex justify-between items-center px-5 py-4">
    <Link href={"/"}> <div className="text-xl text-white py-2">
      <span className='border border-dotted lg:border-4 md:border-4 sm:border-4  rounded-[50%] p-2 lg:text-2xl sm:text-xl font-bold text-white'>G<span className='text-cyan-400'>C</span></span>
        <span className='text-white lg:text-3xl sm:text-xl mt-2  font-bold italic' style={{textShadow:" green"}}>Group<span className='text-cyan-400 italic'>Coder</span></span>
      </div></Link>
      <div className="flex gap-4">
    
      <Button onClick={()=>router.push('/signup')} type="primary">Login</Button>
      <Button onClick={()=>router.push('/signin')}  type="primary">Signup</Button>
      </div>
    </nav>
</header>
  )
}

export default Header