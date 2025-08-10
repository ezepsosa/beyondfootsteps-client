import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const ResettlementContainer = styled.div`
  width: 100%;
  scroll-behavior: smooth;
  min-height: 100vh;
  overflow: hidden;
  overflow-y: auto;

  @media (min-width: ${breakpoints.lg}) {
    padding: 6rem 1rem;
  }
`;

export const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem 1rem; 
  }
`;
export const TopContainer = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  gap: 0.2rem;
  margin: 5rem 0; 

  @media (min-width: ${breakpoints.lg}) {
    margin: .5rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    gap: 1rem;
  }
`;
