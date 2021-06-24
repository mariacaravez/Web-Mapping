/*
 * This file simulates our Home page.
 * It is where we hold our frontend routes and
 * display the contents of our home page.
 */

// Imports include libraries/dependencies/packages that we use in our application.
import React from "react";
import { Fragment,  useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// All other components in our application
import BaseMap from "./components/BaseMap";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";

/* Application Begins Here */
export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <Router>
        <Fragment>
          <Route exact path="/">
            <NavBar />
            <BaseMap />
          </Route>

          <Switch>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Fragment>
      </Router>
  );
}
