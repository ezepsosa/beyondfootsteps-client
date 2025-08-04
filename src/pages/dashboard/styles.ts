import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const LowerContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  position: fixed;
  left: 0;
  bottom: 4rem;
  z-index: 1000;

  @media (min-width: ${breakpoints.md}) {
    bottom: 2rem;
  }
`;

export const TopButtomContainer = styled.span`
  position: fixed;
  display: flex;
  top: 6rem;
  z-index: 1000;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  @media (min-width: ${breakpoints.md}) {
    top: 8rem;
    left: 2rem;
  }
`;

export const IconSpan = styled.span`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;



