'use client'

import { useSession } from "next-auth/react"
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
          session && <img src={session.user?.image!} alt='profile' />
          
        }
    </div>
  )
}

export default SideBar