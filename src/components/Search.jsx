import React, { useEffect, useState, useContext } from "react";
import { db, auth } from "../context/firebase";
import {nanoid} from 'nanoid'

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  CircleDashed,
  EllipsisVertical,
  MessageSquareText,
} from "lucide-react";

import { SearchIcon } from "lucide-react";
import { signOut } from "firebase/auth";
import UserContext from "../context/User";
import { Link } from "react-router-dom";

const Contacts = () => {

  const [rooms, setRooms] = useState([]);
  const [roomSearch, setRoomSearch] = useState("");

  const { currentUser, active, setActive } = useContext(UserContext);
  const [err, setErr] = useState("");

  const addRoom = async () => {
    const roomName = window.prompt("Enter room name");
    if (roomName === "" || roomName === null) {
      console.log("Room is without name");
      return;
    }

    const newRoom = {
      name: roomName,
      owner: nanoid()
    }

    setRooms((oldRooms) => [...oldRooms, newRoom]);
    const docRef = await addDoc(collection(db, "rooms"),newRoom);
    const chatsRef = await addDoc(collection(docRef, "chats"), {
      messages: [],
    });

    console.log(chatsRef);
  };

  const getRooms = async () => {
    const allRooms = await getDocs(collection(db, "rooms"));
    const newRooms = [];

    console.log("rooms-length", rooms.length);

    allRooms.forEach((room) => {
      newRooms.push(room.data());
    });
    setRooms((oldRooms) => [...newRooms]);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleSearch = async (value) => {
    if (value === "") {
      getRooms();  
      return;
    }

    console.log("query", value);
    console.log("searching...");
    const q = query(collection(db, "rooms"), where("name", "==", value));
    const querySnapshot = await getDocs(q);
    let allRooms = [];
    querySnapshot.forEach((doc) => {
      allRooms.push(doc.data());
    });
    setRooms((oldRooms) => allRooms);
    console.log(rooms);
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearch(e.target.value);
  };

  const logout = () => {
    const response = confirm("Do you want to logout?");
    console.log(response);
    if (response == true) {
      signOut(auth);
    } else {
      return;
    }
  };

  const setActiveRoom = async(roomId) => {
    console.log("room supported", roomId)
    const q = query(collection(db, "rooms"), where("owner", "==", roomId));
    const querySnapshot = await getDocs(q);
    setActive(querySnapshot)
    console.log("active room is:",active)
  };

  return (
    <div className="h-screen overflow-y-auto sticky left-0 top-0 ">
      {/* seach field section */}
      <div className="bg-[#EDEDED] flex flex-col sticky top-0">
        <div className="flex justify-between p-5 align-middle ">
          <div className="flex place-items-center gap-4">
            <img
              src="../../logedin-user.png"
              className="rounded-full w-14 h-14"
              alt=""
            />
            <p className="font-medium text-lg max-w-52">
              {currentUser.displayName}
            </p>
          </div>
          <div className="flex gap-2 place-items-center">
            <div className="p-2 hover:bg-gray-300 hover:rounded-lg">
            <CircleDashed
              strokeWidth={3}
              className="text-gray-500 cursor-pointer "
              />
              </div>
              <div className="p-2 hover:bg-gray-300 hover:rounded-lg">

            <MessageSquareText
              strokeWidth={2}
              className="text-gray-500 cursor-pointer"
              />
              </div>
              <div className="p-2 hover:bg-gray-300 hover:rounded-lg">
            <EllipsisVertical
              strokeWidth={2}
              className="text-gray-500 cursor-pointer"
              />
              </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <button
            onClick={logout}
            className=" border border-green-500 py-2 px-4 m-2 rounded-xl hover:bg-green-500 hover:text-white active:ring
      active:ring-green-300 duration-300"
          >
            Log out
          </button>
          <button
            onClick={addRoom}
            className=" border border-green-500 py-2 px-4 m-2 rounded-xl hover:bg-green-500 hover:text-white active:ring
      active:ring-green-300 duration-300"
          >
            Add Room
          </button>
        </div>
        <div className="flex bg-[#F6F6F6] p-3 px-5 place-items-center relative">
          <SearchIcon
            strokeWidth={3}
            className=" text-gray-500 absolute left-9"
          />
          <input
            className="rounded-3xl pl-10 h-10 w-full outline-0 text-lg z-100"
            type="text"
            value={roomSearch}
            onKeyDown={handleKeyDown}
            onChange={(e) => setRoomSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        {/* rooms section */}
        {rooms.map((room, index) => (
          <div className="hover:bg-slate-100 p-4" key={index}>
            <Link
              onClick={() => setActiveRoom(room.owner)}
              href=""
              className="flex items-center gap-3 mb-3  cursor-pointer"
            >
              <img
                src="../../logedin-user.png"
                className="rounded-full w-14 h-14"
                alt=""
              />
              <div>
                <p className="font-bold text-xl">{room.name}</p>
              </div>
            <hr/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
