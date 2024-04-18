import axios from "axios";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const LogIn = (props: any) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    let data;
    try {
      data = await axios.post(`${import.meta.env.VITE_URL}/user/log-in`, {
        email,
        password,
      });
      const token = data.data.token;
      localStorage.setItem("token", token);
      data = data.data.message;
      (emailRef.current as { value: string }).value = "";
      (passwordRef.current as { value: string }).value = "";
      dispatch(authActions.setTrue());
    } catch (err) {
      data = (err as { response: { data: { message: string } } }).response.data
        .message;
    }
    alert(data);
  };

  return (
    <React.Fragment>
      <div className="border border-black 2xl:mx-[34%] xl:mx-[30%] lg:mx-[25%] sm:mx-[19%] mx-[15%] rounded-xl bg-violet-800 text-white">
        <h2 className="md:text-3xl text-2xl text-center m-2">Login</h2>
        <form
          className="md:text-2xl text-1xl text-center"
          onSubmit={submitHandler}
        >
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            className="border border-black my-2 text-black bg-violet-300"
            ref={emailRef}
            required
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            className="border border-black my-2 text-black bg-violet-300"
            ref={passwordRef}
            required
          />
          <br />
          <button
            type="submit"
            className="border p-1 m-2 bg-violet-950 hover:bg-violet-700 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="md:text-2xl text-1xl text-center my-5">
        <button
          className="border border-indigo-700 p-2 rounded-xl bg-indigo-700 text-white hover:bg-indigo-900"
          onClick={props.change}
        >
          New User? Signup
        </button>
      </div>
    </React.Fragment>
  );
};

export default LogIn;
