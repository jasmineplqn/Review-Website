import { starO } from "react-icons-kit/fa/starO";
import { star } from "react-icons-kit/fa/star";
import Icon from "react-icons-kit";
import { styled } from "styled-components";

// shows the rating with star icon (cannot click it)
const Rating = ({ rating, size = 16 }) => {
  try {
    const numberRating = Number(rating);

    return (
      <Container>
        {Array(5)
          .fill()
          .map((_, index) => {
            if (index < numberRating) {
              return (
                <Icon
                  key={index}
                  size={size}
                  style={{ color: "var(--content-color)" }}
                  icon={star}
                />
              );
            }
            return (
              <Icon
                key={index}
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

export default Rating;

// styling
const Container = styled.div`
  display: flex;
`;
