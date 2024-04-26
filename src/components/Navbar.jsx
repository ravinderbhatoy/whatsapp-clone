import React, { useContext, useState } from "react";
import {
  CircleDashed,
  EllipsisVertical,
  MessageSquareText,
} from "lucide-react";

import { SearchIcon } from 'lucide-react'
import { signOut } from "firebase/auth";
import { auth,db } from "../context/firebase";
import UserContext from "../context/User";

import { collection, query, where, getDocs } from "firebase/firestore";


const Navbar = (props) => {

  const [roomName, setRoomName] = useState("")
  const [rooms, setRooms] = useState("")
  const [err, setErr] = useState("")

  const handleSearch = async(value) =>{
    console.log("query",value)
    console.log('searching...')
    const q = query(collection(db, "rooms"), where("name", "==", value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setRooms(oldRooms => [...oldRooms, doc.data()])
    });
    console.log(rooms)
  } 


  const handleKeyDown = (e) =>{
    e.code === "Enter" && handleSearch(e.target.value)
  }

  const {currentUser} = useContext(UserContext)

  const logout = () =>{
    const response = confirm('Do you want to logout?')
    console.log(response)
    if (response==true){
      signOut(auth)
    }else {
      return
    }
  }

  return (
    <div className="bg-[#EDEDED] flex flex-col sticky top-0">
      <div className="flex justify-between p-5 align-middle ">
        <div className="flex place-items-center gap-4">
        <img
          src="../../logedin-user.png"
          className="rounded-full w-14 h-14"
          alt=""
        />
        <p className="font-medium text-lg max-w-52">{currentUser.displayName}</p>
        </div>
        <div className="flex gap-5 place-items-center">
          <div className="icon-container">
          <CircleDashed
            strokeWidth={3}
            className="text-gray-500 cursor-pointer"
            />
            </div>
          <MessageSquareText
            strokeWidth={2}
            className="text-gray-500 cursor-pointer"
          />
          <EllipsisVertical
            strokeWidth={2}
            className="text-gray-500 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex w-full justify-between">
      <button onClick={logout} className=" border border-green-500 py-2 px-4 m-2 rounded-xl hover:bg-green-500 hover:text-white active:ring
      active:ring-green-300 duration-300">
        Log out
      </button>
      <button onClick={props.addRoom} className=" border border-green-500 py-2 px-4 m-2 rounded-xl hover:bg-green-500 hover:text-white active:ring
      active:ring-green-300 duration-300">
        Add Room
      </button>
      </div>
      <div className='flex bg-[#F6F6F6] p-3 px-5 place-items-center relative'>
        <SearchIcon strokeWidth={3} className='absolute left-8 text-gray-500'/>
        <input className='rounded-3xl pl-10 h-10 w-full outline-0 text-lg z-100' type="text" value={roomName} onKeyDown={handleKeyDown} onChange={(e)=>setRoomName(e.target.value)} />
        </div>
    </div>
  );
};

export default Navbar;
