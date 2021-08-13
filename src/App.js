/*
 * This file simulates our home/landing page.
 * It is where we hold our frontend routes and
 * display the contents of our home page.
 * 
 * It currently only serves our BaseMap component.
 * 
 */

// Imports include libraries/dependencies/packages that we use in our application.
import React from "react";
import { Fragment } from "react";

// For front end routing
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// Components to serve in landing page
import BaseMap from "./components/BaseMap";
import Profile from "./components/Profile";

/* Application Begins Here */
export default function App() {

  return (

      <Router>
        <Fragment>
          <Route exact path="/">
            <BaseMap />
          </Route>

          <Switch>
            {/* Potential front end routing for authentication purposes */}
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Fragment>
      </Router>
  );
}
