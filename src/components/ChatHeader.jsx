import { Paperclip, SearchIcon, EllipsisVertical } from 'lucide-react'
import React, { useContext } from 'react'
import UserContext from '../context/User'

const ChatHeader = () => {

  const {active} = useContext(UserContext)
  return (
    <div id='contact-header' className='bg-[#EDEDED] p-5 flex justify-between sticky top-0'>
        {/* current chat user */}
        <div className='flex gap-3 w-full place-items-center '>
        <img
          src="../../logedin-user.png"
          className="rounded-full w-12 h-12"
          alt=""
        />
        <div>
        <p className="font-bold text-xl">{active ? active.docs[0].data().name : ""}</p>
        </div>
        </div>
        <div className='flex items-center gap-2'>
        <div className="p-2 hover:bg-gray-300 hover:rounded-lg">
            <SearchIcon strokeWidth={2} className='text-gray-500 cursor-pointer'/>
        </div>
        <div className="p-2 hover:bg-gray-300 hover:rounded-lg">
            <Paperclip strokeWidth={2} className='text-gray-500 cursor-pointer'/>
        </div>
        <div className="p-2 hover:bg-gray-300 hover:rounded-lg">
            <EllipsisVertical strokeWidth={2} className='text-gray-500 cursor-pointer'/>
        </div>
        </div>
    </div>
  )
}


export default ChatHeader