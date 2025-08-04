import { breakpoints } from "@/styles/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 10rem;
  left: 2rem;
  width: fit-content;
  background-color: white;
  z-index: 1000;
  padding: 1rem;
  border-radius: 1.5rem;
  background-color: #f5f5f5b7;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media (min-width: ${breakpoints.md}) {
    left: 2rem;
    top: 15rem;
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
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  justify-content: space-around;
`;

export const BodyData = styled.div`
  display: grid;
  gap: 0.5rem 1rem;
  height: 100%;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  @media (min-width: ${breakpoints.md}) {
    gap: 0.8rem 1.5rem;
  }
`;
