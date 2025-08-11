import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const ResettlementContainer = styled.div`
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  gap: 0.2rem;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
