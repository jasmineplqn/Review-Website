import styled from "styled-components";

// styling component reused for the profile
const Back = styled.button`
  display: flex;
  margin: 0.7rem 0 0.2rem 0.7rem;
  background-color: white;
  border: none;
  color: var(--content-color);
  font-size: 1rem;
  cursor: pointer;
  @media only screen and (min-width: 960px) {
    display: none;
  }
`;

const Container = styled.div`
  margin-top: 0;
  @media only screen and (min-width: 960px) {
    margin-top: 2.3rem;
    margin-left: 3rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 1rem 0 0.5rem 1rem;
`;

const Empty = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  letter-spacing: 0.1rem;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (min-width: 960px) {
    margin-left: 5rem;
  }
`;

export { Back, Title, Empty, ImageBox, Container };
