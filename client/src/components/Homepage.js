import { styled } from "styled-components";
import backgroundPink from "../assets/background-pink.avif";

// home page component, first page when we enter
const Homepage = () => {
  return (
    <Container>
      <Title>
        WELCOME TO <Logo>skinTech Report</Logo>
      </Title>
      <Text>
        Discover, share and learn all about technologies in the skin care
        industry. Whether you're a professional aesthetician, a skincare
        enthusiast, or someone looking to explore the world of advanced skin
        care technologies, you'll find a welcoming space here. Log in or create
        an account to give your opinions!
      </Text>
    </Container>
  );
};

export default Homepage;

// styling
const Container = styled.div`
  min-height: calc(100vh - 4.5rem);
  overflow-y: auto;
  background: url(${backgroundPink}) no-repeat center;
  background-size: cover;
`;

const Title = styled.h1`
  color: white;
  font-size: 3.2rem;
  text-align: center;
  padding-top: 4rem;
  @media only screen and (min-width: 960px) {
    font-size: 5rem;
  }
`;

const Text = styled.p`
  letter-spacing: 0.1rem;
  color: white;
  font-size: 1.8rem;
  text-align: center;
  margin-top: 1.5rem;
  padding-bottom: 1.5rem;
  line-height: 3rem;
  @media only screen and (min-width: 960px) {
    margin: 3rem;
    font-size: 3rem;
    line-height: 3.5rem;
  }
`;

const Logo = styled.span`
  color: var(--content-color);
  letter-spacing: 0.2rem;
`;
