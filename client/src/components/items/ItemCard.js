import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

// component showing one item
const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/items/${item._id}`)}>
      <Image src={item.imageSrc} />
      <NameOfItem> {item.name} </NameOfItem>
    </Card>
  );
};

export default ItemCard;

// styling
const Card = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: 20rem;
  width: 20rem;
  object-fit: contain;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const NameOfItem = styled.h1`
  font-size: 1.2rem;
  margin-top: 1rem;
  cursor: pointer;
`;
