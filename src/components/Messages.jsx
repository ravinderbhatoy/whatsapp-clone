import React, { useContext } from "react";
import UserContext from "../context/User";

const Messages = (props) => {

  const {currentUser, active} = useContext(UserContext)

  return (
    <div className="w-full place-content-end">
      {!active ? <p>Set a room</p> : "" }
      {props.messages.map((item, index) => (
        <div key={index}  className={`my-4 w-fit flex flex-col ${
          item.uid === currentUser.uid ? "ml-auto mr-8 " :"mr-auto ml-8" 
        }`}>
          <span className={`font-medium ${item.uid === currentUser.uid ? "ml-auto" : "mr-auto"}` }>{item.displayName}</span>
        <div
          className={`w-fit rounded-lg p-2 border ${
            item.uid === currentUser.uid ? "ml-auto bg-[#DCF8C6]" :"mr-auto bg-white" 
          }`}>
          <p className="font-normal text-xl max-w-lg">{item.body}</p>
        </div>
          </div>
      ))}
    </div>
  );
};

export default Messages;
