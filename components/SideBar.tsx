'use client'

import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"

type Props = {
  session: any
}

function SideBar({ session }: Props) {
  // const { data } = useSession()

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