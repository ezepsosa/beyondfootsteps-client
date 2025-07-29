import styled from "styled-components";
import { breakpoints } from "@styles/breakpoints";

export const LayoutNavbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
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

export const Container = styled.div``;

export const UnorderedList = styled.ul`
`;
export const ElementList = styled.li``;
