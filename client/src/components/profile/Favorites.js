import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";
import loadingTransparent from "../../assets/loadingTransparent.gif";
import ItemCard from "../items/ItemCard";
import { Back, Title, Empty, ImageBox, Container } from "./StyledProfile";
import { Icon } from "react-icons-kit";
import { arrow_left } from "react-icons-kit/ikons/arrow_left";

// all the items that user put in favorites
const Favorites = ({ onBack }) => {
  const [favorites, setFavorites] = useState(null);
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      const response = await fetch(`/api/users/${currentUser}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          const items = [];
          for (const itemId of data.data.favorites) {
            const itemResponse = await fetch(`/api/items/${itemId}`);
            const itemData = await itemResponse.json();
            items.push(itemData.data);
          }
          setFavorites([...items]);
        }
      }
    };

    fetchReviews();

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  return (
    <Container>
      <Back onClick={() => onBack()}>
        {" "}
        <Icon
          size={15}
          icon={arrow_left}
          style={{ color: "var(--content-color)" }}
        />
        Back{" "}
      </Back>
      <Title>Favorites</Title>
      <div>
        {favorites ? (
          favorites.length === 0 ? (
            <Empty>No Favorites yet!</Empty>
          ) : (
            favorites.map((favorite, index) => {
              return <ItemCard key={favorite.name} item={favorite} />;
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

export default Favorites;
