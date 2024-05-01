import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const groupRef = useRef<HTMLInputElement>(null);
  const email = useSelector(
    (state) => (state as { auth: { email: string } }).auth.email
  );

  const func = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/user/get-groups`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      setGroups(data.groups);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    const id = setInterval(async () => {
      await func();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    try {
      const name = (groupRef as { current: { value: string } }).current.value;
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/group/create-group`,
        { name },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      await axios.post(
        `${import.meta.env.VITE_URL}/admin/make-admin`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      alert(data.message);
      (groupRef.current as { value: string }).value = "";
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="text-1xl">
      <form
        onSubmit={submitHandler}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          placeholder="New group's name"
          className="m-2 p-1 text-black"
          ref={groupRef}
        />
        <button
          type="submit"
          className="p-1 rounded-md bg-blue-800 hover:bg-blue-950 border text-white"
        >
          Create Group
        </button>
      </form>
      <ul>
        {groups.map((item, index) => (
          <li key={index} className="m-4 p-1 border text-white">
            <Link to={`/${(item as { name: string }).name}`}>
              {(item as { name: string }).name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
