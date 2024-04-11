import axios from "axios";
import React, { useRef } from "react";

const ChatWindow = () => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const sendMessageHandler = async () => {
    try {
      const message = (messageRef as { current: { value: string } }).current
        .value;
      const response = await axios.post(
        "http://localhost:3000/message/add-message",
        {
          message,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.message);
      (messageRef as { current: { value: string } }).current.value = "";
    } catch (err) {
      alert(
        (err as { response: { data: { message: string } } }).response.data
          .message
      );
    }
  };

  return (
    <React.Fragment>
      <div className="text-center text-white md:text-2xl text-1xl">
        Messages here!
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-center gap-3 p-4">
        <textarea
          className="sm:w-[720px] w-[245px]  rounded md:text-2xl text-1xl"
          ref={messageRef}
        ></textarea>
        <button
          className="text-white p-2 bg-green-700 rounded-md"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChatWindow;
