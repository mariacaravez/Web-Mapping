/*
 * This file simulates our Home page.
 * It is where we hold our frontend routes and
 * display the contents of our home page.
 */

// Imports include libraries/dependencies/packages that we use in our application.
import React from "react";
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// All other components in our application
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import BaseMaps from "./components/BaseMaps/BaseMaps";


/* Application Begins Here */
export default function App() {

  return (
      <Router>
        <Fragment>
          <Route exact path="/">
            <NavBar />
            {/* <BaseMaps/> */}
            
          </Route>

          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Fragment>
      </Router>
  );
}
