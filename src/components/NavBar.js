import React, { useState } from "react";
import { Menu, Button, Modal, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

import SignUp from "./SignUp";
import Login from "./Login";

const NavBar = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  // using global state to check if user logged in
  const isLoggedIn = false;


  const logoutHandler = () => {
    console.log("Logout clicked.")
  };

  return (
    <Menu size="small">
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Dropdown item icon="map">
        <Dropdown.Menu>
          <Dropdown.Item>Area 1</Dropdown.Item>
          <Dropdown.Item>Area 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {!isLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item icon="user" as={Link} to="/profile"></Menu.Item>
          <Menu.Item>
            <Modal
              basic
              dimmer="inverted"
              onClose={() => setOpenLogin(false)}
              onOpen={() => setOpenLogin(true)}
              open={openLogin}
              trigger={
                <Button style={{ backgroundColor: "#87ba77" }}>Login</Button>
              }
              className="alignment"
              size="mini"
            >
              <Login />
              <Modal.Actions className="alignment">
                <Button
                  size="tiny"
                  color="black"
                  onClick={() => setOpenLogin(false)}
                >
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </Menu.Item>
          <Menu.Item>
            <Modal
              basic
              dimmer="inverted"
              onClose={() => setOpenRegister(false)}
              onOpen={() => setOpenRegister(true)}
              open={openRegister}
              trigger={
                <Button style={{ backgroundColor: "#6d97bd" }}>Sign Up</Button>
              }
              size="tiny"
              className="alignment"
            >
              <SignUp />
              <Modal.Actions className="alignment">
                <Button
                  size="tiny"
                  color="black"
                  onClick={() => setOpenRegister(false)}
                >
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </Menu.Item>
        </Menu.Menu>
      )}
      {isLoggedIn && (
        <Menu.Item position="right">
          <Menu.Item name="profile" />
          <Button
            onClick={logoutHandler}
            style={{ color: "white", backgroundColor: "#E06F41" }}
          >
            Logout
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavBar;
