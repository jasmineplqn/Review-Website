import { useNavigate, NavLink } from "react-router-dom";
import { styled } from "styled-components";
import Dropdown from "./Dropdown";
import { bodyOptions, faceOptions } from "../constants";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";

const Rows = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <Wrapper>
      <Dropdown options={bodyOptions}>Body</Dropdown>
      <Dropdown options={faceOptions}>Face</Dropdown>
      <NavOption
        onClick={() => {
          navigate("/about");
        }}
      >
        About
      </NavOption>
      {currentUser !== null ? (
        <>
          <NavOption
            onClick={() => {
              navigate("/profile");
            }}
          >
            {" "}
            Profile{" "}
          </NavOption>
          <NavOption
            onClick={() => {
              navigate("/proposals");
            }}
          >
            {" "}
            Proposal{" "}
          </NavOption>
          <NavOption
            onClick={() => {
              setCurrentUser(null);
              window.sessionStorage.removeItem("currentUser");
          }}
          >
            {" "}
            Log Out{" "}
          </NavOption>
        </>
      ) : (
        <NavOption
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </NavOption>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const NavOption = styled.div`
  display: none;
  width: 5rem;
  height: 100%;
  margin: 0 0.5rem;
  font-size: 1.2rem;
  align-items: center;
  cursor: pointer;
  text-underline-offset: 0.4rem;
  text-decoration: underline 0.15rem rgba(0, 0, 0, 0);
  transition: text-decoration 300ms;

  &:hover {
    text-decoration: underline 0.2rem var(--content-color);
  }

  @media only screen and (min-width: 960px) {
    display: flex;
  }
`;

export default Rows;
