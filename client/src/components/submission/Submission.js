import { useEffect, useContext } from "react";
import { styled } from "styled-components";
import {
  Container,
  Title,
  Button,
  ErrorMsg,
  Status,
  StatusBox,
} from "../authentication/StyledForm";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { bodyOptions, faceOptions } from "../../helpers/constants";

// creating a new request submission
const Submission = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [location, setLocation] = useState(null);
  const [categories, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const submission = {
        userId: currentUser,
        name: form.name,
        category: categories,
        location: location,
        imageSrc: form.imageUrl,
        description: form.description,
        skinType: form.skin,
        care: form.care,
        frequency: form.frequency,
        url: form.url,
      };

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        setError(data.message);
        throw new Error(data.message);
      } else {
        if (data) {
          setStatus("Thank you for your request!");
          setTimeout(() => navigate("/items"), 2000);
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Categories = (option) => {
    return (
      <>
        {option.map((option, index) => {
          if (!option.key) {
            return <div key={index}></div>;
          }

          return (
            <div key={index}>
              <input
                type="checkbox"
                name={option.key}
                id={option.key}
                value={option.key}
                onChange={(event) => {
                  if (categories.includes(option.key)) {
                    setCategory(
                      categories.filter((category) => category !== option.key)
                    );
                  } else {
                    setCategory([...categories, option.key]);
                  }
                }}
              />
              <label htmlFor={option.key}>{option.name}</label>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <Container>
      <div>
        <Title>Have a Request?</Title>
        <Text>
          If you couldn't find what you were looking for, no worries! Submit you
          request right here:
        </Text>
      </div>
      <Form action="" onSubmit={handleSubmit}>
        <Box>
          <InformationLabel htmlFor="item">
            Name of the technology:
          </InformationLabel>
          <Input
            required
            type="text"
            id="item"
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Name of the technology"
          />
        </Box>
        <div>
          <InformationTitle>Used on:</InformationTitle>
          <input
            onChange={(event) => {
              setLocation(event.target.value);
              setCategory([]);
            }}
            type="radio"
            name="location"
            id="body"
            value="body"
          />
          <label htmlFor="body">Body</label>
          <input
            onChange={(event) => {
              setLocation(event.target.value);
              setCategory([]);
            }}
            type="radio"
            name="location"
            id="face"
            value="face"
          />
          <label htmlFor="face">Face</label>
        </div>
        {location && (
          <div>
            <InformationTitle>Helps with:</InformationTitle>
            {location === "body" && Categories(bodyOptions)}
            {location === "face" && Categories(faceOptions)}
          </div>
        )}
        <Box>
          <InformationLabel htmlFor="description">
            Description:
          </InformationLabel>
          <TextArea
            required
            type="text"
            id="description"
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            placeholder="What type of technology is it, how does it work, what are the steps, etc..."
          />
        </Box>
        <Box>
          <InformationLabel htmlFor="skin">Skin Type:</InformationLabel>
          <TextArea
            required
            type="text"
            id="skin"
            onChange={(event) => setForm({ ...form, skin: event.target.value })}
            placeholder="Can everyone use this or darker skins are more at risk?"
          />
        </Box>
        <Box>
          <InformationLabel htmlFor="care">
            Before or after care:
          </InformationLabel>
          <TextArea
            required
            type="text"
            id="care"
            onChange={(event) => setForm({ ...form, care: event.target.value })}
            placeholder="No downtime, careful of sun exposure, no makeup, etc..."
          />
        </Box>
        <Box>
          <InformationLabel htmlFor="frequency">Frequency:</InformationLabel>
          <TextArea
            required
            type="text"
            id="frequency"
            onChange={(event) =>
              setForm({ ...form, frequency: event.target.value })
            }
            placeholder="How many treatments for how long, how long does it last, is there any maintenance treatments, etc..."
          />
        </Box>
        <Box>
          <InformationLabel htmlFor="url">
            Official website to the technology:
          </InformationLabel>
          <Input
            required
            type="text"
            id="url"
            onChange={(event) => setForm({ ...form, url: event.target.value })}
            placeholder="Link to the technology"
          />
        </Box>
        <Box>
          <InformationLabel htmlFor="url">Image Link</InformationLabel>
          <Input
            required
            type="text"
            id="imageUrl"
            onChange={(event) =>
              setForm({ ...form, imageUrl: event.target.value })
            }
            placeholder="Link to the image of the technology."
          />
        </Box>
        <StatusBox>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {status && <Status>{status}</Status>}
        </StatusBox>
        <ButtonBox>
          <Button>Send</Button>
        </ButtonBox>
      </Form>
    </Container>
  );
};

export default Submission;

// styling
const Text = styled.p`
  margin-top: 0.7rem;
  letter-spacing: 0.1rem;
  color: grey;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 0;
  align-items: start;
  width: 100%;
  @media only screen and (min-width: 960px) {
    width: 60%;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InformationTitle = styled.p`
  font-size: 1.2rem;
  margin: 0.7rem 0 0.5rem 0;
`;
const InformationLabel = styled.p`
  font-size: 1.5rem;
  margin: 0.7rem 0 0.5rem 0;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 2px #e0dcdc solid;
  &:focus {
    outline: 2.5px var(--content-color) solid;
  }
`;

const TextArea = styled.textarea`
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 2px #e0dcdc solid;
  &:focus {
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
