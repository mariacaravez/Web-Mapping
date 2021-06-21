import React from "react";
import { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import BaseMap from "./components/BaseMap";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <Fragment>
        <Route exact path="/">
          <NavBar />
          <BaseMap />
        </Route>

        <Switch>
          <Route
            exact
            path="/sign-up"
            render={(props) =>
              !isAuthenticated ? (
                <SignUp {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          >
            <SignUp />
          </Route>
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/profile" />
              )
            }
          >
            <Login />
          </Route>
          <Route
            exact
            path="/profile"
            render={(props) =>
              isAuthenticated ? (
                <Profile {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          >
            <Profile />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}
