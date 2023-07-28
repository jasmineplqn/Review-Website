import { styled } from "styled-components";
import {
  Form,
  Input,
  Title,
  Button,
  ErrorMsg,
  Status,
  StatusBox,
} from "./StyledForm";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useEffect, useContext, useState } from "react";
import loadingTransparent from "../../assets/loadingTransparent.gif";
import {  getServerUrl } from "../../helpers/helpers";

// where user can log in
const Login = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${ getServerUrl()}/api/authenticate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      setLoading(false);
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (data.authenticated) {
          setStatus("Glad to see you again!");
          setCurrentUser(data.data._id);
          window.sessionStorage.setItem("currentUser", data.data._id);
          setTimeout(() => navigate("/"), 2000);
        } else {
          throw new Error(data.message);
        }
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
        <Title>Welcome Back!</Title>
        <Form onSubmit={handleLogin} action="">
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

          <Button type="submit">
            {loading && (
              <img
                src={loadingTransparent}
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
            )}{" "}
            Log In
          </Button>
        </Form>
        <StatusBox>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {status && <Status>{status}</Status>}
        </StatusBox>
        <div>
          <p>
            Are you new here? <StyledLink to={"/signup"}>Join us</StyledLink>
          </p>
        </div>
      </Container>
    </Background>
  );
};

export default Login;

// styling
const Background = styled.div`
  @media only screen and (min-width: 960px) {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  margin-top: 2rem;
  @media only screen and (min-width: 960px) {
    box-shadow: 0px 1px 10px #f35c898c;
    padding: 4rem 2rem 2rem 2rem;
    width: 500px;
    height: 500px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--content-color);
`;
