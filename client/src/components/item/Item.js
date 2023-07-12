import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { styled } from "styled-components";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border_twotone } from "react-icons-kit/md/ic_favorite_border_twotone";
import loadingTransparent from "../../assets/loadingTransparent.gif";
import { UserContext } from "../../context/UserContext";
import ReviewCard from "../review/ReviewCard";
import Rating from "../rating/Rating";

// component for one item page with its description and reviews
const Item = () => {
  const params = useParams();
  const [refresh, setRefresh] = useState(false);
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUser, _] = useContext(UserContext);
  const [favoriteUpdating, setFavoriteUpdating] = useState(false);

  const handleFavorite = async () => {
    setFavoriteUpdating(true);
    if (user && favoriteUpdating) {
      const response = await fetch(
        `/api/users/${user._id}/favorites/${params.itemId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (user.favorites.includes(params.itemId)) {
          const updatedUser = {
            ...user,
            favorites: user.favorites.filter(
              (itemId) => itemId !== params.itemId
            ),
          };
          setUser(updatedUser);
        } else {
          const updatedUser = {
            ...user,
            favorites: [...user.favorites, params.itemId],
          };
          setUser(updatedUser);
        }
      }
    }
  };

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
      const response = await fetch(`/api/reviews?itemId=${params.itemId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setReviews(data.reviews);
        }
      }
    };

    const fetchUser = async () => {
      if (currentUser) {
        // Get current user for favorites
        const response = await fetch(`/api/users/${currentUser}`);
        const data = await response.json();
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (mounted) {
            setUser(data.data);
          }
        }
      }
    };

    fetchItemData();
    fetchReviews();
    fetchUser();
    setRefresh(false);

    return () => {
      mounted = false;
    };
  }, [params, currentUser, refresh]);

  const Favorite = () => {
    if (user) {
      return (
        <Icon
          onClick={() => handleFavorite()}
          size={30}
          icon={
            user.favorites.includes(params.itemId)
              ? ic_favorite
              : ic_favorite_border_twotone
          }
          style={{ cursor: "pointer", color: "var(--content-color)" }}
        />
      );
    }
  };

  const getAverageOfRating = () => {
    if (reviews.length === 0) {
      return 0;
    }
    try {
      return (
        reviews.map((review) => review.rating).reduce((a, b) => a + b, 0) /
        reviews.length
      );
    } catch (error) {
      return 0;
    }
  };

  return (
    <Box>
      {item && reviews ? (
        <div>
          <MobileItemContainer>
            <ItemName>
              {item.name} {Favorite()}
            </ItemName>
            <Text>
              {item.category.map((category) => {
                return " | " + category + " | ";
              })}
            </Text>
            <Url href={item.url} target="_blank">
              Visit the Official Website
            </Url>
            <Rating rating={getAverageOfRating()} />
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
              <ItemName>
                {item.name} {Favorite()}
              </ItemName>
              {/* ADD ON CLICK EVENT */}
              <Text>
                {item.category.map((category) => {
                  return " | " + category + " | ";
                })}
                <Url href={item.url} target="_blank">
                  Visit the Official Website
                </Url>
              </Text>
              <ItemQuestions>
                <Rating
                  size={24}
                  rating={
                    reviews
                      .map((review) => review.rating)
                      .reduce((a, b) => a + b, 0) / reviews.length || 0
                  }
                />
              </ItemQuestions>

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
            {currentUser ? (
              <StyledLink to={`/add-review/${params.itemId}`}>
                Write a review
              </StyledLink>
            ) : (
              <StyledLink to={`/login`}>Login to write a review</StyledLink>
            )}
          </ReviewContainer>
          {reviews.length === 0 ? (
            <NoReview>
              {" "}
              No Reviews yet. Be the first to give your opinion!
            </NoReview>
          ) : (
            <ReviewListContainer>
              {reviews.map((review) => {
                return (
                  <ReviewCard
                    key={review._id}
                    showUser={true}
                    refresh={() => {
                      setRefresh(true);
                    }}
                    review={review}
                  />
                );
              })}
            </ReviewListContainer>
          )}
        </div>
      ) : (
        <img src={loadingTransparent} />
      )}
    </Box>
  );
};

export default Item;

// styling
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

const ReviewListContainer = styled.div`
  display: grid;
  column-gap: 0.5rem;
  grid-template-columns: auto;
  @media only screen and (min-width: 960px) {
    grid-template-columns: auto auto;
    margin: 0 2rem;
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
  flex-wrap: wrap;
`;
