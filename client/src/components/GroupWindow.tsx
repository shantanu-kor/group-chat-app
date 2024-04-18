import { Route } from "react-router-dom";
import ChatWindow from "./windowComp/ChatWindow";
import GroupDetails from "./windowComp/GroupDetails";
import Groups from "./windowComp/Groups";

const GroupWindow = () => {
  return (
    <div className="flex md:flex-row flex-col gap-2 justify-around">
      <Groups />
      <Route path="/:group">
        <ChatWindow />
        <GroupDetails />
      </Route>
    </div>
  );
};

export default GroupWindow;
