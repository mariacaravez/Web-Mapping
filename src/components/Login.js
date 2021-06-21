import React from 'react';
import { useState } from 'react';
import { Form, Button, Grid, Label, Segment, Message } from 'semantic-ui-react';

// style={{color: "white", backgroundColor: "#2d8a1d"}}

const Login = () => {

  // Form Input Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to Call Backend Route
  const submitLogin = () => {
    console.log("LOGIN SUBMITTED")
  }

  /* UI Begins Here */
  return ( 
    <div className="alignment">
      <Grid padded="very">
        <Segment>
          <Label style={{color: "white", backgroundColor: "#2d8a1d"}} size="huge" attached="top">Login</Label>
          <Form onSubmit={submitLogin()} style={{paddingTop: "10%"}}>
            <Form.Input required type="email" label="Email" value={email} onChange={(e) => {setEmail(e.target.value);}}></Form.Input>
            <Form.Input required type="password" label="Password" value={password} onChange={(e) => {setPassword(e.target.value);}}></Form.Input>
            <Form.Field className="alignment">
              <Button style={{color: "white", backgroundColor: "#2d8a1d"}} type="submit">Login</Button>
            </Form.Field>
          </Form>
        </Segment>
      </Grid>      
    </div>
   );
}
 
export default Login;