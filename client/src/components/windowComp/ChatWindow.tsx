import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const ChatWindow = () => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState([]);
  const { group } = useParams() as { group: string };

  const sendMessageHandler = async () => {
    try {
      const message = (messageRef as { current: { value: string } }).current
        .value;
      if (message.length === 0) {
        throw new Error("Enter a message");
      }
      await axios.post(
        `${import.meta.env.VITE_URL}/message/add-message`,
        {
          message,
          name: group,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      (messageRef as { current: { value: string } }).current.value = "";
    } catch (err: any) {
      if (err.message) {
        alert(err.message);
      } else {
        alert(err.response.data.message);
      }
    }
  };

  const loadOlderMessagesHandler = async () => {
    try {
      const messageId = (messages[0] as { id: number }).id;
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/message/get-old-messages?messageId=${messageId}&name=${group}`,
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
      alert(err.response.data.message);
    }
  };

  const func = async () => {
    try {
      let oldMessages = localStorage.getItem(`messages${group}`);
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
        `${
          import.meta.env.VITE_URL
        }/message/get-messages?messageId=${lastMessageId}&name=${group}`,
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
      localStorage.setItem(`messages${group}`, JSON.stringify(newMessage));
      setMessages(
        (prevState) => [...prevState, ...response.data.messages] as []
      );
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    const message = localStorage.getItem(`messages${group}`);
    if (message) {
      setMessages(JSON.parse(message));
    }
    const id = setInterval(async () => {
      await func();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [group]);

  return (
    <div className="flex flex-col">
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
              {(item as { userName: string }).userName} -{" "}
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
    </div>
  );
};

export default ChatWindow;
