import React from "react";

const ChatWindow = () => {
  return (
    <React.Fragment>
      <div className="text-center">Messages here!</div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-center gap-3 p-4">
        <input type="text" className="w-[720px] h-[35px] rounded" />
        <button className="text-white p-2 bg-green-700 rounded-md">Send</button>
      </div>
    </React.Fragment>
  );
};

export default ChatWindow;
