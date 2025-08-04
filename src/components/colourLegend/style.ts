import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding-right: 0.4rem;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 0.75rem;
  border-radius: 1rem;

  @media(min-width: ${breakpoints.md}){
    padding-right: 0.25rem;
    justify-content:start;
  }
`;

export const CustomSVG = styled.svg<{ height: number }>`
  width: 2rem;
  height: 19rem;

  @media (min-width: ${breakpoints.md}) {
    width: 4rem;
  }
`;

export const CustomRect = styled.rect``;

export const LegendNumberContainers = styled.div``;

export const SimpleDiv = styled.div``;
