import styled from "styled-components";
import MenuIcon from "./mobile/MenuIcon";
import Menu from "./mobile/Menu";
import { useState } from "react";
import {NavLink} from "react-router-dom"
import Rows from "./desktop/Rows";
const Header = () => {

const [showMenu, setShowMenu] = useState(false);

  return (
    <Wrapper>
      <NavBar>
        <div>LOGO</div>
        <Rows/>
        <Box>
            <MenuIcon open={showMenu} onClick={() => setShowMenu(!showMenu)} />
        </Box>
      </NavBar>
      {
        showMenu && <Menu setShowMenu={setShowMenu}/>
      }

    </Wrapper>
  );
};

export default Header;


const NavBar = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  @media only screen and (min-width: 960px) {
    padding: 0 1rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 3rem;
  font-family: var(--content-font-family);
  z-index: 10;
  top: 0;
  border: 2px #cdcdcd solid;
  @media only screen and (min-width: 600px) {
    height: var(--header-height);
  }
  /* @media only screen and (min-width: 768px) {
    height: var(--header-height);
  } */
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Box = styled.div`
  display: flex;
  color: white;
  font-size: 1rem;

  @media only screen and (min-width: 960px) {
    display: none;
  }
`;

const Info = styled.p`
  margin-right: 0.5rem;
  padding-right: 0.5rem;
  border-right: 2px solid var(--content-color);
  &:hover {
    color: white;
  }
`;

const Contacts = styled.div``;
