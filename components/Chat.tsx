import React from 'react'

type Props = {
    chatId: String
}

function Chat({ chatId }: Props) {
  return (
    <div className='flex-1'>
        {chatId}
    </div>
  )
}

export default Chat