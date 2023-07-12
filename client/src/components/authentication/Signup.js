import { Form, Input, Title, Button, Status, StatusBox } from "./StyledForm";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";
import { validatePassword } from "../../helpers/helpers";
import loadingTransparent from "../../assets/loadingTransparent.gif";

// where new user can create an account
const SignUp = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null);
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      // Check password
      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        throw new Error(passwordErrors.join(" "));
      }

      if (password != passwordConfirmation) {
        throw new Error("Passwords do not match.");
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });

      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        setStatus("Welcome!");
        setCurrentUser(data.data._id);
        window.sessionStorage.setItem("currentUser", data.data._id);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <Background>
      <Container>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSignUp} action="">
          <Input
            required
            type="text"
            onChange={(event) => setName(event.target.value)}
            value={name}
            placeholder="Your Name"
          />
          <Input
            required
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            placeholder="Email"
          />
          <Input
            required
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder="Password"
          />
          <Input
            required
            type="password"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            value={passwordConfirmation}
            placeholder="Confirm Password"
          />

          <Button type="submit">
            {loading && (
              <img
                src={loadingTransparent}
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
            )}{" "}
            Sign Up
          </Button>
        </Form>
        <StatusBox>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {status && <Status>{status}</Status>}
        </StatusBox>
        <div>
          <BottomText>
            Already have an account?{" "}
            <StyledLink to={"/login"}>Login</StyledLink>
          </BottomText>
          <p>
            Don't forget to read our{" "}
            <StyledLink to={"/about"}>guidelines</StyledLink>.
          </p>
        </div>
      </Container>
    </Background>
  );
};

export default SignUp;

// styling
const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--content-color);
`;

const BottomText = styled.p`
  margin: 0.4rem 0;
`;

const Background = styled.div`
  @media only screen and (min-width: 960px) {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 1rem 1rem;
  align-items: center;
  margin-top: 2rem;
  @media only screen and (min-width: 960px) {
    box-shadow: 0px 1px 10px #f35c898c;

    width: 700px;
    height: 655px;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 1rem;
  letter-spacing: 0.2rem;
`;
