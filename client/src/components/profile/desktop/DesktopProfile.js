import { styled } from "styled-components";
import Favorites from "../Favorites";
import Settings from "../Settings";
import Reviews from "../Reviews";

// profile page for desktop
const DesktopProfile = ({ index, setIndex }) => {
  const SelectedTab = () => {
    switch (index) {
      case "favorites":
        return <Favorites />;
      case "reviews":
        return <Reviews />;
      case "settings":
        return <Settings />;
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Profile</Title>
        <Box
          onClick={() => {
            setIndex("favorites");
          }}
        >
          <div>
            <SecondaryHeadline>Favorites</SecondaryHeadline>
            <DescriptionText>
              View all your favorites technologies
            </DescriptionText>
          </div>
        </Box>
        <Box
          onClick={() => {
            setIndex("reviews");
          }}
        >
          <div>
            <SecondaryHeadline>Reviews</SecondaryHeadline>
            <DescriptionText>View all your reviews</DescriptionText>
          </div>
        </Box>
        <Box
          onClick={() => {
            setIndex("settings");
          }}
        >
          <div>
            <SecondaryHeadline>Account</SecondaryHeadline>
            <DescriptionText>
              View and modify your account informations
            </DescriptionText>
          </div>
        </Box>
      </Container>
      {SelectedTab()}
    </Wrapper>
  );
};

export default DesktopProfile;

// styling
const Wrapper = styled.div`
  display: none;
  @media only screen and (min-width: 960px) {
    display: flex;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 1.5rem 0;
`;

const Container = styled.div`
  margin: 1rem;
  border-right: 2px solid var(--content-color);
`;

const SecondaryHeadline = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  margin: 1rem 0 0.5rem 0;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
`;

const DescriptionText = styled.p`
  letter-spacing: 0.1rem;
  color: grey;
`;
