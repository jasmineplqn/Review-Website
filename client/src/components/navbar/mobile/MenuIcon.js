import styled, { css } from "styled-components";

// layout of hamburger
const MenuIcon = ({ open, onClick }) => {
  return (
    <Lines open={open} onClick={() => onClick()}>
      <div />
      <div />
      <div />
    </Lines>
  );
};

// styling
const Lines = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.2rem;
    background: var(--content-color);
    border-radius: 10px;
    transition: all 0.2s linear;
    position: relative;
    transform-origin: 1px;
  }

  ${({ open }) => {
    if (open) {
      return css`
        :first-child {
          transform: rotate(45deg);
        }

        :nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }

        :nth-child(3) {
          transform: rotate(-45deg);
        }
      `;
    }
    return css`
      :first-child {
        transform: rotate(0);
      }

      :nth-child(2) {
        opacity: 1;
        transform: translateX(0);
      }

      :nth-child(3) {
        transform: rotate(0);
      }
    `;
  }};
`;

export default MenuIcon;
