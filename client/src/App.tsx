import { Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import { authActions } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(
    (state) => (state as { auth: { isAuth: boolean } }).auth.isAuth
  );
  if (localStorage.getItem("token")) {
    dispatch(authActions.setTrue());
  }
  
  return (
    <>
      <h1 className="text-5xl text-center my-4 p-4 bg-orange-400">Chat With</h1>
      <Switch>
        <Route path="/">{auth ? <Home /> : <Auth />}</Route>
      </Switch>
    </>
  );
}

export default App;
