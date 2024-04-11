import React, { useState } from 'react';
import Signup from '../components/Signup';
import LogIn from '../components/LogIn';

const Auth = () => {
  const [newUser, setNewUser] = useState(true);

  const setNewUserFalse = () => {
    setNewUser(false);
  }

  const setNewUserTrue = () => {
    setNewUser(true);
  }

  return (
    <React.Fragment>
      {newUser ? <Signup change={setNewUserFalse} /> : <LogIn change={setNewUserTrue} />}
    </React.Fragment>
  )
}

export default Auth;