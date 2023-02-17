'use client'

import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import { collection, orderBy, query } from "firebase/firestore";
import ChatRow from "./ChatRow";

type Props = {
  session: any
}

function SideBar({ session }: Props) {
  // const { data } = useSession()
  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email!, 'chats'),
    orderBy('createdAt', 'desc'))
  )
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                {/* New chat */}
                <NewChat />
            </div>

            <div>
                {/* Model selection */}
            </div>

            {/* Map through chat rows */}
            {
              chats?.docs.map(chat => (
                <ChatRow key={chat.id} id={chat.id} />
              ))
            }
        </div>
        {
          session && <img src={session.user?.image!} alt='sign out'
            className="h-12 w-12 rounded-full cursor-pointer mx-auto
             mb-2 hover:opacity-50 text-white text-xs"
             onClick={() => signOut()}
          />
          
        }
    </div>
  )
}

export default SideBar