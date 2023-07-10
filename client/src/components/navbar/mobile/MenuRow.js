import { styled } from "styled-components";
import MenuAccordion from "./MenuAccordion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { arrow_down } from "react-icons-kit/ikons/arrow_down";
import { arrow_up } from "react-icons-kit/ikons/arrow_up";

// the dropdown when menu is opened
const MenuRow = ({ children, options, onClick, setShowMenu }) => {
  const [showRow, setShowRow] = useState(false);

  return (
    <RowContainer>
      {onClick ? (
        <Title onClick={() => onClick()}>{children}</Title>
      ) : (
        <>
          <Title onClick={() => setShowRow(!showRow)}>
            {children}
            {showRow ? (
              <Icon
                size={24}
                icon={arrow_up}
                style={{ color: "var(--content-color)" }}
              />
            ) : (
              <Icon
                size={24}
                icon={arrow_down}
                style={{ color: "var(--content-color)" }}
              />
            )}
          </Title>
          {options && showRow && <MenuAccordion setShowMenu={setShowMenu} options={options} />}
        </>
      )}
    </RowContainer>
  );
};

export default MenuRow;

const RowContainer = styled.div`
  display: block;
  width: 100%;
  border-bottom: 2px #e0dcdc solid;
  padding: 0 0.5rem;
`;

const Link = styled(NavLink)`
  display: flex;
  width: 100%;
  border-top: 2px #e0dcdc solid;
  padding: 1rem;
`;

const Title = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  padding: 1rem 0;
  margin-right: 1rem;
  &:hover {
    color: var(--content-color);
  }
`;
