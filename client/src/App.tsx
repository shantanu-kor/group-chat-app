import { Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <h1 className="text-5xl text-center my-4 p-4 bg-orange-400">Chat With</h1>
      <Switch>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </>
  );
}

export default App;
