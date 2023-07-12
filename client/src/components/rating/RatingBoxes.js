import { starO } from "react-icons-kit/fa/starO";
import { star } from "react-icons-kit/fa/star";
import Icon from "react-icons-kit";
import { styled } from "styled-components";

// click to choose the rating with star icon
const RatingBoxes = ({ rating, setRating, size = 16 }) => {
  try {
    return (
      <Container>
        {Array(5)
          .fill()
          .map((_, index) => {
            if (index < rating) {
              return (
                <Icon
                  key={index}
                  onClick={() => setRating(index + 1)}
                  size={size}
                  style={{ color: "var(--content-color)" }}
                  icon={star}
                />
              );
            }
            return (
              <Icon
                key={index}
                onClick={() => setRating(index + 1)}
                size={size}
                style={{ color: "var(--content-color)" }}
                icon={starO}
              />
            );
          })}
      </Container>
    );
  } catch (error) {
    return (
      <Container>
        {Array(5)
          .fill()
          .map((_, index) => {
            return (
              <Icon
                key={index}
                onClick={() => setRating(index + 1)}
                size={size}
                style={{ color: "var(--content-color)" }}
                icon={starO}
              />
            );
          })}
      </Container>
    );
  }
};

export default RatingBoxes;

// styling
const Container = styled.div`
  display: flex;
`;
