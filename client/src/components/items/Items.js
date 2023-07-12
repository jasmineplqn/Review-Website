import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import { styled } from "styled-components";
import loadingTransparent from "../../assets/loadingTransparent.gif";

// component for multiple items
const Items = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState(null);
  const [reviews, setReviews] = useState(null);

  const createFetchUrl = () => {
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    if (category && location) {
      return `/api/items?location=${location}&category=${category}`;
    } else if (category) {
      return `/api/items?category=${category}`;
    } else if (location) {
      return `/api/items?location=${location}`;
    }
    return "/api/items";
  };

  useEffect(() => {
    let mounted = true;

    const fetchItemsData = async () => {
      const response = await fetch(createFetchUrl());
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setItems(data.items);
          // fetchReviews();
        }
      }
    };

    // to put the rating stars on items page, not done
    const fetchReviews = async (itemId) => {
      const response = await fetch(`/api/reviews/${itemId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setReviews(data.data);
        }
      }
    };

    fetchItemsData();

    return () => {
      mounted = false;
    };
  }, [searchParams]);

  return (
    <Box>
      {items ? (
        <div>
          <Title>
            {searchParams.has("name")
              ? searchParams.get("name")
              : "All Technologies"}
          </Title>
          <Container>
            {items.map((item) => {
              return <ItemCard key={item.name} item={item} />;
            })}
          </Container>
        </div>
      ) : (
        <img src={loadingTransparent} />
      )}
    </Box>
  );
};

export default Items;

// styling
const Title = styled.p`
  font-size: 1.7rem;
  text-align: center;
  margin: 3rem 0 2rem 0;
  text-decoration: underline 0.2rem var(--content-color);
  text-underline-offset: 0.4rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  @media only screen and (min-width: 960px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
`;
