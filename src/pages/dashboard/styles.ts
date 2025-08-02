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

export const TopButtomContainer = styled.span`
  position: fixed;
  display: flex;
  top: 6rem;
  z-index: 1000;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  @media (min-width: ${breakpoints.md}) {
    top: 8rem;
    left: 2rem;
  }
`;

export const IconSpan = styled.span`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

export const InfoModal = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 8rem;
  width: 60%;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
  padding: 1rem 1.5rem;
  border-radius: 1rem;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(100%)"};

  transition: opacity 0.4s ease-out, transform 0.4s ease-out,
    visibility 0.4s ease-out;

  @media (min-width: ${breakpoints.md}) {
    transform: ${({ $visible }) =>
      $visible ? "translateY(0)" : "translateY(-100%)"};

    top: 8rem;
    left: 6rem;
    bottom: inherit;
  }
`;

export const TextSpan = styled.span`
  font-size: 0.9rem;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: lighter;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
`;

export const KpiSpan = styled.span`
  display: flex;
  width: max-content;
  font-size: 0.7rem;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  color: black;
`;
export const CloseModal = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  cursor: pointer;

  @media (min-width: ${breakpoints.md}) {
    top: 0.4rem;
    right: 0.3rem;
  }
`;
