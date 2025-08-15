import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const LegendContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem 0.4rem 0.75rem 1rem;
  border-radius: 0.5rem;
  height: min-content;
  top: 3%;
  right: 3%;
  z-index: 1000;
  width: 3rem;

  @media (min-width: ${breakpoints.md}) {
    top: 30%;
    right: 5%;
    bottom: 0;
    width: 3rem;
  }

  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    top: -8rem;
    height: min-content;
    width: 2.4rem;
    left: 50%;
    padding: 0.5rem;
    transform: rotate(-90deg);
  }
`;

export const CustomSVG = styled.svg<{ height: number }>`
  width: 2rem;
  height: min-content;

  @media (min-width: ${breakpoints.lg}) {
    width: 2rem;
  }
`;

export const CustomRect = styled.rect``;

export const LegendNumberContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SimpleDiv = styled.div`
  @media (orientation: landscape) and (max-width: ${breakpoints.lg}) {
    transform: rotate(90deg);
  }
`;
