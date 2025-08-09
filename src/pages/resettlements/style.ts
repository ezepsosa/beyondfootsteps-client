import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const ResettlementContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const ChartContainer = styled.div`
  padding: 4rem 0.5rem;

  @media (min-width: ${breakpoints.lg}) {
    padding: 6rem 1rem;
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
