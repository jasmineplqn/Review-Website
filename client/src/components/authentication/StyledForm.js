import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 0;
  align-items: center;
`;

const Input = styled.input`
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;
  border: 2px #e0dcdc solid;
  &:focus {
    outline: 2.5px var(--content-color) solid;
  }
`;

const Title = styled.p`
  font-size: 2rem;
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

export { Container, Form, Input, Title, Button };
