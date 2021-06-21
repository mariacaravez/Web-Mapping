/*
 * This file simulates our Home page.
 * It is where we hold our frontend routes and
 * display the contents of our home page.
 */

// Imports include libraries/dependencies/packages that we use in our application.
import React from "react";
import { Fragment, useState, useEffect } from "react";
import Axios from "./Axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// All other components in our application
import BaseMap from "./components/BaseMap";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import { ContextProvider } from "./Context";

/* Application Begins Here */
export default function App() {

  const fetchData = async () => {
    try {
      const response = await Axios.get("/");
      console.log(response);
    } catch (err) {}
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  // Routing & UI Begins Here
  return (
    <ContextProvider>
      <Router>
        <Fragment>
          <Route exact path="/">
            <NavBar />
            <BaseMap />
          </Route>

          <Switch>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Fragment>
      </Router>
    </ContextProvider>
  );
}
