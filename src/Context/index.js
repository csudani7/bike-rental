//Global Imports
import { createContext, useState } from "react";

export const ApplicationProcessContext = createContext({
  user: {},
  setUser: {},
});

export const UserDataContext = (props) => {
  const [user, setUser] = useState(null);
  const setHandleUser = (user) => {
    setUser(user);
  };

  const ApplicationProcessContextValue = {
    user,
    setHandleUser,
  };

  return (
    <ApplicationProcessContext.Provider value={ApplicationProcessContextValue}>
      {props.children}
    </ApplicationProcessContext.Provider>
  );
};
