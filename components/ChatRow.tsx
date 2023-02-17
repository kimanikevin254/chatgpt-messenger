import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase"

type Props = {
    id: String
}
function ChatRow({ id }: Props) {
    const pathName = usePathname()
    const router = useRouter()
    const {data: session} = useSession()
    const [active, setIsActive] = useState(false)

    const [messages, loading, error] = useCollection(query(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
    ))

    useEffect(() => {
        if(!pathName) return;

        setIsActive(pathName.includes(id))
    }, [pathName])

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace('/')
    }
  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-blue-700/50'}`}>
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 hidden md:inline-flex truncate">
        {
            messages?.docs[messages?.docs.length -1]?.data().text || 'Chat'
        }
        </p>
        <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-500 hover:text-red-700" />
    </Link>
  )
}

export default ChatRow