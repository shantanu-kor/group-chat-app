import React from "react";
import ChatWindow from "../components/ChatWindow";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.setFalse());
    localStorage.removeItem('token');
  };

  return (
    <React.Fragment>
      <div className="text-right">
        <button className="p-2 m-3 md:text-2xl text-1xl border rounded-xl text-white bg-blue-700 hover:bg-blue-900" onClick={logoutHandler}>Logout</button>
      </div>
      <ChatWindow />
    </React.Fragment>
  );
};

export default Home;
