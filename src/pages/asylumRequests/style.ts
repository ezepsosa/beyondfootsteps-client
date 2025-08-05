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
