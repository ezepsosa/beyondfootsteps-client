import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 10rem;
  left: 1rem;
  width: fit-content;
  background-color: white;
  width: 14rem;
  z-index: 1000;
  padding: 0.25rem;
  border-radius: 1.5rem;
  background-color: #f5f5f5b7;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media (min-width: ${breakpoints.md}) {
    left: 2rem;
    top: 14.5rem;
    width: 23rem;
  }
`;

export const FlagImage = styled.img`
  width: 2.5rem;

  @media (min-width: ${breakpoints.md}) {
    widht: 5rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TopData = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 1rem 0;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`;

export const BodyData = styled.div`
  display: grid;
  gap: 0.5rem 1rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  @media (min-width: ${breakpoints.md}) {
    gap: 0.8rem 1.5rem;
    grid-template-columns: 1fr;
  }
`;
