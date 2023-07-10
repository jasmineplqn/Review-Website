import { styled } from "styled-components";
import { Container, Form, Input, Title, Button } from "./StyledForm";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {

      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
  
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if(data.authenticated) {
          setCurrentUser(data.data);
          window.sessionStorage.setItem("currentUser", JSON.stringify(data.data));
          navigate("/");
        } else {
          throw new Error(data.message);
        }
      }
    } catch(error) {
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
      <Title>Welcome Back!</Title>
      <Form onSubmit={handleLogin} action="">
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
        <Button>Log in</Button>
      </Form>
      <div>
        <p>
          Are you new here? <StyledLink to={"/signup"}>Join us</StyledLink>
        </p>
      </div>
    </Container>
  );
};

export default Login;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--content-color);
`;
