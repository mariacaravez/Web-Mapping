/*
 * "Context is designed to share data that can be 
 * considered “global” for a tree of React components, 
 * such as the current authenticated user..."
 */

import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {

    /* React Hooks Begins Here (https://reactjs.org/docs/hooks-intro.html) */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Context.Provider value={(isAuthenticated, setIsAuthenticated)}>
      {props.children}
    </Context.Provider>
  );
};
