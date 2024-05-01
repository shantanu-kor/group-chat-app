import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const GroupDetails = () => {
  const memberRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState([]);
  const [createdBy, setCreatedBy] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);

  const { group } = useParams() as { group: string };

  const email = useSelector(
    (state) => (state as { auth: { email: string } }).auth.email
  );
  const history = useHistory();

  const func = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_URL}/group/get-details/${group}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      let data = response.data;
      setCreatedBy(data.createdBy);
      setMembers(data.users);
      response = await axios.get(
        `${import.meta.env.VITE_URL}/admin/is-admin?name=${group}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      data = response.data;
      setIsAdmin(data.admin);
      response = await axios.get(
        `${import.meta.env.VITE_URL}/admin/get-admins?name=${group}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      data = response.data;
      setAdmins(data.admins);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  function adminCheck(email: string) {
    if (admins.indexOf(email as never) === -1) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      func();
    }, 1000);
    return () => {
      clearInterval(id);
    };
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

  const makeAdminHandler = async (email: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/admin/make-admin`,
        {
          name: group,
          email,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const removeHandler = async (email: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/admin/remove-member`,
        {
          email,
          name: group,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const exitHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/admin/remove-member`,
        {
          email,
          name: group,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      history.push("/");
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
          <li key={index}>
            {(item as { email: string }).email}{" "}
            {adminCheck((item as any).email) ? (
              <span className="text-green-300">Admin</span>
            ) : (
              isAdmin && (
                <button
                  className="border p-[1px] rounded bg-green-800"
                  onClick={makeAdminHandler.bind(null, (item as any).email)}
                >
                  Make Admin
                </button>
              )
            )}
            {(item as any).email === email ? (
              <button
                className="border rounded bg-red-600 p-[1px] mx-1"
                onClick={exitHandler}
              >
                Exit
              </button>
            ) : (
              isAdmin && (
                <button
                  className="border rounded bg-red-600 p-[1px] mx-1"
                  onClick={removeHandler.bind(null, (item as any).email)}
                >
                  Remove
                </button>
              )
            )}
          </li>
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
