import { styled } from "styled-components";
import MenuRow from "./MenuRow";
import { UserContext } from "../../../context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bodyOptions, faceOptions } from "../../../helpers/constants";

// component in the header showing the menu for mobile
const Menu = ({ setShowMenu }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <Container>
      <MenuRow options={bodyOptions} setShowMenu={setShowMenu}>
        Body
      </MenuRow>
      <MenuRow options={faceOptions} setShowMenu={setShowMenu}>
        Face
      </MenuRow>
      <MenuRow
        onClick={() => {
          setShowMenu(false);
          navigate("/about");
        }}
      >
        About
      </MenuRow>
      {currentUser ? (
        <>
          <MenuRow
            onClick={() => {
              setShowMenu(false);
              navigate("/profile");
            }}
          >
            {" "}
            Profile{" "}
          </MenuRow>
          <MenuRow
            onClick={() => {
              setShowMenu(false);
              navigate("/submission");
            }}
          >
            {" "}
            Request{" "}
          </MenuRow>
          <MenuRow
            onClick={() => {
              setShowMenu(false);
              setCurrentUser(null);
              window.sessionStorage.removeItem("currentUser");
              navigate("/");
            }}
          >
            {" "}
            Log Out{" "}
          </MenuRow>
        </>
      ) : (
        <MenuRow
          onClick={() => {
            setShowMenu(false);
            navigate("/login");
          }}
        >
          Log In
        </MenuRow>
      )}
    </Container>
  );
};

export default Menu;

// styling
const Container = styled.div`
  margin-top: 0.2rem;
  position: relative;
  z-index: 1;
  background-color: white;
  font-weight: bold;
  @media only screen and (min-width: 960px) {
    display: none;
  }
`;
