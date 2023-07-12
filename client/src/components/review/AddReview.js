import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import RatingBoxes from "../rating/RatingBoxes";
import fitzpatrick from "../../assets/fitzpatrick-scale.png";
import { ErrorMsg, Status, StatusBox } from "../authentication/StyledForm";

// write a new review
const AddReview = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const [rating, setRating] = useState(null);
  const [text, setText] = useState("");
  const [client, setClient] = useState(null);
  const [thickness, setThickness] = useState(null);
  const [color, setColor] = useState(null);
  const [density, setDensity] = useState(null);
  const [skinTone, setSkinTone] = useState(null);
  const [skinTypes, setSkinTypes] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const review = {
        userId: currentUser,
        itemId: params.itemId,
        rating: rating,
        text: text,
        client: client,
        traits: [
          `${thickness} Hair`,
          `${color} Hair Color`.replace("None", "No"),
          `${density} Hair Density`,
          `${skinTone} Skin`,
          ...skinTypes.map((skinType) => `${skinType} Skin`),
        ],
      };

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        setError(data.message);
        throw new Error(data.message);
      } else {
        if (data) {
          setStatus("Review added!");
          setTimeout(() => navigate(`/items/${params.itemId}`), 2000);
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentUser || !params.itemId) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <MainTitle> Review</MainTitle>
      <form action="" onSubmit={handleSubmit}>
        <Box>
          <Title>Your Rating:</Title>
          <RatingContainer>
            <RatingBoxes rating={rating} setRating={setRating} size={24} />
          </RatingContainer>
        </Box>
        <Box>
          <Title>Are you a professional or a consumer:</Title>
          <ChoiceList>
            {["Professional", "Consumer"].map((clientValue) => {
              return (
                <ChoiceBox key={clientValue}>
                  <input
                    type="radio"
                    name={clientValue}
                    id={clientValue}
                    value={clientValue}
                    checked={client === clientValue}
                    onChange={() => setClient(clientValue)}
                  />
                  <Label htmlFor={clientValue}>{clientValue}</Label>
                </ChoiceBox>
              );
            })}
          </ChoiceList>
        </Box>
        <Box>
          <Title>Write Your Review:</Title>
          <TextArea
            required
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="How much was it, how many session did you do, any pain, what were the results, was it done on yourself or a client, etc..."
          />
        </Box>
        <TraitBox>
          <Title>A Little Bit About Yourself:</Title>
          <Trait>
            <TitleTraits>Body Hair Thickness </TitleTraits>
            <ChoiceList>
              {["Fine", "Medium", "Coarse"].map((thicknessValue) => {
                return (
                  <ChoiceBox key={thicknessValue}>
                    <input
                      type="radio"
                      name="thickness"
                      id={thicknessValue + "thickness"}
                      value={thicknessValue}
                      checked={thickness === thicknessValue}
                      onChange={() => setThickness(thicknessValue)}
                    />
                    <Label htmlFor={thicknessValue + "thickness"}>
                      {thicknessValue}
                    </Label>
                  </ChoiceBox>
                );
              })}
            </ChoiceList>
          </Trait>
          <Trait>
            <TitleTraits>Body Hair Color </TitleTraits>
            <ChoiceList>
              {["None", "Light", "Medium", "Dark"].map((colorValue) => {
                return (
                  <ChoiceBox key={colorValue}>
                    <input
                      type="radio"
                      name="color"
                      id={colorValue + "color"}
                      value={colorValue}
                      checked={color === colorValue}
                      onChange={() => setColor(colorValue)}
                    />
                    <Label htmlFor={colorValue + "color"}>{colorValue}</Label>
                  </ChoiceBox>
                );
              })}
            </ChoiceList>
          </Trait>
          <Trait>
            <TitleTraits>Body Hair Density </TitleTraits>
            <ChoiceList>
              {["Low", "Medium", "High"].map((densityValue) => {
                return (
                  <ChoiceBox key={densityValue}>
                    <input
                      type="radio"
                      name="density"
                      id={densityValue + "density"}
                      value={densityValue}
                      checked={density === densityValue}
                      onChange={() => setDensity(densityValue)}
                    />
                    <Label htmlFor={densityValue + "density"}>
                      {densityValue}
                    </Label>
                  </ChoiceBox>
                );
              })}
            </ChoiceList>
          </Trait>
          <Trait>
            <div>
              <TitleTraits> Skin Tone:</TitleTraits>
              <Reference>*Refer to the chart below</Reference>
            </div>
            <ChoiceList>
              {["Type 1", "Type 2", "Type 3", "Type 4", "Type 5", "Type 6"].map(
                (skinToneValue) => {
                  return (
                    <ChoiceBox key={skinToneValue}>
                      <input
                        type="radio"
                        name="skinTone"
                        id={skinToneValue + "skinTone"}
                        value={skinToneValue}
                        checked={skinTone === skinToneValue}
                        onChange={() => setSkinTone(skinToneValue)}
                      />
                      <Label htmlFor={skinToneValue + "skinTone"}>
                        {skinToneValue}
                      </Label>
                    </ChoiceBox>
                  );
                }
              )}
            </ChoiceList>
          </Trait>
          <Trait>
            <TitleTraits> Skin Type:</TitleTraits>
            <ChoiceList>
              {[
                "Normal",
                "Dry",
                "Oily",
                "Combination",
                "Sensitive",
                "Aging",
                "Acne-Prone",
              ].map((skinType) => {
                return (
                  <ChoiceBox key={skinType}>
                    <input
                      type="checkbox"
                      name="skinType"
                      id={skinType + "skinType"}
                      value={skinType}
                      checked={skinTypes.includes(skinType)}
                      onChange={() => {
                        if (skinTypes.includes(skinType)) {
                          setSkinTypes(
                            skinTypes.filter((type) => type !== skinType)
                          );
                        } else {
                          setSkinTypes([...skinTypes, skinType]);
                        }
                      }}
                    />
                    <Label htmlFor={skinType + "skinType"}>{skinType}</Label>
                  </ChoiceBox>
                );
              })}
            </ChoiceList>
          </Trait>
        </TraitBox>
        <ButtonBox>
          <Button> Submit </Button>
        </ButtonBox>
      </form>
      <StatusBox>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {status && <Status>{status}</Status>}
      </StatusBox>
      <div>
        <Reference>*Chart:</Reference>
        <Image src={fitzpatrick} />
      </div>
    </Container>
  );
};

export default AddReview;

// styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  margin-top: 2rem;
`;

const RatingContainer = styled.div`
  margin: 1rem 0;
`;

const Box = styled.div`
  display: block;
`;

const ChoiceBox = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const ChoiceList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 3rem;
  margin: 0.7rem 0;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 2px #e0dcdc solid;
  &:focus {
    outline: 2.5px var(--content-color) solid;
  }
`;

const TraitBox = styled.div`
  display: block;
`;

const MainTitle = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin: 0.7rem 0 0.5rem 0;
`;

const Title = styled.h2`
  font-size: 1.2rem;
`;

const TitleTraits = styled.h3`
  font-weight: normal;
  letter-spacing: 0.1rem;
  margin-top: 1rem;
`;

const Trait = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.7rem;
  font-size: 1.3rem;
  border-radius: 30px;
  width: 60%;
  margin-top: 0.7rem;
  background-color: var(--content-color);
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #f78bab;
  }
  &:focus {
    background-color: #f78bab;
    outline: 2.5px var(--content-color) solid;
  }
`;

const ButtonBox = styled.div`
  width: 80%;
  margin-left: 10%;
  @media only screen and (min-width: 960px) {
    width: 30%;
    margin-top: 1rem;
    text-align: center;
    margin-left: 35%;
  }
`;

const Reference = styled.p`
  font-style: italic;
  color: var(--content-color);
`;

const Image = styled.img`
  width: 90%;
  margin-top: 2.5rem;
  @media only screen and (min-width: 960px) {
    width: 100%;
  }
`;
