import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const LogoLayout = styled.img`
  height: 3.5rem;
  cursor: pointer;

  @media (min-width: ${breakpoints.lg}) {
    height: 6rem;
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const MenuLayout = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: black;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
  font-size: 1rem;  
  color: white;
  }
`;

export const LinkMenu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
`;
