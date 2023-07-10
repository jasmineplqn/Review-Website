import { Container, Form, Input, Title, Button } from "./StyledForm";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // VALIDATE HERE FIRST PASSWORD === PASSOWRD CONFIRMATION
      // VALIDATE PASSWORD TOO

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name, email: email, password: password }),
      });

      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
          setCurrentUser(data.data);
          window.sessionStorage.setItem(
            "currentUser",
            JSON.stringify(data.data)
          );
          navigate("/");
      }
    } catch (error) {
      /** SET ERROR */
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSignUp} action="">
        <Input
          type="text"
          onChange={(event) => setName(event.target.value)}
          value={name}
          placeholder="Your Name"
        />
        <Input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="Email"
        />
        <Input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder="Password"
        />
        <Input
          type="password"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          value={passwordConfirmation}
          placeholder="Confirm Password"
        />
        <Button>Sign Up</Button>
      </Form>
      <div>
        <BottomText>
          Already have an account? <StyledLink to={"/login"}>Login</StyledLink>
        </BottomText>
        <p>
          Don't forget to read our{" "}
          <StyledLink to={"/about"}>guidelines</StyledLink>.
        </p>
      </div>
    </Container>
  );
};

export default SignUp;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--content-color);
`;

const BottomText = styled.p`
  margin: 0.4rem 0;
`;
