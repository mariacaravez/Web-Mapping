import React from "react";
import { useState } from "react";
import { Form, Button, Grid, Label, Segment, Message } from "semantic-ui-react";
import Axios from "../Axios";

// style={{color: "white", backgroundColor: "#2d8a1d"}}

const Login = () => {
  // Form Input Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  // Function to Call Backend Route
  const submitLogin = () => {
    console.log("FE Fetch");
    Axios.post("/login", {
      email,
      password,
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        setIsLoggedIn(false);
        console.log("Login Failed.");
        console.log(response);
      } else {
        setIsLoggedIn(true);
        localStorage.setItem("token", response.data.jwtToken);
        console.log("Login Successful!");
      }
    });
  };

  /* UI Begins Here */
  return (
    <div className="alignment">
      <Grid>
        <Segment>
          <Label
            style={{ color: "white", backgroundColor: "#2d8a1d" }}
            size="huge"
            attached="top"
          >
            Login
          </Label>
          <Form onSubmit={submitLogin} style={{ paddingTop: "10%" }}>
            <Form.Input
              required
              type="email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Input>
            <Form.Input
              required
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Input>
            <Form.Field className="alignment">
              <Button
                style={{ color: "white", backgroundColor: "#2d8a1d" }}
                type="submit"
              >
                Login
              </Button>
            </Form.Field>
          </Form>
          {isLoggedIn && (
            <Message
              success={isLoggedIn}
              header="You have successfuly made an account!"
              content="You can now login with your credentials."
            />
          )}
        </Segment>
      </Grid>
    </div>
  );
};

export default Login;
