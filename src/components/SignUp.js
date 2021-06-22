import React from "react";
import { useState, useContext } from "react";
import {
  Form,
  Button,
  Grid,
  Label,
  Segment,
} from "semantic-ui-react";
import Axios from "../Axios";
// import {toast} from "react-toastify"

import { Context, ContextProvider } from "../Context";


// style={{color: "white", backgroundColor: "#3a7dcf"}}

const SignUp = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useContext(Context);


  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");

  const submitSignUp = async (e) => {
    e.preventDefault();
    try {

      const response = await Axios.post("/new-user", {
        firstname,
        lastname,
        email,
        password,
      });

      if(response.jwtToken){
        localStorage.setItem("token", response.jwtToken);
        setIsAuthenticated(true);
        console.log("Sign Up Successful!");
        console.log(response);
      }
      else{
        setIsAuthenticated(false);
        console.log("Sign Up Failed.")
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="alignment">
      <Grid padded="very">
        <Segment>
          <Label
            style={{ color: "white", backgroundColor: "#3a7dcf" }}
            size="huge"
            attached="top"
          >
            Create Account
          </Label>
          <Form onSubmit={submitSignUp()} style={{ paddingTop: "5%" }}>
            <Form.Group>
              <Form.Input
                required
                label="First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              ></Form.Input>
              <Form.Input
                required
                label="Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              ></Form.Input>
            </Form.Group>
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
            <Form.Input
              required
              type="password"
              label="Confirm Password"
              value={c_password}
              onChange={(e) => {
                setC_Password(e.target.value);
              }}
            ></Form.Input>
            <Form.Field className="alignment">
              <Button
                style={{ color: "white", backgroundColor: "#3a7dcf" }}
                type="submit"
              >
                Sign Up
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </Grid>
    </div>
  );
};

export default SignUp;
