import styled from "styled-components";
import MenuIcon from "./mobile/MenuIcon";
import Menu from "./mobile/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rows from "./desktop/Rows";

// header component showing the navbar
const Header = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <Wrapper>
      <NavBar>
        <div onClick={() => navigate("/")}>
          <Logo>skinTech Report</Logo>
        </div>
        <Rows />
        <Box>
          <MenuIcon open={showMenu} onClick={() => setShowMenu(!showMenu)} />
        </Box>
      </NavBar>
      {showMenu && <Menu setShowMenu={setShowMenu} />}
    </Wrapper>
  );
};

export default Header;

// styling
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
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  font-weight: normal;
  color: var(--content-color);
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  color: white;
  font-size: 1rem;
  @media only screen and (min-width: 960px) {
    display: none;
  }
`;
