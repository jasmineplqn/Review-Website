import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

// component in header for the dropdown menu
const Dropdown = ({ children, options }) => {
  return (
    <Link>
      {children}
      {
        <DropdownWrapper>
          {options.map((option, index) => {
            return (
              <StyledNavLink key={index} to={option.link}>
                {option.name}
              </StyledNavLink>
            );
          })}
        </DropdownWrapper>
      }
    </Link>
  );
};

// styling
const DropdownWrapper = styled.div`
  display: none;
  position: absolute;
  top: 4.2rem;
  background-color: white;
  width: 13rem;
  /* border: 0.1rem black solid; */
  box-shadow: 0px 3px 7px grey;
`;

const Link = styled.div`
  display: none;
  position: relative;
  width: 5rem;
  height: 100%;
  /* padding: 1rem 0; */
  margin: 0 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  align-items: center;

  @media only screen and (min-width: 960px) {
    display: flex;
  }

  &:hover ${DropdownWrapper} {
    display: block;
  }
  text-underline-offset: 0.4rem;
  text-decoration: underline 0.15rem rgba(0, 0, 0, 0);
  transition: text-decoration 300ms;

  &:hover {
    text-decoration: underline 0.2rem var(--content-color);
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  width: 100%;
  /* border-top: 2px #e0dcdc solid; */
  padding: 1rem;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #f1356d2e;
  }
`;

export default Dropdown;
