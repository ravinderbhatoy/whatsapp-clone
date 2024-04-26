import { Mic, Smile } from "lucide-react";
import React from "react";

const ChatFooter = (props) => {

  return (
    <div className="bg-[#EDEDED] p-6 flex place-items-center gap-3 sticky bottom-0">
      <Smile strokeWidth={2} className="cursor-pointer w-10 h-10" />
      <form onSubmit={(e)=>props.writeData(e)} className="w-full" action="">
        <input
        value={props.currentMessage}
        onChange={(e)=>{props.setCurrentMessage(e.target.value)}}
          className="rounded-full w-full text-xl h-14 p-5 outline-none"
          type="text"
          placeholder="Type a message"
        />
      </form>
      <Mic className="cursor-pointer w-10 h-10" />
    </div>
  );
};

export default ChatFooter;
