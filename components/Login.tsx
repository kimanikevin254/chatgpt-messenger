'use client'

import { signIn } from "next-auth/react"
import Image from 'next/image' 

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen relative flex flex-col items-center justify-center">
        <Image
            src='https://links.papareact.com/2i6'
            width={300}
            height={300}
            alt='logo'
         />

         <button onClick={() => signIn('google')} className="text-white font-bold text-3xl animate-pulse">Sign In to use ChatGPT</button>

         <p  className="absolute bottom-6 text-white text-base animate-pulse">Made with ❤️ by Kim</p>
    </div>
  )
}

export default Login