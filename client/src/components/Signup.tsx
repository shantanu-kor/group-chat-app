import React, { MutableRefObject, useRef } from "react";

const Signup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <div className="border border-black 2xl:mx-[34%] xl:mx-[30%] lg:mx-[25%] sm:mx-[19%] mx-[15%] rounded-xl bg-violet-800 text-white">
        <h2 className="md:text-3xl text-2xl text-center m-2">Signup</h2>
        <form className="md:text-2xl text-1xl text-center" onSubmit={submitHandler}>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            className="border border-black my-2 text-black bg-violet-300"
            ref={nameRef}
            required
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            className="border border-black my-2 text-black bg-violet-300"
            ref={emailRef}
            required
          />
          <br />
          <label htmlFor="phone">Phone: </label>
          <input
            id="phone"
            type="tel"
            className="border border-black my-2 text-black bg-violet-300"
            ref={phoneRef}
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
          <button type="submit" className="border p-1 m-2 bg-violet-950 hover:bg-violet-700 rounded-xl">Submit</button>
        </form>
      </div>
      <div className="md:text-2xl text-1xl text-center my-5">
        <button className="border border-indigo-700 p-2 rounded-xl bg-indigo-700 text-white hover:bg-indigo-900">
          Already a User? Login
        </button>
      </div>
    </React.Fragment>
  );
};

export default Signup;
