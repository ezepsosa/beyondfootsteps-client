import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const LogoLayout = styled.img`
  display: none;

  @media (min-width: ${breakpoints.lg}) {
    display: block;
    height: 6rem;
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const MenuLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  font-size: 2rem;
  cursor: pointer;
  color: black;
  padding: 0.25rem 0;
  gap: 2rem;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    font-size: 1.6rem;
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
