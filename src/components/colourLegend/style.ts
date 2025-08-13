import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const LegendContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem 0.4rem 0.75rem 1rem;
  border-radius: 1rem;
  height: min-content;
  top: 10rem;
  right: 1rem;
  z-index: 1000;
  width: 3rem;

  @media (min-width: ${breakpoints.md}) {
    padding-right: 0.25rem;
    justify-content: flex-start;
    top: 30rem;
    right: 3rem;
    bottom: 0;
    width: 3rem;
  }

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    top: 6rem;
    height: min-content;
    width: 3rem;
    right: 1rem;
  }
`;

export const CustomSVG = styled.svg<{ height: number }>`
  width: 2rem;
  height: min-content;

  @media (min-width: ${breakpoints.lg}) {
    width: 4rem;
  }
`;

export const CustomRect = styled.rect``;

export const LegendNumberContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SimpleDiv = styled.div``;
