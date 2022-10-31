import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'

function NavMenu() {
  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>MAP </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        {/* <LinkContainer to="/mint">
            <Nav.Link>Mint NFT</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/upload-ipfs">
            <Nav.Link>Upload a file to IPFS</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/assets">
            <Nav.Link>Owner Assets</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/bank">
            <Nav.Link>Central Bank</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;