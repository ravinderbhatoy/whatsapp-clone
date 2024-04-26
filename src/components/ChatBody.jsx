import React from 'react'
import Messages from './Messages'

const ChatBody = (props) => {
  return (
    <div className='flex h-full'>
        {/* messages */}
    <Messages messages = {props.messages} />
    </div>
  )
}

export default ChatBody