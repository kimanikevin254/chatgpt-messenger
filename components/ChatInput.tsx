'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { db } from '../firebase'

type Props = {
    chatId: String
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState('')
    const { data: session } = useSession()

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!prompt) return;

        const input = prompt.trim()
        setPrompt('')

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        message)

        // toast notification

        // call api
        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        })
    }

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg tetx-sm'>
        <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
            <input 
                type="text"
                placeholder='Type your query here...'
                className='focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-500'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={!session}
             />
             <button 
                type='submit'
                disabled={!session || !prompt}
                className='bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:hidden'
            >
                <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
             </button>
        </form>

        <div>
            {/* Model Selection */}
        </div>
    </div>
  )
}

export default ChatInput