import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";
import ReviewCard from "../review/ReviewCard";
import loadingTransparent from "../../assets/loadingTransparent.gif";
import { Back, Title, Empty, ImageBox, Container } from "./StyledProfile";
import { Icon } from "react-icons-kit";
import { arrow_left } from "react-icons-kit/ikons/arrow_left";

// all the reviews the user made
const Reviews = ({ onBack }) => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews?userId=${currentUser}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setReviews(data.reviews);
        }
      }
    };

    fetchReviews();
    setRefresh(false);

    return () => {
      mounted = false;
    };
  }, [currentUser, refresh]);

  return (
    <Container>
      <Back onClick={() => onBack()}>
        <Icon
          size={15}
          icon={arrow_left}
          style={{ color: "var(--content-color)" }}
        />
        Back
      </Back>
      <Title>Reviews</Title>
      <div>
        {reviews ? (
          reviews.length === 0 ? (
            <Empty>No Reviews yet!</Empty>
          ) : (
            reviews.map((review, index) => {
              return (
                <ReviewCard
                  key={index}
                  showItem={true}
                  refresh={() => {
                    setRefresh(true);
                  }}
                  review={review}
                />
              );
            })
          )
        ) : (
          <ImageBox>
            <img src={loadingTransparent} />
          </ImageBox>
        )}
      </div>
    </Container>
  );
};

export default Reviews;
