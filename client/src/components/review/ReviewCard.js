import { styled } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Rating from "../rating/Rating";

// component with the review and its information
const ReviewCard = ({ review, refresh, showUser, showItem }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [confirmation, setConfirmation] = useState(false);
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchItemData = async () => {
      const response = await fetch(`/api/items/${review.itemId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setItem(data.data);
        }
      }
    };

    const fetchUser = async () => {
      // Get user for every review
      if (currentUser) {
        const response = await fetch(`/api/users/${review.userId}`);
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

    if (showUser) {
      fetchUser();
    }

    if (showItem) {
      fetchItemData();
    }

    return () => {
      mounted = false;
    };
  }, [review, currentUser]);

  const handleDelete = async () => {
    if (review.userId === currentUser) {
      try {
        const response = await fetch(`/api/reviews/${review._id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (data) {
            refresh();
          } else {
            throw new Error(data.message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = () => {
    if (review.userId === currentUser) {
      navigate(`/reviews/${review._id}`);
    }
  };

  return (
    <Container>
      {item && <h2>{item.name}</h2>}
      <div>
        <div>
          <Rating rating={review.rating} />
        </div>
      </div>
      <ReviewText>{review.text}</ReviewText>
      {user && <UserName>{user.name}</UserName>}

      <ClientStatus>A {review.client + " "} </ClientStatus>
      <TraitBox>{" | " + review.traits.join(" | ")}</TraitBox>
      {currentUser === review.userId && (
        <>
          <div>
            <Edit onClick={() => handleUpdate()}>Edit</Edit>
            <Edit onClick={() => setConfirmation(true)}>Delete</Edit>
          </div>
          <div>
            {confirmation && (
              <>
                <DeleteText>
                  Are you sure you want to delete this review?
                </DeleteText>
                <Edit onClick={() => setConfirmation(false)}>Cancel</Edit>
                <Edit onClick={() => handleDelete()}>Delete</Edit>
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default ReviewCard;

// styling
const Container = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px grey;
  padding: 0.7rem;
  @media only screen and (min-width: 960px) {
  }
`;

const TraitBox = styled.div`
  display: flex;
  margin: 0.5rem 0;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  margin: 0.7rem 0 0.3rem 0;
  padding: 0.3rem 0;
  border-bottom: 2px solid #f1356d6e;
`;

const Edit = styled.button`
  background-color: white;
  border: none;
  color: var(--content-color);
  font-size: 1rem;
  cursor: pointer;
`;

const ClientStatus = styled.div`
  display: flex;
  font-style: italic;
  margin-top: 0.1rem;
`;

const DeleteText = styled.p`
  margin: 0.3rem 0 0.3rem 0;
`;
