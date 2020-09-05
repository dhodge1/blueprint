import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = (props) => {
  const [username, setUsername] = useState("fnk_user");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isEntitled, setIsEntitled] = useState(false);

  const context = {
    username,
    setUsername,
    isEntitled,
    setIsEntitled,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
