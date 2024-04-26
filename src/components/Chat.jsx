import React, { useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useState, useEffect } from "react";

import { db } from "../context/firebase";

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import UserContext from "../context/User";

const Chat = () => {


  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const { currentUser, active } = useContext(UserContext);


  // console.log("active room: ", active.docs[0].id)

  const writeData = async (e) => {
    e.preventDefault();
    if (currentMessage === "") {
      console.log("no message to add");
      return;
    }

    const newMessage = {
      uid: currentUser.uid,
      body: currentMessage,
      displayName: currentUser.displayName,
    };

    setMessages((oldMessages) => [...oldMessages, newMessage]);

    const roomRef = doc(db, "rooms", active.docs[0].id);
    const chatRef = collection(roomRef, "chats");
    

    console.log("chats reference", chatRef);
    const newMessages = [...messages, newMessage];

    const querySnapshot = await getDocs(chatRef)
    const chatDocRef = querySnapshot.docs[0].ref

    await updateDoc(chatDocRef, { messages: newMessages });
    console.log("Messages added to existing chat document.");

    setCurrentMessage("");
    getData()

  };

  const getData = async () => {
    console.log('current-messages', messages)
    const roomRef = doc(db, "rooms", active.docs[0].id);
    const chatRef = collection(roomRef, "chats");

    const docSnap = await getDocs(chatRef);

    const allMessages = []

    const chatMessages = docSnap.docs[0].data()['messages']
    
    chatMessages.forEach(message=>{
      allMessages.push(message)
    })

    setMessages(oldMessages => [...allMessages])

  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Optional: Use smooth scrolling
    });
  }, [messages]);

  return (
    <div className="w-3/4 bg-hero-pattern bg-repeat flex flex-col ">
      <ChatHeader />
      <ChatBody messages={messages} />
      <ChatFooter
        writeData={writeData}
        setCurrentMessage={setCurrentMessage}
        currentMessage={currentMessage}
      />
    </div>
  );
};

export default Chat;
