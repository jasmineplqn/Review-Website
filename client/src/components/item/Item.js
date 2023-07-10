import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { styled } from "styled-components";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border_twotone } from "react-icons-kit/md/ic_favorite_border_twotone";
import loadingTransparent from "../../assets/loadingTransparent.gif";

// component for multiple items
const Item = () => {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchItemData = async () => {
      const response = await fetch(`/api/items/${params.itemId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setItem(data.data);
        }
      }
    };

    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews?itemId=${params.itemId}}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setReviews(data.reviews);
        }
      }
    };

    fetchItemData();
    fetchReviews();

    return () => {
      mounted = false;
    };
  }, [params]);

  return (
    <Box>
      {item && reviews ? (
        <div>
          <MobileItemContainer>
            <ItemName>{item.name}</ItemName>
            {/* ADD ON CLICK EVENT */}
            <Text>
              {item.category.map((category) => {
                return " | " + category + " | ";
              })}
            </Text>
            <Url href={item.url} target="_blank">
              Visit the Official Website
            </Url>
            <Image src={item.imageSrc} />
            <div>
              <ItemQuestions>What is it?</ItemQuestions>
              <Text>{item.description}</Text>
            </div>
            <div>
              <ItemQuestions>Is it safe for all skin types?</ItemQuestions>
              <Text>{item.skinType}</Text>
            </div>
            <div>
              <ItemQuestions>Any downtime, care or instruction?</ItemQuestions>
              <Text>{item.care}</Text>
            </div>
            <div>
              <ItemQuestions>
                How many time and how long does it take?
              </ItemQuestions>
              <Text>{item.frequency}</Text>
            </div>
          </MobileItemContainer>
          <ItemContainer>
            <Image src={item.imageSrc} />
            <TextContainer>
              <ItemName>{item.name}</ItemName>
              {/* ADD ON CLICK EVENT */}
              <Text>
                {item.category.map((category) => {
                  return " | " + category + " | ";
                })}
                <Url href={item.url} target="_blank">
                  Visit the Official Website
                </Url>
              </Text>

              <div>
                <ItemQuestions>What is it?</ItemQuestions>
                <Text>{item.description}</Text>
              </div>
              <div>
                <ItemQuestions>Is it safe for all skin types?</ItemQuestions>
                <Text>{item.skinType}</Text>
              </div>
              <div>
                <ItemQuestions>
                  Any downtime, care or instruction?
                </ItemQuestions>
                <Text>{item.care}</Text>
              </div>
              <div>
                <ItemQuestions>
                  How many time and how long does it take?
                </ItemQuestions>
                <Text>{item.frequency}</Text>
              </div>
            </TextContainer>
          </ItemContainer>
          <ReviewContainer>
            <ReviewTitle>Reviews</ReviewTitle>
            <StyledLink to={"/review"}>Write a review</StyledLink>
          </ReviewContainer>
          {reviews.length === 0 ? (
            <NoReview>
              {" "}
              No Reviews yet. Be the first to give your opinion!
            </NoReview>
          ) : (
            <div> HOHOHO REVIEWS</div>
          )}
        </div>
      ) : (
        <img src={loadingTransparent} />
      )}
    </Box>
  );
};

export default Item;

const ItemName = styled.h1`
  font-size: 2rem;
  margin: 2.5rem 0 0.7rem 0;

  @media only screen and (min-width: 960px) {
    font-size: 2.5rem;
  }
`;

const MobileItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem;
  @media only screen and (min-width: 960px) {
    display: none;
  }
`;

const ItemContainer = styled.div`
  display: none;
  flex-direction: row;

  @media only screen and (min-width: 960px) {
    display: flex;
    padding: 4rem 4rem 0rem 4rem;
  }
`;

const Image = styled.img`
  height: 30rem;
  width: 30rem;
  object-fit: contain;
  margin: 2rem 0 0 0;

  @media only screen and (min-width: 960px) {
    margin: 3rem;
  }
`;

const TextContainer = styled.div`
  display: block;
`;

const ItemQuestions = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 0.4rem 0;
`;

const Text = styled.p`
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  @media only screen and (min-width: 960px) {
    font-size: 1rem;
  }
`;

const ReviewTitle = styled.h1`
  font-size: 2rem;
  margin: 2rem 0 1rem 1rem;
`;

const NoReview = styled.p`
  text-align: center;
`;

const ReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 960px) {
    justify-content: space-evenly;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--content-color);
  margin: 2.5rem 0 1rem 1rem;
`;

const Url = styled.a`
  text-decoration: none;
  color: var(--content-color);
  margin: 0.5rem 0;
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
`