import { styled } from "styled-components";
import DesktopProfile from "./desktop/DesktopProfile";
import MobileProfile from "./mobile/MobileProfile";
import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// profile page with components for desktop or mobile version
const Profile = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState("favorites");
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <MobileProfile index={index} setIndex={setIndex} />
      <DesktopProfile index={index} setIndex={setIndex} />
    </Container>
  );
};

export default Profile;

// styling
const Container = styled.div`
  display: block;
  @media only screen and (min-width: 960px) {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
`;
