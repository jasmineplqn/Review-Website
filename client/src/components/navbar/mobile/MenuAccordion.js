import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

// the menu inside the menu, showing differents categories
const MenuAccordion = ({ options, setShowMenu }) => {
  return (
    <>
      {options.map((option) => {
        return <AccordionRow key={option.name} onClick={() => setShowMenu(false)} to={option.link}>{option.name}</AccordionRow>;
      })}
    </>
  );
};

export default MenuAccordion;

const AccordionRow = styled(NavLink)`
  text-decoration: none;
  font-weight: normal;
  color: black;
  display: flex;
  width: 100%;
  border-top: 2px #e0dcdc solid;
  padding: 1rem;
  &:hover {
    color: var(--content-color);
  }
`;
