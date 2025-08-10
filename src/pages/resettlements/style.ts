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
  }
`;
export const TopContainer = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin: 1.5rem 0;

  @media (min-width: ${breakpoints.lg}) {
    padding: 2rem 1rem;
    gap: 1rem;
    flex-direction: row;
  }
`;
