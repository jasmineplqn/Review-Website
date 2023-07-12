import { styled } from "styled-components";
import { Icon } from "react-icons-kit";
import { arrow_right } from "react-icons-kit/ikons/arrow_right";
import Favorites from "../Favorites";
import Settings from "../Settings";
import Reviews from "../Reviews";
import { useState } from "react";

// profile page for mobile
const MobileProfile = ({ index, setIndex }) => {
  const [active, setActive] = useState(false);

  const SelectedTab = () => {
    switch (index) {
      case "favorites":
        return <Favorites onBack={() => setActive(false)} />;
      case "reviews":
        return <Reviews onBack={() => setActive(false)} />;
      case "settings":
        return <Settings onBack={() => setActive(false)} />;
    }
  };

  return (
    <Wrapper>
      {!active && (
        <Container>
          <Title>Profile</Title>
          <Box
            onClick={() => {
              setActive(true);
              setIndex("favorites");
            }}
          >
            <div>
              <SecondaryHeadline>Favorites</SecondaryHeadline>
              <DescriptionText>
                View all your favorites technologies
              </DescriptionText>
            </div>
            <Icon
              size={40}
              icon={arrow_right}
              style={{ color: "var(--content-color)" }}
            />
          </Box>
          <Box
            onClick={() => {
              setActive(true);
              setIndex("reviews");
            }}
          >
            <div>
              <SecondaryHeadline>Reviews</SecondaryHeadline>
              <DescriptionText>View all your reviews</DescriptionText>
            </div>

            <Icon
              size={40}
              icon={arrow_right}
              style={{ color: "var(--content-color)" }}
            />
          </Box>
          <Box
            onClick={() => {
              setActive(true);
              setIndex("settings");
            }}
          >
            <div>
              <SecondaryHeadline>Account</SecondaryHeadline>
              <DescriptionText>
                View and modify your account informations
              </DescriptionText>
            </div>

            <Icon
              size={40}
              icon={arrow_right}
              style={{ color: "var(--content-color)" }}
            />
          </Box>
        </Container>
      )}
      {active && SelectedTab()}
    </Wrapper>
  );
};

export default MobileProfile;

// styling
const Wrapper = styled.div`
  display: block;
  @media only screen and (min-width: 960px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1.5rem 0;
`;

const Container = styled.div`
  margin: 1rem;
`;

const SecondaryHeadline = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 1rem 0 0.5rem 0;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px #f1356d6e solid;
  padding: 1rem;
  cursor: pointer;
`;

const DescriptionText = styled.p`
  letter-spacing: 0.1rem;
  color: grey;
`;
