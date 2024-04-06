import React from 'react';

const Signup = () => {
  return (
    <React.Fragment>
      <div className="border border-black md:mx-[25%] mx-[10%] rounded-xl bg-violet-800 text-white">
      <h2 className="md:text-3xl text-2xl text-center">Signup</h2>
        <form className="md:text-2xl text-1xl text-center">
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" className="border border-black my-2 text-black bg-violet-300" />
            <br />
            <label htmlFor="email">Email: </label>
            <input id="email" type="email" className="border border-black my-2 text-black bg-violet-300" />
            <br />
            <label htmlFor="phone">Phone: </label>
            <input id="phone" type="tel" className="border border-black my-2 text-black bg-violet-300" />
            <br />
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" className="border border-black my-2 text-black bg-violet-300" />
        </form>
      </div>
      <div className="md:text-2xl text-1xl text-center my-5">
        <button className="border border-indigo-700 p-2 rounded-xl bg-indigo-700 text-white hover:bg-indigo-900">Already a User? Login</button>
      </div>
    </React.Fragment>
  )
}

export default Signup;