import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const GroupDetails = () => {
  const memberRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState([]);
  const [createdBy, setCreatedBy] = useState("");
  const { group } = useParams() as { group: string };

  const func = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/group/get-details/${group}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      setCreatedBy(data.createdBy);
      setMembers(data.users);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    func();
  }, []);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    try {
      const memberEmail = (memberRef.current as { value: string }).value;
      await axios.post(
        `${import.meta.env.VITE_URL}/group/add-member`,
        {
          email: memberEmail,
          name: group,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/group/get-details/${group}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      const data = response.data;
      setCreatedBy(data.createdBy);
      setMembers(data.users);
      (memberRef.current as { value: string }).value = "";
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
  return (
    <div className="flex flex-col text-1xl m-4 text-white">
      <h3>Created by: {createdBy}</h3>
      <h3>Members: </h3>
      <ol className="list-decimal list-inside">
        {members.map((item, index) => (
          <li key={index}>{(item as { email: string }).email}</li>
        ))}
      </ol>
      <form
        onSubmit={submitHandler}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          placeholder="Email address"
          className="m-2 p-1 text-black"
          ref={memberRef}
        />
        <button
          type="submit"
          className="p-1 rounded-md bg-blue-800 hover:bg-blue-950 border text-white"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default GroupDetails;
