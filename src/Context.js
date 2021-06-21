/*
 * Global states of variables within application
 *
 */

import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {

    /* React Hooks Begins Here (https://reactjs.org/docs/hooks-intro.html) */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Context.Provider value={(isAuthenticated, setIsAuthenticated)}>
      {props.children}
    </Context.Provider>
  );
};
