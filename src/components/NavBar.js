import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";


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
    </Menu>
  );
};

export default NavBar;
