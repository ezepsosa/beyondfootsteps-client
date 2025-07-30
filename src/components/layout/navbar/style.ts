import styled from "styled-components";
import { breakpoints } from "@styles/breakpoints";
import { Link } from "react-router-dom";

export const LayoutNavbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1000;
  padding: 1rem 1rem;
  box-sizing: border-box;
  background-color: transparent;

`;

export const LogoLayout = styled.img`
  width: 3rem;

  @media (min-width: ${breakpoints.md}) {
    width: 5rem;
  }
`;

export const MenuLayout = styled.div`
  font-size: 2rem;
  cursor: pointer;
  @media (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const MenuElement = styled.ul<{ open: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    position: static;
    flex-direction: row;
    width: auto;
    background: transparent;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #f5f5f5;
    padding: 1.1rem;
  }
`;

export const LinkElement = styled(Link)`
  color: white;
  text-decoration: none;
  transition: 0.4s;
  border-radius: 2rem;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background: white;
  }

  @media (min-width: ${breakpoints.md}) {
    color: black;
    padding: 1rem;

    &:hover {
      color: #666;
    }
  }
`;
export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 1rem;

  @media (min-width: ${breakpoints.md}) {
    justify-content: space-between;
  }
`;

export const ElementList = styled.li``;
