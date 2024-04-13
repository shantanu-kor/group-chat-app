import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const ChatWindow = () => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState([]);

  const sendMessageHandler = async () => {
    try {
      const message = (messageRef as { current: { value: string } }).current
        .value;
      await axios.post(
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
      (messageRef as { current: { value: string } }).current.value = "";
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const loadOlderMessagesHandler = async () => {
    try {
      const messageId = (messages[0] as { id: number }).id;
      const response = await axios.get(
        `http://localhost:3000/message/get-old-messages?messageId=${messageId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data.messages;
      // console.log(data, messages);
      setMessages((prevState) => [...data, ...prevState] as []);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  const func = async () => {
    try {
      let oldMessages = localStorage.getItem("messages");
      let lastMessageId = -1;
      let message;
      if (oldMessages) {
        message = JSON.parse(oldMessages);
        if (message.length > 0) {
          lastMessageId = message[message.length - 1].id;
        }
      } else {
        message = [];
      }
      const response: any = await axios.get(
        `http://localhost:3000/message/get-messages?messageId=${lastMessageId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      let newMessage = [...message, ...response.data.messages];
      let length = newMessage.length - 10;
      if (length < 0) {
        length = 0;
      }
      newMessage = newMessage.slice(length);
      localStorage.setItem("messages", JSON.stringify(newMessage));
      setMessages(
        (prevState) => [...prevState, ...response.data.messages] as []
      );
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    const message = localStorage.getItem("messages");
    if (message) {
      setMessages(JSON.parse(message));
    }
    const id = setInterval(async () => {
      await func();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="text-center m-4 md:text-2xl text-1xl text-white">
        {messages.length > 0 && (messages[0] as { id: number }).id !== 1 && (
          <button
            className="bg-violet-950 hover:bg-violet-800 p-1 rounded-md"
            onClick={loadOlderMessagesHandler}
          >
            Show older messages
          </button>
        )}
      </div>
      <ul className="text-center text-white md:text-2xl text-1xl">
        {Array.isArray(messages) ? (
          messages.map((item) => (
            <li key={(item as { id: number }).id}>
              From: {(item as { userName: string }).userName} -{" "}
              {(item as { message: string }).message}
            </li>
          ))
        ) : (
          <h3>{messages}</h3>
        )}
      </ul>
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-center gap-3 p-4">
        <textarea
          className="sm:w-[720px] w-[245px]  rounded md:text-2xl text-1xl"
          ref={messageRef}
          required
        ></textarea>
        <button
          className="text-white p-2 bg-green-700 hover:bg-green-800 rounded-md"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChatWindow;
