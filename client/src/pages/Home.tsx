import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import GroupWindow from "../components/GroupWindow";
import { useHistory } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(authActions.setFalse());
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <React.Fragment>
      <div className="text-right">
        <button className="p-2 m-3 md:text-2xl text-1xl border rounded-xl text-white bg-blue-700 hover:bg-blue-900" onClick={logoutHandler}>Logout</button>
      </div>
      <GroupWindow />
    </React.Fragment>
  );
};

export default Home;
